import { afterEach, describe, expect, it } from "vitest";

import { playbookBuyUrlEnv, playbookSlugs } from "@/lib/playbook";

/**
 * The hosted-storefront fallback: one URL per playbook, so a playbook can be
 * sold before the self-hosted Paddle/Supabase/Resend path is configured.
 *
 * lib/commerce/config.ts is `server-only`, so it is imported dynamically
 * inside each test after the environment is set.
 */

const ORIGINAL = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL };
  // The module caches nothing, but the registry does.
  return import("node:module").then(() => undefined);
});

async function freshConfig() {
  // Reset the module registry so `read()` sees the current env.
  const vitest = await import("vitest");
  vitest.vi.resetModules();
  return import("@/lib/commerce/config");
}

describe("playbookBuyUrlEnv", () => {
  it("names one variable per playbook", () => {
    expect(Object.keys(playbookBuyUrlEnv).sort()).toEqual([...playbookSlugs].sort());
  });

  it("uses distinct names that say what they are", () => {
    const names = Object.values(playbookBuyUrlEnv);
    expect(new Set(names).size).toBe(names.length);
    for (const n of names) expect(n).toMatch(/^PLAYBOOK_[A-Z]+_BUY_URL$/);
  });
});

describe("readPlaybookBuyUrl", () => {
  it("is undefined when nothing is set", async () => {
    delete process.env.PLAYBOOK_DEFINE_BUY_URL;
    const { readPlaybookBuyUrl } = await freshConfig();
    expect(readPlaybookBuyUrl("define")).toBeUndefined();
  });

  it("returns a valid https URL", async () => {
    process.env.PLAYBOOK_DEFINE_BUY_URL = "https://arc.gumroad.com/l/define";
    const { readPlaybookBuyUrl } = await freshConfig();
    expect(readPlaybookBuyUrl("define")).toBe("https://arc.gumroad.com/l/define");
  });

  it("refuses http, rather than sending a buyer somewhere insecure", async () => {
    process.env.PLAYBOOK_DEFINE_BUY_URL = "http://arc.gumroad.com/l/define";
    const { readPlaybookBuyUrl } = await freshConfig();
    expect(readPlaybookBuyUrl("define")).toBeUndefined();
  });

  it("refuses a typo, rather than rendering a button that goes nowhere", async () => {
    process.env.PLAYBOOK_DEFINE_BUY_URL = "gumroad.com/l/define";
    const { readPlaybookBuyUrl } = await freshConfig();
    expect(readPlaybookBuyUrl("define")).toBeUndefined();
  });

  it("treats whitespace as unset", async () => {
    process.env.PLAYBOOK_DEFINE_BUY_URL = "   ";
    const { readPlaybookBuyUrl } = await freshConfig();
    expect(readPlaybookBuyUrl("define")).toBeUndefined();
  });

  it("keeps the playbooks independent", async () => {
    process.env.PLAYBOOK_DEFINE_BUY_URL = "https://arc.gumroad.com/l/define";
    delete process.env.PLAYBOOK_SHIP_BUY_URL;
    const { readPlaybookBuyUrl } = await freshConfig();
    expect(readPlaybookBuyUrl("define")).toBeTruthy();
    expect(readPlaybookBuyUrl("ship")).toBeUndefined();
  });
});

describe("commerceReadiness", () => {
  it("reports it cannot sell when neither route is configured", async () => {
    for (const n of Object.values(playbookBuyUrlEnv)) delete process.env[n];
    delete process.env.PADDLE_API_KEY;
    delete process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const { commerceReadiness } = await freshConfig();
    const r = commerceReadiness();
    expect(r.checkout).toBe(false);
    expect(r.checkoutVia).toBe("none");
    expect(r.missing.length).toBeGreaterThan(0);
  });

  it("reports it CAN sell on a storefront alone", async () => {
    delete process.env.PADDLE_API_KEY;
    delete process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    process.env.PLAYBOOK_DEFINE_BUY_URL = "https://arc.gumroad.com/l/define";
    const { commerceReadiness } = await freshConfig();
    const r = commerceReadiness();
    expect(r.checkout).toBe(true);
    expect(r.checkoutVia).toBe("storefront");
    // The self-hosted values are an unused alternative, not missing
    // requirements: reporting them would say "cannot sell" while selling.
    expect(r.missing).toEqual([]);
  });

  it("prefers Paddle when both are configured", async () => {
    process.env.PADDLE_API_KEY = "test-key";
    process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN = "test-token";
    process.env.PLAYBOOK_DEFINE_PADDLE_PRICE_ID = "pri_test";
    process.env.PLAYBOOK_DEFINE_BUY_URL = "https://arc.gumroad.com/l/define";
    const { commerceReadiness } = await freshConfig();
    expect(commerceReadiness().checkoutVia).toBe("paddle");
  });
});
