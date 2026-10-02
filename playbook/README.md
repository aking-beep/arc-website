# ARC AI Product Playbook — production

Everything needed to produce the sellable bundle: a print-ready PDF and a ZIP
of editable Markdown.

```
playbook/
  manuscript/          The Playbook itself, in order. Hand-written.
  worksheets/          Fillable pages. Shipped in the PDF and the ZIP.
  theme/               Print stylesheet and page furniture.
  build/               Generated. Not committed.
```

## Build it

```bash
npm run playbook:assets    # pull the three libraries from their repos
npm run playbook:pdf       # render the PDF
npm run playbook:bundle    # PDF + editable Markdown -> ZIP
npm run playbook:build     # all three, in order
```

Output lands in `playbook/build/`:

| File | What it is |
| --- | --- |
| `arc-ai-product-playbook.pdf` | The product. Upload this. |
| `arc-ai-product-playbook-assets.zip` | Editable Markdown. Upload this too. |
| `appendices/` | Generated library appendices, intermediate. |

Rendering uses the Chrome already on the machine via `puppeteer-core`. Set
`CHROME_PATH` if it is not at one of the usual locations.

## Why the appendices are generated rather than committed

The ARC Skills, reference-architecture and workflow-template libraries each
have their own repository, and those repositories are the source of truth. If
the appendices were copies in this repo they would be stale within a month, and
the Playbook would start describing skills that no longer exist.

`npm run playbook:assets` pulls them at build time, records the commit SHA it
pulled, and writes it to the colophon page, so any buyer can tell exactly which
revision they have.

### What goes into the appendices

Every entry is printed **in full**, not summarised: each skill with its
triggers, steps and guardrails, each architecture with its decisions, failure
modes and when-not-to-use-it notes, each template with its prompt, tools, input
schema and human gate. Entries are grouped under the module that sends you to
them, which is the part `curation.json` encodes and the part a buyer is paying
for. The same files ship as editable Markdown in the ZIP.

Three things are stripped on the way in, in `prepareBody()`:

- the entry's own h1, because the appendix prints the title above it;
- embedded images, because each architecture's illustration carries alt text
  identical to the Scenario paragraph directly above it and twenty of them add
  roughly six megabytes for no information — the image files go in the ZIP
  instead, via the `extraDirs` field in `libraries.mjs`;
- `_Harvested from:_` provenance lines, which are accurate inside the source
  repository and meaningless to a reader.

Headings inside an entry are demoted two levels so the hierarchy holds: the
appendix owns h1, the module group h2, the entry h3, and the entry's own
sections land at h4 and below.

## Page and print specification

| Property | Value | Why |
| --- | --- | --- |
| Page size | US Letter, 8.5 × 11 in | The buyer is mostly US; Letter prints without scaling there and still prints on A4 with a small margin. |
| Margins | 0.85 in sides, 0.75 in top, 0.9 in bottom | Wide enough to write in the margin, which people do with a workbook. |
| Body type | IBM Plex Sans, 10.5 pt / 15.5 pt | Same family as the site, so the product does not feel like it came from somewhere else. |
| Headings | IBM Plex Sans SemiBold | |
| Code and labels | IBM Plex Mono | |
| Colour | One accent (`#0A6E7C`), otherwise black on white | Cheap to print, and it survives being photocopied. |
| Worksheets | Ruled fields, 0.3 in line height | Writable on paper and fillable on screen. |
| Page numbers | Bottom outer, module name bottom inner | |
| Bleed | None | It is a download, not a press run. |

### Structure

```
Cover
Title page
Colophon
How to use this Playbook
The five-step system (one page, the whole argument)
Module 01  Idea
Module 02  Validation
Module 03  Product
Module 04  Architecture
Module 05  Build
Module 06  Evaluation
Module 07  Production readiness
Module 08  Launch
Worksheets (11)
Appendix A  ARC Skills library
Appendix B  Reference Architectures
Appendix C  AI Workflow Templates
Appendix D  Usage and edition
```

Every module follows the same five-part shape, so a reader can navigate by
position rather than by reading everything:

1. **The decision** — what this module exists to decide, in one sentence.
2. **Why it is cheaper here** — what it costs to answer later instead.
3. **The work** — the actual method, with the trade-offs named.
4. **What you should be holding** — the module's outputs, as a checklist.
5. **Where this bites** — the common failure, and how to tell it is happening.

### Writing rules

Carried over from the site, because the product should read like the company.

- Name the decision and the trade-off. Do not motivate the reader.
- No specific model or vendor names in the method. They date the work, and the
  sequence does not depend on them.
- Every claim is either reasoned from first principles or cited. No invented
  statistics.
- Say what the Playbook does not cover.
- Plain language. If a sentence needs a diagram, draw the diagram.

## Shipping a new edition

1. Edit the manuscript. Bump `edition` in `playbook/manuscript/meta.json`.
2. `npm run playbook:build`.
3. Check the colophon shows the new edition and the library SHAs.
4. Upload both artefacts to the private bucket under the configured prefix.
5. Buyers keep the same download link — it resolves to the current object, so
   "free updates to this edition" costs nothing to honour.
