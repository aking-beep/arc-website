# Magic Patterns redesign — implementation report

**Date:** 2026-10-23
**Branch:** `feature/magic-patterns-redesign` (also pushed to `claude/wizardly-feynman-17tnaa`)
**Base:** `e0a3546` on `main`
**Companion document:** [`MAGIC_PATTERNS_AUDIT.md`](./MAGIC_PATTERNS_AUDIT.md) — the Phase 1 discovery record and the decisions this report implements.

**Implementation readiness: 86 / 100.** Reasoning and evidence in §11.

---

## 1. Existing architecture summary

Next.js 14.2.35 App Router, React 18, TypeScript strict, Tailwind 3.4 with HSL
design tokens, `next-themes`, `lucide-react`, Vercel Analytics. Content lives in
six typed modules under `lib/` (3,758 lines) that the pages compose from, so a
new product or article enters the navigation, the sitemap and the relevant
pages from one edit. Commerce is Paddle plus a Supabase-backed store with
token-gated downloads, covered by 74 Vitest tests. 60 routes, 11 permanent
redirects, dynamic Open Graph images, a composed sitemap.

Baseline before any change: `npm ci`, `typecheck`, `test` (74), `build` — all
passing.

## 2. Magic Patterns files discovered

One upload commit, `7cd519b`, from a single design. No competing exports exist
on any of the 21 remote branches, so there was no version to choose between.

**57 files**, all flat at the repository root: 8 pages, 5 UI primitives, 6
shared components, 9 console components, 5 ARC Control sections, 7 home
sections, 3 Labs, 4 Services, 2 Research, 2 Contact, plus `index.css`,
`index.html`, `index.tsx`, `vite.config.ts`.

Two findings dominated the integration:

1. **The export omits all eleven `data/*` modules its components import.** The
   prototype cannot run as shipped, and every string in its content layer had
   to be rebuilt. Component usage pins each shape exactly; the content came
   from this repository's own modules, not from invention.
2. **The upload overwrote `package.json` and `README.md`** with the prototype's
   Vite versions, dropping `next`, `react-dom`, Paddle, analytics, every
   script including `build` and `test`, and all devDependencies. Merging the
   branch as uploaded would have produced a repository that could not build,
   test or sell anything.

The export is preserved unmodified under `design/magic-patterns/`, moved into
the directory layout its own imports describe and excluded from `tsconfig` and
ESLint. `design/magic-patterns/README.md` maps each prototype file to where it
landed in production.

## 3. Components integrated

**30 new components** under `components/arc/`:

| Area | Components |
| --- | --- |
| Shell | `nav`, `footer`, `brand`, `closing-cta` |
| UI | `container`, `button`, `section-intro`, `maturity-badge`, `demo-label`, `pill`, `motion` |
| Home | `home-hero`, `agent-execution`, `ecosystem`, `capabilities`, `featured-products`, `methodology`, `expertise`, `latest-research` |
| ARC Control | `sections` (hero, execution gap, limits), `capabilities`, `lifecycle`, `control-page` |
| Console | `control-console`, `views` (six), `view-header` + skeleton |
| Labs | `product-card`, `lab-preview` (four interactive previews) |
| Solutions | `service-explorer`, `readiness-assessment`, `cloud-explorer`, `engagement-shapes` |
| Research | `research-library` |
| Contact | `inquiry-form`, `inquiry-success` |

**8 existing primitives restyled** rather than replaced — `PageHero`,
`SectionHeading`, `Section`, `Container`, `CTA`, `Button`, `Card`,
`MaturityBadge`. These are shared by roughly 25 routes the prototype does not
cover, and restyling them is what stops the site reading as two unrelated
visual systems. `CTA` now delegates to the redesigned closing band, so every
page on the site ends the same way.

The prototype's accessibility work was carried over intact: keyboard handling
on every tablist, `aria-live` on async regions, the focus trap on the mobile
menu, and the `DemoLabel` the design treats as mandatory on any surface showing
simulated data.

## 4. Pages redesigned

