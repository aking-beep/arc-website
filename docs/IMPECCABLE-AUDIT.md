# Impeccable audit — ARC site

Method: dual-agent (A: design review `bc-81548f7a-d039-5160-abad-84d7f64a5eb9` · B: detector `bc-ee03efed-30d1-51b2-ba15-7879c1409ba6`).

Target: the marketing site, with `app/page.tsx` as the primary surface and the product, advisory, labs, playbook, research, and contact routes read against it. No production code was changed. No browser was available in this session, so every visual claim below is from source (classes, tokens, composition), not from a screenshot. No overlay was injected.

`docs/GRILL-AUDIT.md` was read after the design pass and checked against the same files. Where this audit agrees, it says so. Where the Grill underweights a visual fact, it says so.

Mode of the surfaces under review: **Persuade.**

---

## 1. Impeccable score: 44 / 100

The shell is already the right kind of object: IBM Plex, one teal used as a product accent, a dark panel, no brains, no orbs, no stock photos. The first screen throws that away. A visitor meets a generalist consultancy, then a catalog of equal cards, then a "flagship" that cannot be bought.

| Dimension | Weight | Raw | Weighted | Why |
| --- | ---: | ---: | ---: | --- |
| Visual craft (type, tokens, restraint) | 12 | 8/10 | 9.6 | Plex, HSL tokens, panel, no gradient theater. |
| Specificity to this product | 12 | 5/10 | 6.0 | `SplitClaim` is specific. The homepage could be any practice. |
| Product vs roadmap in the chrome | 8 | 4/10 | 3.2 | Copy says "not for sale." The panel says "Flagship." |
| State system | 10 | 4/10 | 4.0 | Seven maturity names, three colors. |
| Information architecture | 10 | 4/10 | 4.0 | Four businesses, two "playbook" paths. |
| Five-second comprehension | 12 | 2/10 | 2.4 | Home does not name the chain, the buyer, or the action. |
| Diagrams that explain | 10 | 3/10 | 3.0 | `FlowChain` is one chip style for every argument. |
| Conversion | 12 | 3/10 | 3.6 | One CTA component. It books a discovery call. |
| Accessibility | 8 | 6/10 | 4.8 | Skip link and button rings. Nav, footer, and form labels fall short. |
| Responsive structure | 6 | 6/10 | 3.6 | Grids collapse. Touch targets and hover menus do not. |
| **Total** | **100** | | **44.2** | |

Nielsen, same pass, scored honestly (4 means excellent):

| # | Heuristic | Score | Key issue |
| --- | --- | ---: | --- |
| 1 | Visibility of system status | 2 | Maturity is a word, not a state you can trust at a glance. Home has no state at all. |
| 2 | Match to the real world | 2 | Home speaks "growing companies." The header promises permissions. The page promises outcome assurance. |
| 3 | User control and freedom | 3 | Skip link, theme, "not a fit," topic-aware contact. Primary action hides in the mobile drawer. |
| 4 | Consistency and standards | 2 | `/playbook` is paid. `/playbooks` is free. AI Fit is `available` and also an alpha lab. |
| 5 | Error prevention | 2 | Agent Control says it cannot be bought, inside a brand-tinted flagship panel. |
| 6 | Recognition rather than recall | 2 | The maturity legend lives only on `/labs`. |
| 7 | Flexibility and efficiency | 2 | A staff engineer takes the same long marketing path as a first visit. Not n/a: GitHub, scanners, and the scorecard are tasks on this site. |
| 8 | Aesthetic and minimalist design | 2 | The palette is quiet. The catalog is not. Every offer is the same card. |
| 9 | Error recovery | 3 | Limits, FAQs, and "including when it is not." The wrong front door has no correction on the first screen. |
| 10 | Help and documentation | 2 | Research and labs exist and are real. They are off the header, split across two playbook words. |
| **Total** | | **22/40** | Acceptable shell, failing persuasion. |

Technical health from the detector plus measured classes (audit scale, /20):

| # | Dimension | Score | Key finding |
| --- | --- | ---: | --- |
| 1 | Accessibility | 2 | Focus ring only on `Button`. Nav, theme, menu, and footer links have none. Form labels are not tied to inputs. |
| 2 | Performance | 3 | Static pages, `next/font` with `display: swap`, one 0.6s fade. Not measured in a browser. |
| 3 | Theming | 3 | Tokens and `.dark` are real. Hex is confined to icons, Open Graph, email, and print CSS. |
| 4 | Responsive | 2 | Sections reflow. Header controls are 36px. Desktop nav is hover. |
| 5 | Implementation integrity | 2 | One coherent token system, then interchangeable cards, sample "dashboards," and a hero grid the detector flags. |
| **Total** | | **12/20** | Acceptable. Weak dimensions are a11y focus, touch, and integrity. |

Detector: `impeccable detect --json app components` exited 0 with one advisory, `codex-grid-background`, at `app/globals.css:65`. The same pattern exists as `.diagram-bg` (`globals.css:76`) and was not reported. Not a false positive. The hero grid is decoration. The panel grid is a blueprint and can stay if the panel is an actual schematic.

