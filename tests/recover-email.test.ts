import { describe, expect, it } from "vitest";

import { normalizeBuyerEmail, recoveryAcknowledgement } from "@/lib/commerce/recover";
import { escapeLikePattern } from "@/lib/commerce/store";

describe("normalizeBuyerEmail", () => {
  it("lowercases and trims a normal address", () => {
    expect(normalizeBuyerEmail("  Buyer@Example.com ")).toBe("buyer@example.com");
  });

  it("accepts the wildcard characters that are legal in an address", () => {
    // An earlier version rejected these outright to keep them out of the
    // `ilike` lookup. Underscore in particular is common, and rejecting it
    // locked a paying buyer out of their own download. They are escaped at
    // the query instead.
    expect(normalizeBuyerEmail("first_last@company.com")).toBe("first_last@company.com");
    expect(normalizeBuyerEmail("a%b@example.com")).toBe("a%b@example.com");
    expect(normalizeBuyerEmail("a*b@example.com")).toBe("a*b@example.com");
  });

  it("rejects addresses that are not an email", () => {
    expect(normalizeBuyerEmail("not an email")).toBeNull();
    expect(normalizeBuyerEmail("")).toBeNull();
    expect(normalizeBuyerEmail("no-at-sign.com")).toBeNull();
    expect(normalizeBuyerEmail("a@b")).toBeNull();
  });

  it("rejects an address longer than the column allows", () => {
    expect(normalizeBuyerEmail(`${"a".repeat(250)}@example.com`)).toBeNull();
  });
});

describe("escapeLikePattern", () => {
  it("leaves an ordinary address alone", () => {
    expect(escapeLikePattern("buyer@example.com")).toBe("buyer@example.com");
  });

  it("escapes every character ilike would read as a wildcard", () => {
    expect(escapeLikePattern("first_last@company.com")).toBe(
      "first\\_last@company.com",
    );
    expect(escapeLikePattern("a%b@example.com")).toBe("a\\%b@example.com");
    expect(escapeLikePattern("a*b@example.com")).toBe("a\\*b@example.com");
  });

  it("escapes the backslash first, so later escapes are not themselves escaped", () => {
    // Wrong order would turn `\_` into `\\_`, where the backslash is a
    // literal and the underscore is a live wildcard again.
    expect(escapeLikePattern("a\\_b@example.com")).toBe("a\\\\\\_b@example.com");
    expect(escapeLikePattern("a\\b@example.com")).toBe("a\\\\b@example.com");
  });

  it("an escaped underscore can no longer match another character", () => {
    // What the bug was: `a_b` as a pattern matches `axb`. Escaped, it does not.
    const pattern = escapeLikePattern("a_b@example.com");
    expect(pattern).not.toBe("a_b@example.com");
    expect(pattern).toContain("\\_");
  });
});

describe("recovery acknowledgement", () => {
  it("does not say whether a purchase was found", () => {
    expect(recoveryAcknowledgement.toLowerCase()).toContain("if that address");
    expect(recoveryAcknowledgement.toLowerCase()).not.toContain("not found");
  });
});
