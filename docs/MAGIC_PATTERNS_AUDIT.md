# Magic Patterns redesign — integration audit

**Date:** 2026-10-23
**Branch:** `feature/magic-patterns-redesign`
**Baseline commit:** `e0a3546` (`main`)
**Magic Patterns upload:** `7cd519b` ("Add files via upload")

This is the Phase 1 discovery record: what the production application is, what
the Magic Patterns export actually contains, where the two conflict, and the
decisions taken before any integration code was written.

---

## 1. Existing production application

| | |
| --- | --- |
| Framework | Next.js 14.2.35, App Router, React 18.3.1, TypeScript 5.5 strict |
| Styling | Tailwind CSS 3.4.7, `darkMode: "class"`, HSL design tokens in `app/globals.css`, `tailwindcss-animate` |
| Fonts | `next/font/google` — IBM Plex Sans (400/500/600/700), IBM Plex Mono (400/500), self-hosted |
| Theming | `next-themes` 0.3, class attribute, `defaultTheme: "light"`, `enableSystem` |
| Icons | `lucide-react` 0.417 plus a local `components/icon.tsx` allowlist |
| Analytics | `@vercel/analytics` `<Analytics />` in the root layout; `lib/analytics.ts` wraps typed playbook events |
| Commerce | Paddle (`@paddle/paddle-js` + server webhook), Supabase-backed store, token-gated downloads |
| Email | Resend via `RESEND_API_KEY`, used by `/api/contact` and `lib/commerce/email.ts` |
| Tests | Vitest 2.1.9 — 4 files, 74 tests, all commerce/token logic. No component or route tests. |
| Deployment | Vercel (inferred: `@vercel/analytics`, `.env.example` Vercel vars, no CI workflow in-repo) |
| Lint | `next lint` via `.eslintrc.json` (`{"extends": "next/core-web-vitals"}`) |

### Baseline check results (run before any change)

| Check | Result |
| --- | --- |
| `npm ci` | **Passed** — 510 packages |
| `npm run typecheck` | **Passed** |
| `npm test` | **Passed** — 74/74 |
| `npm run build` | **Passed** — 60 routes compiled |

### 1.1 Routes (60, from the baseline build)

**Marketing / content**
`/` · `/about` · `/services` · `/services/[slug]` (modernize, automate, build, operate) ·
`/advisory` · `/advisory/[slug]` (8) · `/labs` · `/labs/[slug]` (9) ·
`/research` · `/research/[slug]` (9) · `/academy` · `/academy/[slug]` (3) ·
`/work` · `/work/[slug]` (4) · `/contact` · `/privacy` · `/terms`

**Product**
`/platform` · `/ark-control` · `/agent-readiness` · `/ai-fit` · `/ai-fit-teams` · `/developers`

**Commerce (Playbook)**
`/playbook` · `/playbook/[slug]` (define, build, ship) · `/playbook/success` ·
`/playbook/download/[token]` · `/playbooks` · `/playbooks/agent-operating-contract` ·
`/playbooks/agent-readiness-scorecard` · `/playbooks/outcome-assurance-checklist` ·
`/offer` · `/offer/[slug]` (3)

**Infrastructure**
`/api/contact` · `/api/paddle/webhook` · `/api/playbook/download` ·
`/sitemap.xml` · `/robots.txt` · `/icon` · `/apple-icon` · `/opengraph-image` · `/_not-found`

### 1.2 Content model (the source of truth for copy)

| Module | Lines | Holds |
| --- | --- | --- |
| `lib/content.ts` | 1553 | `site`, `nav`, `secondaryRoutes`, `labs` (9 products), `advisoryEngagements` (8), `academy` (3), `caseStudies` (4), `retainers` (5), `marketSignals` (dated + sourced), `alternatives`, `faqs`, the `Status`/`Maturity` taxonomies |
| `lib/research.ts` | 938 | 9 full research articles with sections and numbered citations |
| `lib/ark.ts` | 352 | `arkProducts` (4), `executionGap`, `agentLifecycle` (9 steps), `operatingContract`, `developerAreas` |
| `lib/services.ts` | 201 | 4 `serviceAreas`, `homeHero`, `homeSymptoms`, `homeClose` |
| `lib/learn.ts` | 431 | 3 free playbooks/frameworks, the 20-question agent-readiness scorecard and its bands |
| `lib/playbook.ts` / `lib/offer.ts` | 283 / 55 | Paid playbook tiers, pricing env mapping, ad-landing copy |

`docs/WRITING.md` sets the editorial rules the copy is held to: name the
situation before the technology, show evidence instead of claiming
credibility, never state a capability as further along than it is.