---

## What the Grill got right, and what it missed

Agreed, and verified in source:

- The homepage is a different company from `lib/ark.ts`. `homeHero` is "Make technology work for your business" with the kicker "AI · Automation · Cloud · Security · Software."
- Agent Control is in the header, and the header summary ("Permissions and approval gates") contradicts the page ("Outcome assurance").
- `/playbook` and `/playbooks` are different products under one word.
- Operate promises an inventory the advisory catalog does not sell. That is an IA bug as much as a commercial one: the service page and the engagement page do not describe the same object.
- The nine-step lifecycle is drawn as "the system" (`FlowStack` of `agentLifecycle` on `/platform` and `/agent-readiness`).

Corrected:

- The Grill treats Agent Control's copy as sufficient honesty. It is not. `app/platform/page.tsx` renders `flagship` as a full-width card with `ring-brand/20` and the word "Flagship," then again inside `Panel` with `PanelLabel` "Flagship" and a brand-tinted box repeating the "not for sale" paragraph. Prose says later. Chrome says buy this.
- The Grill's single CTA, "book the assessment," is the right primary for the enterprise buyer. It is the wrong only-button. The technical buyer needs "run the scanner" on the same first screen, as the secondary, or they will not believe the firm builds anything. Five persona CTAs do not go in the hero.
- Do not make "Open AI Fit" a homepage primary. AI Fit answers a different question (should this be an agent). The free action on the infrastructure page is the governance scan or the readiness scorecard.
- Filling the product-page template below for Agent Control — demo, pricing, deployment, integrations — would manufacture a shipped product. Empty slots stay empty and say why.

---

## 2. P0 UX problems

**P0-1. The first screen does not answer the seven questions.**
`app/page.tsx` plus `homeHero`. Within five seconds a visitor cannot tell what ARK is, what is for sale today, what exists, what is free, what is research, what is future, who it is for, or what to do. The chain (agent → identity → permission → tool → action → evidence → audit) is not on the page. Default `<title>` in `app/layout.tsx` repeats the consultancy tagline.

**P0-2. Unshipped work is drawn as the flagship product.**
`lib/ark.ts` sets `flagship: true` and `maturity: "design-partners"` on Agent Control. `MaturityBadge` paints `design-partners` in brand teal, the same accent as a live product (`components/ui/badge.tsx`). `/platform` then adds the word Flagship twice. `ArkProductPage` labels every page "ARC product," including the one that cannot be bought, and puts the honesty paragraph in a brand-bordered aside (`border-brand/30 bg-brand-subtle`). The aside is the right content in the wrong frame.

**P0-3. There is no single reading of "what to do."**
`components/cta.tsx` defaults every page to "Book a 30-min discovery call" (external Calendly) plus "Send a note instead." Home's own buttons are "Tell us what's not working" and "See how we can help." Platform's buttons are "Assess agent readiness" (lands on a page whose primary button is the free scorecard) and "Explore Agent Control." The only priced buttons are on `/playbook`, after a lead that talks about Paddle price ids (`app/playbook/page.tsx`). An enterprise buyer, a staff engineer, and a founder are sent through the same vague call.

## 3. P1 UX problems

**P1-1. Maturity states are not distinguishable.**
Seven values in `maturityStyles`. `open-source`, `experiment`, and `research` share one muted chip. `alpha` and `in-development` share amber. `available` is emerald, including Agent Readiness, which is a free quiz plus an unpriced assessment. `StatusBadge` (live / building / planned) is a second system and is unused on the pages that matter. The only legend is on `/labs`. A buyer must recall it everywhere else.

**P1-2. The chain diagram does not explain the chain.**
`FlowChain` accepts a list of strings and draws one mono chip, with an optional teal tint on the last chip (`highlightLast`). Used for the loop, the execution gap, and the operating contract, it makes "Verified outcome" look like success. The sentence underneath is doing the work the picture refuses. `FlowStack` is a numbered list of nine equal stages. `product-visual.tsx` is a fake window: `mcp.example.com`, grade "B−", "$514.10", a fictional agent. That is the fake dashboard this brief forbids, sitting on pages that claim evidence.

**P1-3. One card is the whole catalog.**
`Card` plus hover border, shadow, and `ArrowUpRight` is the case study, the service, the advisory engagement, the lab, the about pillar, and the unshipped control plane. `ProductCard` hardcodes the word "Free" on every lab, including experiments. Lab roadmap rows use an emerald check for "shipped" in the same family as feature lists, so "CI GitHub Action" and "Read-only config integrations" read as a footnote on a finished product (`app/labs/[slug]/page.tsx`).

**P1-4. Navigation asks for a map the visitor does not have.**
Header at `lg`: Services (4 children), Agent Infrastructure (5 children), Labs, Playbooks, Work, About, and Talk to us. That is more than four top-level choices, and the children disagree with the footer. AI Fit Teams is in `arkProducts` (footer) and not in `nav`. Agent Control's child summary is the wrong product. "Playbooks" goes to the paid catalog. Research still says "Three of the four are free" (`app/research/page.tsx`) while `/playbooks` is three free frameworks and the paid set lives elsewhere.

