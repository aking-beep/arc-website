import { NextResponse } from "next/server";

import { playbookSlugForPriceId } from "@/lib/commerce/config";
import { sendPurchaseEmail } from "@/lib/commerce/email";
import { clientIp, rateLimit } from "@/lib/commerce/rate-limit";
import { normalizeBuyerEmail, recoveryAcknowledgement } from "@/lib/commerce/recover";
import {
  countAccessTokens,
  deleteAccessToken,
  findPurchasesByEmail,
  insertAccessToken,
} from "@/lib/commerce/store";
import { createEntitlementToken } from "@/lib/commerce/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PER_IP = { limit: 5, windowSeconds: 60 * 60 };
const PER_EMAIL = { limit: 3, windowSeconds: 60 * 60 };
const MAX_RECOVERY_LINKS = 20;

function log(message: string, fields: Record<string, unknown> = {}) {
  console.info({ scope: "playbook.recover", message, ...fields });
}

function ok() {
  return NextResponse.json({ ok: true, message: recoveryAcknowledgement });
}

/**
 * Email a fresh download link for purchases on this address.
 *
 * The response is the same whether or not the address has a purchase, so the
 * form cannot be used to learn who bought something. The original link is
 * left in place.
 */
export async function POST(request: Request) {
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  const ip = clientIp(request);
  const ipLimit = rateLimit(`recover-ip:${ip}`, PER_IP);
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "retry-after": String(ipLimit.retryAfter) } },
    );
  }

  let body: { email?: unknown; company_website?: unknown };
  try {
    body = (await request.json()) as { email?: unknown; company_website?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return ok();
  }

  const email = typeof body.email === "string" ? normalizeBuyerEmail(body.email) : null;
  if (!email) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const emailLimit = rateLimit(`recover-email:${email}`, PER_EMAIL);
  if (!emailLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "retry-after": String(emailLimit.retryAfter) } },
    );
  }

  const found = await findPurchasesByEmail(email);
  if (!found.ok) {
    log("lookup failed", { reason: found.reason });
    return ok();
  }

  for (const purchase of found.data) {
    const slug = purchase.price_id ? playbookSlugForPriceId(purchase.price_id) : null;
    if (!slug) {
      log("purchase price does not match a playbook", { purchaseId: purchase.id });
      continue;
    }

    const existing = await countAccessTokens(purchase.id);
    if (!existing.ok) {
      log("could not count recovery links", { purchaseId: purchase.id, reason: existing.reason });
      continue;
    }
    if (existing.data >= MAX_RECOVERY_LINKS) {
      log("recovery link cap reached", { purchaseId: purchase.id });
      continue;
    }

    const { token, tokenHash } = createEntitlementToken();
    const stored = await insertAccessToken(purchase.id, tokenHash);
    if (!stored.ok) {
      log("could not store recovery link", { purchaseId: purchase.id, reason: stored.reason });
      continue;
    }

    const sent = await sendPurchaseEmail({
      to: email,
      token,
      transactionId: purchase.paddle_transaction_id,
      slug,
      again: true,
    });
    if (!sent.ok) {
      // Roll the row back. It would otherwise count against
      // MAX_RECOVERY_LINKS for a link the buyer never received, so a mail
      // outage or a bouncing address could exhaust the cap and leave
      // recovery permanently unavailable for a purchase they paid for.
      const rolledBack = await deleteAccessToken(tokenHash);
      log("recovery email failed", {
        purchaseId: purchase.id,
        slug,
        tokenRolledBack: rolledBack.ok,
      });
    } else {
      log("recovery email sent", { purchaseId: purchase.id, slug });
    }
  }

  return ok();
}
