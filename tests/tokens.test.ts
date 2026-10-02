import { describe, expect, it } from "vitest";

import {
  TOKEN_LENGTH,
  checkEntitlement,
  createEntitlementToken,
  hashToken,
  hashesMatch,
  looksLikeToken,
  type EntitlementRecord,
} from "@/lib/commerce/tokens";

function entitlement(overrides: Partial<EntitlementRecord> = {}): EntitlementRecord {
  return {
    tokenHash: "a".repeat(64),
    revokedAt: null,
    expiresAt: null,
    downloadCount: 0,
    downloadLimit: 25,
    ...overrides,
  };
}

describe("token generation", () => {
  it("produces a URL-safe token of the documented length", () => {
    const { token } = createEntitlementToken();
    expect(token).toHaveLength(TOKEN_LENGTH);
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it("never returns the same token twice", () => {
    const tokens = new Set(
      Array.from({ length: 500 }, () => createEntitlementToken().token),
    );
    expect(tokens.size).toBe(500);
  });

  it("returns a hash that matches the token, and is not the token", () => {
    const { token, tokenHash } = createEntitlementToken();
    expect(tokenHash).toBe(hashToken(token));
    expect(tokenHash).not.toContain(token);
    expect(tokenHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("hashes deterministically so a lookup by hash works", () => {
    expect(hashToken("abc")).toBe(hashToken("abc"));
    expect(hashToken("abc")).not.toBe(hashToken("abd"));
  });
});

describe("looksLikeToken", () => {
  it("accepts a real token", () => {
    expect(looksLikeToken(createEntitlementToken().token)).toBe(true);
  });

  it.each([
    ["empty", ""],
    ["too short", "abc"],
    ["too long", "a".repeat(TOKEN_LENGTH + 1)],
    ["path traversal", `..${"/".repeat(TOKEN_LENGTH - 2)}`],
    ["base64 padding", `${"a".repeat(TOKEN_LENGTH - 1)}=`],
    ["sql-ish", `${"a".repeat(TOKEN_LENGTH - 2)}';`],
  ])("rejects %s", (_label, value) => {
    expect(looksLikeToken(value)).toBe(false);
  });

  it.each([null, undefined, 42, {}, []])("rejects non-strings: %s", (value) => {
    expect(looksLikeToken(value)).toBe(false);
  });
});

describe("hashesMatch", () => {
  it("matches identical hashes", () => {
    const hash = hashToken("x");
    expect(hashesMatch(hash, hash)).toBe(true);
  });

  it("rejects different hashes and different lengths", () => {
    expect(hashesMatch(hashToken("x"), hashToken("y"))).toBe(false);
    expect(hashesMatch(hashToken("x"), "abcd")).toBe(false);
  });

  it("rejects non-hex input instead of decoding it to an empty buffer", () => {
    // Buffer.from(_, "hex") truncates at the first bad character, so without
    // an explicit format check two different malformed strings would both
    // decode to nothing and compare equal.
    expect(hashesMatch("zz".repeat(32), "zz".repeat(32))).toBe(false);
    expect(hashesMatch("zz".repeat(32), "yy".repeat(32))).toBe(false);
    expect(hashesMatch(`${"a".repeat(63)}z`, `${"a".repeat(63)}y`)).toBe(false);
  });
});

describe("checkEntitlement", () => {
  const now = new Date("2026-06-01T12:00:00Z");

  it("allows a normal entitlement", () => {
    expect(checkEntitlement(entitlement(), now)).toEqual({ ok: true });
  });

  it("rejects a token that is not in the database", () => {
    expect(checkEntitlement(null, now)).toEqual({ ok: false, reason: "not_found" });
  });

  it("rejects a revoked entitlement", () => {
    const result = checkEntitlement(
      entitlement({ revokedAt: "2026-05-01T00:00:00Z" }),
      now,
    );
    expect(result).toEqual({ ok: false, reason: "revoked" });
  });

  it("rejects an expired entitlement", () => {
    const result = checkEntitlement(
      entitlement({ expiresAt: "2026-05-31T23:59:59Z" }),
      now,
    );
    expect(result).toEqual({ ok: false, reason: "expired" });
  });

  it("allows an entitlement that has not expired yet", () => {
    const result = checkEntitlement(
      entitlement({ expiresAt: "2026-06-02T00:00:00Z" }),
      now,
    );
    expect(result).toEqual({ ok: true });
  });

  it("treats an unparseable expiry as no expiry rather than locking a buyer out", () => {
    expect(checkEntitlement(entitlement({ expiresAt: "soon" }), now)).toEqual({
      ok: true,
    });
  });

  it("rejects once the download limit is reached", () => {
    const result = checkEntitlement(
      entitlement({ downloadCount: 25, downloadLimit: 25 }),
      now,
    );
    expect(result).toEqual({ ok: false, reason: "download_limit" });
  });

  it("allows the last download before the limit", () => {
    expect(
      checkEntitlement(entitlement({ downloadCount: 24, downloadLimit: 25 }), now),
    ).toEqual({ ok: true });
  });

  it("treats a null limit as unlimited", () => {
    expect(
      checkEntitlement(entitlement({ downloadCount: 9999, downloadLimit: null }), now),
    ).toEqual({ ok: true });
  });

  it("reports revocation ahead of the download limit", () => {
    const result = checkEntitlement(
      entitlement({
        revokedAt: "2026-05-01T00:00:00Z",
        downloadCount: 99,
        downloadLimit: 25,
      }),
      now,
    );
    expect(result).toEqual({ ok: false, reason: "revoked" });
  });
});