**P1-5. Keyboard and form labeling fail on the paths that convert.**
`focus-visible` exists only on `components/ui/button.tsx`. Header links, the menu button, the theme toggle, and footer links have no focus class. `contact-form.tsx` renders visible labels as siblings, with no `htmlFor` and no `id`. Errors use `role="alert"`, which is the part that is right.

## 4. P2 improvements

- Hero `.grid-bg` on `/`, `/platform`, product heroes, `PageHero`, and offer landings. Detector advisory. Remove it from marketing heroes. Keep a grid only inside a panel that is measuring something.
- `prefers-reduced-motion` in `globals.css` sets `animation-duration: 0.01ms` and `transition-duration: 0.01ms` on `*`. That kills the decorative fade, which is correct, and also kills focus and hover transitions, which removes useful feedback.
- Touch targets. `sm` buttons and the menu/theme controls are `h-9` (36px). Desktop nav links are `py-2` (about 36px). Footer links have no hit area. Brand mark is 32px tall. WCAG 2.2 AA target size (24px) is met; the 44px bar this audit uses for primary controls is not, and the menu button is the only mobile navigation.
- Hover-opened dropdowns (`site-header.tsx`) at the `lg` breakpoint. A touch laptop gets a menu that depends on hover.
- `/playbook` pricing lead mentions "the price id configured for that playbook." Internal checkout language next to a $5 button.
- Research, Academy, and the nine lab tools have the same visual weight as the thing the company wants to be known for.
- `scorecard.tsx` renders an `h3` with no `h2` above it on the scorecard page. Footer uses `h4` with no section heading. Not a blocker. It is a hierarchy leak.
- Two status vocabularies (`Status` and `Maturity`) for one idea.

## 5. P3 polish

- `animate-fade-up` (12px, 0.6s) on heroes. It adds nothing once the first screen is true. Remove it rather than tuning it.
- Open Graph and icons hard-code slate hex (`app/icon.tsx`, `app/opengraph-image.tsx`) instead of the page tokens. Fine for a raster. They should still match `--foreground` / `--background`, or the social card will not match the site.
- Email CSS in `lib/commerce/email.ts` is necessarily hex. Leave it. Do not import it into the page system.
- Mono labels at 11px with `tracking-[0.18em]` are the de facto status system and are hard to read. If they survive, they are captions, not the state.
- Section rhythm `py-20 sm:py-28` is calm and delays the first product name by several viewports. Tighten the decision band. Leave the essay airy.

---

## 6. Recommended design system

Keep the incumbent world. Do not rebrand the pixels into a second aesthetic. The failure is hierarchy and state, not the typeface.

**Keep**

- IBM Plex Sans and IBM Plex Mono.
- The HSL token set in `app/globals.css`, including `--panel` forced dark inside diagrams.
- One brand teal (`--brand`), used only on a verified outcome, a primary action that can be completed today, and the takeaway rule. Never on a coming-soon object. Never as a gradient.
- Radius, 1200px container, hairline borders, no shadow as a personality.
- Light default, class-based dark mode.

**Five states, and only these, drawn so they cannot be confused**

| State | Maps from today | Treatment | May use brand teal? |
| --- | --- | --- | --- |
| AVAILABLE | `available`, and only when the visitor can run or buy it now | Solid ink label, check only if the artifact exists on this page | Yes, on the action |
| BETA | `alpha` | Amber label, the words "works, do not depend on it" inside the chip | No |
| LABS | `open-source`, `experiment` | Outline chip, the word LABS, plus Free or Open source as a second fact, never as a substitute for the state | No |
| RESEARCH | `research` | No fill. The word RESEARCH. No action styled as a button that implies a product | No |
| COMING SOON | `design-partners`, `in-development`, `planned` | Neutral chip. The words "Not for sale" in the chip, not only in a paragraph. No "Flagship." No brand ring | No |

Retire `StatusBadge` or map it onto this scale. Do not ship both. The legend is a one-line key in the header of any index that mixes states, not a section that exists only on `/labs`.

**Three containers**

1. **Spec row.** Name, state chip, one-line fact (price, "no charge," or "not for sale"), one verb. Used for products, labs, and assessments.
2. **Prose.** The argument. No card chrome.
3. **Evidence panel.** The dark `Panel`, only when it shows the chain or a real report fragment. Not a second hero for a future product.

**Type**

- One display step: `text-4xl sm:text-5xl`, not `sm:text-6xl`, so the chain can sit under the headline in the same viewport.
- Body 16–18px, measure ~66ch.
- Mono is for identifiers, states, and diagram labels. Not for every kicker on the page.

**Color**

- Ink and hairline do the structure.
- Emerald means "this exists and you can use it." It is banned on roadmap rows and on coming-soon chips.
- Amber means beta. It is banned as decoration.
- Brand teal means "this is the check." One use per viewport.

**Motion**

- No entrance animation on marketing pages.
- Reduced motion keeps opacity and color transitions for focus, and drops transform. Replace the universal `0.01ms` kill with a targeted rule.

## 7. Recommended navigation

