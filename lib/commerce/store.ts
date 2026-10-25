// ============================================================================
// Purchase persistence and the private bundle, on Supabase.
//
// Supabase over a heavier backend because the two things needed here —
// a table and a private bucket that can mint short-lived signed URLs — are
// both one HTTP call, and neither needs a server process of our own.
//
// Raw fetch over @supabase/supabase-js for the same reason the Resend
// integration in /api/contact uses fetch: four endpoints are involved, the
// SDK would be the largest dependency in the project, and this way the whole
// data path is visible in one file.
//
// Every function here assumes the caller has already decided the request is
// authorised. The service-role key bypasses row-level security.
// ============================================================================

import "server-only";

import { storageConfig, supabaseConfig } from "@/lib/commerce/config";
import type { EntitlementRecord } from "@/lib/commerce/tokens";
import type { PlaybookSlug } from "@/lib/playbook";

const PURCHASES = "playbook_purchases";

export type StoreResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "unconfigured" | "error"; detail: string };

function unconfigured(detail: string): StoreResult<never> {
  return { ok: false, reason: "unconfigured", detail };
}

function failed(detail: string): StoreResult<never> {
  return { ok: false, reason: "error", detail };
}

async function supabaseFetch(
  path: string,
  init: RequestInit & { prefer?: string } = {},
) {
  const config = supabaseConfig();
  if (!config.configured) {
    throw new Error(`Supabase not configured: missing ${config.missing.join(", ")}`);
  }

  const { prefer, headers, ...rest } = init;
  const response = await fetch(`${config.restUrl}${path}`, {
    ...rest,
    cache: "no-store",
    headers: {
      apikey: config.serviceRoleKey,
      authorization: `Bearer ${config.serviceRoleKey}`,
      "content-type": "application/json",
      ...(prefer ? { prefer } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Supabase ${rest.method ?? "GET"} ${path} failed: ${response.status} ${await response.text()}`,
    );
  }

  return response;
}

// ---------------------------------------------------------------------------
// Purchases
// ---------------------------------------------------------------------------

export type PurchaseRow = {
  id: string;
  paddle_event_id: string;
  paddle_transaction_id: string;
  email: string | null;
  price_id: string | null;
  currency: string | null;
  amount_minor: string | null;
  token_hash: string;
  download_count: number;
  download_limit: number | null;
  first_downloaded_at: string | null;
  last_downloaded_at: string | null;
  revoked_at: string | null;
  expires_at: string | null;
  created_at: string;
};

export type RecordPurchaseInput = {
  eventId: string;
  transactionId: string;
  email: string | null;
  priceId: string | null;
  currency: string | null;
  amountMinor: string | null;
  tokenHash: string;
  downloadLimit: number | null;
  occurredAt: string;
};

export type RecordPurchaseOutcome = {
  row: PurchaseRow;
  /** False when the transaction was already stored — a redelivered webhook. */
  created: boolean;
};

/**
 * Insert-if-new, keyed on the Paddle transaction id.
 *
 * Idempotency lives in the database rather than in the handler because Paddle
 * retries, and two retries can land on two instances at the same moment. A
 * read-then-write in application code has a race that a unique index does not.
 * `on_conflict` with `ignore-duplicates` makes the second arrival a no-op, and
 * the follow-up select returns the original row — so the original token stays
 * valid and no second email goes out with a token the first email did not
 * mention.
 */
export async function recordPurchase(
  input: RecordPurchaseInput,
): Promise<StoreResult<RecordPurchaseOutcome>> {
  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    const response = await supabaseFetch(
      `/${PURCHASES}?on_conflict=paddle_transaction_id`,
      {
        method: "POST",
        prefer: "resolution=ignore-duplicates,return=representation",
        body: JSON.stringify({
          paddle_event_id: input.eventId,
          paddle_transaction_id: input.transactionId,
          email: input.email,
          price_id: input.priceId,
          currency: input.currency,
          amount_minor: input.amountMinor,
          token_hash: input.tokenHash,
          download_limit: input.downloadLimit,
          purchased_at: input.occurredAt,
        }),
      },
    );

    const inserted = (await response.json()) as PurchaseRow[];
    if (inserted.length > 0) return { ok: true, data: { row: inserted[0], created: true } };

    // Empty array means the conflict was ignored: we have seen this one.
    const existing = await supabaseFetch(
      `/${PURCHASES}?paddle_transaction_id=eq.${encodeURIComponent(input.transactionId)}&select=*&limit=1`,
    );
    const rows = (await existing.json()) as PurchaseRow[];
    if (rows.length === 0) {
      return failed("insert was ignored but no existing row was found");
    }
    return { ok: true, data: { row: rows[0], created: false } };
  } catch (error) {
    return failed(error instanceof Error ? error.message : String(error));
  }
}

function missingAccessTable(detail: string): boolean {
  return (
    detail.includes("playbook_access_tokens") &&
    /PGRST205|42P01|does not exist|schema cache/i.test(detail)
  );
}

/**
 * Resolve a token the buyer presented.
 *
 * The hash on the purchase is the link from the original email. A hash in
 * playbook_access_tokens is a later recovery link for the same purchase.
 * Either one opens that purchase. A missing access table does not break the
 * original link.
 */
export async function findPurchaseForPresentedToken(
  tokenHash: string,
): Promise<StoreResult<PurchaseRow | null>> {
  const direct = await findPurchaseByTokenHash(tokenHash);
  if (!direct.ok || direct.data) return direct;

  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    const response = await supabaseFetch(
      `/playbook_access_tokens?token_hash=eq.${encodeURIComponent(tokenHash)}&select=purchase:playbook_purchases(*)&limit=1`,
    );
    const rows = (await response.json()) as { purchase: PurchaseRow | PurchaseRow[] | null }[];
    const purchase = rows[0]?.purchase;
    if (Array.isArray(purchase)) return { ok: true, data: purchase[0] ?? null };
    return { ok: true, data: purchase ?? null };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    if (missingAccessTable(detail)) return { ok: true, data: null };
    return failed(detail);
  }
}

/**
 * Make a string match literally inside a PostgREST `ilike` filter.
 *
 * `ilike` is SQL LIKE, so `%` and `_` are wildcards and backslash is the
 * escape character. Backslash is escaped first, or it would escape the
 * escapes added after it. Without this an address containing `_` would match
 * more rows than itself.
 *
 * `*` is deliberately NOT handled here, because it cannot be: PostgREST
 * rewrites `*` to `%` while parsing the filter value, before SQL sees it, and
 * drops any backslash in front of it. Callers must reject `*` instead — see
 * `normalizeBuyerEmail` in lib/commerce/recover.ts.
 */
export function escapeLikePattern(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/%/g, "\\%")
    .replace(/_/g, "\\_");
}

export async function findPurchasesByEmail(
  email: string,
): Promise<StoreResult<PurchaseRow[]>> {
  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    const response = await supabaseFetch(
      `/${PURCHASES}?email=ilike.${encodeURIComponent(escapeLikePattern(email))}&revoked_at=is.null&select=*&order=purchased_at.desc&limit=10`,
    );
    const rows = (await response.json()) as PurchaseRow[];
    return { ok: true, data: rows };
  } catch (error) {
    return failed(error instanceof Error ? error.message : String(error));
  }
}

export async function countAccessTokens(
  purchaseId: string,
): Promise<StoreResult<number>> {
  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    const response = await supabaseFetch(
      `/playbook_access_tokens?purchase_id=eq.${encodeURIComponent(purchaseId)}&select=id&limit=21`,
    );
    const rows = (await response.json()) as { id: string }[];
    return { ok: true, data: rows.length };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    if (missingAccessTable(detail)) return { ok: false, reason: "unconfigured", detail };
    return failed(detail);
  }
}

export async function insertAccessToken(
  purchaseId: string,
  tokenHash: string,
): Promise<StoreResult<true>> {
  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    await supabaseFetch("/playbook_access_tokens", {
      method: "POST",
      prefer: "return=minimal",
      body: JSON.stringify({ purchase_id: purchaseId, token_hash: tokenHash }),
    });
    return { ok: true, data: true };
  } catch (error) {
    return failed(error instanceof Error ? error.message : String(error));
  }
}

/**
 * Drop a recovery token row.
 *
 * Used when the email carrying that link could not be sent: the row would
 * otherwise count against MAX_RECOVERY_LINKS for a link nobody ever received,
 * so a mail outage could permanently exhaust a purchase's recovery budget.
 */
export async function deleteAccessToken(
  tokenHash: string,
): Promise<StoreResult<true>> {
  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    await supabaseFetch(
      `/playbook_access_tokens?token_hash=eq.${encodeURIComponent(tokenHash)}`,
      { method: "DELETE", prefer: "return=minimal" },
    );
    return { ok: true, data: true };
  } catch (error) {
    return failed(error instanceof Error ? error.message : String(error));
  }
}

export async function findPurchaseByTokenHash(
  tokenHash: string,
): Promise<StoreResult<PurchaseRow | null>> {
  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    const response = await supabaseFetch(
      `/${PURCHASES}?token_hash=eq.${encodeURIComponent(tokenHash)}&select=*&limit=1`,
    );
    const rows = (await response.json()) as PurchaseRow[];
    return { ok: true, data: rows[0] ?? null };
  } catch (error) {
    return failed(error instanceof Error ? error.message : String(error));
  }
}

export async function findPurchaseByTransactionId(
  transactionId: string,
): Promise<StoreResult<PurchaseRow | null>> {
  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    const response = await supabaseFetch(
      `/${PURCHASES}?paddle_transaction_id=eq.${encodeURIComponent(transactionId)}&select=*&limit=1`,
    );
    const rows = (await response.json()) as PurchaseRow[];
    return { ok: true, data: rows[0] ?? null };
  } catch (error) {
    return failed(error instanceof Error ? error.message : String(error));
  }
}

/**
 * Increment through a database function rather than read-modify-write, so two
 * parallel downloads cannot both read the same count and store count + 1.
 */
export async function recordDownload(
  tokenHash: string,
): Promise<StoreResult<number>> {
  const config = supabaseConfig();
  if (!config.configured) {
    return unconfigured(`missing ${config.missing.join(", ")}`);
  }

  try {
    const response = await supabaseFetch("/rpc/playbook_record_download", {
      method: "POST",
      body: JSON.stringify({ p_token_hash: tokenHash }),
    });
    const count = (await response.json()) as number | null;
    return { ok: true, data: typeof count === "number" ? count : 0 };
  } catch (error) {
    return failed(error instanceof Error ? error.message : String(error));
  }
}

export function toEntitlement(row: PurchaseRow): EntitlementRecord {
  return {
    tokenHash: row.token_hash,
    revokedAt: row.revoked_at,
    expiresAt: row.expires_at,
    downloadCount: row.download_count,
    downloadLimit: row.download_limit,
  };
}

// ---------------------------------------------------------------------------
// Private bucket
// ---------------------------------------------------------------------------

export type BundleFile = "pdf" | "zip";

export type SignedDownload = {
  file: BundleFile;
  url: string;
  filename: string;
  expiresInSeconds: number;
};

/**
 * Mint a short-lived signed URL for one object in the private bucket.
 *
 * Signing happens here, on the server, after the entitlement has been
 * checked. The bucket is never public and the service-role key never reaches
 * the browser — the client only ever receives a URL that expires.
 */
export async function signBundleUrl(
  file: BundleFile,
  slug: PlaybookSlug,
): Promise<StoreResult<SignedDownload>> {
  const supabase = supabaseConfig();
  const storage = storageConfig(slug);

  if (!supabase.configured) return unconfigured(`missing ${supabase.missing.join(", ")}`);
  if (!storage.configured) return unconfigured(`missing ${storage.missing.join(", ")}`);

  const objectPath = file === "pdf" ? storage.pdfPath : storage.zipPath;
  const filename = objectPath.split("/").pop() || `playbook.${file}`;

  try {
    const response = await fetch(
      `${supabase.storageUrl}/object/sign/${encodeURIComponent(storage.bucket)}/${objectPath
        .split("/")
        .map(encodeURIComponent)
        .join("/")}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          apikey: supabase.serviceRoleKey,
          authorization: `Bearer ${supabase.serviceRoleKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ expiresIn: storage.signedUrlTtlSeconds }),
      },
    );

    if (!response.ok) {
      return failed(`sign failed: ${response.status} ${await response.text()}`);
    }

    const payload = (await response.json()) as { signedURL?: string };
    if (!payload.signedURL) return failed("sign response had no signedURL");

    return {
      ok: true,
      data: {
        file,
        // Supabase returns a path relative to /storage/v1.
        url: `${supabase.storageUrl}${payload.signedURL.replace(/^\/storage\/v1/, "")}`,
        filename,
        expiresInSeconds: storage.signedUrlTtlSeconds,
      },
    };
  } catch (error) {
    return failed(error instanceof Error ? error.message : String(error));
  }
}
