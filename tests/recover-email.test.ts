import { describe, expect, it } from "vitest";

import { normalizeBuyerEmail, recoveryAcknowledgement } from "@/lib/commerce/recover";

describe("normalizeBuyerEmail", () => {
  it("lowercases a normal address", () => {
    expect(normalizeBuyerEmail("  Buyer@Example.com ")).toBe("buyer@example.com");
  });

  it("rejects wildcard characters that would widen the lookup", () => {
    expect(normalizeBuyerEmail("a%@example.com")).toBeNull();
    expect(normalizeBuyerEmail("a_@example.com")).toBeNull();
    expect(normalizeBuyerEmail("a*@example.com")).toBeNull();
  });

  it("rejects addresses that are not an email", () => {
    expect(normalizeBuyerEmail("not an email")).toBeNull();
    expect(normalizeBuyerEmail("")).toBeNull();
  });
});

describe("recovery acknowledgement", () => {
  it("does not say whether a purchase was found", () => {
    expect(recoveryAcknowledgement.toLowerCase()).toContain("if that address");
    expect(recoveryAcknowledgement.toLowerCase()).not.toContain("not found");
  });
});