### 1.3 Existing components (28)

`site-header`, `site-footer`, `brand`, `theme-provider`, `theme-toggle`,
`contact-form`, `page-hero`, `cta`, `product-card`, `product-visual`,
`ark-product-page`, `diagram`, `scorecard`, `market-signals`,
`alternatives-table`, `faq-list`, `icon`, `ui/{button,card,badge,section}`,
and 9 under `components/playbook/`.

### 1.4 Backend, forms, integrations

- **`POST /api/contact`** — JSON only, `company_website` honeypot (accept-and-drop,
  so bots get no signal), per-field length clamps, email regex, Resend delivery
  when `RESEND_API_KEY` is set, otherwise logs and returns `ok` with a warning so
  preview environments still work. Clean `405` for every other method.
- **`POST /api/paddle/webhook`** — signature verification, idempotent fulfilment.
- **`GET /api/playbook/download`** — token-gated, download-count limited.
- **`robots.ts`** disallows `/playbook/download/`, `/playbook/success`, `/api/`.
- 11 permanent redirects in `next.config.mjs` covering earlier renames
  (`/studio` → `/advisory`, retired Labs tools → `/playbook/ship`, etc.).

### 1.5 SEO configuration

Root `metadata` with `metadataBase`, title template, keywords, Open Graph,
Twitter card, canonical, robots. Organization JSON-LD in the root layout.
Dynamic `opengraph-image`, `icon`, `apple-icon`. `sitemap.ts` composes routes
from the content modules, so a new content entry enters the sitemap
automatically.

---

## 2. The Magic Patterns export

### 2.1 Is there more than one?

**No.** A single upload commit (`7cd519b`), from a single design
(`magicpatterns.com/os/g9X9bb18CQmpM5fHyi3DAP/33VKF1ETzrgP4D6oc6ZeZq`). No
competing or partial exports exist on any branch — `git log` across all 21
remote branches shows this as the only one. So there was no selection to make.

### 2.2 What it contains

54 `.tsx` files, `index.css`, `index.html`, `vite.config.ts` — **all flat at the
repository root** — plus modified `package.json` and `README.md`.

- 8 pages: Home, Control, Labs, Services, Research, About, Contact, NotFound
- 5 UI primitives: Button, Container, SectionIntro, StatusBadge, DemoLabel
- 6 shared: Nav, Footer, Brand, RouteEffects, ClosingCta, AgentExecution
- 8 console views + ConsoleSkeleton + ViewHeader + Pill
- 5 ARC Control sections, 7 home sections, 3 Labs, 4 Services, 2 Research, 2 Contact

The design is strong and unusually disciplined: a real status taxonomy, a
`DemoLabel` component that is *required* on every surface showing simulated
data, a "What ARC Control is not" section, keyboard handling on every tablist,
`aria-live` on async regions, focus traps on the mobile menu and research
drawer, and a `prefers-reduced-motion` block in the CSS. Several files carry
comments citing this repository as the source of their figures
(`Expertise.tsx`: "Figures are the repository's own cited claims
(`lib/content.ts`), not new numbers"; `Lifecycle.tsx`: "From the repository's
`agentLifecycle` (lib/ark.ts)"). The prototype was written to be integrated,
not admired.

### 2.3 What it is missing — the main finding

**Every data module the components import was left out of the upload.** Eleven
of them:

```
data/architecture  data/console   data/ecosystem   data/execution
data/inquiry       data/methodology  data/products  data/readiness
data/research      data/services  data/site
```

Consequences:

- The prototype **cannot run as exported.** `npm run dev` inside the export
  fails on unresolved imports. There is no way to screenshot the prototype as
  the baseline for a visual diff.
- Every string of content in the data layer — the four ecosystem nodes, the six
  readiness questions, the eight service areas, the console's fictional
  company, the execution scenarios, the project-type options — had to be
  **reconstructed**. Each component's usage pins the shape exactly (field names,
  union members, array lengths implied by grid classes), so the shapes are not
  guesswork; the *content* had to come from somewhere.
- It came from this repository. `lib/content.ts`, `lib/ark.ts`,
  `lib/services.ts`, `lib/research.ts` and `lib/learn.ts` supplied every real
  claim. Nothing was invented except the explicitly fictional console and
  execution-trace data, which the design already requires to carry a
  `DemoLabel`.

### 2.4 Destructive side effects of the upload