Five items and one button. This matches the Grill's commercial ladder and fixes the visual one.

1. **Assess** — the paid assessment, with the free scorecard linked from that page, not as a peer product.
2. **The chain** — the evidence model (operating contract, outcome checklist, the pass / fail / unknown rule). Not a second homepage.
3. **Labs** — governance scanner and MCP scanner first. Everything else under "Other tools," still free, still labeled.
4. **Work** — proof that matches the offer. Thin until an assessment has been delivered.
5. **About** — founder record, including the Fortune 100 work.

Button: **Book the assessment.**

Not in the header: Modernize, Automate, Build, Operate as a dropdown, Agent Control, AI Fit, AI Fit Teams, Playbooks, Academy, Research. Those routes stay reachable. Agent Control is linked from the chain page as COMING SOON. Playbooks stay at `/playbook` and `/offer` for the ad door. Developers sit under Labs, not as a sixth religion.

Footer repeats the same five, plus Privacy, Terms, and GitHub. It does not reintroduce the four-service column or a second product list that includes AI Fit Teams.

## 8. Homepage wireframe

One viewport, then one proof, then one action. Desktop and mobile use the same order. Mobile stacks the chain under the headline instead of beside it.

```
[ ARC ]                      Assess   The chain   Labs   Work   About     [ Book the assessment ]

kicker:  AGENT ACTION

H1:      Know what an agent can change,
         and whether it did.

lead:    Agents in the tools you already pay for can call APIs,
         change records, and send mail. ARC shows what exists,
         what it is allowed to do, and what was left unverified.

chain (the picture, not a paragraph):

  AGENT → IDENTITY → PERMISSION → TOOL / MCP / API → ACTION
        ──── break: the trace stops here ────
  WHAT CHANGED → EVIDENCE → AUDIT

  Last node is not teal unless evidence exists.
  The break is the point.

state row, three spec rows, not cards:

  AVAILABLE     Agent access scan        Free        Run it
  AVAILABLE     Readiness scorecard      Free        Score it
  COMING SOON   Agent Control            Not for sale  Read the limit

who:     Security, IT, or the owner of the system of record.
         About 50–500 people, or one team inside a larger company.

[ Book the assessment ]          [ Run the free scan ]
```

Below the fold, in order:

1. The blame list, four lines, from the Operate symptoms that are actually the wedge. Not six generic technology pains.
2. What the assessment hands you, as nouns. Price on the row.
3. The evidence rule in one `Takeaway`: a run that reports success is not a verified outcome. Unknown stays unknown.
4. What this is not: not a model, not a runtime, not a certification, not for sale as a platform.
5. One case, or none. Founder biography does not sit here.

No four-service grid. No $5/$10/$20 in this viewport. No "not sure which one you need?"

## 9. Product-page template

Use this for a thing that is software or will be. Every slot is present. A slot with nothing honest to say renders the state, not a placeholder diagram.

| Slot | AVAILABLE / BETA | COMING SOON (Agent Control today) | RESEARCH |
| --- | --- | --- | --- |
| State chip | In the h1 row | "COMING SOON · Not for sale" | "RESEARCH · Not a product" |
| Problem | The buyer's sentence | The buyer's sentence. This slot is allowed | The open question |
| What it does | Present tense, only what runs | "It is being designed to…" once. Then stop | Not claimed |
| How it works | The real steps | Omit, or show the intended check as a labeled proposal | Omit |
| Architecture | A typed chain with a break where evidence is missing | The same chain, break visible, no happy-path teal on the last node | A note, not a product diagram |
| Capabilities | Only shipped ones | Move to "Intended checks," visually distinct, no checks | None |
| Demo | A real report or a labeled sample with the word SAMPLE | Do not show a demo | None |
| Evidence | What was measured, or "no usage numbers yet" | "No customer system is connected" | Sources |
| Security | What is stored, what is not | "Nothing to deploy, so nothing is stored by this product" | n/a |
| Deployment | How you run it | "There is no deployment" | n/a |
| Integrations | Named systems actually read | "None" | n/a |
| Pricing / access | Price, or Free, or Beta | "No price. Design-partner conversation. This is not a purchase." | None |
| CTA | The verb that matches the slot (Run, Buy, Read) | "Talk about a design partnership" as outline, never primary-on-brand | "Read the note" |

`ArkProductPage` is the right shell if the aside stops using brand chrome for bad news, the kicker stops saying "ARC product" for unshipped work, and the primary button cannot outrank the state chip.

Do not build this template as a second visual system. It is a slot list on the spec row, the prose, and the evidence panel.

## 10. Advisory-page template

The current engagement page is a document: duration, who, deliverables, build options, a week-by-week scoping list. The structure is more honest than the homepage. It fails because eight of them share one card, none has a price, and Operate's promised inventory is not one of them.

| Slot | What goes there |
| --- | --- |
| Problem | The sentence the buyer already says |
| Who this is for | One seat. One company size. |
| Symptoms | Four lines, not a discipline list |
| Assessment | What you will look at. What you will not. |
| Deliverables | Nouns they can hold |
| Timeline | The range already written (two to three weeks, three to four). Keep it. |
| Outcome | The decision they can make on the last day |
| Price | A number, or the page is not an offer |
| Proof | Only an engagement of this type. If none exists, say so. Do not borrow LEGO. |
| CTA | Book the assessment, with `?topic=` already set |

