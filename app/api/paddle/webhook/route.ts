import { NextResponse } from "next/server";

import { paddleConfig, playbookSlugForPriceId } from "@/lib/commerce/config";
import { sendPurchaseEmail } from "@/lib/commerce/email";
import {
  extractPurchase,
  matchKnownPrice,
  verifyWebhookSignature,
  type PaddleWebhookEvent,
} from "@/lib/commerce/paddle";
import { clientIp, rateLimit } from "@/lib/commerce/rate-limit";
import { recordPurchase } from "@/lib/commerce/store";
import { createEntitlementToken } from "@/lib/commerce/tokens";

export const runtime = "nodejs";
// Signature verification needs the exact bytes Paddle signed, so this route
// must never be cached or statically analysed into something clever.
export const dynamic = "force-dynamic";

const DOWNLOAD_LIMIT = 25;

/**
 * Structured one-line logs. Paddle retries, so when something goes wrong the
 * first question is always "which transaction, how many times, and why" —
 * these fields are chosen to answer that from a log search.
 *
 * Never log the token, the raw body, or the webhook secret.
 */
function log(
  level: "info" | "warn" | "error",
  message: string,
  fields: Record<string, unknown> = {},
) {
  const line = { scope: "paddle.webhook", message, ...fields };
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

export async function POST(request: Request) {
  const paddle = paddleConfig();

  // Cheap shield in front of signature verification, which is an HMAC over a
  // body an unauthenticated caller controls the size of.
  const limit = rateLimit(`paddle-webhook:${clientIp(request)}`, {
    limit: 120,
    windowSeconds: 60,
  });
  if (!limit.allowed) {
    log("warn", "rate limited");
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } },
    );
  }

  if (!paddle.configured) {
    log("error", "webhook received but Paddle is not configured", {
      missing: paddle.missing,
    });
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const rawBody = await request.text();

  const signature = verifyWebhookSignature({
    rawBody,
    signatureHeader: request.headers.get("paddle-signature"),
    secret: paddle.webhookSecret,
  });

  if (!signature.ok) {
    // 503 for our own misconfiguration, 401 for a caller who cannot prove who
    // they are. Paddle retries a 503 and gives up on a 401, which is the right
    // behaviour in each case.
    const status = signature.reason === "missing_secret" ? 503 : 401;
    log(status === 503 ? "error" : "warn", "signature rejected", {
      reason: signature.reason,
    });
    return NextResponse.json({ error: "Invalid signature." }, { status });
  }

  let event: PaddleWebhookEvent;
  try {
    event = JSON.parse(rawBody) as PaddleWebhookEvent;
  } catch {
    log("warn", "signed body was not JSON");
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Acknowledge everything else. Paddle sends many event types and retrying a
  // subscription event at us forever helps nobody.
  if (event.event_type !== "transaction.completed") {
    log("info", "ignored event type", { eventType: event.event_type });
    return NextResponse.json({ ok: true, ignored: event.event_type });
  }

  const purchase = extractPurchase(event);
  if (!purchase) {
    log("warn", "transaction.completed had no usable payload", {
      eventId: event.event_id,
    });
    return NextResponse.json({ error: "Unusable payload." }, { status: 400 });
  }

  const knownPriceIds = Object.values(paddle.prices);
  const matchedPriceId = matchKnownPrice(purchase, knownPriceIds);
  const slug = matchedPriceId ? playbookSlugForPriceId(matchedPriceId) : null;

  if (!matchedPriceId || !slug) {
    log("info", "transaction was for a different product", {
      transactionId: purchase.transactionId,
      priceIds: purchase.priceIds,
    });
    return NextResponse.json({ ok: true, ignored: "price_mismatch" });
  }

  // Minting before the insert is deliberate: if the row already exists the
  // insert is ignored and this token is simply discarded, so the buyer's
  // original token — the one already in their inbox — keeps working.
  const { token, tokenHash } = createEntitlementToken();

  const stored = await recordPurchase({
    eventId: purchase.eventId,
    transactionId: purchase.transactionId,
    email: purchase.email,
    priceId: matchedPriceId,
    currency: purchase.currency,
    amountMinor: purchase.totalMinorUnits,
    tokenHash,
    downloadLimit: DOWNLOAD_LIMIT,
    occurredAt: purchase.occurredAt,
  });

  if (!stored.ok) {
    // 503 so Paddle retries. A paid transaction we failed to record is the one
    // failure in this file worth being loud about.
    log("error", "could not record purchase", {
      transactionId: purchase.transactionId,
      reason: stored.reason,
      detail: stored.detail,
    });
    return NextResponse.json({ error: "Could not record purchase." }, { status: 503 });
  }

  if (!stored.data.created) {
    log("info", "duplicate delivery, already fulfilled", {
      transactionId: purchase.transactionId,
      eventId: purchase.eventId,
    });
    return NextResponse.json({ ok: true, duplicate: true });
  }

  log("info", "purchase recorded", {
    transactionId: purchase.transactionId,
    slug,
    currency: purchase.currency,
    amountMinor: purchase.totalMinorUnits,
    hasEmail: Boolean(purchase.email),
  });

  if (purchase.email) {
    const sent = await sendPurchaseEmail({
      to: purchase.email,
      token,
      transactionId: purchase.transactionId,
      slug,
    });
    if (!sent.ok) {
      // The sale is recorded and the entitlement exists, so this is not a
      // reason to make Paddle retry — a retry would be deduplicated and would
      // not resend anyway. Loud log, 200, and the buyer can be reached from
      // the row.
      log("error", "purchase email failed; entitlement exists", {
        transactionId: purchase.transactionId,
      });
    }
  } else {
    log("warn", "no email on transaction; cannot deliver link", {
      transactionId: purchase.transactionId,
    });
  }

  return NextResponse.json({ ok: true });
}

function methodNotAllowed() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
