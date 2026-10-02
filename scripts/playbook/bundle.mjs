/**
 * Package the sellable bundle: the PDF plus everything editable.
 *
 *   node scripts/playbook/bundle.mjs
 *
 * Produces playbook/build/arc-ai-product-playbook-assets.zip containing the
 * worksheets as Markdown, the three libraries as editable files, and a README
 * that tells a buyer what they are looking at and what they may do with it.
 *
 * Uses the system `zip` rather than a Node archiver. One less dependency, and
 * the output is a plain archive any operating system opens without help.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import { formatBytes, paths, readJson, writeFileEnsured } from "./util.mjs";

async function requireFile(file, hint) {
  try {
    await fs.access(file);
  } catch {
    throw new Error(`Missing ${path.relative(paths.root, file)} — ${hint}`);
  }
}

function bundleReadme(meta, sources) {
  const rows = (sources?.libraries ?? [])
    .map(
      (library) =>
        `| ${library.id}/ | ${library.title} | ${library.entryCount} | ` +
        `Appendix ${library.appendix} | \`${library.shortSha}\` |`,
    )
    .join("\n");

  return `# ${meta.title} — editable assets

${meta.edition}. Published by ${meta.publisher} under the ${meta.imprint} imprint.

This ZIP is the working half of the product. The PDF is for reading; this is
for filling in and adapting.

## What is in here

| Folder | What it is |
| --- | --- |
| \`worksheets/\` | The eleven worksheets as Markdown, one file each. Keep them in your project repository next to the thing they describe. |
| \`skills/\` | The ARC Skills library. One folder per skill, each with its \`SKILL.md\`. |
| \`architectures/\` | The Reference Architectures library, plus the scenario and diagram images under \`scenarios/\` and \`diagrams/\`. |
| \`templates/\` | The AI Workflow Templates library. |

Everything in the three library folders is also printed in full in the PDF
appendices. These are the same documents as editable files, so you can copy a
skill into a repository or rewrite a template's prompt without retyping it.

## Libraries in this edition

| Folder | Library | Entries | Printed in | Revision |
| --- | --- | --- | --- | --- |
${rows}

## What you may do with this

All of it — the Playbook text, the worksheets, and all three libraries — is
© ${meta.publisher}. Your purchase covers use by you and your team: copy the
skills and templates into your own repositories, adapt any of it for products
you are building, and fill in the worksheets. You do not need to ask and you
do not need to credit us.

It does not cover redistributing the bundle itself, or using it as paid
training material for other organisations. Email us and we will sort out a
licence for that rather than have you buy twelve copies.

## Updates

Your download link resolves to the current revision of this edition, so when
the libraries are refreshed the same link gives you the new bundle. Check the
colophon page of the PDF for the revision you are holding.
`;
}

/**
 * Split the single worksheets manuscript into one file per worksheet, so a
 * team can drop the three they need into a repository without the other eight.
 */
async function splitWorksheets(targetDir) {
  const source = await fs.readFile(
    path.join(paths.manuscript, "20-worksheets.md"),
    "utf8",
  );

  const blocks = source.split(/\n<div class="worksheet"[^>]*>\n/).slice(1);
  let written = 0;

  for (const block of blocks) {
    const body = block.replace(/\n<\/div>\s*$/, "").trim();
    const heading = /^##\s+Worksheet\s+(\d+)\s+—\s+(.+)$/m.exec(body);
    if (!heading) continue;

    const [, number, title] = heading;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Strip the print-only field markup; in Markdown a blank line is the field.
    const markdown = body
      .replace(/<div class="field" data-lines="\d+">([\s\S]*?)<\/div>/g, (_, label) =>
        `**${label.trim().replace(/&nbsp;/g, "")}**\n\n>\n`,
      )
      .replace(/^##\s+/m, "# ");

    await writeFileEnsured(
      path.join(targetDir, `${number.padStart(2, "0")}-${slug}.md`),
      `${markdown}\n`,
    );
    written += 1;
  }

  if (written === 0) {
    throw new Error("No worksheets parsed out of 20-worksheets.md");
  }
  return written;
}

async function main() {
  const meta = await readJson(path.join(paths.manuscript, "meta.json"));
  const pdf = path.join(paths.build, "arc-ai-product-playbook.pdf");
  const assets = path.join(paths.build, "assets");

  await requireFile(pdf, "run `npm run playbook:pdf` first");
  await requireFile(assets, "run `npm run playbook:assets` first");

  const sources = await readJson(
    path.join(paths.build, "appendices", "sources.json"),
  ).catch(() => null);

  const staging = path.join(paths.build, "bundle");
  await fs.rm(staging, { recursive: true, force: true });
  await fs.mkdir(staging, { recursive: true });

  await fs.cp(pdf, path.join(staging, path.basename(pdf)));
  await fs.cp(assets, staging, { recursive: true });

  const worksheetCount = await splitWorksheets(path.join(staging, "worksheets"));
  await writeFileEnsured(
    path.join(staging, "README.md"),
    bundleReadme(meta, sources),
  );

  const zip = path.join(paths.build, "arc-ai-product-playbook-assets.zip");
  await fs.rm(zip, { force: true });
  execFileSync("zip", ["-qr", zip, "."], { cwd: staging });
  await fs.rm(staging, { recursive: true, force: true });

  const { size } = await fs.stat(zip);
  console.log(
    `  ${path.relative(paths.root, zip)} — ${worksheetCount} worksheets + libraries, ${formatBytes(size)}`,
  );
}

main().catch((error) => {
  console.error(`\nbundle failed: ${error.message}`);
  process.exitCode = 1;
});