Build options and retainer menus move off the first screen. They are a follow-on, behind the deliverable.

## 11. Labs template

Labs are tools. They are not products, and the page should not borrow product chrome.

| Slot | Rule |
| --- | --- |
| Problem | One sentence |
| Tool | Name, LABS or BETA chip, Free as a separate fact |
| Who it's for | One role |
| How it works | Three steps, the real ones |
| Try it | The live URL. If the tool is an experiment, the button says "Try the experiment" |
| GitHub | When the repo exists. Absent when it does not. Do not invent one |
| Documentation | The docs URL already on the object |
| Related | One link: the assessment, or Agent Control marked COMING SOON. Not a carousel of nine siblings |
| Limits | Already required by the writing standard. Keep it above the fold for alpha tools |

Delete the fake `ProductVisual` frame, or rename the component's output as "Sample report shape" in the pixels, with no dollar figures that look like a tenant. A sample grade is acceptable only with the word SAMPLE in the frame title.

Index order on `/labs`: governance scanner, MCP scanner, then "Other tools" collapsed. Journey, workflow, and connectivity stay in the repo and leave the first grid.

## 12. Research template

The article shape (finding, dated sources, a short argument) is the right one. The index is not. It presents nine briefs as a journal of a generalist firm.

Index:

- One lead brief: agents with credentials. State chip not required; the date is the state.
- A second row only for briefs that serve the chain (protocols, identity, the assurance rule).
- Everything else (FinOps, process mining, J-curve, generic product discovery, metered-agent pricing) behind "Archive." Do not delete the URL in the same change.
- The footer of a brief links to one action: the assessment, the scanner, or the checklist. It does not say "three of the four playbooks are free."

Article:

- Title, date, one-sentence claim.
- Key findings as a list of falsifiable sentences. Already true in the credentials brief. Keep that.
- Sources with publisher and year. Already there.
- No pull-quote that restates the headline.
- No diagram unless it is the chain and it is labeled as the model, not as a deployment.

## 13. Conversion architecture

One primary action for the company. Persona-specific actions live on the door for that person, not as five buttons on `/`.

| Visitor | Lands | Primary action | Secondary | Must not see as equal |
| --- | --- | --- | --- | --- |
| Enterprise buyer | `/` then Assess | Book the assessment | Run the free scan so the call has an artifact | Agent Control as a thing to procure. A discovery call with no topic. |
| Technical buyer (security / platform) | `/` or Labs | Run the governance scan | Book the assessment if the scan names a gap | AI Fit. A transformation diagnostic. |
| Developer | Labs, MCP scanner, `/developers` | Scan a server, or open GitHub | Read the chain | A 30-minute sales call as the only button on the tool page |
| Founder / SMB | `/playbook` or `/offer` only, from an ad or a footer link | Buy the file | Read the free preview | The enterprise assessment stuffed into the playbook hero |
| Playbook buyer (same person, paid intent) | `/offer/[slug]` | Pay. The button is the price. | Refund line, already written | Paddle, price ids, and the rest of the site nav. `/offer` already hides the nav. Keep that. |

The broken path today, in order: Home CTA → `/contact` with no topic → or Platform → `/agent-readiness` → free scorecard. The paid assessment is a paragraph. Agent Control's Calendly-style close asks for a design partnership, which is a second conversion wearing the same button style as a purchase.

`CTA` should take the action, not assume Calendly. Calendly remains an implementation of "book," not the label of every page.

## 14. CTA system

Three levels. A page gets one primary.

| Level | Look | Use |
| --- | --- | --- |
| Primary | Solid ink, 48px height, verb + object | The one action. "Book the assessment." "Run the scan." "Buy Define, $5." |
| Secondary | Outline, same height | The other honest action. "Run the free scan" next to the booking. "Read the limit" next to a coming-soon page. |
| Quiet | Text link | GitHub, research, the other playbooks, archive. |

Banned labels on this site: "Learn more," "Get started," "Talk to us" with no object, "Explore," "See how we can help." "Book a 30-min discovery call" is banned as a default. It is allowed on the contact page, where the topic is already known.

Coming-soon pages do not get a primary button. Their strongest control is the secondary outline. A filled button on "not for sale" is how the flagship problem comes back.

External tools (the Vercel apps, GitHub, Calendly) say where they go: "Open the scanner" not "Open."

## 15. Components to keep

- `components/ui/button.tsx`, `card.tsx`, `section.tsx` — the primitives. Card stops being the universal container; the primitive stays.
- `components/diagram.tsx` `Panel`, `PanelLabel`, `Takeaway`, `SplitClaim`. These are the specific ones.
- `components/theme-provider.tsx`, `theme-toggle.tsx` — behavior stays; the toggle needs a 44px target and a focus ring.
- `components/contact-form.tsx` — the form is the right shape (honeypot, `role="alert"`, topic). Labels need binding.
- `components/faq-list.tsx`, `alternatives-table.tsx` — useful on advisory and playbook pages, not on the homepage.
- `components/playbook/*` checkout, download, offer landing. The ad door is a real flow. Do not restyle it into the enterprise system.
- `app/layout.tsx` skip link, `main#main`, font loading.
- Maturity as data. The field stays. The painting of it changes.

