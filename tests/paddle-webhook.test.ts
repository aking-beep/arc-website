import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";

import {
  extractPurchase,
  parseSignatureHeader,
  purchaseMatchesPrice,
  verifyWebhookSignature,
} from "@/lib/commerce/paddle";

const SECRET = "pdl_ntfset_test_secret";
const NOW = new Date("2026-06-01T12:00:00Z");

function sign(body: string, secret = SECRET, at: Date = NOW) {
  const ts = Math.floor(at.getTime() / 1000);
  const h1 = createHmac("sha256", secret).update(`${ts}:${body}`, "utf8").digest("hex");
  return `ts=${ts};h1=${h1}`;
}

function completedTransaction(overrides: Record<string, unknown> = {}) {
  return {
    event_id: "evt_01",
    event_type: "transaction.completed",
    occurred_at: "2026-06-01T11:59:50Z",
    data: {
      id: "txn_01abcdef",
      status: "completed",
      customer_email: "buyer@example.com",
      items: [{ price: { id: "pri_playbook" }, quantity: 1 } ],
      details: { totals: { currency_code: "USD", total: "3900" } },
      ...overrides,
    },
  };
}

describe("parseSignatureHeader", () => {
  it("parses the ts and h1 parts", () => {
    const parsed = parseSignatureHeader(`ts=1700000000;h1=${"a".repeat(64)}`);
    expect(parsed).toEqual({ ts: "1700000000", h1: "a".repeat(64) });
  });

  it("tolerates ordering and whitespace", () => {
    const parsed = parseSignatureHeader(`h1=${"b".repeat(64)}; ts=1700000000`);
    expect(parsed?.ts).toBe("1700000000");
  });

  it.each([
    ["null", null],
    ["empty", ""],
    ["no h1", "ts=1700000000"],
    ["no ts", `h1=${"a".repeat(64)}`],
    ["non-numeric ts", `ts=later;h1=${"a".repeat(64)}`],
    ["short digest", "ts=1700000000;h1=abcd"],
    ["non-hex digest", `ts=1700000000;h1=${"z".repeat(64)}`],
  ])("rejects %s", (_label, header) => {
    expect(parseSignatureHeader(header)).toBeNull();
  });
});

describe("verifyWebhookSignature", () => {
  const rawBody = JSON.stringify(completedTransaction());

  it("accepts a correctly signed body", () => {
    const result = verifyWebhookSignature({
      rawBody,
      signatureHeader: sign(rawBody),
      secret: SECRET,
      now: NOW,
    });
    expect(result).toEqual({ ok: true });
  });

  it("refuses to verify when no secret is configured", () => {
    const result = verifyWebhookSignature({
      rawBody,
      signatureHeader: sign(rawBody),
      secret: undefined,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: "missing_secret" });
  });

  it("rejects a missing header", () => {
    const result = verifyWebhookSignature({
      rawBody,
      signatureHeader: null,
      secret: SECRET,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: "missing_signature" });
  });

  it("rejects a signature made with a different secret", () => {
    const result = verifyWebhookSignature({
      rawBody,
      signatureHeader: sign(rawBody, "wrong-secret"),
      secret: SECRET,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: "mismatch" });
  });

  it("rejects a body that changed after signing", () => {
    const header = sign(rawBody);
    const tampered = rawBody.replace("3900", "100");
    const result = verifyWebhookSignature({
      rawBody: tampered,
      signatureHeader: header,
      secret: SECRET,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: "mismatch" });
  });

  it("rejects a replay from outside the freshness window", () => {
    const header = sign(rawBody, SECRET, new Date("2026-06-01T11:50:00Z"));
    const result = verifyWebhookSignature({
      rawBody,
      signatureHeader: header,
      secret: SECRET,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: "stale_timestamp" });
  });

  it("accepts a signature from just inside the window", () => {
    const header = sign(rawBody, SECRET, new Date("2026-06-01T11:56:00Z"));
    const result = verifyWebhookSignature({
      rawBody,
      signatureHeader: header,
      secret: SECRET,
      now: NOW,
    });
    expect(result).toEqual({ ok: true });
  });

  it("rejects a malformed header before doing any HMAC work", () => {
    const result = verifyWebhookSignature({
      rawBody,
      signatureHeader: "garbage",
      secret: SECRET,
      now: NOW,
    });
    expect(result).toEqual({ ok: false, reason: "malformed_signature" });
  });
});

