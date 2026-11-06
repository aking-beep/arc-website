import { afterEach, describe, expect, it } from "vitest";

import { gumroadProductUrl, publicCheckoutConfig } from "@/lib/commerce/checkout";

describe("gumroadProductUrl", () => {
  it("accepts a Gumroad product link and opens the payment step", () => {
    expect(gumroadProductUrl("https://arc.gumroad.com/l/define")).toBe(
      "https://arc.gumroad.com/l/define?wanted=true",
    );
    expect(gumroadProductUrl(" https://gumroad.com/l/build ")).toBe(
      "https://gumroad.com/l/build?wanted=true",
    );
  });

  it("rejects anything that is not https on a Gumroad host", () => {
    expect(gumroadProductUrl(undefined)).toBeNull();
    expect(gumroadProductUrl("")).toBeNull();
    expect(gumroadProductUrl("not a url")).toBeNull();
    expect(gumroadProductUrl("http://arc.gumroad.com/l/define")).toBeNull();
    expect(gumroadProductUrl("https://gumroad.com.evil.example/l/define")).toBeNull();
    expect(gumroadProductUrl("https://evilgumroad.com/l/define")).toBeNull();
  });
});

describe("publicCheckoutConfig with Gumroad", () => {
  const saved = { ...process.env };
  afterEach(() => {
    process.env = { ...saved };
  });

  it("uses the Gumroad link for that playbook only", () => {
    process.env.PLAYBOOK_DEFINE_GUMROAD_URL = "https://arc.gumroad.com/l/define";
    delete process.env.PLAYBOOK_BUILD_GUMROAD_URL;
    delete process.env.PADDLE_API_KEY;

    const define = publicCheckoutConfig("define");
    expect(define.configured).toBe(true);
    expect(define.gumroadUrl).toBe("https://arc.gumroad.com/l/define?wanted=true");

    const build = publicCheckoutConfig("build");
    expect(build.configured).toBe(false);
    expect(build.gumroadUrl).toBeNull();
  });
});