| Route | State |
| --- | --- |
| `/` | Rebuilt — 7 prototype sections plus the existing market-signals section |
| `/control` | **New.** Hero, execution gap, 6 capabilities, 6-view console, 9-point lifecycle, limits |
| `/labs` | Rebuilt — 4 featured cards with live previews, 5 in the table |
| `/services` | Rebuilt — 6 solution areas, readiness check, cloud explorer, engagement shapes |
| `/research` | Rebuilt — search, type and topic filters, featured item, frameworks panel |
| `/about` | Rebuilt — philosophy, leadership, vision, organisation |
| `/contact` | Rebuilt — 3-step inquiry form, wired to the live endpoint |
| `/not-found` | Rebuilt |
| `/ark-control` | **Removed**, 308 to `/control`. See §4.1 |

All 52 other routes keep their URLs, their content and their behaviour, and
inherit the new palette and type through the restyled primitives.

### 4.1 Reconciliation with the real console (PR #18)

While this work was in progress, **"Put the Agent Control console on the site"**
merged to `main`. It added a real operator console — 71 pages captured from a
running ARC Control server at revision `9dd75e3` and published as static HTML
under `public/ark-control/console/` — plus an `/ark-control` page showcasing it,
a rewrite keeping `/ark-control/console` clean, a `Button` fix for static-file
hrefs, and a test file.

That collided directly: this branch removes `/ark-control`. Resolved by taking
everything of value from both sides:

| From `main` | Disposition |
| --- | --- |
| `public/ark-control/console/**` (71 pages) | **Kept, untouched.** Editing a captured page would falsify what it is evidence of. |
| The `/ark-control/console` rewrite | **Kept.** Verified not to collide with the `/ark-control` redirect — Next matches that source exactly, not as a prefix. |
| `Button` static-file fix | **Kept**, merged into the restyled button. A same-origin href ending in a file extension needs a plain anchor, because the app router cannot navigate to a file in `public/`. |
| `tests/ark-control-console.test.ts` | **Kept.** One assertion repointed from `app/ark-control/page.tsx` to where the link now lives; every other assertion unchanged. Two assertions added, tying the stated revision and page count to `build.json`. |
| The console showcase section | **Moved into `/control`**, in the new design language, with its Real / Simulated / Inert provenance intact. |
| The rest of `app/ark-control/page.tsx` | **Dropped.** Its problem statement, loop, limits and CTA are all covered by `/control`; keeping both would have meant two product pages for one product. |

The real console is stronger evidence than this branch's invented preview, so
`/control` now runs both in sequence: the interactive preview showing the
direction with data labelled as invented, then the capture showing what
actually runs. That ordering is the difference between a claim and evidence
for it, and it closes recommendation 9 below ahead of schedule.

The capture's only absolute link is back to `/ark-control`, which now 308s to
`/control` — one hop, landing on the product page, covered by a test.

## 5. Features preserved

- **The commerce funnel is untouched.** Paddle checkout, webhook, Supabase
  store, token-gated downloads, the `/offer` ad landing pages and their
  chrome suppression. All 74 existing tests still pass unmodified.
- **The contact endpoint stays backward-compatible.** `stage` and `topic` still
  work, so `components/contact-form.tsx` and every `?topic=` deep link
  elsewhere on the site behave as before. Verified with a legacy-shaped
  payload (§9).
- **All 11 existing redirects** verified returning 308 to the right targets.
- **All 9 research articles**, 8 advisory engagements, 3 workshops, 4 case
  studies, 3 free frameworks and 9 Labs tools render from the same modules.
- The scorecard, diagram, market-signals and alternatives-table components.
- Theme switching, which 30-odd routes depend on, including on the redesigned
  pages — the prototype had no dark mode, so one was derived (§8).

## 6. New features implemented

- **ARC Control as a product page**, with a six-view interactive console
  preview behind a mandatory demonstration-data label.
- **Agent execution visualization** on the homepage: four scenarios —
  verified, silent failure, held for approval, unverifiable — each a worked
  illustration of one failure mode from `executionGap` in `lib/ark.ts`.
- **Interactive ecosystem map** of the four parts of ARC.
- **Six-question AI readiness check**, scored in the browser, nothing stored,
  recommending the two weakest dimensions and linking to the matching solution.
- **Cloud architecture explorer** toggling a reference estate between a typical
  current state and a modernized one.
- **Four live Labs previews** — MCP conformance, prompt review, connectivity
  grading, AI fit — simulated and labelled as such, each linking to the real tool.
- **Three-step inquiry form** with per-step validation, error summaries, focus
  management, and six new fields reaching the endpoint.
