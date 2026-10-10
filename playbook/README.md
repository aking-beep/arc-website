# ARC AI Product Playbook — production

Everything needed to produce the three sellable playbooks. Each one is a
print-ready PDF and a ZIP of the editable files that belong to it.

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
npm run playbook:pdf       # render one PDF per playbook
npm run playbook:bundle    # one ZIP per playbook
npm run playbook:build     # assets, PDFs, ZIPs, and the public preview
npm run playbook:provision # create sandbox prices and upload, when keys exist
```

Output lands in `playbook/build/` and is not committed:

| File | What it is |
| --- | --- |
| `define/arc-playbook-define.pdf` | Modules 01–03 and worksheets 1–6. USD 5. |
| `define/arc-playbook-define.zip` | That PDF plus those worksheets as Markdown. |
| `build/arc-playbook-build.pdf` | Modules 04, 05, and 07, and worksheets 7, 8, and 10. USD 10. |
| `build/arc-playbook-build.zip` | That PDF plus those worksheets as Markdown. |
| `ship/arc-playbook-ship.pdf` | Modules 06 and 08, worksheets 9 and 11, and the three libraries. USD 20. |
| `ship/arc-playbook-ship.zip` | That PDF, those worksheets, and the editable libraries. |
| `appendices/` | Generated library appendices. Printed only in Ship. |

`npm run playbook:build` refreshes `public/playbook/cover.png` and removes any
public preview PDF or interior page images. The manuscript stays in the paid files.

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

### Manuscript order

The source is still one method, in this order. The build then slices it into
the three products above.

```
Front matter
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

The cut is `scripts/playbook/editions.mjs`. Define takes modules 01–03 and
worksheets 1–6. Build takes modules 04, 05, and 07 and worksheets 7, 8, and
10. Ship takes modules 06 and 08, worksheets 9 and 11, and every library
appendix. A worksheet that moves modules has to move editions in the same
change, or the build throws.

## Shipping a new edition

1. Edit the manuscript. Bump `edition` in `playbook/manuscript/meta.json`.
2. `npm run playbook:build`.
3. Check each colophon shows the edition, and that Ship's colophon shows the
   library SHAs.
4. `npm run playbook:provision` with the storage keys set, or upload the six
   objects over the same paths by hand.
5. Buyers keep the same download link — it resolves to the current object, so
   "free updates to this edition" costs nothing to honour.

## Provisioning checkout

`npm run playbook:provision` reads `.env.local`. With `PADDLE_API_KEY` it
finds or creates one one-time USD price per playbook (5.00, 10.00, 20.00) and
writes the price id. With `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and
`PLAYBOOK_STORAGE_BUCKET` it creates that bucket as private if needed and
uploads the six objects.

It does not invent an id when the key is missing. It will not create
production prices unless `PADDLE_ENVIRONMENT=production` and you pass
`--confirm-production`. The client-side token still comes from the Paddle
dashboard. The webhook secret does too, unless you pass `--create-webhook`
and `NEXT_PUBLIC_SITE_URL` is a public https origin.