## 16. Components to refactor

| Component | Change |
| --- | --- |
| `components/ui/badge.tsx` | Collapse to the five states. Brand teal off COMING SOON. Legend text inside the chip. |
| `components/diagram.tsx` `FlowChain` | Accept typed nodes (actor, authority, tool, action, break, evidence). A break is not another chip. Last node is teal only when evidence is present. |
| `components/diagram.tsx` `FlowStack` | Cap what it renders above the fold at four steps, or stop using it for the nine-stage map. |
| `components/ark-product-page.tsx` | Kicker from the state, not "ARC product." Aside is neutral when the news is "not for sale." |
| `components/cta.tsx` | Required `primary` label and href. No Calendly default. Coming-soon variant has no primary. |
| `components/site-header.tsx` | Five links, no hover-only menus, 44px targets, visible focus, mobile button in the bar. |
| `components/site-footer.tsx` | Same five. Drop the four columns that restate the old firm. |
| `components/product-card.tsx` | Spec row. "Free" is not a substitute for LABS / BETA. |
| `components/product-visual.tsx` | Sample frame with the word SAMPLE, or delete the fictional money and grades. |
| `components/page-hero.tsx` | Drop `.grid-bg` and `animate-fade-up`. One kicker style, the mono one, or none. |
| `app/page.tsx` | Replace the composition. The file is the homepage, not a component, and it is the P0. |
| `app/platform/page.tsx` | Stop being a second homepage and a flagship billboard. |
| `app/globals.css` | Hero grid off marketing pages. Reduced-motion rule scoped so focus transitions survive. |

## 17. Components to remove

Remove from use, not necessarily from git in the first pass.

- The flagship panel on `/platform` (the second, dark rendering of Agent Control).
- `ProductVisual` frames that show a tenant, a grade, or a dollar amount with no SAMPLE label. The `skills`, `architecture`, and `workflows` frames describe artifacts the labs index does not lead with.
- Home service grid as a peer of the chain.
- Home "programs we have delivered" metric cards in the first proof band.
- Default CTA copy in `cta.tsx` ("Want this standard of work on your problem?").
- Unused `StatusBadge` once maturity is the only scale. Leaving both is how the next page paints "Live" on a design partner.

## 18. Components to create

| Component | Job |
| --- | --- |
| `StateChip` | The five states. Replaces ad hoc badge class maps. |
| `SpecRow` | Name, chip, fact, verb. The index primitive for products, labs, and the assessment. |
| `ActionChain` | The typed chain with an explicit break between ACTION and WHAT CHANGED. Used on the homepage, the chain page, and Agent Control. |
| `OfferCTA` | Primary / secondary / quiet, with a `tone: "sale" \| "tool" \| "later"` so a later-page cannot render a sale button. |

Do not create a dashboard component, a network graph, an orb, or a metrics wall.

## 19. Mobile improvements

Source-derived. Not verified on a device.

- The bar below `lg` is logo, a 36px theme button, and a 36px menu button. "Talk to us" is inside the drawer. Put the primary action in the bar as soon as the label is short enough ("Book"), and give both icon buttons 44px.
- The open drawer lists every child of both dropdowns. After the nav cut, the drawer is five links and one button. Do that rather than designing a better accordion for twelve links.
- `FlowChain` already wraps. A nine-chip chain becomes a junk pile on a phone. The new chain is a vertical stack under `sm`, with the break as a full-width rule, not a wrapped dotted line.
- Hero `sm:text-6xl` will wrap to four lines under the kicker on a 390px screen. One step down (`text-4xl`) keeps the chain in the first viewport.
- Dropdowns that open on `mouseEnter` must not be the desktop behavior that a 1024px touch device inherits. Click or a disclosure.
- Sticky header plus a long drawer (`max-h-[calc(100vh-4rem)]`) is fine. The drawer content is the problem.
- Playbook offer pages already hide the site nav. Keep that on small screens. Do not add the enterprise header back.

## 20. Accessibility improvements