- **Per-capability maturity on ARC Control.** Not in the prototype; added
  because the brief warns against claiming every capability is implemented.

## 7. Obsolete content removed

**The four excluded consumer applications were already absent from `main`.** A
case-insensitive search across every `.ts`, `.tsx`, `.md` and `.json` file
returns nothing for ARC Travel, CLIMB UP, MIRROSU or Steady Move. The work was
to keep them absent and make that durable:

- `tests/arc-redesign.test.ts` asserts all four names appear in none of
  sixteen content modules, including the spaced, unspaced and hyphenated forms.
- A Playwright test re-checks the rendered body text of ten routes.
- The page-level audit scans all 66 rendered pages.

No independent repository was touched.

**Also removed or retired:**

- `/ark-control`, replaced by `/control` with a permanent redirect. It is
  dropped from the sitemap, because a redirecting URL in a sitemap is a soft
  error in Search Console.
- "Agent Control" as a product name, now ARC Control across five prose
  locations, the structured data and the pricing FAQ. The slug stays, so
  redirects and anything keyed on it keep working.
- The decorative masked-gradient grid on `PageHero` and the product shell. The
  design direction asks for fewer gradients.
- ARC Skills, Reference Architectures and AI Workflow Templates are **not**
  featured on `/labs`. Their Labs URLs already redirect into `/playbook/ship`,
  so they were retired into the paid playbook before this work; `/labs` now
  says where they went instead of pretending they were never published.
- The prototype's own placeholders: the research drawer that showed a summary
  with a note that the full piece lives on the current site, the "no message
  was sent" form notice, and a confirmation reference number generated from
  `Date.now()` that ARC could not have looked up.

## 8. Dependencies changed

| Package | Change | Reason |
| --- | --- | --- |
| `framer-motion@11.18.2` | **Added** | Load-bearing in 7 components. Kept out of the root layout, so it loads only on routes that animate. |
| `@playwright/test` | **Added (dev)** | Browser journeys. |
| `tailwindcss` | **Kept at 3.4.7** | The export is Tailwind v4. Upgrading would touch every existing component and the whole commerce surface for no visual gain; the v4 `@theme` tokens were ported into the v3 config instead, so every prototype class string compiles unchanged. |
| `lucide-react` | **Kept at 0.417.0** | Every icon the export uses exists in it. |
| `react-router-dom`, `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite` | **Not added** | App Router; no second build system. |
| `@radix-ui/react-icons` | **Not added** | Used for one glyph; inlined as SVG. |
| `date-fns` | **Not added** | No export file imports it. |

IBM Plex Serif was added through `next/font`, self-hosted, rather than the
prototype's Google Fonts `@import` — no extra connection, no layout shift.

**Bundle effect.** Shared first-load JS is unchanged at 87.3 kB.

| Route | First load |
| --- | --- |
| `/privacy` (shell only) | 87.5 kB — identical to baseline |
| `/about` | 96.3 kB — lower than the 104 kB baseline |
| `/research` | 131 kB |
| `/contact` | 137 kB |
| `/labs` | 142 kB |
| `/` | 148 kB |
| `/services` | 153 kB |
| `/control` | 157 kB |

`/contact` was 175 kB before the animation library was taken off it.

## 9. Testing results

Everything below was executed. Nothing is reported as passing that was not run.

### Passed

