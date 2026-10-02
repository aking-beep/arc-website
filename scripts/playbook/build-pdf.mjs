/**
 * Render the Playbook manuscript to a print-ready PDF.
 *
 *   node scripts/playbook/build-pdf.mjs
 *
 * Markdown -> HTML -> Chrome's print engine. Chrome is used rather than a
 * dedicated PDF library because the worksheets need real table layout and
 * CSS backgrounds, and because the machine already has a browser. Only
 * puppeteer-core is installed, so no second Chrome is downloaded.
 *
 * Run fetch-appendices.mjs first. If the appendices are missing this still
 * produces a PDF, with a warning — useful while editing the manuscript.
 */

import fs from "node:fs/promises";
import path from "node:path";

import { Marked } from "marked";
import puppeteer from "puppeteer-core";

import {
  findChrome,
  formatBytes,
  parseFrontMatter,
  paths,
  readJson,
  writeFileEnsured,
} from "./util.mjs";

const marked = new Marked({ gfm: true, breaks: false, async: false });

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function loadSections(meta) {
  const sections = [];

  for (const name of meta.order) {
    const file = path.join(paths.manuscript, name);
    const raw = await fs.readFile(file, "utf8").catch(() => null);
    if (raw === null) {
      throw new Error(`Manuscript file listed in meta.json is missing: ${name}`);
    }
    const { data, body } = parseFrontMatter(raw);
    sections.push({ name, data, body });
  }

  const appendixDir = path.join(paths.build, "appendices");
  const appendixFiles = (await fs.readdir(appendixDir).catch(() => []))
    .filter((name) => name.endsWith(".md"))
    .sort();

  if (appendixFiles.length === 0) {
    console.warn(
      "  ! no appendices found — run `npm run playbook:assets` for the full book",
    );
  }

  for (const name of appendixFiles) {
    const raw = await fs.readFile(path.join(appendixDir, name), "utf8");
    const { data, body } = parseFrontMatter(raw);
    sections.push({ name, data, body });
  }

  return sections;
}

/** The footer shows which module you are in, so set a running head per page. */
function runningHead(section) {
  if (section.data.section === "module") {
    return `Module ${section.data.number} · ${section.data.title}`;
  }
  if (section.data.section === "appendix") {
    return `Appendix ${section.data.appendix} · ${section.data.title}`;
  }
  return section.data.title || "";
}

function renderCover(meta) {
  return `
<div class="cover">
  <div>
    <p class="imprint">${escapeHtml(meta.publisher)} · ${escapeHtml(meta.imprint)}</p>
  </div>
  <div>
    <h1>${escapeHtml(meta.title)}</h1>
    <p class="sub">${escapeHtml(meta.subtitle)}</p>
    <div class="rule"></div>
    <p class="lede">Eight modules, eleven worksheets, and three working libraries, in the
      order the decisions actually happen.</p>
  </div>
  <div>
    <p class="imprint">${escapeHtml(meta.edition)}</p>
  </div>
</div>`;
}

async function renderColophon(meta) {
  const sources = await readJson(
    path.join(paths.build, "appendices", "sources.json"),
  ).catch(() => null);

  const rows = [
    `<dt>Edition</dt><dd>${escapeHtml(meta.edition)}</dd>`,
    `<dt>Built</dt><dd>${new Date().toISOString().slice(0, 10)}</dd>`,
    `<dt>Published by</dt><dd>${escapeHtml(meta.publisher)}, ${escapeHtml(meta.imprint)} imprint</dd>`,
  ];

  for (const library of sources?.libraries ?? []) {
    rows.push(
      `<dt>Appendix ${escapeHtml(library.appendix)}</dt><dd>${escapeHtml(library.title)} — ` +
        `${library.entryCount} entries at <code>${escapeHtml(library.shortSha)}</code>, ` +
        `${escapeHtml(library.license)}</dd>`,
    );
  }

  return `
<section class="chapter" data-section="colophon">
  <h2>Colophon</h2>
  <p>The three libraries in appendices A, B and C are pulled from their own
     repositories when this PDF is built, so the revisions below are exactly what
     you are holding. Appendix D has the links and the licence.</p>
  <dl class="colophon">${rows.join("\n    ")}</dl>
  <p class="colophon">Set in IBM Plex Sans and IBM Plex Mono. Typeset for US Letter;
     it prints on A4 with a slightly larger margin.</p>
</section>`;
}

function renderSection(section) {
  const attrs = [
    'class="chapter"',
    `data-section="${escapeHtml(section.data.section ?? "body")}"`,
  ];
  if (section.data.number) attrs.push(`data-module="${escapeHtml(section.data.number)}"`);
  const head = runningHead(section);
  if (head) attrs.push(`data-head="${escapeHtml(head)}"`);

  return `<section ${attrs.join(" ")}>\n${marked.parse(section.body)}\n</section>`;
}

async function buildHtml(meta, sections) {
  const css = await fs.readFile(path.join(paths.theme, "print.css"), "utf8");
  const body = [
    renderCover(meta),
    await renderColophon(meta),
    ...sections.map(renderSection),
  ].join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(meta.title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>:root { --accent: ${meta.accent}; }</style>
<style>${css}</style>
</head>
<body>
${body}
</body>
</html>`;
}

async function main() {
  const meta = await readJson(path.join(paths.manuscript, "meta.json"));
  const sections = await loadSections(meta);
  const html = await buildHtml(meta, sections);

  const htmlFile = path.join(paths.build, "playbook.html");
  await writeFileEnsured(htmlFile, html);

  const executablePath = await findChrome();
  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlFile}`, { waitUntil: "networkidle0" });
    // Webfonts load over the network; without this the first pages can render
    // in a fallback face and the metrics shift.
    await page.evaluateHandle("document.fonts.ready");

    const pdfFile = path.join(paths.build, "arc-ai-product-playbook.pdf");
    await page.pdf({
      path: pdfFile,
      format: "letter",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: footerTemplate(meta),
      margin: {
        top: "0.75in",
        bottom: "0.9in",
        left: "0.85in",
        right: "0.85in",
      },
    });

    const { size } = await fs.stat(pdfFile);
    console.log(
      `  ${path.relative(paths.root, pdfFile)} — ${sections.length} sections, ${formatBytes(size)}`,
    );
  } finally {
    await browser.close();
  }
}

/**
 * Chrome renders the footer in its own document, so it cannot see the page's
 * CSS or read the running head off the current section. Title on the left,
 * page number on the right is what it can do reliably.
 */
function footerTemplate(meta) {
  return `
<div style="width:100%;font-family:'IBM Plex Sans',sans-serif;font-size:8pt;color:#55606a;
            padding:0 0.85in;display:flex;justify-content:space-between;">
  <span>${escapeHtml(meta.title)}</span>
  <span class="pageNumber"></span>
</div>`;
}

main().catch((error) => {
  console.error(`\nbuild-pdf failed: ${error.message}`);
  process.exitCode = 1;
});
