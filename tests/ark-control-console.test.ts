import fs from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { consoleShowcase } from "@/lib/arc/control";

/**
 * The ARC Control console showcase is a folder of static HTML captured from
 * the real console in aking-beep/arc-control (`npm run showcase` there). These
 * assert the things that would silently break the link or quietly publish
 * something they should not.
 *
 * The Magic Patterns redesign moved the product page from /ark-control to
 * /control and made the old path a permanent redirect, so the page asserted
 * on below moved with it. Every other assertion is unchanged: the capture
 * itself was not touched, and must not be — editing a captured page would
 * falsify what it is evidence of.
 */

const consoleDir = path.join(process.cwd(), "public", "ark-control", "console");
const productPage = path.join(process.cwd(), "app", "control", "page.tsx");
const showcase = path.join(
  process.cwd(),
  "components",
  "arc",
  "control",
  "console-showcase.tsx",
);
const showcaseData = path.join(process.cwd(), "lib", "arc", "control.ts");

async function page(name: string) {
  return fs.readFile(path.join(consoleDir, name), "utf8");
}

describe("the ARC Control console showcase", () => {
  /**
   * This has to stay a redirect to the explicit file, and the reason is not
   * obvious enough to survive a tidy-up without being written down.
   *
   * Every link inside the capture is relative, which is what lets the folder
   * work at any mount point. A browser resolves a relative link against the
   * *directory* of the current URL. Served by rewrite at the extensionless
   * `/ark-control/console`, that directory is `/ark-control/`, so the page
   * asks for `/ark-control/console.css` and `/ark-control/approvals.html` —
   * the stylesheet and every link, one level too high, all 404. The HTML comes
   * back 200 the whole time, so fetching the URL looks healthy while the page
   * renders unstyled with every link dead.
   *
   * Redirecting puts the browser inside `/ark-control/console/`, where the
   * relative links resolve.
   */
  it("redirects the clean URL to the file, rather than rewriting to it", async () => {
    const config = await fs.readFile(path.join(process.cwd(), "next.config.mjs"), "utf8");
    const { default: nextConfig } = await import(
      /* @vite-ignore */ path.join(process.cwd(), "next.config.mjs")
    );

    const redirects = await nextConfig.redirects();
    const entry = redirects.find((r: { source: string }) => r.source === "/ark-control/console");
    expect(entry, "a redirect for the clean URL must exist").toBeDefined();
    expect(entry.destination).toBe("/ark-control/console/index.html");

    expect(
      typeof nextConfig.rewrites === "function" ? await nextConfig.rewrites() : [],
      "a rewrite would serve the page one directory too high",
    ).not.toContainEqual(expect.objectContaining({ source: "/ark-control/console" }));

    expect(config).toContain("relative");
  });

  /**
   * Regression, and the second time this exact thing has broken.
   *
   * The console entry is a file in `public/`, not a route. `next/link` cannot
   * client-side navigate to one — it fetches the target as an RSC payload,
   * that fetch fails, and Next falls back to a full navigation. The link still
   * works, which is why this went unnoticed: it just fires a failed `?_rsc=`
   * request at a static file on every render of the product page, and makes
   * the most important link on that page depend on a fallback.
   *
   * ArcButton therefore renders a plain anchor for any href ending in a file
   * extension. That was fixed once and lost in a later refactor, so it is
   * pinned here rather than left to be rediscovered by a browser test.
   */
  it("renders a plain anchor for a static file, not a next/link", async () => {
    const button = await fs.readFile(
      path.join(process.cwd(), "components", "arc", "ui", "button.tsx"),
      "utf8",
    );

    expect(button, "the static-file guard must exist").toMatch(/staticFile/);
    expect(button, "and the Link branch must exclude it").toMatch(/!external && !staticFile/);

    // The predicate itself, against the href this page actually uses.
    const isStaticFile = (href: string) => /\.[a-z0-9]{2,5}$/i.test(href.split(/[?#]/)[0] ?? "");
    expect(isStaticFile(consoleShowcase.entry)).toBe(true);
    expect(isStaticFile("/control")).toBe(false);
    expect(isStaticFile("/")).toBe(false);
  });

  /**
   * The section states a revision and a page count read from the capture's own
   * build.json, so they cannot be left behind when it is recaptured.
   *
   * `-dirty` in the revision means the capture was built from a modified
   * working tree and cannot be traced to the code that produced it. That must
   * never reach the site.
   */
  it("states a traceable revision, built from a clean tree", async () => {
    const build = JSON.parse(await fs.readFile(path.join(consoleDir, "build.json"), "utf8"));

    expect(build.revision).toMatch(/^[0-9a-f]{7,40}$/);
    expect(build.revision, "a capture from a dirty tree is not traceable").not.toMatch(/-dirty$/);
    expect(consoleShowcase.revision).toBe(build.revision);
    expect(consoleShowcase.pageCount).toBe(build.pages.length);
  });

  it("ships the entry page the product page links to", async () => {
    const entry = await page("index.html");
    expect(entry).toContain("<!doctype html>");
    expect(entry).toContain("Overview — ARC Control");

    // /control renders the showcase section, which carries the link.
    const product = await fs.readFile(productPage, "utf8");
    expect(product).toContain("ConsoleShowcase");
    const section = await fs.readFile(showcase, "utf8");
    expect(section).toContain("consoleShowcase.entry");
    const data = await fs.readFile(showcaseData, "utf8");
    expect(data).toContain("/ark-control/console/index.html");
  });

  /**
   * The section states a revision and a page count. Both come from the
   * capture's own build.json, so they cannot be left behind when it is
   * recaptured without this failing.
   */
  it("states the revision and page count the capture actually has", async () => {
    const build = JSON.parse(await fs.readFile(path.join(consoleDir, "build.json"), "utf8"));
    const data = await fs.readFile(showcaseData, "utf8");
    expect(data).toContain(`revision: "${build.revision}"`);
    expect(data).toContain(`pageCount: ${build.pages.length}`);
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