| Check | Evidence |
| --- | --- |
| Dependency installation | `npm ci` — 510 packages |
| Lint | `npm run lint` — no ESLint warnings or errors |
| Type checking | `tsc --noEmit` — clean, strict mode |
| Unit tests | `npm test` — **150 passed** (74 pre-existing + 9 from PR #18 + 67 new) |
| Production build | `npm run build` — 60 routes, no errors |
| Route verification | 68 URLs against `next start` — **all 200** |
| Redirects | 11 existing + 1 new — all 308 to the correct target |
| 404 | Unknown path returns 404 with the designed page |
| Contact API | 8 cases: extended payload 200, honeypot accept-and-drop 200, missing name 400, bad email 400, wrong content-type 415, GET 405, legacy payload 200. Server log confirms all 12 fields arrive, including the 6 new ones. A CRLF in `name` and `company` arrives as spaces while a newline in the message body survives |
| Browser journeys | **22 Playwright tests passed** (below) |
| Console errors | Zero on all 7 redesigned routes |
| Excluded products | Absent from 66 rendered pages, 16 content modules and 10 route body texts |
| Heading hierarchy | Exactly one `<h1>` per page across 66 pages; no skipped levels |
| Canonical URLs | Present and self-referential on all 66 indexable pages |
| Titles, descriptions, Open Graph | Present on all 66 |
| Internal links | All 81 distinct internal targets resolve |
| `target="_blank"` safety | Every external link carries `rel="noreferrer"` |
| Image alt text | No `<img>` without `alt` (the site uses inline SVG throughout) |
| Responsive layout | No horizontal overflow at 390px or 1280px on any redesigned route |
| Dark mode | Verified by screenshot on `/` and `/control` |

| Console showcase | `/ark-control/console` and its static files all 200; the `/ark-control` redirect does not shadow them |
| Structured data | All 5 JSON-LD blocks escape `<`, `>`, `&` and the two JavaScript line terminators, and parse back to the original JSON |

The 22 browser journeys: console-error-free rendering on 7 routes; navigation
to every primary destination; the mobile menu opening, taking focus and
closing on Escape; ARC Control stating its maturity above the fold and
offering no purchase; all six console views opening; a capability link opening
the matching view; Labs maturities and verified tool URLs; the excluded
products absent; the readiness check scoring end to end; a solution deep link;
research rows reaching real article pages; the inquiry form validating,
rejecting a bad email, submitting and confirming; keyboard-only access via the
skip link; no horizontal overflow at two viewports; the real console
showcase reachable from `/control`; and the capture's back-link landing on the
product page.

### Hardening

Two surfaces this branch widens were tightened before merge. Neither was a
reachable exploit; both are on paths that changed here.

- **Control characters in the inquiry fields.** Six new fields reach the
  notification email and three of them (`name`, `company`, `type`) land in its
  subject. `clampField` trimmed and truncated but passed control characters
  through, so a CR or LF could split a line. Resend takes JSON and encodes
  headers itself, so this was not live header injection — but a field that
  becomes one line of an email should not be able to contain a newline.
  Single-line fields now have control characters replaced with a space;
  `message` and `technical` keep their line breaks and lose only non-printing
  characters.
- **JSON-LD serialization.** This branch added four structured-data blocks
  beside the existing one, all rendered with `dangerouslySetInnerHTML`.
  `JSON.stringify` does not escape `<`, so `</script>` inside a string would
  close the tag early. Every block is built from authored content modules
  rather than user input, so nothing reachable is at risk today — but a page
  that is safe only because of what the data happens to contain is one content
  edit away from not being. All five now go through `jsonLdScript`.

Five tests cover both.

### Not tested

| Check | Why |
| --- | --- |
| **External link verification** | The environment's network policy denies outbound CONNECT to all but an allowlist. 49 of the 50 distinct external URLs — including `linkedin.com` and `nist.gov` — return `ENOTFOUND` from inside the container, and a control request to `example.com` fails the same way, so the result says nothing about the links. Every URL was instead confirmed against `lib/content.ts`, which is the repository's record, and none was invented. This needs re-running from an unrestricted network before merge. |
| **Lighthouse / Core Web Vitals** | No Lighthouse in the container and no deployed URL to measure. Bundle sizes are reported above as the available proxy. |
| **Cross-browser** | Chromium only; the image ships no Firefox or WebKit build. |
| **Automated axe/WCAG audit** | No axe runner installed. The accessibility checks above are structural and behavioural, not a full WCAG sweep. |
| **Contrast ratios** | Computed from the prototype's palette rather than measured with a tool. The dark-mode values were derived, not verified against 4.5:1 instrumentally. |

### Requires credentials

| Check | What is missing |
| --- | --- |
| **Contact email delivery** | `RESEND_API_KEY`. The route is verified end to end up to the Resend call: without the key it logs the full payload and returns `ok` with a warning, which is the designed preview behaviour. That the message reaches an inbox has **not** been demonstrated. |
| **Paddle checkout** | Live Paddle keys and price IDs. Untouched by this work and covered by the 74 existing tests, but no live transaction was run. |
| **Playbook download** | Supabase credentials. Same position. |

### Requires manual verification

- Sign-off that the implementation matches the approved design. The prototype
  cannot be run (§2), so there is no screenshot to diff against; fidelity was
  checked by reading class strings across, and by reviewing rendered pages.
- The commercial copy on `/control`, `/services` and `/about`, including the
  six solution areas, which were composed from existing material rather than
  written by the business.
- Whether the invented console and execution data read as credible to a
  security or platform buyer.

## 10. Known issues

1. **External links are unverified from this environment** (§9). The most
   likely breakage is a `*.vercel.app` deployment having been renamed or torn
   down; `/labs` would then offer a dead "Open tool" link.
2. **Legacy routes inherit the palette and type, not the layouts.**
   `/platform`, `/developers`, `/work`, `/advisory`, `/academy`, the playbook
   pages and the three agent-infrastructure product pages read as the same
   brand but keep their original section structure. They are coherent, not
   redesigned.
3. **Dark mode on the redesigned pages is derived, not approved.** The
   prototype is light-only. Light mode is the default and is what was signed
   off; the dark palette is a mechanical derivation and has not had a design
   review.
4. **The mobile navigation has no exit animation.** Keeping the panel mounted
   and transitioning `visibility` broke the focus move — `visibility` is a
   discrete property, so the panel is still computed-hidden on the frame the
   class lands and `.focus()` does nothing. Conditional mounting fixes focus
   and costs the exit transition. Correct trade, visible difference.
5. **`/control` carries the largest route bundle at 157 kB** first load, from
   the six console views and the animation library. Acceptable for a product
   page; worth splitting the console behind an intersection observer if
   `/control` becomes an ad destination.
6. **The step counter in the readiness check updates ~180 ms before the
   previous question animates out.** Imperceptible to a sighted user and not
   in an `aria-live` region, so nothing is announced, but it is a real
   inconsistency during the transition. It is what made the first version of
   the Playwright test flake, which is how it was found.
7. **`labsProof.tools` and similar derived counts** were not audited for
   staleness beyond the Labs catalogue itself.
8. **No CI workflow exists in the repository**, so none of these checks runs
   automatically on push. See §11.

## 11. Production deployment requirements

**Before merge:**

1. Re-run external link verification from an unrestricted network
   (`npm run build && npm run start`, then crawl the `https://` hrefs). Fix or
   remove any dead tool link before `/labs` ships.
2. Business sign-off on the `/control`, `/services` and `/about` copy.
3. Confirm ARC Control's maturity wording is what the company wants to say
   publicly — the page states plainly that it cannot be bought.

**At deploy:**

4. `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` must be set, or
   inquiries will be logged and silently dropped. This is the single highest
   consequence item in the release: the form will return success either way.
5. All existing Paddle and Supabase variables carry over unchanged — see
   `.env.example`. Nothing in this branch changes them.
6. `/ark-control` is an indexed URL. The 308 must be live at cutover.

**After deploy:**

7. Submit the updated sitemap and watch Search Console for the canonical
   change. Most routes previously declared the homepage as canonical (§ below);
   correcting it should improve indexing, but it is a change worth monitoring.
8. Run Lighthouse against the deployed URL and record the Core Web Vitals that
   could not be measured here.
9. Verify one real inquiry arrives in the inbox.

**Not done, by instruction:** nothing was deployed and nothing was merged.

### The canonical fix

Worth flagging separately because it is a pre-existing bug this branch
corrects rather than a redesign change. The root layout declared
`alternates: { canonical: "/" }`, and Next inherits root metadata into every
route that does not override it — so `/research/<slug>`, `/work/<slug>`,
`/advisory/<slug>` and about twenty other pages were telling crawlers they
were duplicates of the homepage. Every route now declares its own canonical,
verified self-referential across 66 rendered pages.

## 12. Remaining recommendations

**High value, small effort**

1. **Add a CI workflow.** `npm ci && npm run lint && npm run typecheck &&
   npm test && npm run build`, plus `npm run test:e2e` against the built app.
   The suite exists and takes under two minutes; nothing runs it automatically.
2. **Verify external links in CI** on a weekly schedule. The Labs catalogue
   points at nine independently deployed tools and nothing currently notices
   when one disappears.
3. **Set the Resend variables before the first production deploy**, and add a
   smoke check that posts to `/api/contact` after deploy.

**Design**

4. **Convert the remaining legacy routes** to the new layouts, in order of
   traffic: `/platform`, `/work`, `/advisory`, then the playbook pages. They
   are coherent now; they are not yet designed.
5. **Have the derived dark palette reviewed**, or decide the site is
   light-only and remove the toggle. The current position is a reasonable
   default, not a decision.
6. **Give `/labs/[slug]` and `/research/[slug]` the new article layout.** They
   are the deepest pages on the site and still use the original shell.

**Product**

7. **Decide what `/platform` is for.** It now overlaps `/control` and
   `/services`, and the redesign's IA does not have a place for it. Fold it
   into one of them, or give it a distinct job.
8. **Reconcile the two readiness assessments.** The six-question check on
   `/services` and the twenty-question scorecard at
   `/playbooks/agent-readiness-scorecard` ask different questions for
   different reasons; the pages cross-link, but a visitor may not see why both
   exist.
9. **Replace the invented console data with a design partner's anonymised
   run** once one agrees. The demonstration label is honest, and real evidence
   would be far more persuasive.

**Engineering**

10. **Lazy-load the console** behind an intersection observer if `/control`
    becomes a paid-traffic destination.
11. **Add visual regression snapshots** now that Playwright is wired up, so
    future changes to the shared primitives cannot silently alter 25 routes.
12. **Consider Tailwind v4** as a separate, isolated piece of work. It is the
    direction the design system came from; it was correctly out of scope here.

---

## Implementation readiness score: 86 / 100

Scored against the evidence in §9, not against impression.

| Dimension | Score | Evidence |
| --- | --- | --- |
| Design integration | 18 / 20 | All 8 prototype pages and 30 components ported; tokens, type scale, spacing and interactions preserved; 8 shared primitives restyled so ~25 unconverted routes match. −2: those routes keep their original layouts, and dark mode is derived rather than approved. |
| Functional correctness | 19 / 20 | 150 unit tests, 22 browser journeys, 68 routes at 200, 12 redirects correct, zero console errors, contact API verified across 7 cases including the legacy payload. −1: email delivery needs credentials and is unproven. |
| Preservation of existing behaviour | 20 / 20 | 74 existing tests pass unmodified; commerce untouched; every URL kept or permanently redirected; every dropped nav item still reachable from the footer, asserted by test. PR #18's console, rewrite, Button fix and tests all preserved through the merge (§4.1). |
| Security | — | Not scored separately; covered under functional correctness. The honeypot, length clamps, method guards and the `noindex` on token-scoped routes are unchanged; control-character stripping and JSON-LD escaping were added (§9). |
| Claims discipline | 19 / 20 | No invented capability, metric, customer or URL. Every maturity reads from one taxonomy. Simulated data is labelled everywhere it appears. The four excluded apps are absent and three independent checks enforce it. −1: the console and execution data are invented; labelled, but a buyer must take the label seriously. |
| SEO | 14 / 15 | Canonicals corrected on 66 pages — a pre-existing bug fixed; per-route titles, descriptions, Open Graph and structured data; sitemap excludes redirecting URLs; all 11 redirects preserved. −1: no post-deploy Search Console confirmation is possible yet. |
| Accessibility | 12 / 15 | One `<h1>` per page, no skipped heading levels, keyboard tablists, focus trap with a regression test, visible focus rings, reduced motion honoured in both CSS and framer-motion, no overflow at 390px. −3: no automated axe pass and no instrumented contrast measurement. |
| Performance | 8 / 10 | Shared bundle unchanged at 87.3 kB; `/about` and `/privacy` lighter than baseline; fonts self-hosted; animation library kept off the layout and off `/contact`, which dropped 175 → 137 kB. −2: no Lighthouse or Core Web Vitals measurement was possible. |
| Documentation | 10 / 10 | Audit and this report; the prototype preserved with a file-by-file map; every non-obvious decision commented at the point it was made. |
| Deployment readiness | 6 / 10 | Builds clean and runs; all requirements enumerated in §11. −4: external links unverified from this environment, no CI, and the Resend variables are a silent-failure risk. |

**Total: 86 / 100** — ready for review and a staging deploy. The four points
that would move it highest are mechanical: verify the external links from an
unrestricted network, set the Resend variables, add a CI workflow, and run
Lighthouse against a preview URL.
