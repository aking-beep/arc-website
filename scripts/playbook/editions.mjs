/**
 * The three sellable playbooks, sliced from the one manuscript.
 *
 * Define, Build, and Ship are separate products. A worksheet or a library
 * that is not listed here does not go into that file. The sales page in
 * lib/playbook.ts has to describe this same cut.
 */

import { parseFrontMatter, slugify } from "./util.mjs";

export const editions = [
  {
    slug: "define",
    name: "Define",
    productName: "ARC Playbook: Define",
    subtitle: "Should this product exist?",
    amountCents: "500",
    modules: ["01", "02", "03"],
    /** Worksheet numbers, in order, as printed in 20-worksheets.md. */
    worksheets: ["1", "2", "3", "4", "5", "6"],
    libraries: false,
    pdfFile: "arc-playbook-define.pdf",
    zipFile: "arc-playbook-define.zip",
    pdfObject: "define/arc-playbook-define.pdf",
    zipObject: "define/arc-playbook-define.zip",
    lede: "Modules 01 to 03, and worksheets 1 to 6. The hypothesis, the evidence, and the boundary of the first version.",
    holding: [
      "Module 01 · Idea",
      "Module 02 · Validation",
      "Module 03 · Product",
      "Worksheets 1 to 6",
    ],
  },
  {
    slug: "build",
    name: "Build",
    productName: "ARC Playbook: Build",
    subtitle: "How should the system be built?",
    amountCents: "1000",
    modules: ["04", "05", "07"],
    worksheets: ["7", "8", "10"],
    libraries: false,
    pdfFile: "arc-playbook-build.pdf",
    zipFile: "arc-playbook-build.zip",
    pdfObject: "build/arc-playbook-build.pdf",
    zipObject: "build/arc-playbook-build.zip",
    lede: "Modules 04, 05, and 07, with their worksheets. The system shape, the build order, and the checks before anyone relies on it.",
    holding: [
      "Module 04 · Architecture",
      "Module 05 · Build",
      "Module 07 · Production readiness",
      "Worksheets 7, 8, and 10",
    ],
  },
  {
    slug: "ship",
    name: "Ship",
    productName: "ARC Playbook: Ship",
    subtitle: "Does it work well enough to launch?",
    amountCents: "2000",
    modules: ["06", "08"],
    worksheets: ["9", "11"],
    libraries: true,
    pdfFile: "arc-playbook-ship.pdf",
    zipFile: "arc-playbook-ship.zip",
    pdfObject: "ship/arc-playbook-ship.pdf",
    zipObject: "ship/arc-playbook-ship.zip",
    lede: "Modules 06 and 08, their worksheets, and the three working libraries. How you grade it, how you launch it, and the files you adapt.",
    holding: [
      "Module 06 · Evaluation",
      "Module 08 · Launch",
      "Worksheets 9 and 11",
      "Appendix A · ARC Skills",
      "Appendix B · Reference Architectures",
      "Appendix C · AI Workflow Templates",
    ],
  },
];

export function editionBySlug(slug) {
  const found = editions.find((edition) => edition.slug === slug);
  if (!found) throw new Error(`Unknown playbook edition: ${slug}`);
  return found;
}

/**
 * A Paddle price is acceptable for an edition only when it is a one-time
 * charge in US dollars for that edition's amount. Anything else must not be
 * written into the environment or used for checkout.
 */
export function priceMatchesEdition(price, edition) {
  if (!price || typeof price !== "object") return false;
  const amount = price.unit_price?.amount;
  const currency = price.unit_price?.currency_code;
  if (amount !== edition.amountCents || currency !== "USD") return false;
  return price.billing_cycle == null;
}

/**
 * Pull the worksheet blocks whose data-module is in this edition.
 * The manuscript keeps every worksheet in one file; the products do not.
 */
export function selectWorksheets(raw, edition) {
  const { body } = parseFrontMatter(raw);
  const wanted = new Set(edition.modules);
  const chunks = body.split(/\n(?=<div class="worksheet" data-module=")/);
  const found = [];

  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    const open = /^<div class="worksheet" data-module="(\d+)">\n([\s\S]*)<\/div>\s*$/.exec(
      trimmed,
    );
    if (!open) continue;

    const module = open[1];
    if (!wanted.has(module)) continue;

    const inner = open[2].trim();
    const heading = /^##\s+Worksheet\s+(\d+)\s+[—-]\s+(.+)$/m.exec(inner);
    if (!heading) {
      throw new Error(`Worksheet in module ${module} has no heading`);
    }

    found.push({
      module,
      number: heading[1],
      title: heading[2].trim(),
      inner,
    });
  }

  const got = found.map((worksheet) => worksheet.number).join(",");
  const want = edition.worksheets.join(",");
  if (got !== want) {
    throw new Error(
      `${edition.slug} worksheets parsed as [${got || "none"}], expected [${want}]`,
    );
  }

  return found;
}

/** Editable Markdown for one worksheet, with the print-only field markup removed. */
export function worksheetMarkdown(worksheet) {
  const markdown = worksheet.inner
    .replace(/<div class="field" data-lines="\d+">([\s\S]*?)<\/div>/g, (_, label) => {
      const text = label.trim().replace(/&nbsp;/g, "");
      return `**${text}**\n\n>\n`;
    })
    .replace(/^##\s+/m, "# ");

  return `${markdown.trim()}\n`;
}

export function worksheetFilename(worksheet) {
  return `${worksheet.number.padStart(2, "0")}-${slugify(worksheet.title)}.md`;
}
