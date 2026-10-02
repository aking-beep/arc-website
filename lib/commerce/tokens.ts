// ============================================================================
// Entitlement tokens.
//
// A purchase produces one random token. The buyer gets the token in an email;
// the database only ever sees its SHA-256 hash. If the purchases table leaks,
// nobody gains the ability to download anything, which is the whole point of
// storing a hash rather than the value.
//
// This is deliberately not a JWT. There is no claim to carry and nothing to
// verify offline — the server has to hit the database anyway to count
// downloads and check revocation, so a signed token would add a key to
// manage and buy nothing.
// ============================================================================

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * 32 bytes of CSPRNG output, base64url. 256 bits is far past brute force, and
 * base64url survives being pasted into a URL, an email client and a terminal
 * without being mangled or line-wrapped into something that no longer works.
 */
const TOKEN_BYTES = 32;
export const TOKEN_LENGTH = 43; // 32 bytes in base64url, unpadded

export function createEntitlementToken(): { token: string; tokenHash: string } {
  const token = randomBytes(TOKEN_BYTES).toString("base64url");
  return { token, tokenHash: hashToken(token) };
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

/**
 * Cheap structural check before touching the database, so a crawler hitting
 * /playbook/download/favicon.ico does not cost a query.
 *
 * Shape only. Passing this means the string could be a token, never that it
 * is one.
 */
export function looksLikeToken(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length === TOKEN_LENGTH &&
    /^[A-Za-z0-9_-]+$/.test(value)
  );
}

/**
 * Constant-time comparison for hex digests.
 *
 * The lookup is by hash so an attacker cannot usefully time the database, but
 * anywhere two hashes are compared in process this is what does it.
 */
export function hashesMatch(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) {
    return false;
  }
  try {
    return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

export type TokenRejection =
  | "malformed"
  | "not_found"
  | "revoked"
  | "expired"
  | "download_limit";

export type TokenCheck =
  | { ok: true }
  | { ok: false; reason: TokenRejection };

export type EntitlementRecord = {
  tokenHash: string;
  revokedAt: string | null;
  expiresAt: string | null;
  downloadCount: number;
  downloadLimit: number | null;
};

/**
 * The rules an entitlement has to satisfy, separated from how it was loaded so
 * they can be tested without a database.
 *
 * The download limit is generous rather than tight: V1 has no accounts, so a
 * buyer legitimately opens the link on a laptop, a phone, and again in six
 * months. The limit exists to stop a link being posted publicly, not to ration
 * access.
 */
export function checkEntitlement(
  record: EntitlementRecord | null,
  now: Date = new Date(),
): TokenCheck {
  if (!record) return { ok: false, reason: "not_found" };
  if (record.revokedAt) return { ok: false, reason: "revoked" };

  if (record.expiresAt) {
    const expiresAt = new Date(record.expiresAt);
    if (!Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() <= now.getTime()) {
      return { ok: false, reason: "expired" };
    }
  }

  if (
    record.downloadLimit !== null &&
    record.downloadCount >= record.downloadLimit
  ) {
    return { ok: false, reason: "download_limit" };
  }

  return { ok: true };
}

/** What the buyer is told. Never why, beyond what helps them act. */
export const rejectionMessage: Record<TokenRejection, string> = {
  malformed: "That download link is not valid. Check it was copied in full.",
  not_found: "That download link is not valid. Check it was copied in full.",
  revoked: "This download link has been deactivated. Email us and we will sort it out.",
  expired: "This download link has expired. Email us and we will send a new one.",
  download_limit:
    "This link has reached its download limit. Email us and we will reset it.",
};
