/**
 * Render each playbook to its own print-ready PDF.
 *
 *   node scripts/playbook/build-pdf.mjs
 *
 * The manuscript is one method. The products are three slices of it, defined
 * in editions.mjs. Define and Build do not receive the library appendices.
 * Ship does, and it fails if those appendices were not fetched.
 *
 * Markdown -> HTML -> Chrome's print engine. Only puppeteer-core is
 * installed, so no second Chrome is downloaded.
 */

import fs from "node:fs/promises";
import path from "node:path";

import { Marked } from "marked";
import puppeteer from "puppeteer-core";

import { editions, selectWorksheets } from "./editions.mjs";
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

async function loadManuscript(meta) {
  const sections = [];

  for (const name of meta.order) {
    const file = path.join(paths.manuscript, name);
    const raw = await fs.readFile(file, "utf8").catch(() => null);
    if (raw === null) {
      throw new Error(`Manuscript file listed in meta.json is missing: ${name}`);
    }
    const { data, body } = parseFrontMatter(raw);
    sections.push({ name, data, body, raw });
  }

  return sections;
}

async function loadAppendices() {
  const appendixDir = path.join(paths.build, "appendices");
  const appendixFiles = (await fs.readdir(appendixDir).catch(() => []))
    .filter((name) => name.endsWith(".md"))
    .sort();

  const sections = [];
  for (const name of appendixFiles) {
    const raw = await fs.readFile(path.join(appendixDir, name), "utf8");
    const { data, body } = parseFrontMatter(raw);
    sections.push({ name, data, body });
  }

  const sources = await readJson(path.join(appendixDir, "sources.json")).catch(() => null);
  return { sections, sources };
}

function runningHead(section) {
  if (section.data.section === "module") {
    return `Module ${section.data.number} · ${section.data.title}`;
  }
  if (section.data.section === "appendix") {
    return `Appendix ${section.data.appendix} · ${section.data.title}`;
  }
  return section.data.title || "";
}

function renderCover(meta, edition) {
  const dollars = `$${(Number(edition.amountCents) / 100).toFixed(0)}`;
  return `
<div class="cover">
  <div>
    <p class="imprint">${escapeHtml(meta.publisher)}</p>
  </div>
  <div>
    <h1>${escapeHtml(edition.name)}</h1>
    <p class="sub">${escapeHtml(edition.subtitle)}</p>
    <div class="rule"></div>
    <p class="lede">${escapeHtml(edition.lede)}</p>
  </div>
  <div>
    <p class="imprint">${escapeHtml(meta.edition)} · ${escapeHtml(dollars)}</p>
  </div>
</div>`;
}

function renderColophon(meta, edition, sources) {
  const rows = [
    `<dt>Playbook</dt><dd>${escapeHtml(edition.productName)}</dd>`,
    `<dt>Edition</dt><dd>${escapeHtml(meta.edition)}</dd>`,
    `<dt>Built</dt><dd>${new Date().toISOString().slice(0, 10)}</dd>`,
    `<dt>Published by</dt><dd>${escapeHtml(meta.publisher)}</dd>`,
    `<dt>In this file</dt><dd>${escapeHtml(edition.holding.join("; "))}</dd>`,
  ];

  if (edition.libraries) {
    for (const library of sources?.libraries ?? []) {
      rows.push(
        `<dt>Appendix ${escapeHtml(library.appendix)}</dt><dd>${escapeHtml(library.title)} — ` +
          `${library.entryCount} entries at <code>${escapeHtml(library.shortSha)}</code></dd>`,
      );
    }
  }

  const others = editions
    .filter((other) => other.slug !== edition.slug)
    .map((other) => other.name)
    .join(" and ");
  const librariesNote = edition.libraries
    ? `<p>Appendices A, B and C are assembled when this PDF is built, so the revisions
     above are the ones in this copy. Appendix D says what you may do with them.
     ${escapeHtml(others)} are separate purchases, and they are not in this file.</p>`
    : `<p>${escapeHtml(others)} are separate purchases. The skills, reference
     architectures, and workflow templates are in Ship.</p>`;

  return `
<section class="chapter" data-section="colophon" data-head="Colophon">
  <h2>Colophon</h2>
  ${librariesNote}
  <dl class="colophon">${rows.join("\n    ")}</dl>
  <p class="colophon">Set in IBM Plex Sans and IBM Plex Mono. Typeset for US Letter;
     it prints on A4 with a slightly larger margin.</p>
</section>`;
}

