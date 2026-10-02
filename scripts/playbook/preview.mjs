/**
 * Screenshot the Playbook HTML with print media emulated, for eyeballing
 * layout without opening a PDF viewer.
 *
 *   node scripts/playbook/preview.mjs [outDir]
 *
 * Writes one PNG per US Letter page-height slice. Approximate by design: it
 * is a proof check for type, tables and worksheet rules, not for pagination.
 */

import fs from "node:fs/promises";
import path from "node:path";

import puppeteer from "puppeteer-core";

import { findChrome, paths } from "./util.mjs";

const DPI = 96;
const PAGE_WIDTH = Math.round(8.5 * DPI);
const PAGE_HEIGHT = Math.round(11 * DPI);

async function main() {
  const outDir = process.argv[2] ?? path.join(paths.build, "preview");
  const htmlFile = path.join(paths.build, "playbook.html");
  await fs.access(htmlFile).catch(() => {
    throw new Error("playbook.html not found — run build-pdf.mjs first");
  });
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: await findChrome(),
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: PAGE_WIDTH, height: PAGE_HEIGHT, deviceScaleFactor: 2 });
    await page.emulateMediaType("print");
    await page.goto(`file://${htmlFile}`, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    // @page margins do not apply in screen layout, so add them here.
    await page.addStyleTag({
      content: `body { padding: 0.75in 0.85in 0.9in; width: ${PAGE_WIDTH}px; }`,
    });

    const total = await page.evaluate(() => document.body.scrollHeight);
    const count = Math.min(Math.ceil(total / PAGE_HEIGHT), 80);

    for (let index = 0; index < count; index += 1) {
      await page.evaluate((y) => window.scrollTo(0, y), index * PAGE_HEIGHT);
      await page.screenshot({
        path: path.join(outDir, `page-${String(index + 1).padStart(3, "0")}.png`),
      });
    }

    console.log(`  ${count} preview images in ${path.relative(paths.root, outDir)}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(`\npreview failed: ${error.message}`);
  process.exitCode = 1;
});
