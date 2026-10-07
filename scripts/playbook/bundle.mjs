/**
 * Package one ZIP per playbook.
 *
 *   node scripts/playbook/bundle.mjs
 *
 * Define and Build contain that playbook's PDF and its worksheets. Ship also
 * contains the three libraries. Nothing is copied into a ZIP that the sales
 * page does not list for that playbook.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import {
  editions,
  selectWorksheets,
  worksheetFilename,
  worksheetMarkdown,
} from "./editions.mjs";
import { formatBytes, paths, readJson, writeFileEnsured } from "./util.mjs";

async function requireFile(file, hint) {
  try {
    await fs.access(file);
  } catch {
    throw new Error(`Missing ${path.relative(paths.root, file)} — ${hint}`);
  }
}

function bundleReadme(meta, edition, sources) {
  const libraryRows = edition.libraries
    ? (sources?.libraries ?? [])
        .map(
          (library) =>
            `| ${library.id}/ | ${library.title} | ${library.entryCount} | ` +
            `Appendix ${library.appendix} | \`${library.shortSha}\` |`,
        )
        .join("\n")
    : "";

  const librarySection = edition.libraries
    ? `
| \`skills/\` | The ARC Skills library. One folder per skill, each with its \`SKILL.md\`. |
| \`architectures/\` | The Reference Architectures library, plus scenario and diagram images. |
| \`templates/\` | The AI Workflow Templates library. |

The library folders are also printed in full in this PDF. These are the same
documents as editable files.

## Libraries in this edition

| Folder | Library | Entries | Printed in | Revision |
| --- | --- | --- | --- | --- |
${libraryRows}
`
    : `
The skills, reference architectures, and workflow templates are in the Ship
playbook. They are not in this ZIP.
`;

  const worksheetList = edition.worksheets.join(", ");

  return `# ${edition.productName} — editable assets

${meta.edition}. Published by ${meta.publisher}.

This ZIP is the working half of ${edition.name}. The PDF is for reading; this
is for filling in${edition.libraries ? " and adapting" : ""}.

## What is in here

| Folder | What it is |
| --- | --- |
| \`${edition.pdfFile}\` | This playbook, print-ready. |
| \`worksheets/\` | Worksheets ${worksheetList}, one Markdown file each. |
${librarySection}
## What you may do with this

The text, the worksheets${edition.libraries ? ", and the three libraries" : ""} in this
ZIP are © ${meta.publisher}. Your purchase covers use by you and your team:
copy what you need into your own repositories, adapt it for products you are
building, and fill in the worksheets. You do not need to ask and you do not
need to credit us.

It does not cover redistributing this ZIP, and it does not cover using it as
paid training material for other organisations. Email us for that licence.

Define, Build, and Ship are separate purchases. This ZIP is only ${edition.name}.

## Updates

Your download link resolves to the current revision of this edition. The
colophon page of the PDF names the revision you are holding.
`;
}

async function main() {
  const meta = await readJson(path.join(paths.manuscript, "meta.json"));
  const worksheetSource = await fs.readFile(
    path.join(paths.manuscript, "20-worksheets.md"),
    "utf8",
  );
  const sources = await readJson(path.join(paths.build, "appendices", "sources.json")).catch(
    () => null,
  );
  const assets = path.join(paths.build, "assets");

  for (const edition of editions) {
    const pdf = path.join(paths.build, edition.slug, edition.pdfFile);
    await requireFile(pdf, "run `npm run playbook:pdf` first");
    if (edition.libraries) {
      await requireFile(assets, "run `npm run playbook:assets` first");
    }

    const staging = path.join(paths.build, edition.slug, "bundle");
    await fs.rm(staging, { recursive: true, force: true });
    await fs.mkdir(staging, { recursive: true });

    await fs.cp(pdf, path.join(staging, edition.pdfFile));

    const worksheets = selectWorksheets(worksheetSource, edition);
    for (const worksheet of worksheets) {
      await writeFileEnsured(
        path.join(staging, "worksheets", worksheetFilename(worksheet)),
        worksheetMarkdown(worksheet),
      );
    }

    if (edition.libraries) {
      await fs.cp(assets, staging, { recursive: true });
    }

    await writeFileEnsured(path.join(staging, "README.md"), bundleReadme(meta, edition, sources));

    const zip = path.join(paths.build, edition.slug, edition.zipFile);
    await fs.rm(zip, { force: true });
    execFileSync("zip", ["-qr", zip, "."], { cwd: staging });
    await fs.rm(staging, { recursive: true, force: true });

    const { size } = await fs.stat(zip);
    console.log(
      `  ${path.relative(paths.root, zip)} — ${worksheets.length} worksheets${edition.libraries ? " + libraries" : ""}, ${formatBytes(size)}`,
    );
  }
}

main().catch((error) => {
  console.error(`\nbundle failed: ${error.message}`);
  process.exitCode = 1;
});
