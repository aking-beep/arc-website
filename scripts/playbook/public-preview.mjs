/**
 * Keep the Define cover as the product image.
 *
 * The manuscript is a paid file. This script does not publish a preview PDF
 * or interior pages. It removes those files if an older build left them in
 * public/.
 *
 *   node scripts/playbook/public-preview.mjs
 *
 * The preview stops on the first page of Module 01. Build, Ship, the later
 * Define modules, and the worksheets stay in the paid files.
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

function pageText(pdf, page) {
  return run("pdftotext", ["-f", String(page), "-l", String(page), "-layout", pdf, "-"]);
}

function firstPageMatching(pdf, count, pattern) {
  for (let page = 1; page <= count; page += 1) {
    if (pattern.test(pageText(pdf, page))) return page;
  }
  return null;
}

async function slicePdf(input, output, lastPage) {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "playbook-slice-"));
  try {
    execFileSync("pdfseparate", [
      "-f",
      "1",
      "-l",
      String(lastPage),
      input,
      path.join(tmp, "page-%d.pdf"),
    ]);
    const pages = [];
    for (let page = 1; page <= lastPage; page += 1) {
      pages.push(path.join(tmp, `page-${page}.pdf`));
    }
    execFileSync("pdfunite", [...pages, output]);
  } finally {
    await fs.rm(tmp, { recursive: true, force: true });
  }
}

async function renderPage(pdf, page, dest) {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "playbook-preview-"));
  try {
    execFileSync("pdftoppm", ["-f", String(page), "-l", String(page), "-png", "-r", "144", pdf, path.join(tmp, "page")]);
    const files = (await fs.readdir(tmp)).filter((name) => name.endsWith(".png"));
    if (files.length !== 1) throw new Error(`Expected one PNG for page ${page}`);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(path.join(tmp, files[0]), dest);
  } finally {
    await fs.rm(tmp, { recursive: true, force: true });
  }
}

async function main() {
  for (const command of ["pdfinfo", "pdftotext", "pdftoppm", "pdfseparate", "pdfunite"]) {
    if (!has(command)) {
      throw new Error(`Missing ${command}. Install poppler-utils.`);
    }
  }

  const pdf = path.join(paths.build, edition.slug, edition.pdfFile);
  await fs.access(pdf).catch(() => {
    throw new Error(`Missing ${path.relative(paths.root, pdf)}. Run npm run playbook:pdf first.`);
  });

  const count = pageCount(pdf);
  // The contents page also names "Module 01". The module itself is the page
  // that states its decision.
  const moduleStart = firstPageMatching(pdf, count, /one-sentence claim this product makes/);
  if (!moduleStart) throw new Error("Could not find the opening of Module 01 in the Define PDF");

  const moduleTwo = firstPageMatching(
    pdf,
    count,
    /Have you seen enough evidence to justify building the MVP/,
  );
  if (moduleTwo && moduleStart >= moduleTwo) {
    throw new Error("Module 01 does not start before Module 02");
  }

  const coverDest = path.join(paths.root, "public", "playbook", "cover.png");
  await renderPage(pdf, 1, coverDest);
  console.log(`  page 1 → ${path.relative(paths.root, coverDest)}`);

  const previewPdf = path.join(paths.root, "public", "playbook", "preview.pdf");
  const previewDir = path.join(paths.root, "public", "playbook", "preview-images");
  await fs.rm(previewPdf, { force: true });
  await fs.rm(previewDir, { recursive: true, force: true });
  console.log(
    `  paid file is ${count} pages. Public site keeps the cover only. Module 01 starts on page ${moduleStart}.`,
  );
}

main().catch((error) => {
  console.error(`\npublic-preview failed: ${error.message}`);
  process.exitCode = 1;
});
