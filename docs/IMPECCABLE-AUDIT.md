# IMPECCABLE AUDIT — product design, UX, information architecture, visual hierarchy, conversion

Date: 2026-10-19
Scope: full repository at `e0a3546`, branch `claude/intelligent-brahmagupta-8akujb`.
Method: read every page, component, token file and template; read the rendered
evidence in `uat/*.webp`; ran `npm run build` for real route weights.
No production code was changed in this pass.

Companion document: [`docs/GRILL-AUDIT.md`](./GRILL-AUDIT.md) (commercial).
That audit is treated here as **input, not authority** — §0.2 lists where this
pass confirms it, where it extends it, and the one place it was wrong.

> **Implementation status (added after the audit was written).** The audit pass
> itself changed no code. The findings were then implemented in two commits —
> see [§23](#23-implementation-status) for exactly what shipped, what was left,
> and the one number that still needs your confirmation. The P0 and P1 sections
> below describe the site **as audited**, not as it now stands.

---

## 0. Before the audit: two conflicts in the brief that have to be resolved first

### 0.1 The brief contradicts the decisions approved alongside it

The design brief says the company is evolving toward **ARK Transformation
Systems**, positioned as **"Infrastructure for reliable agent action,"** and
that the homepage must communicate a nine-step chain ending in
VERIFICATION → EVIDENCE → AUDIT.

The eight decisions approved in the same message say the opposite on four
points:

| Decision | Brief implies | Approved |
| --- | --- | --- |
| Q1 Name | ARK is the company | **ARC stays the company. ARK is not the homepage title.** |
| Q3 First product | Infrastructure | **A fixed-fee Agent Access Assessment. No software sold until three are delivered.** |
| Q7 Agent Control | Hero of the site | **Out of the primary navigation until a design partner pays for one connector.** |
| Q8 A2A / runtime | Part of the system picture | **Both stay labelled research.** |

**Resolution used throughout this document:** the *design character* from the
brief is adopted in full — technical, minimal, premium, systems-oriented,
evidence-driven. The *commercial claims* follow the approved decisions. The
site is designed as **ARC Transformation Group selling an Agent Access
Assessment**, using the chain as an explanatory diagram rather than a product
promise.

### 0.2 The brief's own CRITICAL rule forbids the brief's own hero diagram

The brief says:

> Do not visually present roadmap ideas as shipped software.

And two paragraphs earlier it asks for a hero chain ending in
**VERIFICATION → EVIDENCE → AUDIT**.

ARC does not do verification. `/ark-control` says so on its first screen, and
Q7 removes it from the nav. Rendering a nine-node chain as the homepage's
primary visual, undifferentiated, would present four roadmap nodes as shipped
capability — the exact failure the brief prohibits and the exact failure
`docs/WRITING.md` and the `MaturityBadge` system were built to prevent.

**This is the single most important design decision in the audit.** The chain
is the right diagram. It must carry coverage state per node. See §21.1 — one
diagram that explains the category *and* makes maturity unmistakable, doing
the job of two.

### 0.3 Where this pass disagrees with the Grill audit

Verified against the repository, the Grill audit holds on 11 of 12 checkable
claims. One correction and two extensions:

- **Correction.** Grill says "`/platform` needed four cards to look like a
  portfolio, so the grid generated products." The causation is unprovable and
  the phrasing overstates. What is verifiable: `arkProducts` has four entries,
  `/platform` renders them in a `md:grid-cols-2` grid with the flagship spanning
  both columns, and two of the four are duplicates of things elsewhere. The
  duplication is real; the claim about why is not evidence.
- **Extension.** Grill counted five names for the business line. The design
  layer has the same disease at the diagram level: **six different chains**
  describing one process (§21.2). That is worse, because a visitor can skim past
  a name collision but cannot skim past three contradictory pictures.
- **Extension.** Grill scored conversion architecture 2/10 on the absence of
  email capture. The deeper defect is structural: **twenty of the site's
  pages terminate in the same `<CTA>` component**, and one calls it with no
  props at all (`app/work/page.tsx:74`), so the site's closing argument is
  identical regardless of who is reading or what they just read.

---

## 1. Impeccable score: **47 / 100**

| Dimension | Max | Score | One-line verdict |
| --- | --- | --- | --- |
| First-five-seconds comprehension | 15 | **4** | A visitor cannot answer any of the eight required questions above the fold. |
| Information architecture & navigation | 15 | **6** | Six top items, but `/playbook` and `/playbooks` are two businesses one character apart. |
| Visual hierarchy & information density | 15 | **8** | Typography and spacing are disciplined. Everything is a card, so nothing is emphasised. |
| Product visualization & diagrams | 10 | **7** | The diagram primitives are genuinely good. They draw six contradictory processes and one fake dashboard. |
| State / maturity legibility | 10 | **6** | Best-in-class intent. Seven maturity values collapse into three visual treatments. |
| Conversion architecture & CTA system | 15 | **4** | No capture. One terminal CTA for twenty pages. No price anywhere above $20. |
| Accessibility | 10 | **5** | Skip link, reduced-motion and focus rings are right. Form inputs have no programmatic label. |
| Mobile | 5 | **3** | Stacks correctly. One table has no small-screen fallback; signal cards are a card-per-viewport. |
| Design-system quality | 5 | **4** | Tokens, dark mode, one accent used with restraint. Three dead exports. |
| **Total** | **100** | **47** | |

**Read this as a split score.** Visual craft is around 75. Product design —
what the pages communicate, what they ask for, what a visitor does next — is
around 30. This is a well-built site for a business that has not decided what
it is. Almost nothing below asks you to restyle anything.

---

## 2. P0 UX problems — the site actively loses the buyer

### P0-1 · Nobody can tell what this is in five seconds

`app/page.tsx` + `lib/services.ts:172`. The homepage opens:

- Kicker: "AI · Automation · Cloud · Security · Software"
- H1: "Make technology work for your business."
- Lead: "ARC helps growing companies work out what to improve, what to automate and what to build…"

Against the brief's eight required comprehensions, the fold scores **0/8**.
The word "agent" does not appear until the fourth section. The approved first
ICP — the security or system-of-record owner whose vendors already turned
agents on — has no reason to scroll.

### P0-2 · No price exists anywhere above $20

Eight engagements, five retainers, three workshops, two assessments and the
flagship all terminate at "Talk to us." Verified: the only `$` strings in
`app/` and `lib/` outside the commerce stack are `$5`, `$10`, `$20`, `$35`.

This is a *design* problem, not only a commercial one: there is no price
component in the design system, so adding a price has nowhere to land.

### P0-3 · `/playbook` and `/playbooks` are two different businesses, one character apart

| Route | Contents | Buyer |
| --- | --- | --- |
| `/playbook` | Paid PDFs, $5 / $10 / $20, Paddle checkout | Solo founder |
| `/playbooks` | Free scorecard, operating contract, assurance checklist | Platform / security lead |

The nav labels `/playbook` as "Playbooks" (plural) while `/playbooks` has no
nav entry at all. The footer lists both under one "Resources" column. A
mistyped or misremembered URL lands the approved ICP in a $5 founder product.
This is the clearest IA defect in the repository and it is a rename, not a
redesign.

### P0-4 · The hierarchy of states is invisible, which defeats the system's purpose

`components/ui/badge.tsx`. Seven maturity values render into **three** visual
treatments:

| Visual treatment | Values collapsed into it |
| --- | --- |
| Emerald | `available` |
| Amber | `alpha`, `in-development` |
| Brand/teal | `design-partners` |
| **Neutral grey** | **`open-source`, `experiment`, `research`** — and `planned` via `StatusBadge` |

So "open source and supported" and "we are finding out whether this works" are
**pixel-identical**. The brief asks for five unmistakable states
(AVAILABLE / BETA / LABS / RESEARCH / COMING SOON). The site has ten values and
three appearances.

Compounding it: the entire `Status` system — `Status`, `statusLabel`,
`StatusBadge` — is defined, typed, documented and **never rendered anywhere**.
Every `Product` carries `status: "live"` and nothing displays it.

### P0-5 · Form inputs have no programmatic label

`components/contact-form.tsx`. Verified: zero occurrences of `htmlFor` or
`id=` in the file. The `<label>` and `<input>` are siblings, not nested:

```tsx
<label className="mb-1.5 block text-sm font-medium">{label}…</label>
<input type={type} name={name} … />
```

Same pattern on the `select` and the `textarea`. A screen reader announces
"edit text, blank" for every field on the only lead-capture surface on the
site. **WCAG 2.2 A, 1.3.1 and 4.1.2.** This is a ten-line fix and it is the
most serious accessibility defect in the repo.

### P0-6 · Twenty pages end with the same sentence

`components/cta.tsx` has default `title` and `lead`, and is rendered at the
foot of twenty pages. `app/work/page.tsx:74` calls `<CTA />` bare, so the case-
study index closes with "Want this standard of work on your problem?" and two
buttons that appear on every other page.

Both buttons are the same ask at different friction ("Book a 30-min discovery
call" / "Send a note instead"). There is no second kind of conversion anywhere
on the site.

### P0-7 · No email capture exists

Nine free tools, three free frameworks, eight research briefs, and no field
anywhere that accepts an email except the contact form. The scorecard is
explicit about it (`components/scorecard.tsx:146`): *"there is no report to
email you and nothing for us to store."* That is an admirable promise and it
is also the entire top of the funnel going to ground.

### P0-8 · The site ships invented dashboard numbers

`components/product-visual.tsx` renders a fake product UI on every Labs page —
browser chrome dots, a mono title bar, and colour-coded rows:

```
TokenLoop · spend today
Org burn              $514.10     (red)
jordan@ (spike)       $410.60 · 7.8×
Chargeback MTD        $1,180 bill-back
```

The brief's AVOID list names "fake dashboards" explicitly. More damaging:
`docs/WRITING.md` says *"Only publish a number that can be substantiated"*, and
`labsProof.note` says *"We'll publish usage numbers when we have them."* The
single most valuable asset this company has is that it does not invent numbers,
and eleven invented dashboards are the first thing a visitor sees on every tool
page. **Nothing labels them as illustrative.**

This does not mean delete the component — it is well-made and it is the right
*shape*. It means label it, and derive the rows from the tool's published
rules instead of from prose.

---

## 3. P1 UX problems

### P1-1 · The `/platform` dropdown reintroduces the taxonomy the nav was fixed to remove

`lib/content.ts:1465` documents the previous fix: seven capability names in the
bar "asked a visitor to understand our internal taxonomy before they could find
their own problem." The top bar was fixed to six. Then a five-item dropdown was
added under "Agent Infrastructure": Overview / Agent Control / Agent Readiness /
AI Fit / For developers. Four of those five are internal names.

### P1-2 · Two URL depths for the same class of thing

`arkProducts` live at the root (`/ark-control`, `/ai-fit`, `/agent-readiness`,
`/ai-fit-teams`). Labs tools live one level down (`/labs/<slug>`). Service areas
live at `/services/<slug>`. Nothing tells a visitor why "Agent Control" earns a
root URL and "ARC Agent Governance" does not. Root namespace is the scarcest
real estate on a domain and it is spent on the two products that should be
deleted.

### P1-3 · Nav label and page title disagree on the flagship

Nav: *"Agent Control — Permissions and approval gates for agent actions."*
Page: *"Agent Control — Outcome assurance for production AI agents."*

Permissions and outcome assurance are different products. A visitor who clicks
the first expects the second.

### P1-4 · Everything is a card, so nothing is emphasised

Counted across the site: the dominant layout is `grid gap-5` or
`grid gap-px … bg-border` of `Card`s, repeated 4–8 times per page at the same
visual weight. `uat/home-signals-desktop-1280.webp` shows the result — a
three-column field of near-identical rectangles, each carrying nine elements
(label chip, date, headline, five-line paragraph, CTA link, rule, two source
links).

No page has a single dominant element. The `Takeaway` component exists for
exactly this and is used sparingly and well — it is the right instinct,
under-deployed.

### P1-5 · The retainers table has no small-screen fallback

`app/advisory/page.tsx:138` — `min-w-[640px]` inside `overflow-x-auto`, no
alternative. `components/alternatives-table.tsx` solves the identical problem
properly, with a `sm:hidden` card list and a `hidden sm:block` table. The
pattern exists in the repo and was not reused.

### P1-6 · The header dropdown is not keyboard-operable

`components/site-header.tsx`:
- The trigger is a `<Link>` carrying `aria-expanded` — invalid on a link role.
- Opens on `onMouseEnter`/`onFocus`; closes on a 120 ms `onBlur` timer.
- No `aria-haspopup`, no `aria-controls`, no `Escape` handler, no arrow-key
  navigation, no roving tabindex.
- The mobile menu has no focus trap and no `aria-expanded`/`aria-controls` pair
  tied to the panel.

Keyboard users can reach the items by tabbing, but the component announces
itself as something it is not.

### P1-7 · The scorecard's result is never announced

`components/scorecard.tsx`. The progress bar is wrapped in `aria-hidden`, so
screen-reader users get no progress feedback at all. The score, band and
"fix these first" panel update with no `aria-live` region. On completion,
`scrollIntoView` fires without warning.

This is the best-engineered interaction on the site and it is invisible to
assistive technology.

### P1-8 · Headings used as styling

`app/advisory/[slug]/page.tsx:71,77` render `<h2 className="text-sm uppercase">`
as field labels, and line 91 nests an `<h3>` label under a `SectionHeading`'s
`<h2>`. Same pattern at `app/about/page.tsx:93` and
`components/playbook/offer-landing.tsx:226`. A screen-reader heading outline of
`/advisory/<slug>` reads as a list of micro-labels rather than a document.

### P1-9 · The footer ships to the client for one boolean

`components/site-footer.tsx` is `"use client"` solely to call `usePathname()`
and test `isOfferPath()`. Everything else in it is static. The column data,
`arkProducts`, and `site` are all serialised into the client bundle to decide
whether to render a short footer.

Build confirms the cost shape: content pages are **96.3 kB** First Load JS
while `/privacy` and `/terms` are **87.5 kB**. A route group — `app/(site)/` and
`app/(offer)/` with their own layouts — removes the client component and the
branch together.

### P1-10 · Paddle's overlay is hardcoded to light

`components/playbook/checkout-button.tsx` — `settings: { theme: "light" }`. A
visitor in dark mode gets a white overlay at the one moment money changes hands.

---

## 4. P2 improvements

- **P2-1 · Dead exports.** `CardHeader`, `CardTitle`, `CardContent` (`components/ui/card.tsx`) and `StatusBadge` (`components/ui/badge.tsx`) are defined and used nowhere. With them, the `Status` / `statusLabel` types in `lib/content.ts` are dead weight that still has to be maintained on every `Product`.
- **P2-2 · `Kicker` is duplicated inline.** `components/ui/section.tsx` exports `Kicker`; `PageHero`, `offer-landing` and `/playbook` each re-implement the same `text-sm font-medium uppercase tracking-widest text-muted-foreground` by hand. Four copies of one token.
- **P2-3 · Two label scales fight.** `Kicker` is `text-sm uppercase tracking-widest` sans; `PanelLabel` is `font-mono text-[11px] uppercase tracking-[0.18em]`. Both are used as section eyebrows, sometimes on the same page, with no rule for which.
- **P2-4 · `grid-bg` mask is top-anchored.** `mask-image: radial-gradient(ellipse 80% 60% at 50% 0%)` is tuned for the homepage hero and is reused at `opacity-60` under every `PageHero`, where the fade lands mid-headline on short heroes.
- **P2-5 · `/not-found` points at the deprecated IA.** Its three recovery links are Home, Playbooks and Services — two of the three are routes slated to leave the nav.
- **P2-6 · Case-study metrics are decorative.** `app/work/page.tsx` renders `outcomes` as three large numbers with `<dt className="sr-only">`. Visually they read as ARC's metrics; three of four studies are prior-employer work. Correct in the copy, ambiguous in the design.
- **P2-7 · `ProductCard` hardcodes "Free".** Every Labs card prints `Free` regardless of the product. True today, invisible coupling tomorrow.
- **P2-8 · The brand mark is a generic `A` tile.** `components/brand.tsx` — a rounded square with a letter. For a company whose thesis is a chain of custody, the mark is the cheapest available signal.
- **P2-9 · `metadata.keywords` lists eleven unrelated terms** spanning agent governance, CDP, digital transformation and EU AI Act — a machine-readable restatement of the positioning problem.
- **P2-10 · The animation system is one keyframe.** `animate-fade-up` on heroes and `ProductVisualPanel` rows carry `animationDelay` inline but the rows have no animation class, so the delay is inert.

---

## 5. P3 polish

- `::selection` is `bg-foreground/10` — nearly invisible in dark mode.
- No `focus-visible` style on `Card`-wrapping `<Link>`s; the hover state (`hover:border-foreground/20`) has no keyboard equivalent.
- Inputs use `focus:ring`; buttons use `focus-visible:ring`. Pick one.
- `ThemeToggle`'s `aria-label` is static "Toggle theme" and does not state the current mode; it renders `Moon` before mount, so dark-mode visitors see a flash of the wrong icon.
- `formatSignalDate` hardcodes `en-US` while the copy is British-leaning ("organisation", "behaviour", "prioritized" mixed with "optimize").
- Spelling is inconsistent across files: `organisation`/`organization`, `behaviour`/`behavior`, `catalogue`/`catalog` all appear.
- `opengraph-image.tsx` renders the generic tagline; no per-page OG image for the assessment or the artifact.
- No `prefers-contrast` handling; `text-muted-foreground` at `220 9% 42%` on `0 0% 100%` is ~4.9:1 — passes AA for body, fails AAA, and is used for nearly all body copy.
- `lucide-react` is imported per-page rather than through the `Icon` registry, so the registry covers nine icons while the site uses roughly twenty.

---

## 6. Recommended design system

**Keep the foundation. It is better than the business it is dressing.** The
token layer, the IBM Plex pairing, the single restrained accent, the dark-panel
technique and the reduced-motion block are all correct and need no change.

Four additions, all additive:

### 6.1 A state scale with five values and five appearances

Replace ten values / three appearances with five / five. Shape, not just hue, so
it survives greyscale and colour-blindness:

| State | Means | Treatment |
| --- | --- | --- |
| `available` | Buy or use it now | Solid emerald dot, solid border, filled chip |
| `beta` | Works, surface moving | Solid amber dot, solid border, filled chip |
| `labs` | Free tool, open source, unsupported | Hollow dot, solid neutral border |
| `research` | Thinking, no implementation | Hollow dot, **dashed** neutral border |
| `soon` | Committed, not built | Hollow dot, dashed border, 60% opacity label |

Map the current values: `available`→`available`; `alpha`/`in-development`→`beta`;
`open-source`/`experiment`→`labs`; `research`→`research`;
`design-partners`→`soon`. Delete `Status`/`StatusBadge`.

The same five treatments drive the chain diagram nodes (§21.1), so a node's
border is literally the same language as a badge.

### 6.2 One eyebrow

`PanelLabel` wins — mono, `11px`, `tracking-[0.18em]`. It is the more technical
of the two and it is already the one used inside every Panel. Delete `Kicker`'s
sans variant and route `SectionHeading`, `PageHero` and the offer pages through
one component.

### 6.3 A density scale

Three section rhythms instead of one `py-20 sm:py-28`:

- `tight` — `py-12 sm:py-16`, for supporting rows
- `default` — `py-20 sm:py-28`, current
- `feature` — `py-28 sm:py-40`, for the one section per page that matters

Without this, "emphasise the artifact" has no mechanism except font size.

### 6.4 An evidence surface

The site sells documents and shows none. One component, `EvidenceArtifact`,
renders a realistic fragment of the Agent Access Record — a table of agent,
authority, approver, last checked, state — watermarked `EXAMPLE` and carrying a
visible "illustrative, not a customer record" caption. This is the honest
successor to `ProductVisualPanel` and the most valuable new component on the
list.

---

## 7. Recommended navigation

Six items, one button. Implements Q4, Q5, Q6, Q7.

```
Agents          /agents        wedge hub (replaces /platform)
Assessment      /assessment    the priced offer (replaces /agent-readiness)
Tools           /tools         two tools (replaces /labs)
Research        /research      unchanged
Consulting      /consulting    four verbs + 8 engagements + workshops, one page
About           /about         absorbs /work
                [ Run the free scan ]
```

Rules this enforces:

- **No dropdowns.** Every top item is a destination. The hub pages carry the
  depth. This finishes the fix `lib/content.ts:1465` started.
- **Agent Control is not in the bar** (Q7). It lives at `/agents/control`,
  linked from the chain diagram's research nodes and from `/research`. Honest,
  reachable, not sold.
- **Playbooks are not in the bar** (Q5). They live under `/consulting` and keep
  `/offer/*` for paid traffic.
- **Modernize / Automate / Build are not in the bar** (Q4). Sections of
  `/consulting`; their current URLs 301 there. `Operate` moves into `/agents`.
- **`/playbooks` is renamed `/frameworks`** — kills P0-3.

Footer keeps everything: four columns is right, the contents change with the
routes.

---

## 8. Homepage wireframe

Twelve hundred pixels wide, eight bands. Each band states the one thing it is
allowed to do.

```
┌──────────────────────────────────────────────────────────────────────┐
│ [A] ARC Transformation Group    Agents Assessment Tools Research      │
│                                 Consulting About    ◐  [Run the scan] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  AGENT GOVERNANCE                                    ┌─────────────┐ │
│                                                      │ AGENT       │ │
│  Your vendors turned on agents.                      │   ↓         │ │
│  Nobody wrote down what they can reach.              │ IDENTITY    │ │
│                                                      │   ↓         │ │
│  An inventory of every agent, what it can            │ PERMISSION  │ │
│  change, and which actions need a person —           │   ↓         │ │
│  in two weeks, for a fixed fee.                      │ TOOL/MCP/API│ │
│                                                      │   ↓         │ │
│  [ Run the free scan ]  [ See the assessment — $X ]  │ ACTION      │ │
│                                                      │ ┄┄↓┄┄       │ │
│                                                      │ VERIFICATION│ │
│  Fold ends here. 8/8 brief questions answerable.     │ ┄┄↓┄┄       │ │
│                                                      │ EVIDENCE    │ │
│                                                      │   ↓         │ │
│                                                      │ AUDIT       │ │
│                                                      └─────────────┘ │
│                                                   solid = we do this │
│                                                   dashed = research  │
├──────────────────────────────────────────────────────────────────────┤
│  [2] RECOGNITION — tight band, 5 lines, no cards                     │
│  Verbatim from serviceAreas.operate.symptoms:                        │
│  · Nobody can list what your agents can reach or change              │
│  · Your vendors switched on agents inside tools you already pay for  │
│  · A run reports success and you cannot confirm anything changed     │
│  · An agent works in a demo and you will not let it touch a customer │
│  · Spend moves with usage and the invoice is the first you see of it │
├──────────────────────────────────────────────────────────────────────┤
│  [3] THE ARTIFACT — FEATURE BAND. The one dominant element.          │
│  ┌────────────────────────────────────────────────────┐             │
│  │ AGENT ACCESS RECORD · example                       │             │
│  │ Agent        Can change        Approver   Checked   │             │
│  │ crm-sync     Opp stage,amount  J. Patel   2d ago  ● │             │
│  │ invoice-bot  Create charge     —          never   ▲ │             │
│  │ support-copilot  Send email    M. Chen    2d ago  ● │             │
│  │ EXAMPLE — not a customer record                     │             │
│  └────────────────────────────────────────────────────┘             │
│  "This is the deliverable. Two weeks. Fixed fee."                    │
├──────────────────────────────────────────────────────────────────────┤
│  [4] THE GAP — existing SplitClaim, moved here from /platform        │
│  What the run reported        │  What the record asks                │
│  status: completed            │  Which identity acted?               │
│  steps: 7/7                   │  What changed?                       │
│  tool calls: 12 ok            │  What evidence exists?               │
│  → Takeaway: "Execution success is not a verified outcome."          │
├──────────────────────────────────────────────────────────────────────┤
│  [5] WHY ARC — 3 items, no cards, no career grid                     │
│  Deterministic rules · Findings quote your own words · Limits stated │
│  One line of proof: 20 years of Fortune 100/500 programme delivery.  │
├──────────────────────────────────────────────────────────────────────┤
│  [6] THE LADDER — 3 boxes, prices visible                            │
│  Free scan → Assessment $X · 2 wks → Monthly review $Y/mo            │
├──────────────────────────────────────────────────────────────────────┤
│  [7] SIGNALS — 3 cards max, agent/security/regulation only           │
├──────────────────────────────────────────────────────────────────────┤
│  [8] CLOSE — two options, not four                                   │
│  [ Run the free scan ]   [ Book 30 minutes ]                         │
└──────────────────────────────────────────────────────────────────────┘
```

Off the homepage: the four-verb grid, the career case-study grid, playbook
pricing, "Make technology work for your business," four of the seven signal
cards.

Five-second test against the brief's eight questions, from the fold alone:

| Question | Answered by |
| --- | --- |
| What ARC is | Eyebrow + H1 |
| What it sells today | Second button, with a price |
| What products exist | Chain diagram, solid nodes |
| What is free | First button |
| What is research | Chain diagram, dashed nodes + legend |
| What is future | Same legend |
| Who it is for | "Your vendors turned on agents" |
| What to do next | Two buttons, ranked |

---

## 9. Product-page template

For `/assessment` and, later, `/agents/registry`. Sections marked **required**
cannot be omitted — the current `ArkProductPage` already enforces "Where this is
today" and "Limits" this way, which is the right mechanism and should be
extended, not replaced.

| # | Section | Required | Notes |
| --- | --- | --- | --- |
| 1 | Hero: state badge, name, one-line promise, **price**, primary CTA | ✅ | Price is required. A product page without one is a brochure. |
| 2 | "Where this is today" | ✅ | Keep the existing aside verbatim in pattern. |
| 3 | Problem | ✅ | The buyer's sentence, not the category's. |
| 4 | What it does | ✅ | Nouns. |
| 5 | How it works | ✅ | `FlowStack`. |
| 6 | Architecture / where it sits | — | The chain, with this product's nodes solid. |
| 7 | Capabilities | ✅ | Existing `capabilities` grid. |
| 8 | **The artifact** | ✅ | `EvidenceArtifact`. Show the deliverable. |
| 9 | Evidence / proof | — | Which open tools produce the evidence. |
| 10 | Security & data handling | ✅ | What you read, what you store, what you never touch. |
| 11 | Deployment / how we run it | — | Access needed, where it runs. |
| 12 | Integrations | — | Named systems, with a state badge each. |
| 13 | Pricing & access | ✅ | Fixed fee, duration, what changes it. |
| 14 | **Limits — "what this is not"** | ✅ | Already enforced. Keep. |
| 15 | Page-specific CTA | ✅ | Never the default `<CTA />`. |

---

## 10. Advisory-page template

For `/consulting` sections and `/assessment`.

| # | Section | Notes |
| --- | --- | --- |
| 1 | Problem, in the buyer's words | `WRITING.md` "Naming services" table already specifies this. |
| 2 | Who this is for / not for | `whoFor` + `notFor` exist in `AdvisoryEngagement`. Render both. |
| 3 | Symptoms | Five max, no cards. |
| 4 | What we assess | `FlowStack`. |
| 5 | Deliverables | The artifact named, with `EvidenceArtifact` where one exists. |
| 6 | Timeline | Fixed weeks, one number. `duration` exists. |
| 7 | **Price** | Fixed fee. The field does not exist on `AdvisoryEngagement` — add it. |
| 8 | Outcome | `youLeaveWith`. |
| 9 | Proof | One relevant case study, not four. |
| 10 | What happens next | `scoping` steps. |
| 11 | CTA with the engagement as `topic` | Already supported by `CTA`'s `topic` prop. |

The data model is 90% there. `AdvisoryEngagement` has `focus`, `duration`,
`startsWith`, `youLeaveWith`, `whoFor`, `notFor`, `deliverables`, `scoping`,
`typicalFollowOn`. It is missing exactly one field: **price**.

---

## 11. Labs template

The current `/labs/[slug]` is close. Five changes:

| # | Section | Change |
| --- | --- | --- |
| 1 | Problem | **New.** Currently opens on the product name. Open on what broke. |
| 2 | Tool: state badge, name, tagline | Keep. Use the five-state scale. |
| 3 | Who it's for | Keep. Move above the fold — it is currently two-thirds down. |
| 4 | How it works | Keep `howItWorks`. |
| 5 | Try it / Source / Docs | Keep the three-button row. It is the best CTA cluster on the site. |
| 6 | **Visual** | `ProductVisualPanel` → derive rows from the tool's published rule IDs, add a visible `EXAMPLE OUTPUT` caption. |
| 7 | What's next | Keep the roadmap checklist. It is honest and well-drawn. |
| 8 | **Related ARC offer** | **New.** One line: what the human does that the tool cannot. Replaces the generic `<CTA>`. |

---

## 12. Research template

`/research/[slug]` is the strongest template in the repository and needs
almost nothing: a `max-w-2xl` measure, a topic chip, a key-findings box, body
sections, numbered citations with `scroll-mt-24` anchors, and an explicit
"where this argument is weak" section. That last one is rare and valuable.

Three additions:

1. **A reading spine for long briefs** — sticky table of contents at `lg:` from the section list already in the data.
2. **"What to do about it"** — one boxed block linking to the scan or the assessment. Currently every brief ends in the same generic `<CTA>`.
3. **Per-brief OG image** — title + source count, generated from the existing `opengraph-image` pattern.

---

## 13. Conversion architecture

Five audiences, five entry points, one shared destination. The current site has
one entry point (contact) and no destination.

| Audience | Enters at | Their next step | Converts to | Measured by |
| --- | --- | --- | --- | --- |
| **Enterprise buyer** (security/IT/system-of-record owner, 50–500) | `/` hero, `/assessment` | Sees price and artifact | Books 30 min | `assessment_cta_click` |
| **Technical buyer** (platform lead) | `/agents`, free scan | Runs the scan, emails the report | Captured email → assessment | `scan_complete`, `report_email_captured` |
| **Developer** | `/tools/mcp-conformance-scanner`, GitHub | Runs the CLI, stars the repo | Repo follower → scan | `tool_app_click`, `tool_github_click` |
| **Founder / SMB** | `/offer/*` from ads | Buys a playbook | $5–20 purchase | existing `playbook_*` events |
| **Researcher / lurker** | `/research/<slug>` | Reads, cites | Email on the brief | `research_email_captured` |

The spine: **free scan → email → assessment**. Everything else feeds it or is a
side door that is honestly labelled as one (Q5).

**The capture point is the scan report, not the scan.** The scan runs free and
complete — that promise holds. The email buys the permanent shareable link and
the PDF. This is the one change that turns nine tools into a funnel, and it
does not break `lib/learn.ts`'s "no email gate" commitment, which is about
gating *value*, not about offering *delivery*.

---

## 14. CTA system

Replace one component with four, by intent. The current `CTA` is a single
component with defaults, used twenty times.

| Variant | Where | Primary | Secondary |
| --- | --- | --- | --- |
| `scan` | Homepage, `/agents`, research briefs, framework pages | Run the free scan | See the assessment |
| `assessment` | `/assessment`, scan result, scorecard result, Operate content | Book 30 minutes | Email a question |
| `tool` | `/tools/<slug>` | Open the tool | Source on GitHub |
| `offer` | `/offer/*`, `/playbook/*` | Get <name> — <price> | See what is inside |

Hierarchy rules:

1. **One primary per viewport.** Today the homepage fold has two equal-weight buttons and four more competing asks below.
2. **A CTA names its destination's state.** "See the assessment — $X" beats "Learn more"; "Explore Agent Control" must not sit next to a buyable CTA at equal weight (Q7).
3. **No page uses the default.** Delete the default `title`/`lead` from `CTA` so a bare `<CTA />` fails typecheck instead of shipping.
4. **"Talk to us" is retired** as a primary. It is the ask, not the offer — `WRITING.md` test 8.

---

## 15. Components to keep

Unchanged. These are good and several are better than the market.

| Component | Why |
| --- | --- |
| `Panel` / `PanelLabel` | The `.dark` re-scoping so panels read as product UI in both themes is a genuinely smart technique. |
| `FlowChain` | Wraps to vertical on small screens, dotted `rail-x` connector, `highlightLast`. Correct. |
| `FlowStack` | Numbered vertical pipeline with a `rail-y` spine. Reads top-to-bottom at every width. |
| `SplitClaim` | The single best explanatory component on the site. Promote to the homepage. |
| `Takeaway` | Right instinct, under-used. |
| `Section` / `Container` / `SectionHeading` | Consistent rhythm, one place to change it. |
| `Button` | Clean variant/size matrix, correct external-link handling, `focus-visible` rings. |
| `MarketSignals` | Dated, sourced, `<time dateTime>`, `ol`/`li`. Needs a `limit`, which it already supports. |
| `AlternativesTable` | The only responsive table done properly. Make it the pattern. |
| `FaqList` | Correct `aria-expanded`/`aria-controls`/`useId`, `hidden` not `display:none` hacks. |
| `Scorecard` | Best interaction in the repo. Needs a11y, not redesign. |
| `CheckoutButton` | Lazy-loads Paddle on first click, degrades to "not configured yet", never trusts the client event. Exemplary. |
| `OfferCatalog` / `OfferProduct` | The only properly designed conversion surface. Reuse for `/offer/assessment`. |
| The token layer, `grid-bg`, `diagram-bg`, `rail-x/y`, reduced-motion block | Keep entirely. |

---

## 16. Components to refactor

| Component | Change | Priority |
| --- | --- | --- |
| `ContactForm` | `htmlFor`/`id` on every field; `aria-describedby` for errors; error summary; `aria-live` on success. | **P0** |
| `MaturityBadge` | Five states, five treatments, shape as well as hue (§6.1). | **P0** |
| `CTA` | Four variants, delete defaults (§14). | **P0** |
| `ProductVisualPanel` | Visible `EXAMPLE OUTPUT` caption; rows derived from published rule IDs; wire the inert `animationDelay` or drop it. | **P0** |
| `SiteHeader` | Drop dropdowns entirely (§7). If any survive: `<button>` trigger, `aria-haspopup`, `aria-controls`, `Escape`, arrow keys. Mobile: focus trap. | **P1** |
| `SiteFooter` | Server component; move the offer chrome to an `app/(offer)/layout.tsx` route group. | **P1** |
| `Scorecard` | `aria-live="polite"` on the result; expose progress to AT; make `scrollIntoView` respect `prefers-reduced-motion`. | **P1** |
| `advisory/[slug]` | Replace label-`<h2>`/`<h3>` with `<p>` + `PanelLabel`. | **P1** |
| `ArkProductPage` | Extend to the §9 template; add required `price` and `artifact` slots. | **P1** |
| Retainers table (`/advisory`) | Adopt the `AlternativesTable` dual pattern. | **P1** |
| `PageHero` | Use `PanelLabel`; add a `dense` variant; parameterise the `grid-bg` mask. | **P2** |
| `ProductCard` | Stop hardcoding "Free"; take a state badge. | **P2** |
| `Brand` | A mark that means something — a chain link, a stamp, a seal. | **P2** |
| `checkout-button` | Pass the resolved theme to Paddle instead of `"light"`. | **P2** |
| `ThemeToggle` | `aria-label` reflecting the current mode; render nothing until mounted. | **P3** |

---

## 17. Components to remove

| Remove | Evidence |
| --- | --- |
| `CardHeader`, `CardTitle`, `CardContent` | Grepped: zero usages outside their own file. |
| `StatusBadge` | Zero usages. |
| `Status`, `statusLabel`, and `status` on `Product` | Only consumer was `StatusBadge`. Every product is `"live"`. The `Maturity` scale does this job. |
| `Kicker` (sans variant) | Superseded by one eyebrow (§6.2). |
| Unused entries in the `Icon` registry | `FlaskConical`, `LayoutDashboard`, `LineChart`, `GraduationCap` are registered; `ServiceArea` uses four icons total. |
| `/ai-fit`, `/ai-fit-teams` pages | Q6. 301 to `/tools/arc-stack-advisor` and `/consulting#ai-readiness-audit`. |
| Four off-thesis Labs pages | journey, workflow, connectivity, prompt-reviewer → `/tools/archive`. |
| Hover-open dropdown behaviour | §7 removes dropdowns; the behaviour goes with them. |

---

## 18. Components to create

| Component | Purpose | Priority |
| --- | --- | --- |
| `AgentChain` | **The canonical spine** (§21.1). Nine nodes, per-node state, legend, vertical on mobile. The most important new component. | **P0** |
| `StateBadge` | The five-state scale. Replaces `MaturityBadge` + `StatusBadge`. | **P0** |
| `EvidenceArtifact` | The Agent Access Record, rendered. Watermarked EXAMPLE. | **P0** |
| `PriceBlock` | Amount, unit, duration, what changes it, what is included. Nowhere for a price to live today. | **P0** |
| `CaptureForm` | Email-the-report. One field, one button, explicit "what we do with this". | **P0** |
| `CtaBand` | Four variants (§14). | **P0** |
| `ResponsiveTable` | Extract the `AlternativesTable` dual pattern so no table ships without a small-screen view. | **P1** |
| `LimitsList` | The "what this is not" block as a standalone, usable outside `ArkProductPage`. | **P1** |
| `BriefToc` | Sticky TOC for research briefs. | **P2** |
| `ProofStrip` | One-line credential row, replacing the career case-study grid on the homepage. | **P2** |
| `SectionDivider` | Lets the density scale (§6.3) read as structure rather than whitespace. | **P3** |

---

## 19. Mobile improvements

Evidence: `uat/home-signals-mobile-390.webp` at 390 px shows roughly **one
market-signal card per viewport** — nine elements, ~110 words, then the next
identical card. Seven of them is a scroll with no landmarks.

1. **Cap homepage signals at three** and move the rest to `/research`. `MarketSignals` already takes `limit`.
2. **Collapse signal sources behind a disclosure** on small screens. Two external links per card is four extra tap targets per viewport.
3. **Give the retainers table a card fallback** (P1-5).
4. **Reorder `/labs/[slug]` on mobile** — `ProductVisualPanel` currently sits after a four-paragraph hero. Put the three action buttons above it.
5. **Reorder `/assessment` on mobile** — price and primary CTA before the explanation.
6. **Mobile menu: focus trap, `Escape`, `aria-expanded`/`aria-controls`,** and restore focus to the toggle on close.
7. **Tap targets.** The signal-card source links are `text-xs` with a `h-3 w-3` icon — under the 44 px recommendation.
8. **Sticky CTA bar on `/assessment` and `/offer/*`** below `sm`, carrying the price and the primary action.
9. **`FlowChain` at 390 px** wraps to a ragged two-per-row. Force vertical below `sm` so it reads as a sequence.
10. **Set `theme-color`** for both schemes so the browser chrome matches.

---

## 20. Accessibility improvements

Ordered by severity. Items 1–3 are shipping defects.

1. **Associate every form control with its label.** `htmlFor` + `id` on name, email, company, stage, message. WCAG 1.3.1, 4.1.2 (A). *(P0-5)*
2. **Announce async results.** `role="status"` / `aria-live="polite"` on the contact-form success panel, the scorecard result, and the checkout error. WCAG 4.1.3 (AA).
3. **Expose scorecard progress.** The bar is `aria-hidden`; give it `role="progressbar"` with `aria-valuenow`/`max`, or a visually hidden live region.
4. **Fix the dropdown's role contract.** `<button aria-haspopup="menu" aria-expanded aria-controls>`, `Escape` to close and restore focus, arrow keys between items. WCAG 2.1.1, 4.1.2.
5. **Trap focus in the mobile menu** and restore it on close. WCAG 2.4.3.
6. **Stop using headings as labels** in `advisory/[slug]`, `about`, `offer-landing`. WCAG 1.3.1.
7. **Add `focus-visible` to card links.** Card-wrapped `<Link>`s have a hover border change and no keyboard equivalent. WCAG 2.4.7.
8. **Unify focus styling** — `focus-visible:ring-2 ring-ring ring-offset-2` everywhere, inputs included.
9. **Name the theme toggle's state** — `aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}`.
10. **Respect reduced motion in JS.** The CSS block is correct; `scrollIntoView({ behavior: "smooth" })` in `Scorecard` ignores it.
11. **Check contrast on the amber/emerald badges.** `text-amber-600` on `bg-amber-500/10` in light mode is marginal at `11px`; the `text-[11px]` size means AA large-text thresholds do not apply.
12. **Give every external link a programmatic cue.** `MarketSignals` uses an icon with no text alternative; several `target="_blank"` links lack any "opens in a new tab" affordance.
13. **Decorative icons** — most carry `aria-hidden` via `Icon`, but per-page `lucide-react` imports often do not.
14. **Verify the heading outline per template.** `labs/[slug]` has a single `h1` then four `h2`s at mixed visual sizes (`text-2xl` and `text-lg`) — correct semantically, inconsistent visually.
15. **`::selection` contrast** in dark mode (P3).

---

## 21. Visual diagrams the site needs

### 21.1 The canonical spine — the one diagram that must exist

One component, nine nodes, three coverage treatments. It appears on the
homepage, on `/agents`, and in reduced form on `/assessment`. It replaces the
six competing chains below.

```
  AGENT            ●  solid    inventoried in the assessment
    ↓
  IDENTITY         ●  solid    inventoried
    ↓
  PERMISSION       ●  solid    inventoried
    ↓
  POLICY           ○  outline  named, not enforced by us
    ↓
  TOOL / MCP / API ●  solid    inventoried
    ↓
  ACTION           ○  outline  reconstructed from your logs where they exist
    ↓
  VERIFICATION     ┄  dashed   RESEARCH — Agent Control, not for sale
    ↓
  EVIDENCE         ┄  dashed   RESEARCH
    ↓
  AUDIT            ●  solid    the deliverable: the Agent Access Record

  ● we do this today   ○ partial, named in the report   ┄ research
```

Why this specific design:

- It satisfies the brief's demand to communicate the chain visually.
- It satisfies the brief's CRITICAL rule by refusing to draw research as product (§0.2).
- It uses the same five-state language as the badges (§6.1), so the legend is learned once.
- It is an argument for the assessment: six of nine nodes solid is a reason to buy; two dashed is a reason to trust.
- It is honest in a way a competitor's diagram will not be, which is the differentiation `WRITING.md` demands — demonstrated, not announced.

### 21.2 Consolidate six chains into one

The repository currently draws six different processes, all presented with
equal authority:

| Chain | Where | Steps |
| --- | --- | --- |
| `ark.loop` | `/platform`, footer | Measure → Verify → Govern → Optimize (4) |
| `agentLifecycle` | `/platform`, `/agent-readiness` | Discover → Authenticate → Understand → Permission → Execute → Verify → Measure → Remember → Audit (9) |
| `executionGap.chain` | `/platform`, `/ark-control` | Agent request → Model decision → Tool action → System change → Outcome evidence → Verified outcome (6) |
| `operatingContract.chain` | `/platform`, `/frameworks` | Goal → Trigger → State → Boundary → Evidence → Owner (6) |
| `operatingContract.architecture` | `/developers` | Scope → Identity → Access → Action → Stop (5) |
| `assuranceChecklist` | `/platform`, `/ark-control` | six questions |

A visitor who reads two pages sees two incompatible models of the same thing.
**Keep `agentLifecycle` as the source for §21.1** (it is closest to the brief's
chain and the most complete), keep `operatingContract.chain` as the *document
schema* — a different kind of object, correctly a different diagram — and retire
the other four to prose.

### 21.3 Four more diagrams worth drawing

| Diagram | Where | Shows |
| --- | --- | --- |
| **The Agent Access Record** | Homepage, `/assessment` | The deliverable as an object (§6.4). The highest-value missing asset. |
| **Blast-radius map** | `/assessment` | Agents on one axis, systems on the other, cells shaded by what can be changed irreversibly. Makes "blast radius" a picture rather than a phrase. |
| **Approval gate** | `/assessment`, `/agents` | Action → gate → human → execute, with the "no gate" path in red. Answers Q3's "which actions need a person" in one glance. |
| **Where the evidence comes from** | `/agents/control` | Agent's own claim vs independent source. The `SplitClaim` argument as a diagram instead of two lists. |

### 21.4 What not to draw

Per the brief and confirmed against the repo: no network-blob diagrams, no
glowing nodes, no isometric clouds, no robot or brain imagery, no stock
photography — and **no further fake dashboards**. The repo currently has
eleven (§P0-8).

---

## 22. Exact implementation backlog

Sequenced so each item is shippable alone. Effort: S < 2h, M < 1 day, L < 3 days.

### P0 — 11 items

| # | Item | Files | Effort |
| --- | --- | --- | --- |
| 1 | `htmlFor`/`id` on every form control | `components/contact-form.tsx` | S |
| 2 | `aria-live` on contact success, scorecard result, checkout error | `contact-form.tsx`, `scorecard.tsx`, `checkout-button.tsx` | S |
| 3 | Rename `/playbooks` → `/frameworks`, add 301 | `app/playbooks/**`, `next.config.mjs`, `lib/learn.ts` | S |
| 4 | `StateBadge` with five states / five treatments; migrate call sites | `components/ui/badge.tsx`, `lib/content.ts`, 8 pages | M |
| 5 | Delete `CardHeader`/`CardTitle`/`CardContent`/`StatusBadge`/`Status` | `components/ui/card.tsx`, `badge.tsx`, `lib/content.ts` | S |
| 6 | `AgentChain` component + the nine-node data with coverage state | `components/agent-chain.tsx`, `lib/ark.ts` | M |
| 7 | `EvidenceArtifact` — the Agent Access Record, watermarked | `components/evidence-artifact.tsx` | M |
| 8 | `PriceBlock`; add `price` to `AdvisoryEngagement` and `ArkProduct` | `components/price-block.tsx`, `lib/content.ts`, `lib/ark.ts` | S |
| 9 | `CtaBand` with four variants; delete `CTA` defaults; fix the bare `<CTA />` | `components/cta.tsx` + 20 pages | M |
| 10 | `ProductVisualPanel`: EXAMPLE caption, remove inert `animationDelay` | `components/product-visual.tsx` | S |
| 11 | `CaptureForm` + `report_email_captured` event | `components/capture-form.tsx`, `lib/analytics.ts` | M |

### P1 — 12 items

| # | Item | Files | Effort |
| --- | --- | --- | --- |
| 12 | Rebuild the homepage to the §8 wireframe | `app/page.tsx`, `lib/services.ts` | L |
| 13 | `/platform` → `/agents`; absorb `services/operate`; 301s | `app/platform/` → `app/agents/`, `next.config.mjs` | M |
| 14 | `/agent-readiness` → `/assessment` with price and artifact | `app/agent-readiness/` → `app/assessment/` | M |
| 15 | Collapse nav to six items, no dropdowns; button → "Run the free scan" | `lib/content.ts`, `components/site-header.tsx` | M |
| 16 | Delete `/ai-fit`, `/ai-fit-teams`; 301s | `app/ai-fit*/`, `next.config.mjs` | S |
| 17 | Agent Control out of nav; route `/ark-control` → `/agents/control` | `lib/content.ts`, `app/ark-control/` | S |
| 18 | `/labs` → `/tools`; two promoted, four archived | `app/labs/` → `app/tools/`, `lib/content.ts` | M |
| 19 | Collapse `/services` + `/advisory` + `/academy` → `/consulting` | 6 page files, `next.config.mjs` | L |
| 20 | `SiteFooter` → server component; `(site)`/`(offer)` route groups | `components/site-footer.tsx`, `app/` layouts | M |
| 21 | `ResponsiveTable`; apply to the retainers table | `components/responsive-table.tsx`, `app/advisory/page.tsx` | S |
| 22 | Scorecard a11y: progressbar role, reduced-motion scroll | `components/scorecard.tsx` | S |
| 23 | Analytics: `scan_*`, `assessment_*`, `contact_submit`, `tool_*` | `lib/analytics.ts` + call sites | S |

### P2 — 10 items

| # | Item | Effort |
| --- | --- | --- |
| 24 | Extend `ArkProductPage` to the §9 template (artifact, security, pricing slots) | M |
| 25 | Advisory template per §10; fix label-headings | M |
| 26 | Labs template per §11: problem-first, related-offer footer | M |
| 27 | Consolidate six chains to one; retire four from the UI | M |
| 28 | One eyebrow: `PanelLabel` everywhere, delete `Kicker` | S |
| 29 | Density scale (`tight`/`default`/`feature`) on `Section` | S |
| 30 | Mobile: cap homepage signals at 3, collapse sources, reorder Labs hero | S |
| 31 | `/not-found` recovery links → scan / assessment / research | S |
| 32 | Blast-radius and approval-gate diagrams | M |
| 33 | Card-link `focus-visible`; unify focus styles | S |

### P3 — 7 items

| # | Item | Effort |
| --- | --- | --- |
| 34 | Brand mark that carries the thesis | M |
| 35 | Per-page OG images for `/assessment` and research briefs | M |
| 36 | `BriefToc` for long research briefs | S |
| 37 | `metadata.keywords` cut to the wedge | S |
| 38 | Spelling and locale pass (`organisation`/`organization`, `en-US` dates) | S |
| 39 | `theme-color` per scheme; dark-mode `::selection` | S |
| 40 | Paddle overlay theme follows the resolved theme | S |

---

## Appendix A — measurements

Taken from `npm run build` on this commit (exit 0, lint and typecheck clean).

- 48 routes. 36 statically prerendered, 7 dynamic, 5 metadata routes.
- First Load JS: **96.3 kB** on content pages, **87.5 kB** on `/privacy` and `/terms`, **116 kB** on `/playbook`.
- Largest page bundle: `/playbooks/agent-readiness-scorecard` at 5.77 kB (the scorecard is the only substantial client interaction on the site).
- 20 of 48 routes terminate in the shared `<CTA>` component.
- 11 fabricated dashboard frames in `components/product-visual.tsx`.
- 6 distinct process chains across 4 data files.
- 10 state values (7 maturity + 3 status) rendering as 3 visual treatments.
- 3 dead component exports, 1 dead type system.
- 0 email-capture fields.
- 0 prices above $20.

## Appendix B — what this site already does better than its competitors

Preserved verbatim from the Grill audit's findings and confirmed in the design
layer. None of the 40 backlog items requires giving any of these up.

1. Maturity labels with a published meaning, and a `/labs` key that explains what each badge commits the company to.
2. A "what this is not" block compiled into the product-page shell, so no product page can ship without stating its limits.
3. Refusal to invent numbers — `labsProof.note`, and a provisioning script that rejects a price that is not the advertised amount.
4. `docs/WRITING.md` as an enforced standard with ten tests and a retired-constructions table.
5. Determinism as a trust mechanism: published rule counts, findings that quote the user's own words, "a model never produces the score."

The one place the design layer breaks promise 3 is `ProductVisualPanel`
(§P0-8). Fixing that single component brings the visual layer back into line
with the writing standard — which is, in the end, what this entire audit is
asking the site to do.

---

## 23. Implementation status

Added 2026-10-19, after the audit. Two commits: `c16d0c7` (restructure) and
`713ad99` (backlog). `npm run build`, `npm run lint`, `npm run typecheck` and
`npm test` (74 tests) all pass, and every route and redirect was checked
against a running production build.

### Shipped — all 11 P0 items

| # | Item | What changed |
| --- | --- | --- |
| 1 | Form labels | `htmlFor`/`id` on every control in `contact-form.tsx`. The WCAG failure is gone. |
| 2 | `aria-live` | Contact success, scorecard result and checkout error all announce. |
| 3 | `/playbooks` → `/frameworks` | Renamed, with a 301 for the index and every child. |
| 4 | Five-state scale | `Maturity` (7) + `Status` (3) → `State` (5), each with its own appearance. Shape as well as colour. |
| 5 | Dead exports | `CardHeader`/`CardTitle`/`CardContent`, `StatusBadge`, `Status`, `statusLabel` deleted. |
| 6 | `AgentChain` | Nine nodes with per-node coverage, a legend, and a text tag per node. Vertical at every width. |
| 7 | `EvidenceArtifact` | The Agent Access Record, rendered, watermarked `EXAMPLE`, with a table/stacked responsive split. |
| 8 | `PriceBlock` | Plus a `price` field on `ArkProduct`, rendered in the hero and again in full. |
| 9 | `CtaBand` | Four variants (`scan`/`assessment`/`tool`/`talk`). `title` and `lead` are now required, so a bare `<CTA />` fails typecheck. |
| 10 | Example panels | `ProductVisualPanel` says "example output" in visible text. The inert `animationDelay` is gone. |
| 11 | `CaptureForm` | One field, on `/frameworks`, posting to the existing validated contact route via a new `kind: "capture"`. |

### Shipped — P1

Homepage rebuilt to the §8 wireframe. `/platform` → `/agents`,
`/agent-readiness` → `/assessment`, `/ark-control` → `/agents/control`,
`/ai-fit` and `/ai-fit-teams` deleted, `/consulting` created, nav cut to six
items with no dropdowns, `SiteFooter` is a server component behind `(site)` /
`(offer)` route groups, the retainers table got its small-screen fallback, and
the scorecard's progress and motion behaviour are fixed.

### Shipped — selected P2/P3

One eyebrow treatment; `metadata.keywords` cut from eleven terms to six;
`/not-found` pointing at the new IA; Paddle's overlay following the resolved
theme; `theme-color` per scheme; visible focus rings on links; dark-mode
`::selection`; four unused icons and two newly dead exports removed; README,
`package.json`, `OPPORTUNITIES.md` and `UAT.md` corrected.

### Deliberately not done

| Item | Why |
| --- | --- |
| `/labs` → `/tools` | Churns every tool URL for a one-word gain. The state badges already carry "this is unfinished" honestly. Revisit if "Labs" tests badly. |
| Archiving the four off-thesis Labs tools | They are now three clicks from the home page rather than in the nav, which was the actual problem. Deleting live tools is a business call, not a design one — it is in `GRILL-AUDIT.md` for you to make. |
| Collapsing `/advisory/[slug]` into `/consulting` | The eight engagement pages are good and may carry search traffic. `/consulting` now collects them; merging them is reversible later and deleting them is not. |
| Blast-radius and approval-gate diagrams | Worth drawing, but they describe assessment findings. Draw them from the first real engagement rather than inventing an example. |
| Brand mark, per-page OG images, `BriefToc` | P3. Real work, no conversion impact this quarter. |
| A price on the eight advisory engagements | The field exists on `ArkProduct`. Adding it to `AdvisoryEngagement` is trivial; deciding the eight numbers is not, and inventing them would break the standard the site is built on. |

### Verification pass (2026-10-19, after the fact)

Each of the six headline findings was re-checked against the code rather than
against memory. Four were clean. Two had residue, now fixed in `0e8f1d2`:

| Finding | Residue found | Fix |
| --- | --- | --- |
| Five-state scale | `lib/research.ts` carried its **own** copy of the dead `Status` type — `"live" \| "building" \| "planned"` — plus nine `status: "live"` data entries, rendered nowhere. The same defect the headline finding named, in a file the first sweep missed. | Type field and all nine entries deleted. |
| One canonical chain | The operating-contract field list was defined **twice**, identically, in `lib/ark.ts` and `lib/learn.ts`. Two copies of one chain is the same class of problem as six chains, one order of magnitude smaller. | One `operatingContractChain` in `lib/ark.ts`; `lib/learn.ts` imports it. |

Current state: 0 unlabelled controls, 0 dead state identifiers, 5 states with
5 distinct appearances, 3 distinct chains (agent chain, operating contract,
assurance checklist) each describing a different object, 0 bare `<CTA />`, 0
`/playbooks` references. Build, lint, typecheck and 74 tests pass.

### Second verification pass — the class, not the instances

The two residues above shared one root cause: **a second copy of something
already deduplicated elsewhere**. Rather than wait for a third instance,
both detectors were generalised and run over the whole repository.

**Dead exports.** Every exported value in `lib/` and `components/`, checked
for a reference outside its own file (including `tests/` and `scripts/`, which
the first sweep missed and which produced ~30 false positives). Three genuine
dead values found and removed: `getArkProduct` and `ChainLegend` (both
orphaned by last week's page rewrites — my own) and the generic `Badge`
(pre-existing). Exported *types* that annotate exported data in the same file
were correctly excluded; they are a module's contract, not dead weight.

**Duplicated literals.** Every string-array literal and every string over 45
characters, grouped by value. Tailwind class strings dominate the output and
are noise. Filtering to real copy left six duplications — and five of the six
were mine, created when I built the new pages last week by copying blocks
rather than extracting them:

| Duplicated | Where | Fix |
| --- | --- | --- |
| Retainers table + two sentences | `/advisory`, `/consulting` | `components/retainer-table.tsx` |
| Workshops grid + lead | `/consulting`, `/frameworks` | `components/workshop-grid.tsx` |
| Free scan / paid card pair | `/agents`, `/assessment` | `components/start-here.tsx` |
| Execution-gap section + reported-run figures | `/`, `/agents` | `components/execution-gap.tsx` |
| Engagements lead sentence | `/advisory`, `/consulting` | `advisoryEngagementsLead` in `lib/content.ts` |
| Refund promise | `lib/offer.ts`, `lib/playbook.ts` | `playbookRefund` in `lib/playbook.ts` |

Two smaller ones alongside: the Outcome Assurance tagline was hardcoded on its
own page as well as in `lib/learn.ts`, and `ark.positioning` and
`assessment.tagline` were the same sentence — a company line and a product
line should not be identical. Both fixed.

Re-running the extraction caught two **new** dead exports it had just created
(`retainerCopy`, `workshopCopy`, exported for no reason); both are now
module-private. Fixing dead exports is a poor moment to add more.

**Left alone deliberately:** seven unreferenced exports in `lib/commerce/`
(`commerceReadiness`, `paddleEnvironment`, `readPlaybookPrices`,
`downloadUrl`, `SUCCESS_DOWNLOAD_WINDOW_HOURS`, `resetRateLimits`,
`findPurchaseByTransactionId`). That module is a working, tested,
security-sensitive payment path that the commercial audit marked *keep and
freeze*. An unreferenced export in a payment library is a different risk
calculus from a dead UI component — some are plainly test or operational
seams. They are listed here for a decision rather than removed on my judgement.

### One number that needs your confirmation

The assessment is priced at **$15,000, 2–3 weeks**, set in one place —
`assessment.price` in `lib/ark.ts`. That figure is the audit's recommendation,
not a number you gave me. It is now on the home page, the agents hub, the
assessment page, the nav button's sibling CTA and the footer.

Change it in that one constant and every surface follows. If it is wrong, it
is wrong in one line — but it should not stay unexamined, because the whole
restructure rests on there being a visible price.