| File | What happened | Action |
| --- | --- | --- |
| `package.json` | Replaced with the prototype's Vite manifest. Dropped `next`, `react-dom`, `@paddle/paddle-js`, `@vercel/analytics`, `next-themes`, `server-only`, every script including `build`, `test`, the whole `playbook:*` toolchain, and all devDependencies. | Restored from `main` |
| `README.md` | 407 lines of project documentation replaced by 15 lines of Magic Patterns boilerplate. | Restored from `main` |

Merging this branch as uploaded would have produced a repository that cannot
build, test, or sell anything.

---

## 3. Conflicts between the two systems

### 3.1 Tailwind v4 vs v3 — the significant one

The export uses **Tailwind v4**: `@import 'tailwindcss'`, an `@theme` block,
`@tailwindcss/vite`, Vite 8. Production is **Tailwind v3.4** with
`tailwind.config.ts`, `@tailwind base/components/utilities`, PostCSS, and
`tailwindcss-animate`.

A v4 upgrade would touch every one of the 28 existing components (they use
`bg-background`, `text-muted-foreground`, `border-border/60`, `container`,
`animate-fade-up`) and the whole commerce surface, for no visual gain.

**Decision: stay on Tailwind v3 and port the token layer.** Every MP `@theme`
colour is registered in `tailwind.config.ts`, so MP class names
(`bg-canvas`, `text-ink-2`, `border-line`, `bg-night`, `text-mist`,
`border-brand-on-dark/35`, `font-serif`, `divide-night-line`) compile byte-identically.
Tailwind 3.4 already supports the arbitrary values (`text-[14.5px]`) and the
`has-[:focus-visible]:` variant the prototype relies on.

### 3.2 Light-only design vs a site with a dark mode

The prototype is a light design with deliberate dark sections (`bg-night`,
`dark-surface`) and has no theme toggle. Production ships `next-themes`, a
toggle in the header, and a full dark palette that 30+ legacy routes depend on.

Dropping the toggle would regress those routes. Making the MP colours absolute
would hand a dark-mode visitor a white homepage.

**Decision: split the palette by role.**

- **Content surfaces** (`canvas`, `paper`, `ink`, `ink-2`, `ink-3`, `line`,
  `line-strong`, `brand`, `brand-subtle`) are CSS custom properties that flip
  under `.dark`. Light mode is the approved design exactly; dark mode is a real
  dark mode.
- **Dark panel surfaces** (`night`, `night-2`, `night-3`, `night-line`, `mist`,
  `mist-2`) stay dark in both themes, and *lift* a step in dark mode so a panel
  still reads as a panel against a dark page. This is the rule the existing
  `--panel` token already set, with the comment "Deliberate in both themes
  rather than inherited."
- The **legacy semantic tokens** (`background`, `foreground`, `muted`, `accent`,
  `primary`, `border`, `input`, `ring`, `card`, `panel`) are re-pointed as
  aliases onto the same variables. Legacy routes therefore adopt the Magic
  Patterns palette with no edits, which is where most of the cohesion comes
  from. Keeping the HSL-triplet format preserves every opacity modifier
  (`border-border/60`, `bg-background/80`).

One consequence to carry through the port: MP writes `bg-ink text-white`, which
inverts badly in dark mode (ink becomes light). Every `text-white` on an
ink-filled surface becomes `text-canvas`.

### 3.3 Routing

`HashRouter` with 8 client routes vs the App Router with 60 file routes.
`RouteEffects.tsx` imperatively sets `document.title` and the meta description
on navigation — in Next that is the framework's job, so `RouteEffects` is
dropped in favour of a `metadata` export per route (better: it reaches crawlers
that do not run JS). `react-router-dom` is not added.

### 3.4 Duplicate components

Both systems define components with the same job. None are merged in place —
the MP versions land under `components/arc/` and the legacy versions stay where
they are, so legacy routes keep working while the redesigned routes get the new
shell.

| Concern | Existing | Magic Patterns | Resolution |
| --- | --- | --- | --- |
| Header | `components/site-header.tsx` (dropdowns, theme toggle, offer mode) | `Nav.tsx` (flat nav, focus-trapped mobile panel) | New `components/arc/nav.tsx` carries the MP design **plus** the theme toggle and the `/offer` chrome-suppression the commerce funnel needs |
| Footer | `components/site-footer.tsx` | `Footer.tsx` | New footer on the MP design, extended with the legacy routes so nothing becomes unreachable |
| Button | `ui/button.tsx` (variant/size, Link-aware) | `ui/Button.tsx` (5 variants, arrow affordance) | Both kept; MP version as `components/arc/ui/button.tsx` |
| Container | `ui/section.tsx` `Container` (Tailwind `container`) | `ui/Container.tsx` (`max-w-[1240px]`) | MP version for redesigned routes; existing `container` width retuned to 1240px so legacy routes line up |
| Status badge | `ui/badge.tsx` `MaturityBadge` (7 maturities) | `ui/StatusBadge.tsx` (6 statuses) | **Unified on the existing `Maturity` taxonomy** with MP styling — see §4.2 |
| Product card | `product-card.tsx` + `product-visual.tsx` | `labs/ProductCard.tsx` + `LabPreview.tsx` | MP version on `/labs`; existing version still serves `/labs/[slug]` and `/work` |
| Contact form | `contact-form.tsx` (single step, wired) | `contact/InquiryForm.tsx` (3 steps, mocked) | MP design, wired to the real endpoint — see §4.3 |

