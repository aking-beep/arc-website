import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { recordPurchase, type PurchaseRow } from "@/lib/commerce/store";

/**
 * Exercises the idempotency contract of recordPurchase against a stand-in for
 * PostgREST, so the behaviour the webhook depends on is pinned without a
 * database.
 *
 * The contract: insert with `resolution=ignore-duplicates`; an empty response
 * array means the row already existed, in which case the original row — and
 * so the original token — is what comes back.
 */

const SUPABASE_URL = "https://project.supabase.co";

function row(overrides: Partial<PurchaseRow> = {}): PurchaseRow {
  return {
    id: "11111111-1111-1111-1111-111111111111",
    paddle_event_id: "evt_01",
    paddle_transaction_id: "txn_01abcdef",
    email: "buyer@example.com",
    price_id: "pri_playbook",
    currency: "USD",
    amount_minor: "3900",
    token_hash: "first-token-hash",
    download_count: 0,
    download_limit: 25,
    first_downloaded_at: null,
    last_downloaded_at: null,
    revoked_at: null,
    expires_at: null,
    created_at: "2026-06-01T12:00:00Z",
    ...overrides,
  };
}

function input(tokenHash: string) {
  return {
    eventId: "evt_01",
    transactionId: "txn_01abcdef",
    email: "buyer@example.com",
    priceId: "pri_playbook",
    currency: "USD",
    amountMinor: "3900",
    tokenHash,
    downloadLimit: 25,
    occurredAt: "2026-06-01T11:59:50Z",
  };
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

let calls: { url: string; init: RequestInit }[] = [];

beforeEach(() => {
  calls = [];
  vi.stubEnv("SUPABASE_URL", SUPABASE_URL);
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role-key");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function mockFetch(responses: Response[]) {
  const queue = [...responses];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL, init: RequestInit = {}) => {
      calls.push({ url: String(url), init });
      const next = queue.shift();
      if (!next) throw new Error("unexpected extra fetch call");
      return next;
    }),
  );
}

describe("recordPurchase", () => {
  it("reports a first delivery as created", async () => {
    mockFetch([jsonResponse([row()])]);

    const result = await recordPurchase(input("first-token-hash"));

    expect(result).toMatchObject({ ok: true });
    if (!result.ok) return;
    expect(result.data.created).toBe(true);
    expect(result.data.row.token_hash).toBe("first-token-hash");
    expect(calls).toHaveLength(1);
  });

  it("asks PostgREST to ignore duplicates on the transaction id", async () => {
    mockFetch([jsonResponse([row()])]);

    await recordPurchase(input("first-token-hash"));

    expect(calls[0].url).toContain("on_conflict=paddle_transaction_id");
    expect(calls[0].init.method).toBe("POST");
    const headers = calls[0].init.headers as Record<string, string>;
    expect(headers.prefer).toContain("resolution=ignore-duplicates");
  });

  it("returns the original row, not the retry, when the same transaction arrives again", async () => {
    // Empty array = conflict ignored, then the follow-up select finds the row.
    mockFetch([jsonResponse([]), jsonResponse([row()])]);

    const result = await recordPurchase(input("second-token-hash"));

    expect(result).toMatchObject({ ok: true });
    if (!result.ok) return;
    expect(result.data.created).toBe(false);
    // The crucial property: the token already emailed to the buyer survives a
    // redelivery, and the newly minted one is discarded.
    expect(result.data.row.token_hash).toBe("first-token-hash");
  });

  it("looks the existing row up by transaction id", async () => {
    mockFetch([jsonResponse([]), jsonResponse([row()])]);

    await recordPurchase(input("second-token-hash"));

    expect(calls).toHaveLength(2);
    expect(calls[1].url).toContain("paddle_transaction_id=eq.txn_01abcdef");
  });

  it("fails loudly when the insert is ignored but no row can be found", async () => {
    mockFetch([jsonResponse([]), jsonResponse([])]);

    const result = await recordPurchase(input("second-token-hash"));

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("error");
  });

  it("surfaces a database error rather than pretending the sale was recorded", async () => {
    mockFetch([new Response("permission denied", { status: 403 })]);

    const result = await recordPurchase(input("first-token-hash"));

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("error");
    expect(result.detail).toContain("403");
  });

  it("reports unconfigured without making a request when Supabase is not set up", async () => {
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    mockFetch([]);

    const result = await recordPurchase(input("first-token-hash"));

    expect(result).toMatchObject({ ok: false, reason: "unconfigured" });
    expect(calls).toHaveLength(0);
  });

  it("never sends the raw token to the database", async () => {
    mockFetch([jsonResponse([row()])]);

    await recordPurchase(input("hash-only"));

    const body = JSON.parse(String(calls[0].init.body));
    expect(body.token_hash).toBe("hash-only");
    expect(Object.keys(body)).not.toContain("token");
  });
});