| Issue | Where | Standard | Fix |
| --- | --- | --- | --- |
| No visible focus on navigation, menu, theme, footer | `site-header.tsx`, `theme-toggle.tsx`, `site-footer.tsx` | WCAG 2.4.7 Focus Visible (AA) | The same `focus-visible:ring-2` as `Button`, on every link and control. |
| Labels not bound to inputs | `contact-form.tsx` | WCAG 1.3.1, 4.1.2 (AA) | `htmlFor` and `id` on name, email, company, stage, message. |
| Primary mobile controls at 36px | header, theme, `Button` `sm` | WCAG 2.5.8 is 24px (AA); this audit requires 44px on the only nav control | `h-11 w-11` on menu and theme. Header primary at `lg` size. |
| Reduced motion kills all transitions | `globals.css:103` | WCAG 2.3.3, and the audit rule against a global 0.01ms kill | Scope the kill to `animate-fade-up` and transform. Leave color and opacity on `:focus-visible`. |
| State is color plus a tiny dot | `MaturityBadge` | WCAG 1.4.1 Use of Color (AA) | The word in the chip is already there. The failure is that three states share one word-style. Distinct words (AVAILABLE, BETA, LABS, RESEARCH, COMING SOON) fix the color dependency. Do not rely on emerald vs amber. |
| Heading skips | scorecard `h3` before the next `h2`; footer `h4` | WCAG 1.3.1 | One `h1`. Sections are `h2`. Footer column titles are `p`, not headings. |
| Decorative grids | `.grid-bg`, `.diagram-bg` | Already `pointer-events-none` and not in the accessibility tree as text. Fine. | Do not add a title to them. |
| Images | Playbook shots have `alt` from `lib/playbook.ts`. No bare `<img>`. | Meets 1.1.1 for current images | Keep alts when the offer pages change. |
| Contrast | Not measured in a browser. `--muted-foreground` at 11px uppercase is the risky pair (`220 9% 42%` on white). | 1.4.3 AA is 4.5:1 for normal text; 11px is normal text | Do not invent a ratio. When the state chip moves to ink-on-paper or amber with a full word, retest muted captions. Do not put state only in muted 11px type. |

Skip link, `lang="en"`, `main#main`, button names, and external links with `rel="noreferrer"` are in place. Keep them.

## 21. Visual diagrams the site needs

Four. No others.

1. **The chain, with a break.** Homepage, the chain page, Agent Control. Nodes are not the same shape. AGENT, IDENTITY, PERMISSION, TOOL / MCP / API, and ACTION are one group. A labeled break: "The trace stops here." WHAT CHANGED, EVIDENCE, and AUDIT are the second group. The second group is teal only when a destination system was read. On Agent Control today the second group is drawn empty, captioned "not connected."
2. **Run versus outcome.** `SplitClaim` already states this. Keep it. Left: what the run reported (`completed`, tool calls, duration). Right: the questions (what changed, what evidence, verified or unknown). Do not tint the left side as success.
3. **The inventory row.** A spec table, not a graph: agent, identity, permission, tool, last action, evidence (pass / fail / unknown / not seen). One fictional row is allowed if the corner says SAMPLE. This is the picture of the assessment deliverable.
4. **State key.** Five chips and one line each, on any index that mixes them. Not a diagram. A legend.

Do not draw: a nine-stage lifecycle above the fold, a network of agents, a brain, a globe, a glowing architecture, a fake NOC.

## 22. Implementation backlog

No item here was built in this pass. Order is the order to build. Each line names the file and the command that fits a later pass.

### P0

1. Replace the homepage composition with the wireframe in section 8. Files: `app/page.tsx`, `homeHero` / `homeSymptoms` in `lib/services.ts`, default title in `app/layout.tsx`. Command later: `/impeccable shape` for the wireframe sign-off, then build. Do not polish the current hero.
2. Stop painting Agent Control as a launched flagship. Files: `app/platform/page.tsx` (both Flagship blocks), `lib/ark.ts` `flagship`, `components/ui/badge.tsx` `design-partners` style, `components/ark-product-page.tsx` kicker and aside. Command: `/impeccable clarify`.
3. Replace `CTA` defaults so `/` and the assessment page book the assessment, labs run the tool, and Agent Control cannot render a filled buy button. Files: `components/cta.tsx`, each page that passes a soft title into it. Command: `/impeccable clarify`.

### P1

4. Ship `StateChip` and use it everywhere `MaturityBadge` is used. Delete or alias `StatusBadge`. Add the one-line legend to `/labs`, `/platform`, and the homepage state row. Command: `/impeccable colorize` is the wrong tool; this is `/impeccable clarify` plus a token, not more color.
5. Replace `FlowChain` usage on the homepage and `/platform` with `ActionChain`. Leave `FlowChain` unused rather than quietly restyling nine equal pills. Command: `/impeccable layout`.
6. Rebuild indexes (labs, platform products, advisory) as `SpecRow`. Files: `components/product-card.tsx`, `app/platform/page.tsx`, `app/labs/page.tsx`, `app/advisory/page.tsx`. Command: `/impeccable distill`.
7. Header and footer to the five-item nav. Fix the Agent Control summary if the link remains anywhere: it is outcome assurance, and it is not for sale. Files: `lib/content.ts` `nav`, `components/site-header.tsx`, `components/site-footer.tsx`. Command: `/impeccable distill`.
8. Focus rings on every interactive element that is not `Button`. Bind contact labels. Files: `site-header.tsx`, `theme-toggle.tsx`, `site-footer.tsx`, `contact-form.tsx`. Command: `/impeccable harden`.
9. Label or remove fictional product visuals. File: `components/product-visual.tsx`. Command: `/impeccable quieter`.
10. Fix the research line "Three of the four are free" and the playbook lead that mentions price ids. Files: `app/research/page.tsx`, `app/playbook/page.tsx`. Command: `/impeccable clarify`.