function renderHowToUse(edition) {
  const items = edition.holding.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
  const elsewhere = editions
    .filter((other) => other.slug !== edition.slug)
    .map(
      (other) =>
        `<p><strong>${escapeHtml(other.name)}</strong> — ${escapeHtml(other.lede)}</p>`,
    )
    .join("\n");

  return `
<section class="chapter" data-section="front" data-head="How to use this playbook">
  <h1>How to use this playbook</h1>
  <p>This file is <strong>${escapeHtml(edition.name)}</strong>. Define, Build, and Ship
     are three purchases. Buying this one leaves the other two where they are.</p>
  <h2>In this file</h2>
  <ul>
    ${items}
  </ul>
  <h2>The other two</h2>
  ${elsewhere}
  <p>Read the modules in this file in order the first time. A module is done when
     its worksheet is filled in with something you would show another person.
     The worksheets are at the back of this PDF, and the same fields are in the
     ZIP as Markdown so they can live next to the project.</p>
  <p>The page before the modules is the whole method, including the modules that
     live in the other two playbooks. It is there so you can see where this
     file sits. It is not a copy of those files.</p>
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

function renderWorksheets(edition, worksheets) {
  const intro = [
    "# Worksheets",
    "",
    `These worksheets belong to ${edition.name}. Fill them in. The same fields are in the ZIP as Markdown.`,
    "",
    "The other worksheets belong to the other two playbooks.",
    "",
  ];

  const blocks = worksheets.map(
    (worksheet) =>
      `<div class="worksheet" data-module="${worksheet.module}">\n\n${worksheet.inner}\n\n</div>`,
  );

  const body = [...intro, ...blocks].join("\n\n");
  return `<section class="chapter" data-section="worksheets" data-head="Worksheets">\n${marked.parse(body)}\n</section>`;
}

async function buildHtml(meta, edition, sections, worksheets, sources) {
  const css = await fs.readFile(path.join(paths.theme, "print.css"), "utf8");
  const method = sections.filter((section) => section.data.section !== "appendix");
  const library = sections.filter((section) => section.data.section === "appendix");
  const body = [
    renderCover(meta, edition),
    renderColophon(meta, edition, sources),
    renderHowToUse(edition),
    ...method.map(renderSection),
    renderWorksheets(edition, worksheets),
    ...library.map(renderSection),
  ].join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(edition.productName)}</title>
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

function sectionsForEdition(edition, manuscript, appendices) {
  const shared = manuscript.filter((section) => section.name === "02-the-system.md");
  const modules = manuscript.filter(
    (section) =>
      section.data.section === "module" && edition.modules.includes(section.data.number),
  );

  if (modules.length !== edition.modules.length) {
    const got = modules.map((section) => section.data.number).join(",");
    throw new Error(`${edition.slug} modules resolved to [${got}], expected [${edition.modules}]`);
  }

  const orderedModules = edition.modules.map((number) =>
    modules.find((section) => section.data.number === number),
  );

  const appendixSections = edition.libraries ? appendices : [];
  if (edition.libraries && appendixSections.length === 0) {
    throw new Error(
      "Ship includes the three libraries, and no appendices were found. Run `npm run playbook:assets` first.",
    );
  }

  return [...shared, ...orderedModules, ...appendixSections];
}

function footerTemplate(edition) {
  return `
<div style="width:100%;font-family:'IBM Plex Sans',sans-serif;font-size:8pt;color:#55606a;
            padding:0 0.85in;display:flex;justify-content:space-between;">
  <span>${escapeHtml(edition.productName)}</span>
  <span class="pageNumber"></span>
</div>`;
}

async function renderPdf(browser, htmlFile, pdfFile, edition) {
  const page = await browser.newPage();
  try {
    await page.goto(`file://${htmlFile}`, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    await page.pdf({
      path: pdfFile,
      format: "letter",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: footerTemplate(edition),
      margin: {
        top: "0.75in",
        bottom: "0.9in",
        left: "0.85in",
        right: "0.85in",
      },
    });
  } finally {
    await page.close();
  }
}

async function main() {
  const meta = await readJson(path.join(paths.manuscript, "meta.json"));
  const manuscript = await loadManuscript(meta);
  const worksheetSource = manuscript.find((section) => section.name === "20-worksheets.md");
  if (!worksheetSource) throw new Error("20-worksheets.md is missing from the manuscript");

  const { sections: appendices, sources } = await loadAppendices();
  if (appendices.length === 0) {
    console.warn(
      "  ! no appendices found — Define and Build will still build; Ship will not",
    );
  }

  const executablePath = await findChrome();
  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"],
  });

  const manifest = [];

  try {
    for (const edition of editions) {
      const sections = sectionsForEdition(edition, manuscript, appendices);
      const worksheets = selectWorksheets(worksheetSource.raw, edition);
      const html = await buildHtml(meta, edition, sections, worksheets, sources);
      const dir = path.join(paths.build, edition.slug);
      const htmlFile = path.join(dir, "playbook.html");
      const pdfFile = path.join(dir, edition.pdfFile);
      await writeFileEnsured(htmlFile, html);
      await renderPdf(browser, htmlFile, pdfFile, edition);

      const { size } = await fs.stat(pdfFile);
      console.log(
        `  ${path.relative(paths.root, pdfFile)} — ${sections.length} sections, ${worksheets.length} worksheets, ${formatBytes(size)}`,
      );
      manifest.push({
        slug: edition.slug,
        pdf: path.relative(paths.root, pdfFile),
        modules: edition.modules,
        worksheets: edition.worksheets,
        libraries: edition.libraries,
        bytes: size,
      });
    }
  } finally {
    await browser.close();
  }

  await writeFileEnsured(
    path.join(paths.build, "manifest.json"),
    `${JSON.stringify({ editions: manifest }, null, 2)}\n`,
  );
}

main().catch((error) => {
  console.error(`\nbuild-pdf failed: ${error.message}`);
  process.exitCode = 1;
});
