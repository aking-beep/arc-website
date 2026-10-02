import { NextResponse } from "next/server";

import { clientIp, rateLimit } from "@/lib/commerce/rate-limit";
import {
  findPurchaseByTokenHash,
  recordDownload,
  signBundleUrl,
  toEntitlement,
  type BundleFile,
} from "@/lib/commerce/store";
import {
  checkEntitlement,
  hashToken,
  looksLikeToken,
  rejectionMessage,
} from "@/lib/commerce/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILES: BundleFile[] = ["pdf", "zip"];

/**
 * Two windows, because they stop different things.
 *
 * Per token: a buyer legitimately downloads twice (PDF and ZIP), on a couple
 * of devices. Twelve a minute is far more than that and far less than a
 * scraper.
 *
 * Per IP: catches someone walking a list of guessed tokens from one machine.
 * Guessing a 256-bit token is not realistic, but the attempt should not be
 * free either.
 */
const PER_TOKEN = { limit: 12, windowSeconds: 60 };
const PER_IP = { limit: 30, windowSeconds: 60 };

function log(
  level: "info" | "warn" | "error",
  message: string,
  fields: Record<string, unknown> = {},
) {
  const line = { scope: "playbook.download", message, ...fields };
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

/**
 * Only ever the first 8 characters of the hash. Enough to correlate a support
 * email with a log line; useless for downloading anything.
 */
function ref(tokenHash: string) {
  return tokenHash.slice(0, 8);
}

export async function POST(request: Request) {
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  const ip = clientIp(request);
  const ipLimit = rateLimit(`download-ip:${ip}`, PER_IP);
  if (!ipLimit.allowed) {
    log("warn", "ip rate limited");
    return tooMany(ipLimit.retryAfter);
  }

  let body: { token?: unknown; file?: unknown };
  try {
    body = (await request.json()) as { token?: unknown; file?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const file = FILES.includes(body.file as BundleFile)
    ? (body.file as BundleFile)
    : "pdf";

  if (!looksLikeToken(body.token)) {
    return NextResponse.json(
      { error: rejectionMessage.malformed, reason: "malformed" },
      { status: 404 },
    );
  }

  const tokenHash = hashToken(body.token);

  const tokenLimit = rateLimit(`download-token:${tokenHash}`, PER_TOKEN);
  if (!tokenLimit.allowed) {
    log("warn", "token rate limited", { ref: ref(tokenHash) });
    return tooMany(tokenLimit.retryAfter);
  }

  const found = await findPurchaseByTokenHash(tokenHash);
  if (!found.ok) {
    log("error", "lookup failed", { ref: ref(tokenHash), detail: found.detail });
    return NextResponse.json(
      { error: "Downloads are temporarily unavailable. Try again shortly." },
      { status: 503 },
    );
  }

  const verdict = checkEntitlement(found.data ? toEntitlement(found.data) : null);
  if (!verdict.ok) {
    log("info", "entitlement rejected", {
      ref: ref(tokenHash),
      reason: verdict.reason,
    });
    return NextResponse.json(
      { error: rejectionMessage[verdict.reason], reason: verdict.reason },
      { status: verdict.reason === "not_found" ? 404 : 403 },
    );
  }

  const signed = await signBundleUrl(file);
  if (!signed.ok) {
    log("error", "could not sign bundle url", {
      ref: ref(tokenHash),
      file,
      reason: signed.reason,
      detail: signed.detail,
    });
    return NextResponse.json(
      { error: "Downloads are temporarily unavailable. Try again shortly." },
      { status: 503 },
    );
  }

  // Count after signing succeeds. Counting first would spend a buyer's budget
  // on our own outage.
  const counted = await recordDownload(tokenHash);
  if (!counted.ok) {
    log("warn", "download not counted", { ref: ref(tokenHash), detail: counted.detail });
  }

  log("info", "download issued", {
    ref: ref(tokenHash),
    file,
    count: counted.ok ? counted.data : null,
  });

  return NextResponse.json(
    {
      url: signed.data.url,
      filename: signed.data.filename,
      expiresIn: signed.data.expiresInSeconds,
    },
    // Belt and braces: a signed URL must never land in a shared cache.
    { headers: { "cache-control": "no-store, private" } },
  );
}

function tooMany(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many download requests. Wait a minute and try again.", reason: "rate_limited" },
    { status: 429, headers: { "retry-after": String(retryAfter) } },
  );
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