### P2

11. Remove `.grid-bg` from marketing heroes. Keep `.diagram-bg` inside `Panel` only. File: `app/globals.css` and the call sites named by the detector. Command: `/impeccable quieter`.
12. Scope `prefers-reduced-motion`. File: `app/globals.css`. Command: `/impeccable animate` only to delete the fade, not to add motion.
13. 44px targets on menu, theme, and the header primary. File: `site-header.tsx`, `theme-toggle.tsx`, `button.tsx` sizes used in the header. Command: `/impeccable adapt`.
14. Click disclosure instead of hover dropdowns, if any dropdown survives the nav cut. File: `site-header.tsx`. Command: `/impeccable adapt`.
15. Labs index: governance and MCP first, other tools behind a disclosure. Advisory index: one lead engagement. Files: `app/labs/page.tsx`, `app/advisory/page.tsx`, `lib/content.ts` `labGroups`. Command: `/impeccable distill`.
16. Heading levels on the scorecard and in the footer. Files: `components/scorecard.tsx`, `components/site-footer.tsx`. Command: `/impeccable audit` after the change.

### P3

17. Remove `animate-fade-up` from heroes. Files: `tailwind.config.ts`, `page.tsx`, `platform/page.tsx`, `page-hero.tsx`, `ark-product-page.tsx`, `playbook/page.tsx`, `product-visual.tsx`. Command: `/impeccable quieter`.
18. Align icon and Open Graph colors with the tokens. Files: `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`. Command: `/impeccable polish`.
19. Do not, in this strategy: a company rename in the chrome, a new dashboard, a runtime diagram, an A2A page, or a homepage module for the $5 playbook.

### Verify when a browser exists

This pass did not render the site. The first implementation pass should screenshot `/`, `/platform`, `/ark-control`, `/labs`, `/playbook`, and `/contact` at 390px and 1280px, tab through the header, and confirm the coming-soon chip cannot be mistaken for a buyable product with the CSS off. Until those shots exist, the scores above are source scores.

---

## Cognitive load

Eight checks, all failed on the current homepage or `/platform`. That is the critical band.

| Check | Result | Where |
| --- | --- | --- |
| Single focus | Fail | `/` offers services, proof, playbooks, labs, and a call. |
| Chunking ≤ 4 | Fail | Nine lifecycle stages in one `FlowStack`. |
| Grouping | Fail | Design-partner software, a free quiz, a free app, and an assessment share one card grid. |
| Visual hierarchy | Fail | The unshippable flagship is the largest object on `/platform`. |
| One decision at a time | Fail | Home hero, then resources, then a second CTA. |
| ≤ 4 visible options | Fail | Seven header targets. |
| Working memory | Fail | State legend only on `/labs`. AI Fit Teams in the footer, absent from the header. |
| Progressive disclosure | Fail | `/platform` pastes every product's full "today" paragraph, then repeats the flagship. |

The wireframe in section 8 is the fix: one claim, one picture, three rows, two buttons.

## Personas

**Enterprise security buyer.** Home never says identity, authority, or audit. The header promises approval gates. The page is outcome evidence and not for sale, dressed as a flagship. There is no deployment or retention block, which is correct only if the page stops looking purchasable. Alpha labs stamped "Free" sit next to that flagship and are easy to mistake for the control product.

**Staff engineer.** `/developers` is the right page and it is not linked from the first screen. Runtime research has the same card weight as open tools. The MCP picture is six equal pills. GitHub is real and is in the footer, after the consultancy pitch. `ProductCard` says Free on experiments.

**Founder buying a playbook.** The header item Playbooks is the paid catalog, which is actually right for them, and wrong as a peer of Agent Infrastructure. They meet the price only after the services and the case studies, under "use our methods without hiring us," which reads as a lead magnet. On the pricing section they then read the words "price id." The offer routes (`/offer`) already do this job better by removing the nav. Send paid intent there. Do not make them enter through `/`.

## What's working

- The "where this is today" block is mandatory in `ArkProductPage`. That is the right product discipline. The frame around it is what fails.
- `SplitClaim` is the one picture that argues the company's actual point: a finished run is not a verified outcome.
- The token comment in `globals.css` already says the teal is for the product, never for decoration. The flagship ring is the violation of the site's own rule.
- Labs publishes a maturity key that says what each word commits the company to. Extend that key. Do not bury it.
- `/offer` removing site navigation is the correct pattern for a single-purpose purchase. The enterprise pages should learn the inverse lesson: one action, not zero navigation.

## Questions this audit does not answer

These are implementation choices, not open strategy. The strategy is the Grill. The visual direction is the brief you already wrote (technical, minimal, premium, no theater).

1. First build: the homepage wireframe, the five state chips, or the chain diagram? They are all P0/P1. The homepage without the chips will keep lying. The chips without the homepage will be invisible.
2. Agent Control: leave the URL up and restyle it as COMING SOON, or remove it from every index and keep the URL for direct links? Both are honest. Only the first still teaches the model.
3. Scope of the first implementation pass: P0 only (homepage, flagship chrome, CTA), or P0 plus the nav and the state chip?