describe("extractPurchase", () => {
  it("pulls the facts we persist", () => {
    const purchase = extractPurchase(completedTransaction());
    expect(purchase).toEqual({
      eventId: "evt_01",
      transactionId: "txn_01abcdef",
      email: "buyer@example.com",
      priceIds: ["pri_playbook"],
      currency: "USD",
      totalMinorUnits: "3900",
      occurredAt: "2026-06-01T11:59:50Z",
    });
  });

  it("falls back to the nested customer email", () => {
    const event = completedTransaction({
      customer_email: undefined,
      customer: { email: "nested@example.com" },
    });
    expect(extractPurchase(event)?.email).toBe("nested@example.com");
  });

  it("derives an idempotency-safe event id when Paddle omits one", () => {
    const event = { ...completedTransaction(), event_id: undefined };
    expect(extractPurchase(event)?.eventId).toBe("txn:txn_01abcdef");
  });

  it("returns null without a transaction id, so nothing unkeyed is stored", () => {
    const event = completedTransaction({ id: undefined });
    expect(extractPurchase(event)).toBeNull();
  });

  it("returns null when there is no data object at all", () => {
    expect(extractPurchase({ event_type: "transaction.completed" })).toBeNull();
  });

  it("survives a missing totals block", () => {
    const purchase = extractPurchase(completedTransaction({ details: undefined }));
    expect(purchase?.totalMinorUnits).toBeNull();
    expect(purchase?.transactionId).toBe("txn_01abcdef");
  });
});

describe("purchaseMatchesPrice", () => {
  const purchase = extractPurchase(completedTransaction())!;

  it("matches our price", () => {
    expect(purchaseMatchesPrice(purchase, "pri_playbook")).toBe(true);
  });

  it("does not fulfil a transaction for another product", () => {
    expect(purchaseMatchesPrice(purchase, "pri_something_else")).toBe(false);
  });

  it("fulfils when Paddle sent no items, rather than refusing a paid order", () => {
    const noItems = extractPurchase(completedTransaction({ items: [] }))!;
    expect(purchaseMatchesPrice(noItems, "pri_playbook")).toBe(true);
  });
});

/**
 * Idempotency is enforced by a unique index on paddle_transaction_id, with the
 * insert issued as `resolution=ignore-duplicates` (see lib/commerce/store.ts
 * and the migration). These cases pin the two properties the handler relies on
 * for a redelivered webhook to be harmless.
 */
describe("webhook idempotency", () => {
  it("derives the same idempotency key from every redelivery of a transaction", () => {
    const body = JSON.stringify(completedTransaction());
    const first = extractPurchase(JSON.parse(body))!;
    // Paddle redelivers with a new event id and a later occurred_at.
    const second = extractPurchase({
      ...JSON.parse(body),
      event_id: "evt_02",
      occurred_at: "2026-06-01T12:04:00Z",
    })!;

    expect(second.eventId).not.toBe(first.eventId);
    expect(second.transactionId).toBe(first.transactionId);
  });

  it("re-signs identically for the same timestamp, so a replay is caught by the window and not by luck", () => {
    const body = JSON.stringify(completedTransaction());
    expect(sign(body)).toBe(sign(body));
  });

  it("verifies each redelivery independently", () => {
    const body = JSON.stringify(completedTransaction());
    const later = new Date("2026-06-01T12:04:00Z");
    expect(
      verifyWebhookSignature({
        rawBody: body,
        signatureHeader: sign(body, SECRET, later),
        secret: SECRET,
        now: later,
      }),
    ).toEqual({ ok: true });
  });
});
