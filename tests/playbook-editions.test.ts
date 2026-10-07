import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { playbookTiers } from "@/lib/playbook";
import {
  editions,
  priceMatchesEdition,
  selectWorksheets,
  worksheetFilename,
} from "../scripts/playbook/editions.mjs";
import { parseEnv, upsertEnv } from "../scripts/playbook/env-file.mjs";

const worksheetPath = path.join(process.cwd(), "playbook", "manuscript", "20-worksheets.md");

describe("playbook editions", () => {
  it("covers every worksheet once", async () => {
    const raw = await fs.readFile(worksheetPath, "utf8");
    const numbers = editions.flatMap((edition) => selectWorksheets(raw, edition).map((w) => w.number));
    expect(numbers).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "10", "9", "11"]);
    expect(new Set(numbers).size).toBe(11);
  });

  it("names worksheet files from their headings", async () => {
    const raw = await fs.readFile(worksheetPath, "utf8");
    const define = editions.find((edition) => edition.slug === "define");
    const [first] = selectWorksheets(raw, define!);
    expect(worksheetFilename(first)).toBe("01-product-hypothesis.md");
  });

  it("keeps the sales page on the same cut and the same prices", () => {
    expect(playbookTiers.map((tier) => tier.slug)).toEqual(editions.map((edition) => edition.slug));

    for (const edition of editions) {
      const tier = playbookTiers.find((item) => item.slug === edition.slug);
      expect(tier).toBeDefined();
      expect(String(tier!.priceAmount * 100)).toBe(edition.amountCents);
      expect(tier!.productName).toBe(edition.productName);
    }

    const copy = JSON.stringify(playbookTiers);
    expect(copy).not.toMatch(/30-day/);
    expect(copy).not.toMatch(/chapters 0/);
    expect(copy).not.toMatch(/\bactually\b/i);
    expect(copy).toMatch(/Worksheets 1–6/);
    expect(copy).toMatch(/Worksheets 7, 8, and 10/);
    expect(copy).toMatch(/Worksheets 9 and 11/);
    expect(copy).toMatch(/20 ARC Skills/);
  });

  it("accepts only a one-time price at the edition amount", () => {
    const define = editions[0];
    expect(
      priceMatchesEdition(
        { unit_price: { amount: "500", currency_code: "USD" }, billing_cycle: null },
        define,
      ),
    ).toBe(true);
    expect(
      priceMatchesEdition(
        { unit_price: { amount: "500", currency_code: "USD" }, billing_cycle: { interval: "month" } },
        define,
      ),
    ).toBe(false);
    expect(
      priceMatchesEdition(
        { unit_price: { amount: "3900", currency_code: "USD" }, billing_cycle: null },
        define,
      ),
    ).toBe(false);
  });
});

describe("env file updates", () => {
  it("replaces one key and leaves the others", async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "playbook-env-"));
    const file = path.join(dir, ".env.local");
    await fs.writeFile(file, "PADDLE_API_KEY=secret\nPLAYBOOK_DEFINE_PADDLE_PRICE_ID=\n");

    const changed = await upsertEnv(file, {
      PLAYBOOK_DEFINE_PADDLE_PRICE_ID: "pri_define",
    });

    expect(changed).toEqual(["PLAYBOOK_DEFINE_PADDLE_PRICE_ID"]);
    const text = await fs.readFile(file, "utf8");
    expect(text).toContain("PADDLE_API_KEY=secret");
    expect(parseEnv(text).PLAYBOOK_DEFINE_PADDLE_PRICE_ID).toBe("pri_define");
  });
});