### 3.5 Dependency conflicts

| Package | Export wants | Production has | Decision |
| --- | --- | --- | --- |
| `tailwindcss` | 4.3.1 | 3.4.7 | **Keep 3.4.7** (§3.1) |
| `lucide-react` | 0.577.0 | 0.417.0 | **Keep 0.417.0.** Every icon the export uses exists in it. Bumping is churn with no benefit. |
| `react-router-dom` | 6.30.2 | — | **Not added.** App Router. |
| `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite` | yes | — | **Not added.** |
| `framer-motion` | 11.18.2 | — | **Added.** It is load-bearing in 10 components, honours `prefers-reduced-motion` through `<MotionConfig reducedMotion="user">` and `useReducedMotion()`, and route-level code splitting keeps it off pages that do not animate. Rewriting ~1,000 lines of motion code in CSS would risk the approved feel for about 34 kB gzipped. |
| `@radix-ui/react-icons` | 1.3.2 | — | **Not added.** Used for exactly one glyph (`GitHubLogoIcon`); replaced with an inline SVG. |
| `date-fns` | 4.1.0 | — | **Not added.** No export file imports it. |
| `typescript` | 5.9.3 | 5.5.4 | **Keep 5.5.4.** |

### 3.6 Content and naming conflicts

| Prototype says | Repository says | Resolution |
| --- | --- | --- |
| Product is **ARC Control** at `/control` | Product is **Agent Control** at `/ark-control` | Adopt the prototype's name and route — it is the commercial decision this redesign exists to make. `/ark-control` gets a permanent redirect; the old route is indexed. |
| `products` includes a Labs tool with slug `ai-fit` | `ai-fit` is an `arkProduct` at `/ai-fit`, not a Labs tool | Feature the real Labs tools on `/labs`. AI Fit is linked from Solutions and ARC Control, where it belongs. |
| Research has a `Framework` kind | Research kinds are `Benchmark`/`Research`/`Report`; frameworks live in `lib/learn.ts` at `/playbooks/*` | The "Free frameworks" panel reads `lib/learn.ts` and links to the real pages. |
| 8 service areas | 4 `serviceAreas` + 8 `advisoryEngagements` | 6 solution areas (the brief's list) composed from both, with the 4 existing `/services/[slug]` routes and 8 `/advisory/[slug]` routes preserved and linked as the engagements behind them. |
| `ResearchDrawer` shows the summary with "The full piece lives at /research/[slug] on the current site. This prototype shows the summary only." | 9 complete articles already render at `/research/[slug]` | Rows link to the real pages. The drawer is dropped — it is a prototype placeholder standing in for functionality that exists. |
| `InquirySuccess` prints "Prototype confirmation: no message was sent" | `/api/contact` delivers mail | Wired for real; the placeholder notice is removed. |
| Console and execution traces are invented | — | Kept as invented, which is correct for a product in design-partner development, and kept behind the `DemoLabel` the design mandates. |

---

## 4. Decisions carried into implementation

### 4.1 Information architecture

Primary nav: **Solutions · ARC Control · ARC Labs · Research · About** with
*Talk to ARC* as the CTA and Contact in the mobile menu and footer. This is the
brief's recommended structure mapped onto routes that already exist and rank.

**No existing URL is retired.** Only one route is added (`/control`) and only
one redirect (`/ark-control` → `/control`, 308 permanent). Everything the
header no longer links — `/platform`, `/developers`, `/agent-readiness`,
`/ai-fit`, `/ai-fit-teams`, `/advisory`, `/academy`, `/work`, `/playbook`,
`/playbooks`, `/offer`, `/privacy`, `/terms` — stays in the sitemap and gains
footer or in-page links, so nothing loses its internal link path. The 11
existing redirects are untouched.

### 4.2 One status taxonomy, not two

The prototype's `Status` and the repository's `Maturity` overlap but disagree.
Running both would let the same tool show two different maturities.

The existing `Maturity` union wins, rendered in the MP `StatusBadge` style:

| Maturity | Badge |
| --- | --- |
| `available` | Available |
| `design-partners` | Design-partner development |
| `in-development` | In development · not public |
| `open-source` | Open source · live |
| `alpha` | Alpha |
| `experiment` | Experiment |
| `research` | Research |

The brief asks for Available / Beta / In Development / Research. This set covers
all four and is more conservative: the repository claims `alpha`, not `beta`,
for its earlier-stage tools, and `experiment` for the two that are genuinely
experiments. Reporting them as "Beta" would overstate them.

### 4.3 The inquiry form

The MP form is three steps and mocked (`// MOCK: replace with POST /api/contact
(extended payload). See handoff.`). It collects six fields the endpoint does
not accept: `type`, `role`, `size`, `budget`, `timeline`, `technical`.

`POST /api/contact` is extended to accept them, each length-clamped server-side
like the existing fields, and they are appended to the notification email. The
honeypot stays `company_website` — the prototype already matched the field name.
`stage` and `topic` keep working, so `components/contact-form.tsx` and every
`?topic=` deep link elsewhere on the site are unaffected.

### 4.4 Claims discipline

No case study, customer logo, metric, repository link, deployment URL or
maturity label is introduced that is not already in the repository. Specifically:

- `/control` says plainly, above the fold, that ARC Control cannot be bought
  and that the console is fictional, and keeps the prototype's "What ARC
  Control is not" section.
- `/labs` features the 9 real tools from `lib/content.ts` with their verified
  `app`/`github`/`docs` URLs and their recorded maturity. `arc-skills`,
  `reference-architectures` and `ai-workflow-templates` are **not** featured —
  `next.config.mjs` redirects them to `/playbook/ship`, so they were retired
  into the paid playbook and are no longer Labs tools.
- The three proof figures on the homepage (`300+`, `25%`, `3 → 1`) are the
  repository's own cited claims.
- The four excluded consumer applications (ARC Travel, CLIMB UP, MIRROSU,
  Steady Move) are already absent from `main` — a case-insensitive search across
  every `.ts`, `.tsx`, `.md` and `.json` file returns nothing. The work here is
  to keep them absent, including out of any auto-generated portfolio list, and a
  test asserts it.

---

## 5. Gap summary

| | Exists in production | Exists in prototype | Action |
| --- | --- | --- | --- |
| Design tokens | HSL semantic set | `@theme` v4 set | Port to v3, alias legacy tokens |
| Serif typeface | — | IBM Plex Serif | Add via `next/font` |
| Home page | 4 service areas, market signals | 7 sections incl. ecosystem map | Rebuild; keep market signals reachable |
| ARC Control page | `/ark-control` | `/control` + 6-view console | Build `/control`, redirect old |
| Labs page | 9 cards + groups | Cards with live previews | Rebuild on real data |
| Solutions page | 4 areas | 8-area explorer + readiness quiz + cloud explorer | Rebuild as 6 areas |
| Research page | List + filters | Search, type/topic filters, featured | Rebuild, link real articles |
| About page | Team, highlights | Philosophy, leadership, vision, org | Rebuild from `site.team` |
| Contact page | 1-step form | 3-step form, mocked | Rebuild, wire to the live endpoint |
| 404 | Plain | Designed | Rebuild |
| Research article pages | 9 complete | Placeholder drawer | **Keep production**, link to it |
| Commerce funnel | Paddle, tokens, 74 tests | Absent | **Keep production untouched** |
| Scorecard, diagrams, market signals | Working components | Absent | **Keep production** |
| Data layer | `lib/*` | Missing entirely | Reconstruct in `lib/arc/*` from `lib/*` |
| Component tests | None | — | Add for the new pure logic |

---

## 6. Risks accepted

1. **`framer-motion` adds ~34 kB gzipped** to the routes that animate. Accepted
   for design fidelity and a safer port; it is route-split and never loads on
   `/playbook`, `/offer` or the article pages.
2. **Legacy routes inherit the new palette but not the new layout.** They will
   read as the same brand, in the same type and colour, without being rebuilt.
   Full conversion of `/platform`, `/developers`, `/work`, `/advisory`,
   `/academy` and the commerce pages is outside what the prototype covers and is
   listed as a remaining recommendation.
3. **The prototype cannot be run**, so there is no pixel-diff baseline. Fidelity
   was verified by reading the class strings across, not by image comparison.
4. **Dark mode on the redesigned pages is new work**, not an approved design. It
   is derived mechanically from the light palette; light mode is the default and
   is what was signed off.
