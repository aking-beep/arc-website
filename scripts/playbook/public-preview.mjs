/**
 * Keep the Define cover as the product image.
 *
 * The manuscript is a paid file. This script does not publish a preview PDF
 * or interior pages. It removes those files if an older build left them in
 * public/.
 *
 *   node scripts/playbook/public-preview.mjs
 *
 * The removal happens before anything that can fail. Making those files
 * non-public is the one invariant this script exists to hold, so it must not
 * depend on the manuscript parsing cleanly, on poppler rendering a page, or
 * on any check that comes later.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { editionBySlug } from "./editions.mjs";
import { paths } from "./util.mjs";

const edition = editionBySlug("define");

function run(command, args) {
  return execFileSync(command, args, { encoding: "utf8" });
}

function has(command) {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function pageCount(pdf) {
  const info = run("pdfinfo", [pdf]);
  const match = /^Pages:\s+(\d+)/m.exec(info);
  if (!match) throw new Error("pdfinfo did not report a page count");
  return Number(match[1]);
}

async function renderPage(pdf, page, dest) {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "playbook-preview-"));
  try {
    execFileSync("pdftoppm", [
      "-f",
      String(page),
      "-l",
      String(page),
      "-png",
      "-r",
      "144",
      pdf,
      path.join(tmp, "page"),
    ]);
    const files = (await fs.readdir(tmp)).filter((name) => name.endsWith(".png"));
    if (files.length !== 1) throw new Error(`Expected one PNG for page ${page}`);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(path.join(tmp, files[0]), dest);
  } finally {
    await fs.rm(tmp, { recursive: true, force: true });
  }
}

async function removePublicPreview() {
  const previewPdf = path.join(paths.root, "public", "playbook", "preview.pdf");
  const previewDir = path.join(paths.root, "public", "playbook", "preview-images");
  await fs.rm(previewPdf, { force: true });
  await fs.rm(previewDir, { recursive: true, force: true });
}

async function main() {
  // First, unconditionally. Nothing above this line may throw.
  await removePublicPreview();

  // Only what the cover actually needs. pdfseparate and pdfunite went with
  // the slice helper that used to build the preview PDF.
  for (const command of ["pdfinfo", "pdftoppm"]) {
    if (!has(command)) {
      throw new Error(`Missing ${command}. Install poppler-utils.`);
    }
  }

  const pdf = path.join(paths.build, edition.slug, edition.pdfFile);
  await fs.access(pdf).catch(() => {
    throw new Error(`Missing ${path.relative(paths.root, pdf)}. Run npm run playbook:pdf first.`);
  });

  const coverDest = path.join(paths.root, "public", "playbook", "cover.png");
  await renderPage(pdf, 1, coverDest);
  console.log(`  page 1 → ${path.relative(paths.root, coverDest)}`);
  console.log(
    `  paid file is ${pageCount(pdf)} pages. Public site keeps the cover only.`,
  );
}

main().catch((error) => {
  console.error(`\npublic-preview failed: ${error.message}`);
  process.exitCode = 1;
});
