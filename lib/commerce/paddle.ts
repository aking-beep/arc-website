// ============================================================================
// Paddle Billing — webhook verification and the bits of the payload we use.
//
// No Paddle server SDK. Verification is one HMAC and the payload fields we
// care about are four, so a dependency would add a supply-chain surface and a
// version to track in exchange for nothing. It also keeps this unit-testable
// with a hand-built signature header.
//
// Checkout on the client is a different matter — @paddle/paddle-js loads and
// manages Paddle's hosted overlay, which is not something to reimplement.
// ============================================================================

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Paddle sends `Paddle-Signature: ts=<unix>;h1=<hex>` and signs the string
 * `<ts>:<raw body>`. The raw body matters: re-serialising parsed JSON changes
 * key order and whitespace, and the signature stops matching.
 */
export function parseSignatureHeader(
  header: string | null,
): { ts: string; h1: string } | null {
  if (!header) return null;

  let ts: string | undefined;
  let h1: string | undefined;

  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key === "ts") ts = value;
    if (key === "h1") h1 = value;
  }

  if (!ts || !h1) return null;
  if (!/^\d+$/.test(ts)) return null;
  if (!/^[a-f0-9]{64}$/i.test(h1)) return null;

  return { ts, h1 };
}

export type SignatureFailure =
  | "missing_secret"
  | "missing_signature"
  | "malformed_signature"
  | "stale_timestamp"
  | "mismatch";

export type SignatureResult = { ok: true } | { ok: false; reason: SignatureFailure };

/**
 * Five minutes. Long enough to survive clock skew and a slow cold start,
 * short enough that a captured request is not replayable later. Replay inside
 * the window is handled separately by making the handler idempotent — a
 * signature check alone cannot do that job.
 */
const MAX_SIGNATURE_AGE_SECONDS = 300;

export function verifyWebhookSignature({
  rawBody,
  signatureHeader,
  secret,
  now = new Date(),
  maxAgeSeconds = MAX_SIGNATURE_AGE_SECONDS,
}: {
  rawBody: string;
  signatureHeader: string | null;
  secret: string | undefined;
  now?: Date;
  maxAgeSeconds?: number;
}): SignatureResult {
  if (!secret) return { ok: false, reason: "missing_secret" };
  if (!signatureHeader) return { ok: false, reason: "missing_signature" };

  const parsed = parseSignatureHeader(signatureHeader);
  if (!parsed) return { ok: false, reason: "malformed_signature" };

  const age = Math.abs(Math.floor(now.getTime() / 1000) - Number(parsed.ts));
  if (age > maxAgeSeconds) return { ok: false, reason: "stale_timestamp" };

  const expected = createHmac("sha256", secret)
    .update(`${parsed.ts}:${rawBody}`, "utf8")
    .digest("hex");

  const given = Buffer.from(parsed.h1.toLowerCase(), "hex");
  const mine = Buffer.from(expected, "hex");
  if (given.length !== mine.length) return { ok: false, reason: "mismatch" };
  if (!timingSafeEqual(given, mine)) return { ok: false, reason: "mismatch" };

  return { ok: true };
}

// ---------------------------------------------------------------------------
// Payload
// ---------------------------------------------------------------------------

export type PaddleWebhookEvent = {
  event_id?: string;
  event_type?: string;
  occurred_at?: string;
  data?: Record<string, unknown>;
};

export type PurchaseFacts = {
  eventId: string;
  transactionId: string;
  email: string | null;
  priceIds: string[];
  currency: string | null;
  /** Minor units, as Paddle reports them. Stored as given; never recomputed. */
  totalMinorUnits: string | null;
  occurredAt: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

/**
 * Pull only what we persist. Paddle's transaction payload is large and mostly
 * irrelevant to us, and the less of it we copy into our own schema the less
 * there is to migrate when they change it.
 */
export function extractPurchase(event: PaddleWebhookEvent): PurchaseFacts | null {
  const data = asRecord(event.data);
  if (!data) return null;

  const transactionId = asString(data.id);
  const eventId = asString(event.event_id) ?? (transactionId ? `txn:${transactionId}` : null);
  if (!transactionId || !eventId) return null;

  const customer = asRecord(data.customer);
  const email =
    asString(data.customer_email) ??
    asString(customer?.email) ??
    asString(asRecord(data.billing_details)?.email);

  const items = Array.isArray(data.items) ? data.items : [];
  const priceIds = items
    .map((item) => asString(asRecord(asRecord(item)?.price)?.id))
    .filter((id): id is string => id !== null);

  const details = asRecord(data.details);
  const totals = asRecord(details?.totals);

  return {
    eventId,
    transactionId,
    email,
    priceIds,
    currency: asString(totals?.currency_code) ?? asString(data.currency_code),
    totalMinorUnits: asString(totals?.total) ?? asString(totals?.grand_total),
    occurredAt: asString(event.occurred_at) ?? new Date().toISOString(),
  };
}

/**
 * Guard against fulfilling a transaction for something else sold through the
 * same Paddle account. An empty item list does not match: with more than one
 * playbook, a missing price id would make us guess which files to send.
 */
export function purchaseMatchesPrice(
  purchase: PurchaseFacts,
  expectedPriceId: string,
): boolean {
  return purchase.priceIds.includes(expectedPriceId);
}

/** The first price id on the transaction that we sell. Null if none match. */
export function matchKnownPrice(
  purchase: PurchaseFacts,
  knownPriceIds: readonly string[],
): string | null {
  return purchase.priceIds.find((id) => knownPriceIds.includes(id)) ?? null;
}
