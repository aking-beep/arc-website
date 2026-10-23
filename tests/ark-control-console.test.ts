import fs from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

/**
 * The Agent Control console showcase is a folder of static HTML captured from
 * the real console in aking-beep/arc-control (`npm run showcase` there). It is
 * linked from /ark-control, so these assert the things that would silently
 * break the link or quietly publish something it should not.
 */

const consoleDir = path.join(process.cwd(), "public", "ark-control", "console");
const productPage = path.join(process.cwd(), "app", "ark-control", "page.tsx");

async function page(name: string) {
  return fs.readFile(path.join(consoleDir, name), "utf8");
}

describe("the Agent Control console showcase", () => {
  it("ships the entry page the product page links to", async () => {
    const entry = await page("index.html");
    expect(entry).toContain("<!doctype html>");
    expect(entry).toContain("Overview — ARC Control");

    const product = await fs.readFile(productPage, "utf8");
    expect(product).toContain("/ark-control/console/index.html");
  });

  it("ships all ten sections", async () => {
    const files = await fs.readdir(consoleDir);
    for (const name of [
      "index.html",
      "approvals.html",
      "agents.html",
      "tools.html",
      "policies.html",
      "access.html",
      "evidence.html",
      "audit.html",
      "security.html",
      "reports.html",
    ]) {
      expect(files).toContain(name);
    }
  });

  /**
   * The capture is relative on purpose, so the folder works at the site root,
   * in a subdirectory and opened from disk. One absolute link would tie it to
   * a single mount point and break the others.
   */
  it("links only relatively, apart from the deliberate way back to the site", async () => {
    const files = (await fs.readdir(consoleDir)).filter((f) => f.endsWith(".html"));
    expect(files.length).toBeGreaterThan(50);

    for (const name of files) {
      const html = await page(name);
      const absolute = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
      expect(absolute, `${name} should only link out to /ark-control`).toEqual(
        absolute.filter((href) => href === "/ark-control"),
      );
    }
  });

  it("resolves every internal link to a file that exists", async () => {
    const files = new Set(await fs.readdir(consoleDir));
    const broken: string[] = [];

    for (const name of [...files].filter((f) => f.endsWith(".html"))) {
      const html = await page(name);
      for (const match of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
        const target = match[1].replace(/&amp;/g, "&");
        if (/^(https?:|mailto:|data:|\/)/.test(target)) continue;
        const file = target.split(/[?#]/)[0];
        if (file && !files.has(file)) broken.push(`${name} → ${target}`);
      }
    }

    expect(broken).toEqual([]);
  });

  /**
   * A capture cannot write anything, and a form that looked live would be a
   * dead button on a public page. The builder turns each one into a disabled
   * control with a note.
   */
  it("carries no live form and no script", async () => {
    for (const name of (await fs.readdir(consoleDir)).filter((f) => f.endsWith(".html"))) {
      const html = await page(name);
      expect(html, `${name} should post nothing`).not.toContain('method="post"');
      expect(html, `${name} should run nothing`).not.toMatch(/<script\b/);
    }
  });

  it("says on every page that it is a capture rather than a live console", async () => {
    for (const name of (await fs.readdir(consoleDir)).filter((f) => f.endsWith(".html"))) {
      const html = await page(name);
      expect(html, `${name} should carry the notice`).toContain("Live design showcase");
    }
  });

  it("records the commit it was built from, so a page can be traced to its code", async () => {
    const build = JSON.parse(await fs.readFile(path.join(consoleDir, "build.json"), "utf8"));
    expect(build.revision).toMatch(/^[0-9a-f]{7,40}$/);
    expect(Date.parse(build.builtAt)).not.toBeNaN();
    expect(build.pages.length).toBeGreaterThan(50);
  });

  /**
   * The capture runs against the demo seed, whose agent keys are printed at
   * startup. None of that should reach a published page.
   */
  it("publishes no credential", async () => {
    for (const name of (await fs.readdir(consoleDir)).filter((f) => f.endsWith(".html"))) {
      const html = await page(name);
      expect(html, `${name} should carry no agent key`).not.toMatch(/arck_[0-9a-f]{16}_[0-9a-f]{64}/);
      expect(html, `${name} should carry no operator token`).not.toContain("showcase-operator-token");
    }
  });
});
