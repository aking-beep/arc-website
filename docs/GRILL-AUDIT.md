# GRILL AUDIT — ARC / ARK commercial, product and positioning review

Date of review: 2026-10-19
Scope: full repository at commit `e0a3546` (branch `claude/intelligent-brahmagupta-8akujb`, level with `main`).
Posture: adversarial. Nothing in this document is written to be reassuring.

Read: `README.md`, `package.json`, `OPPORTUNITIES.md`, `COVERAGE-LOG.md`, `UAT.md`,
`docs/WRITING.md`, `docs/ARC_Playbook_Landing_Page_Copy.md`, `market-intel/2026-09-07.md`,
`playbook/` (manuscript, curation, build scripts), all of `app/`, `components/`, `lib/`,
`public/`, `supabase/`, `tests/`, `scripts/`.

No production code was changed.

---

## 0. The one-paragraph verdict

This repository contains a genuinely good consulting website, an unusually honest
one, with a strong unsold thesis buried on page four and roughly **55 distinct
offers, programs and assets** attached to **one delivery person** and **no price
on anything costing more than $20**. The thesis — *an agent reporting success is
not the same as the work being done, so check the system that was supposed to
change* — is the most valuable asset in the repo and it is attached to the only
product that does not exist. Meanwhile the thing that could be sold next week
(an agent authority inventory that produces an artifact an auditor will accept)
is spread across a free browser quiz, a free Labs scanner, a paid engagement
with no price, and a consulting menu item, and is never named as one purchasable
thing. The site does not have a positioning problem. It has a **concentration**
problem, and concentration is a decision, not a copy exercise.

---

## A. ARK commercial clarity score: **40 / 100**

Scored against a fixed rubric so the number can be argued with.

| Dimension | Max | Score | Why |
| --- | --- | --- | --- |
| Category clarity — can a stranger name what you sell in five words? | 15 | **4** | Five competing names for one business line (see §1). No category noun anywhere. |
| ICP clarity — is there one buyer? | 15 | **5** | At least three ICPs on the live site: mid-market general-IT buyer, AI engineer, solo product founder. `package.json` adds nonprofits and communities. |
| Offer clarity and price legibility | 15 | **3** | 55 offers. Zero prices above $20. Every meaningful offer routes to a call. |
| Product reality — does the thing exist and can it be bought? | 15 | **7** | The nine Labs tools are real and deployed. Of the four things the site calls "products," **none** is software ARK sells. |
| Wedge concentration | 10 | **3** | No wedge is chosen. The agent line, the general IT line and the product-playbook line each get roughly equal site weight. |
| Proof | 10 | **7** | Career proof is strong and specific (300+ features, 25% release value, 10M+ profiles, LEGO, NFL). But three of four case studies are prior-employer work and only one is ARC's own. Zero product proof: `labsProof.note` says "We'll publish usage numbers when we have them." |
| Honesty and trust mechanics | 10 | **9** | The best thing in the repo. Maturity labels on every item, a mandatory "Limits / what this is not" block in `ark-product-page.tsx`, no invented pricing, "there is no pricing page because there is nothing to price yet," `WRITING.md` as an enforced standard. Keep all of this. Lost one point because the honesty system contradicts itself once (§6, AI Fit). |
| Conversion architecture | 10 | **2** | No email capture anywhere in the repo. Nine free tools and three free frameworks that explicitly advertise "no email gate." No ladder. One $5 product and a contact form. |
| **Total** | **100** | **40** | |

**How to read 40.** This is not a bad website. A generic consultancy site scores
25. This scores 40 because the writing, the honesty and the free-tool
engineering are above market. It fails on the four things that actually decide
revenue: one category, one buyer, one visible price, one path.

---

## B. Top positioning problems

### B1. Five names for one business line

| Where | What it is called |
| --- | --- |
| `README.md:3` | "the ARC ecosystem: **Labs · Studio · Research · Academy**" |
| `package.json:5` | "Labs, Studio, Research, Academy" + "companies, nonprofits, and communities" |
| `lib/content.ts` nav | "**Agent Infrastructure**" (route `/platform`) |
| `app/platform/page.tsx` h1 | "Infrastructure for software that acts on its own." |
| `lib/ark.ts` | module named `ark`, positioning "Infrastructure for reliable agent action" |
| Route | `/ark-control` |
| Page title on that route | "**Agent Control**" |
| Footer column | "Agent infrastructure" |
| Your brief | "**ARK Transformation Systems**" |

"Studio" and "Warden" exist **only** in `README.md` and `package.json` — there is
no Studio route, page or content. `OPPORTUNITIES.md` still tracks `arc-skills`,
`aifit-engine` and "Studio Warden" as live surfaces; `arc-skills` no longer
exists in `lib/content.ts` (it was removed; `UAT.md` acceptance criterion 5 still
asserts `/labs/arc-skills` returns 200 — that criterion is now false).

And the punchline: **the string "ARK" appears nowhere a visitor can see it.**
Only in `lib/ark.ts`, the `/ark-control` URL, and one CSS comment. You are
rebranding to ARK and the website has never said the word.

This is not pedantry. A wedge you cannot name, you cannot be recommended for.

### B2. The site sells its own positioning line against itself

`lib/ark.ts` says the position is "Infrastructure for reliable agent action."
`lib/content.ts` `site.tagline` says "Make technology work for your business."
`homeHero.title` is that same line, and `homeHero.kicker` is
"AI · Automation · Cloud · Security · Software."

The homepage therefore opens by claiming a five-category surface, lists six
generic IT symptoms, presents four generic IT service pillars, shows three
prior-employer case studies, and then offers $5 PDFs. **Agents are not mentioned
above the fold.** A visitor who arrives from an agent-governance search bounces
before reaching the one thing you are actually differentiated on.

### B3. Your own free tool would fail your own website

`arc-journey-scanner` exists to detect, verbatim from `lib/content.ts:563`:
"missing prices, account walls, **sales-only CTAs**, thin SPA checkouts, and
competing asks."

The ARC site has: no price on 8 advisory engagements, 5 retainers, 3 workshops,
2 assessments or the flagship product; "Talk to us" / "Tell us what's happening"
/ "Scope an assessment" as the terminal CTA on nearly every page; and at least
four competing asks on the homepage (contact, services, playbooks, labs).

`WRITING.md` test 8 says a CTA must "describe something a human wants to do."
Nobody wants to talk to you. They want to know what it costs.

### B4. Honest about maturity, silent about money

The maturity discipline is real and it is an asset. But it has been applied
asymmetrically: you are scrupulous about not overstating *readiness* and
completely silent about *price*. The effect on a buyer is not "these people are
careful," it is "I cannot tell whether this is a $5 business or a $500k
business." Honesty about capability without legibility about price reads as
small, not as trustworthy.

### B5. The strongest thesis is attached to the weakest asset

"Execution success is not a verified outcome" (`lib/ark.ts:44`) is the best line
in the repository. The `executionGap` chain, the `SplitClaim` component showing
"status: completed / 7 of 7 steps / 12 tool calls ok" against the six assurance
questions, the `assuranceChecklist` — this is category-creating material.

It is the entire content of `/ark-control`, which states on the first screen
that it cannot be bought. You have put your sharpest argument behind a door
marked "not for sale."

### B6. Three ICPs wearing one coat

- `bestFit`: "Operators in 10–500 person companies, nonprofits, and teams"
- `playbookAudience.forYou`: "Founders deciding whether a first AI product should exist… Builders in Cursor, Claude Code, or Codex"
- `labs` audiences: "Engineering and agency leads," "Builders writing system prompts," "CMOs, product, marketing"
- `arkProducts` audiences: "CIOs, CISOs, and engineering leads"
- `package.json`: nonprofits and communities

A CISO at a 1,500-person fintech and a solo founder buying a $5 PDF do not
belong on the same website. One of them has to leave.

---

## C. Recommended category

**Agent authority and release governance.**

Not "agent observability" — Datadog, LangSmith, Braintrust, Arize and every APM
vendor own that word and will spend more than you to keep it. Not "AI
governance" — that is a GRC category and Vanta/Drata/IBM will eat it from the
compliance side. Not "agent infrastructure" — that word means the runtime, and
the runtime belongs to AWS, Microsoft, Google and the model vendors. You said
you do not want to fight them; "infrastructure" is the word that picks the
fight.

Say it in the buyer's words, which is what `WRITING.md` demands:

> **ARK answers one question in writing: what are your AI agents allowed to do,
> and who signed off?**

That is a category of one today, it is a document a real person is already being
asked for, and it does not require you to out-build anyone.

**Reject "infrastructure for reliable agent action" as the public line.** Keep it
as the internal north star — it is a good one — but it is unbuyable, uncheckable
and unmemorable as a market position. "Infrastructure" is a promise you cannot
keep at your size, and a technical buyer will test it in the first five minutes.

---

## D. Recommended wedge

**The Agent Authority Record: a versioned, machine-readable contract per agent,
with drift detection against what the agent can actually reach, and a signed
human approval attached.**

Concretely, the smallest commercially credible product:

1. An agent's operating contract as a file in the customer's repo
   (`agent.contract.yaml`) — the six fields you already published free in
   `lib/learn.ts`: goal, trigger, state, boundary, evidence, owner, plus stop
   and recovery.
2. A CI check that reads the agent's **actual** reachable surface — its MCP
   server list, tool manifest, IAM role, API scopes — and **fails the build when
   the declared boundary and the real boundary disagree.**
3. An approval record: a named human signs the contract for a version; the
   signature is attached to a commit.
4. An export: one PDF/JSON evidence pack listing every agent, its authority, its
   approver, its last drift check and its last change.

### Why this wedge and not the obvious alternatives

**Why not outcome verification (Agent Control) first.** Because verification
requires read access to *every destination system* an agent touches. That is a
connector business: Salesforce, NetSuite, Stripe, Workday, Postgres, Snowflake,
SAP, and whatever the customer wrote in 2014. A small company cannot build N
connectors, and the value is zero until the Nth one works for that specific
customer. **Agent Control as currently conceived is an integration platform
wearing an assurance product's clothes.** It is the right destination and the
wrong first move. If you insist on building verification first, build it for
*exactly one* evidence domain where the record is already structured and already
reconciled — payments — and say "payment outcome verification," not "outcome
assurance."

**Why not identity.** Okta, Entra, Teleport, 1Password and AWS IAM already hold
the identity plane and are all shipping agent identity now. You will not win it
and you should not try.

**Why not observability.** Traces are a commodity and the buyer already pays
someone for them.

**Why the contract works at your size.** Drift detection reads only the agent's
*own* configuration — 3 to 5 integrations covers most of the market (Claude Code
/ MCP config, an OpenAI or Anthropic project, a cloud IAM role, a CI provider).
It never needs read access to the destination systems. That is the difference
between a product a solo founder can ship in a quarter and a platform that needs
a team of twenty.

**Why it is defensible-ish.** See §L2 — the schema, the cross-customer drift
corpus, and the auditor relationship.

**Why it expands.** Contract → enforcement → verification → A2A, each adding one
layer of privilege and one integration class. The customer who has written their
contracts with you is the only customer who can buy enforcement from you, and
the customer running enforcement is the only one who can buy verification. The
ladder is load-bearing, not decorative.

---

## E. First ICP

**The platform or security engineering lead at a 200–2,000 person software,
fintech or healthtech company that has between 3 and 30 agents in or approaching
production, and a dated obligation that now asks about AI.**

The dated obligation is the qualifier, and it is non-negotiable. It is one of:

- a SOC 2 Type II audit window,
- an enterprise customer's security questionnaire with new AI-agent questions,
- EU AI Act Article 50 duties, live since 2026-08-02 (already in `lib/research.ts`),
- a board or insurer asking what the agents can do after an incident.

**Why this person.** They have budget, a deadline, a document they cannot
produce, and no vendor currently selling them the document. They are technical
enough to respect `WRITING.md`'s register and senior enough to sign.

**Who comes off the site.** Nonprofits. Communities. Solo founders. CMOs
(`arc-journey-scanner`). Agency owners doing client chargeback (`tokenloop`).
Each of these is a real audience and each one costs you the first ICP.

---

## F. First paid problem

> "An auditor / our biggest customer / our board has asked what our AI agents
> can access and who approved it. The honest answer is a Notion page someone
> wrote in March, and I have three weeks."

This is the right first problem for three reasons: it has a **date** on it, the
deliverable is a **document** (so you can deliver it with the people you have),
and the buyer is **embarrassed**, which is the fastest-closing emotion in B2B.

Deliberately **not** the first paid problem: "our agents might do something
bad." Fear with no date does not convert. "We want to use AI better" — no owner,
no deadline. "We cannot verify outcomes" — correct, important, and a year early
for this buyer.

---

## G. Product that should be sold first

**Nothing. You have no software product to sell and you should stop implying you
do.**

`/platform` says "Four products, each with its maturity attached." Of the four:

| "Product" | What it actually is |
| --- | --- |
| Agent Control | A thesis document. Explicitly not for sale. |
| Agent Readiness | A 20-question browser quiz + a consulting engagement. |
| AI Fit | An outbound link to `arc-stack-advisor.vercel.app`, a Labs **alpha** tool. |
| AI Fit Teams | A 3–4 week consulting assessment. Duplicate of the AI Readiness Audit (§6). |

So: **the first thing to sell is the assessment (§H), and the first thing to
BUILD is the Agent Authority Record (§D).** The sequencing is the whole point —
the assessment produces the artifact by hand for 5–10 customers, and the
software is "that artifact, continuously, for a fraction of the price." You will
have specified the product by delivering it.

If you need one sentence for the roadmap: **ARK Registry** (contracts + drift +
approvals) ships first; **ARK Control** (enforcement + outcome verification)
ships second and is the enterprise product, not the first one.

---

## H. Consulting offer that should be sold first

**Agent Authority Assessment — 2 weeks, fixed scope, fixed price, published
price.**

This already exists in the repo as the right-hand card on `/agent-readiness`
("Agent Readiness Assessment, 2–3 weeks") with the right deliverables: agent /
tool / credential inventory, blast-radius ranking, approval and revocation
gates, spend guardrails, 30/60/90 hardening plan. Four changes make it sellable:

1. **Put a price on it.** $15,000. One number, on the page. Pick it, publish it,
   change it later if it is wrong. The absence of a number is costing you more
   than a wrong number would.
2. **Name the artifact, not the activity.** The deliverable is "the Agent
   Authority Record: every agent, what it can reach, who approved it, where it
   drifts, signed and dated." Buyers pay for artifacts and resent processes.
3. **Make the artifact the thing an auditor accepts.** This is the highest-value
   sentence you can earn the right to write. Get two audit firms to say the pack
   satisfies a control and you have a distribution moat (§L2).
4. **Cut it to 2 weeks.** "2–3 weeks" signals you have not run it enough times
   to know. Fixed scope, fixed duration, fixed price, one output.

Rename the engagement **Agent Authority Assessment**, not Readiness. "Readiness"
is a maturity-model word and maturity models are free. "Authority" names the
thing the auditor asked about.

Second consulting offer, and only second: **Agent Release Review**, $6,000–9,000
per month. Re-run the inventory, review new agents before they ship, refresh the
pack quarterly. This is your **only available recurring revenue in the next 90
days** (§M) and it is the thing the software eventually replaces, which makes
every customer a design partner by default.

---

## I. Free tool that should drive acquisition

**ARC Agent Governance → rename to "Agent Authority Scan," make it the single
front door, and attach an email to the report.**

It is already the right tool: `lib/content.ts:597` — inventory from prose or
JSON, 19 published rules across identity, privilege, data, autonomy, audit,
change and MCP, deterministic scoring, every finding quoting the input, CLI
usable as a CI gate. Its stated audience is already the first ICP: "CIOs, CISOs,
and engineering leads whose vendors switched on agent access this year."

Three changes:

1. **Email to save or share the report.** Not to see it. The scan runs free and
   complete; the shareable permanent link and the PDF cost an email. This does
   not violate your standard — "no email gate" means no gate on the value, and
   you keep that promise. Right now you have nine free tools, zero known users
   and **no list**. That is the single most expensive mistake in the repo.
2. **End the report with the gap only a human can close.** The scan reads what
   you type. The assessment reads what you run. That sentence is the whole
   funnel.
3. **Keep the MCP Conformance Scanner as the second front door** — it is the
   only tool with a genuinely defensible claim ("the 2026-07-28 revision changed
   server startup and existing servers expire in about a year") and it reaches
   the engineer who reports to the first ICP. But ship the July rule pack; it
   has been open on the roadmap since the spec landed and `OPPORTUNITIES.md` has
   flagged it twice. A conformance scanner that does not implement the current
   spec is the one product whose credibility is strictly binary.

**Everything else in Labs comes off the front door.** Nine tools with no usage
numbers is not a portfolio, it is nine maintenance liabilities and nine
different implied ICPs. Details in §4.

---

## J. Product ladder

The ladder you sketched, instantiated — with the gap you have not noticed
marked.

```
  FREE          Agent Authority Scan                           $0 + email
                (arc-agent-governance, renamed)
                → MCP Conformance Scanner as second door
                      │
                      │  ⚠ 15,000× price jump. No rung here today.
                      ▼
  LOW-TICKET    Agent Authority Starter Kit                    $249
                contract schema + drift checklist + evidence-pack
                template + the 3 free frameworks, packaged
                      │
                      ▼
  ASSESSMENT    Agent Authority Assessment                     $15,000
                2 weeks · fixed scope · the signed Record
                      │
                      ▼
  ADVISORY      Agent Release Review (monthly)                 $6–9k / mo
                + hardening implementation, scoped from the plan
                      │
                      ▼
  SOFTWARE      ARK Registry                                   ~$200 / agent / mo
                contracts in repo · drift CI · approval records
                · evidence export                              floor ~$1,500/mo
                      │
                      ▼
  ENTERPRISE    ARK Control                                    6 figures / yr
                enforcement at call time · approval gates ·
                outcome verification · audit export
```

**The missing rung is the real finding here.** Free → $15,000 is a cliff, and a
cliff means the free tools generate traffic that cannot be converted. You
already have the content for the $249 rung sitting in `lib/learn.ts` and
`playbook/manuscript/` — it is just priced at $5 and aimed at the wrong buyer
(§5). Moving the playbook content from "founder deciding whether to build an AI
product" to "platform lead who has to document 12 agents by Friday" is a
repositioning, not a rewrite, and it fills the gap with assets you already own.

---

## K. Recommended website navigation

Six items, one button. Replaces the current six items plus two dropdowns.

```
Agents          /agents        the wedge hub (replaces /platform)
Assessment      /assessment    the paid offer, with the price on it
Tools           /tools         two tools (replaces /labs)
Research        /research      unchanged
Consulting      /consulting    the demoted four pillars, one page
About           /about         unchanged
                [ Run the free scan ]   ← primary button, replaces "Talk to us"
```

Rationale for each change:

- **"Agents" not "Agent Infrastructure."** One word, the buyer's word, no claim
  you have to defend. The dropdown goes away entirely — a five-item dropdown
  (`Overview / Agent Control / Agent Readiness / AI Fit / For developers`) asks a
  visitor to understand your taxonomy, which is exactly the failure
  `lib/content.ts:1465` says the previous nav was fixed to avoid. You fixed it in
  the top bar and reintroduced it one level down.
- **"Assessment" gets its own nav slot.** The one paid thing deserves the one
  slot. Today it is a card halfway down `/agent-readiness`.
- **"Tools" not "Labs."** "Labs" tells a buyer it is unfinished. The maturity
  badges already do that job honestly on each card; the nav label should not do
  it twice.
- **"Consulting" is one item, one page, and it is fifth.** The four service
  pillars stay (they are the revenue), but as a page a visitor reaches
  deliberately, not as the first thing in the bar.
- **"Playbooks" comes out of the nav.** A $5–20 PDF does not earn a top-level
  slot on a site selling a $15,000 assessment. It lives under
  `/consulting` and `/tools`, and keeps its `/offer/*` ad landing pages for paid
  traffic, which is the right place for it.
- **"Work" comes out of the nav**, folds into `/about`. Three of four case
  studies are prior-employer work; given a top-level slot they read as the main
  evidence, which makes ARK look like a staffing proposition.
- **The button changes from "Talk to us" to "Run the free scan."** Per
  `WRITING.md` test 8. "Talk to us" is a thing you want; the scan is a thing
  they want.

---

## L. Homepage information hierarchy

Current order (`app/page.tsx`): generic hero → six generic IT symptoms → four
service pillars → prior-employer case studies → playbooks + career stats →
"not sure which one you need?"

That is Wynter layers in the order 1-generic, 2-generic, 2-generic,
4, 3, 5 — and `WRITING.md` says the page order must be clarity → relevance →
value → differentiation → friction. The homepage violates the standard the
repo enforces on every other page.

Recommended order:

| # | Section | Content | Layer |
| --- | --- | --- | --- |
| 1 | Hero | **"What are your AI agents allowed to do, and who signed off?"** Sub: the agents are already in your CRM, your editor and your CI, they hold credentials, and nobody has written down what they can reach. Primary: *Run the free scan*. Secondary: *See the assessment — $15,000*. | Clarity |
| 2 | Recognition | Five symptoms, all agent-specific, all from `serviceAreas.operate.symptoms` which already has the right five: nobody can list what agents can reach; a run reports success and you cannot confirm anything changed; vendors switched on agents you did not ask for; an agent works in a demo and you will not let it touch a customer; spend moves with usage and the invoice is the first you see of it. | Relevance |
| 3 | The artifact | **Show the Agent Authority Record.** A real screenshot or a designed panel: agent, authority, approver, last drift check, status. One image doing the work of four paragraphs. This is the single biggest missing asset on the site — you sell documents and show none of them. | Value |
| 4 | The gap | `executionGap` + the `SplitClaim` component — "status: completed, 7/7 steps, 12 tool calls ok" against the six assurance questions. This already exists and is excellent. Move it from page four to the homepage. | Value / Diff |
| 5 | Why ARK | Deterministic rules, every finding quoting your own words, published rubrics, no model generates a score, limits stated on the page. Then one line of career proof — not six. | Differentiation |
| 6 | The ladder | Free scan → $249 kit → $15k assessment → monthly review. Four boxes, four prices, visible. | Friction |
| 7 | Market signals | `MarketSignals` filtered to the agent/security/regulation signals only. Drop the cost and skills cards from the homepage; they serve a different buyer. | Relevance |
| 8 | Close | *Run the scan* or *book 30 minutes*. Two options, not four. | Friction |

Out of the homepage entirely: the four service pillars, the career case-study
grid, the playbook pricing line, "Make technology work for your business."

---

## 1–20. The grilling, answered directly

### 1. What ARK actually is

Today, measured by what a visitor can buy: **a senior solo consulting practice
with an unusually good free-tool marketing engine and a $35 PDF business.** It
is not a product company, not an infrastructure company, and not yet a software
company. Every page that implies otherwise is spending the credibility the
maturity labels earned.

What it could be in 18 months: **the company that writes down what agents are
allowed to do, and whose write-up auditors accept.** That is a real, small,
defensible business that a one-to-five person company can own, and the entire
first wedge is in service of earning the second half of that sentence.

### 2. Who our first ICP is

See §E. One ICP, one qualifier (a dated obligation). The test for whether you
have actually chosen: **can you name five companies and the person's job title at
each?** If not, you have chosen a segment, not an ICP.

### 3. What problem is painful enough to pay for

See §F. Rank-ordered by willingness to pay *today*:

1. "I owe someone a document about our agents and I have a deadline." **Pays now.**
2. "An agent did something and we cannot reconstruct what or under whose authority." Pays now, but post-incident, so unpredictable timing.
3. "Our agent spend moved and the invoice was the first we knew." Pays, small amounts, wrong buyer (eng manager), and it is TokenLoop's problem not ARK's.
4. "We cannot verify outcomes." The right thesis, pays in 12–24 months, needs integrations you cannot build yet.
5. "We are not sure where AI belongs." Pays, but it is strategy consulting and competes with everyone including free.
6. "Is my MCP server conformant?" Does not pay. Engineer, no budget. Which is correct — it is the free tool.

### 4. What we can credibly sell TODAY

Three things, and the honest list is short:

1. **The Agent Authority Assessment** (§H) — $15k, 2 weeks, deliverable is a document, delivered by the person with 20 years of Fortune 100/500 program delivery. Credible, defensible, available next week.
2. **The scoped reviews already on `/advisory`** — architecture, cloud/DevOps, data health, security posture. These are real, well-written and almost certainly where current revenue is. They are credible because the career proof matches them exactly.
3. **Workshops** — three formats, real, low-friction, and the best standing-start offer you have for a cold list.

Not credibly sellable today: any of the four "products," the three paid
playbooks as a business (as distinct from as an asset), and anything described
as infrastructure.

### 5. What should remain consulting

- All 8 advisory engagements.
- All 3 workshops.
- Agent Authority Assessment (until the Registry replaces its data collection, which is 2027 at the earliest).
- AI Fit Teams — but **merged into the AI Readiness Audit, because they are the same engagement.** Compare: `lib/ark.ts` `ai-fit-teams.capabilities` is {readiness scorecard, shadow-AI inventory, classified backlog, 30/60/90 roadmap}; `lib/content.ts` `ai-readiness-audit.deliverables` is {readiness scorecard across capability/intent/teams/habits, shadow-AI inventory, process opportunity map, classified automation backlog, 30/60/90 roadmap with owners}. **Four of four bullets match.** You are selling one engagement under two names on two pages with two CTAs. A buyer who notices this stops trusting the rest of the catalog.
- The four service pillars as a delivery capability. Demoted in the navigation, not deleted from the business.

### 6. What should become software

**Exactly one thing: the Agent Authority Record (§D).**

Everything else that currently looks like a software candidate is either a
deterministic rules engine that is already built and free (the scanners), or a
document (the playbooks), or an integration platform you cannot staff (Agent
Control today).

And a specific correction while we are here: **`/ai-fit` claims maturity
`available`; `/labs/arc-stack-advisor` claims maturity `alpha`. They are the
same software.** Your own honesty system contradicts itself on two pages about
one tool. That is the one defect that damages the thing the site is best at, and
it is a ten-minute fix: delete `/ai-fit`, keep the Labs page, link to it.

### 7. What should be free

- **Agent Authority Scan** (the renamed agent-governance tool) — free, complete, email only to save or share.
- **MCP Conformance Scanner** — free, open source, no email. It is developer credibility and should never be gated.
- **The three frameworks** in `lib/learn.ts` — free, complete, no gate. These are excellent and they are the specification for the software. Keep the promise exactly as written.
- **Research** — free, no gate. Eight cited briefs with a "where this argument is weak" section is a genuine trust asset.

Nothing else should be free, because nothing else should exist (§8).

### 8. What should be removed

| Remove | Why |
| --- | --- |
| `/ai-fit` (the product page) | Duplicate of a Labs tool, with a contradictory maturity label. |
| `/ai-fit-teams` | Duplicate of the AI Readiness Audit under a second name. |
| `arc-journey-scanner` | A marketing-funnel tool. Completely off-thesis. Its ICP is a CMO. Its existence is the clearest evidence that tools are being built because they can be, not because they serve a buyer. |
| `arc-workflow-scanner` | A process-consulting lead magnet for a different business. |
| `connectivity-scanner` | Generic TLS/header checking. Competes with a dozen free tools, reaches nobody who buys agent governance. |
| `prompt-reviewer` | Prompt review is a commodity in 2026 and this does not touch the wedge. |
| "Studio" and "Academy" from `README.md` and `package.json` | They do not exist. Stale strings in the two files a developer or an acquirer reads first. |
| "nonprofits, and communities" from `package.json` | Not the ICP. |
| `UAT.md` acceptance criterion 5 (`/labs/arc-skills` returns 200) | Asserts a route that no longer exists. Either stale or an untracked regression. |
| `OPPORTUNITIES.md` items 1, 5, 9 | Reference `arc-skills` and `aifit-engine` surfaces that are gone or renamed. An opportunity list pointing at dead products is worse than no list. |
| "Talk to us" as the universal terminal CTA | See B3. |

A note on removal: **archive, do not delete.** Move the four off-thesis scanners
to a `/tools/archive` page or to GitHub-only, with one honest line ("built for a
different problem, still works, not maintained"). That costs nothing, keeps the
GitHub proof, and takes six implied ICPs off the live site.

### 9. What should be labeled research / prototype / coming soon

The repo already does this better than almost any site of its size. Specific
calls:

- **Agent Control → "Roadmap," not "Flagship."** It is currently labeled
  `flagship: true` and given the largest card and a dedicated section on
  `/platform`. A product that cannot be bought should not be the flagship; the
  flagship should be the thing that makes money. Keep the thesis page (it is your
  best writing), relabel it, move it below the assessment.
- **Runtime → stays `research`.** Correct as-is, and the "We are publishing the
  thinking, not selling a runtime" line is exemplary. Do not touch it.
- **TokenLoop → stays `alpha`,** and see §16/§17 on whether it belongs here at all.
- **A2A → not on the site at all yet.** See §15.
- **ARK Registry → "In development, design partners"** once you start it. Use the
  exact `today` pattern from `lib/ark.ts` — it is the right pattern.

### 10. What ARK's initial agent-infrastructure wedge should be

§D. One sentence: **the agent's declared authority, checked against its real
authority, signed by a named human, exportable as evidence.**

What this deliberately excludes from v1, and why:

| Excluded from v1 | Why |
| --- | --- |
| Runtime enforcement (blocking a call) | Requires sitting in the call path. Latency, liability, and a far harder sale. v2. |
| Outcome verification | Requires read access to every destination system. v3. That is Agent Control. |
| A2A | No adoption in this ICP. v4 or never. |
| Cost controls | Different buyer, different product. That is TokenLoop. |
| Evaluations | Crowded, commoditizing, and about answer quality, not authority. Never. |
| Agent identity issuance | Okta/Entra/AWS own this. Integrate, never compete. |

The discipline that makes this a wedge rather than a feature list: **v1 reads
configuration and writes a document. It has no privileges, blocks nothing, and
cannot break production.** That is why a 1,500-person fintech will let a
two-person vendor install it, and it is the only reason.

### 11. Why a company would buy this from ARK instead of an incumbent

The honest answer, and you should be suspicious of any answer that is more
flattering:

**Because no incumbent is selling it, and the ones who will are 18–30 months
away.** That is it. That is the whole window.

- Datadog/LangSmith/Braintrust sell telemetry. Authority-vs-declared-authority is not on their roadmap because it is not a metric.
- Okta/Entra sell identity. They will issue agent identities and will not write per-action contracts or produce audit artifacts for two product cycles.
- Vanta/Drata sell control evidence. They will get here — this is the most likely eventual competitor — but they come from the compliance side and will model agents as another asset class, badly, for a while.
- AWS/Microsoft/Google sell the runtime and will ship governance that works only inside their runtime. Your customers run agents across three clouds and four vendors; vendor-neutral attestation is structurally not their product.
- Model vendors will not attest to a competitor's agent.

Secondary, weaker, but true: a 2-week fixed-price engagement from the person who
will do the work is purchasable by a platform lead with discretionary budget.
Nobody buys a Vanta module in two weeks.

**What is not a reason to buy from ARK, and should never appear on the site:**
better technology, more complete coverage, or deeper expertise than a vendor
with 200 engineers. Those claims fail the first technical conversation.

### 12. What creates defensibility

Ranked by how much is actually achievable at your size.

1. **The auditor relationship (highest leverage, lowest cost, nobody is doing it).** If two or three audit firms accept the ARK evidence pack as satisfying an agent-governance control, every customer in their book has a reason to buy and no competitor can route around it. This costs you phone calls, not engineering. **It is the single most underrated move available and it appears nowhere in the repo.**
2. **The schema.** If `agent.contract.yaml` becomes the format teams write, that is a de facto standard, and standards accrete. Publish it under a permissive licence, free forever, with a reference validator. The product is the registry, the drift check and the signature — never the format.
3. **The cross-customer drift corpus.** What agent permission configurations actually break, which no single customer can see and no incumbent is collecting. This compounds, slowly, and only if you start collecting from customer one. It is also the only data asset in the business, so the privacy posture around it has to be designed on day one, not retrofitted.
4. **Published rules as a trust mechanism.** 19 SEC-* rules, 19 governance rules, every finding quoting the input, scores from a rubric and never from a model. Copyable but rarely copied, because copying it means committing to determinism in a market selling magic.
5. **The writing.** `docs/WRITING.md` is a real competitive asset. Most companies in this category cannot write a sentence a buyer would say out loud.

**What is not defensibility, despite appearing to be:** the nine Labs tools (a
weekend each for a competent engineer), the playbook PDFs (copyable in an
afternoon), the research briefs (good marketing, zero moat), and "senior-led
delivery" (every boutique says it).

### 13. What creates recurring revenue

Today: **nothing.** Playbooks are one-off. Advisory is project-based. The five
retainers are listed on `/advisory` with a commitment in hours and no price and
no evidence any has been sold.

In the next 90 days, exactly one option: **Agent Release Review, $6–9k/month,
three-month minimum** (the terms are already on the advisory page). Reframe the
retainers away from the labor model — "Fractional Head of AI, 30–50 hrs/month"
is sold by the hour, competes with every fractional CTO, and caps at your
calendar — and toward a fixed-scope recurring artifact: re-run the inventory,
review new agents pre-release, refresh the pack quarterly. Same work, priced as
a subscription, with a software replacement path.

In 12–18 months: ARK Registry seats. Per-agent pricing is the right meter
because agent count only goes up, the customer can count them, and it maps to
the value (one more agent is one more thing to document).

**Do not** attempt recurring revenue from the playbooks. A $5–20 one-off PDF has
no renewal event. "Updates to this edition" is a promise, not a subscription.

### 14. What creates a natural expansion path

The ladder in §J is the expansion path, and it works because each rung is a
precondition for the next rather than an upsell:

- You cannot sell drift detection to someone who has not written contracts.
- You cannot sell call-time enforcement to someone whose declared authority is not already in your system.
- You cannot sell outcome verification to someone who has not already given you read access for enforcement.
- You cannot sell A2A governance to someone who is not already governing single agents.

That is a real land-and-expand, and the land is a free document.

**What breaks it:** selling the assessment as a standalone artifact with no
software path (you become a boutique forever), or building Registry before
delivering 5–10 assessments by hand (you build the wrong schema and find out
after the engineering).

### 15. Whether A2A belongs in the first product or the roadmap

**Neither. It belongs nowhere on the website for at least six months.**

Three reasons, in order of weight:

1. **Your ICP is not running A2A.** A 200–2,000 person company with 3–30 agents has agents calling tools, not agents calling agents. Governing a conversation nobody is having is a solution looking for a market.
2. **It is a credibility liability with your exact buyer.** The technical buyer `WRITING.md` is written to keep reads an A2A page as "this company follows announcements." You cannot afford that read, because following announcements is precisely what a small vendor is suspected of.
3. **The repo already agrees with me.** "A2A" appears exactly once in the entire codebase — one clause in `developerAreas.Protocols` ("agent-to-agent patterns… forming around them"). That single hedged mention is the correct amount of A2A on this website today. Someone's instinct was right; trust it.

When it does belong: when a customer who already pays you for single-agent
governance asks you to govern agent-to-agent calls. Then it is a feature of
Registry, named by the customer, and it goes on the page the day it works.

### 16. Whether MCP governance is a wedge, feature or free acquisition tool

**Free acquisition tool, and a feature of the wedge. Not a wedge.**

- **Not a wedge**, because the buyer for "is my MCP server conformant" is an engineer with no budget, and the buyer for "which MCP servers can my agents reach" is the CISO — who will buy that as a line item from whoever already owns their identity or endpoint plane. A protocol is also the worst possible foundation for a small company's business: it changes without you, and when the spec stabilizes or the clients converge, the problem evaporates.
- **Free acquisition tool**, because conformance is a *dated* problem ("existing servers keep working for about a year") with a real deadline, it reaches the engineer who reports to your buyer, and it is already built and open source. This is the right job for it, and it is the one Labs tool with a defensible claim.
- **A feature of the wedge**, because "which MCP servers does this agent have, and do they match the declared boundary" is a drift check — one of the 3–5 integrations Registry needs.

Action: ship the 2026-07-28 rule pack and the CI GitHub Action. Both are open on
the roadmap and both have been flagged in `OPPORTUNITIES.md`. A conformance
scanner that does not implement the current spec is the one product where
credibility is binary, and the market-intel file notes the reference SDK has
already moved past you.

### 17. Whether ARK Control should be the primary enterprise product

**Yes as the eventual enterprise product. Emphatically no as the primary product
now, and it should come off the flagship slot today.**

The case against it being first:

- It cannot be bought. The page says so in the first screen, correctly.
- Its core promise — independent outcome evidence from the destination system — is an integration business (§D). Value is zero until the Nth connector is the customer's.
- It is `flagship: true` in `lib/ark.ts`, gets the widest card on `/platform`, gets a dedicated spotlight section, and gets the second hero CTA. Four pieces of prime real estate for something with no revenue path inside 18 months.
- "Design partners" with no named partner and no public artifact reads, to a sceptical buyer, as "nothing."

The case for it being the destination:

- Outcome verification is a genuinely different and genuinely valuable question, and almost nobody is asking it properly.
- It is the only rung on the ladder with enterprise-contract economics.
- Registry earns the read access that makes it buildable.

So: keep the page, keep the thesis, keep the writing. Change
`flagship: true` → `flagship` on the assessment, relabel Control "Roadmap · design
partners," and move it below the paid offer. **If you want one Control-shaped
thing to build in 2026, build payment-outcome verification only** — Stripe and
your ledger, one evidence domain where the record is already structured and
already reconciled. That is a product. "Outcome assurance" in general is a
platform.

### 18. Whether AI Fit / AI Fit Teams belong on this website

**No. Both come off.**

- **AI Fit** is a link to `arc-stack-advisor.vercel.app` with a product page claiming `available` while the Labs page for the same software claims `alpha` (§6). Delete the product page, keep the Labs page, keep the tool. One canonical page per thing.
- **AI Fit Teams** is the AI Readiness Audit with a different name and the same four deliverables (§5). Delete the page, keep the engagement on `/advisory`, and move it out of the agent-infrastructure section — it is an AI strategy engagement, not agent infrastructure, and filing it under "products" was what made the duplication invisible.

The deeper point: both exist because `/platform` needed four cards to look like
a product portfolio. **The page was designed around a grid, and the grid
generated products.** That is backwards, and it is worth checking what else in
the repo exists because a layout asked for it.

### 19. Whether Modernize / Automate / Build / Operate helps or dilutes ARK

**It dilutes the brand and it probably pays the bills. Demote it; do not delete
it.**

Why it dilutes: it is a general IT consultancy taxonomy. Four pillars covering
cloud, data, security, delivery, CDP, process, integration and AI says "we do
everything," which is the exact opposite of a wedge. Combined with LEGO, NFL,
Ticketmaster-scale CDP and "20 years of Fortune 100/500," the homepage reads as
a well-credentialed generalist practice. A CISO looking for agent governance does
not recognise themselves anywhere on it.

Why not to delete: the copy is genuinely good (the symptom lists are the best
writing on the site — "You have dashboards, and leadership does not trust the
numbers" is exactly what `WRITING.md` demands), the career proof matches these
four areas precisely, and this is almost certainly where revenue comes from
today. Killing current revenue to purify a position you have not yet validated
is how small companies die.

The specific move:

- Collapse `/services` + 4 sub-pages + `/advisory` into **one `/consulting`
  page** with the four areas as sections and the 8 engagements as a table.
  That is 6 pages to 1.
- **Move `Operate` out entirely and into the agent line.** Its five symptoms are
  the wedge: "nobody can list what your agents can reach," "a run reports
  success and you cannot confirm anything changed," "your vendors switched on AI
  agents inside tools you already pay for." That is not a fourth service pillar;
  **that is the homepage.** Operate is currently the most valuable copy on the
  site and it is in the fourth slot of a dropdown.
- Nav slot five, not one.

### 20. What the website should actually be trying to convert visitors into

Today it converts into: nothing, a contact form, or a $5 PDF. There is no email
capture anywhere in the repository, which means nine free tools and eight
research briefs generate traffic you cannot contact twice.

It should convert into exactly **two** things, with everything else on the site
in service of them:

1. **A completed Agent Authority Scan with an email attached.** This is the
   asset. It is a list of people who have just privately admitted they do not
   know what their agents can reach. There is no better list in this market.
2. **A booked 30-minute call about the Agent Authority Assessment**, with the
   price already known before the call.

Secondary, acceptable: a $249 starter-kit purchase (a buying signal and a
qualified name). Everything else — playbook sales, research reads, GitHub stars
— is leading-indicator traffic, not conversion, and should be measured as such.

And measure it. `lib/analytics.ts` is well-built and tracks **only the playbook
funnel**: eight events, all `playbook_*`. There is no event for a scan started,
a report viewed, an assessment page view, or a contact form submit. **The only
part of the business that is instrumented is the part worth the least.**

---

## M. Pages to keep

| Page | Why |
| --- | --- |
| `/` | Rebuild the content per §L, keep the route. |
| `/research` + 8 briefs | Best trust asset on the site. Cited, dated, with a "where this is weak" section. Keep all eight even though four are off-thesis; research breadth reads as rigour where product breadth reads as confusion. |
| `/playbooks/agent-readiness-scorecard` | The free scorecard. Works, scores in-browser, no gate. Add "email me this result." |
| `/playbooks/agent-operating-contract` | This is the Registry specification published free. Highest-leverage page on the site for the wedge. |
| `/playbooks/outcome-assurance-checklist` | Same reason, for Control. |
| `/labs/mcp-conformance-scanner` | Front door two. Ship the July rule pack. |
| `/labs/arc-agent-governance` | Becomes the primary free tool (§I). |
| `/about` | Keep. Absorb `/work`. |
| `/contact` | Keep. The topic-aware variant is a nice touch. |
| `/privacy`, `/terms` | Keep. |
| `/offer/*` (4 ad landing pages) | Keep for paid traffic. `noindex`, nav suppressed, one decision per page — this is correctly built and is the only properly designed conversion surface in the repo. Reuse the pattern for the assessment. |
| `/playbook/*` commerce stack | Keep the machinery (§5 below). Stop investing in it. |

## N. Pages to change

| Page | Change |
| --- | --- |
| `/platform` → `/agents` | Becomes the wedge hub. Lead with the Authority Record and the execution gap. Drop the four-product grid. 301 the old route. |
| `/agent-readiness` → `/assessment` | Becomes the single paid-offer page. **Put $15,000 on it.** Fixed 2 weeks. Name the artifact. Promote the right-hand card to the whole page. |
| `/ark-control` | Keep the thesis, remove `flagship`, relabel "Roadmap · design partners," move below the assessment. Rename the route `/agent-control` so the URL and the page title agree. |
| `/labs` → `/tools` | Two tools promoted, four archived, `arc-stack-advisor` kept as the canonical AI Fit page. |
| `/services` + 4 sub-pages + `/advisory` → `/consulting` | Six pages into one (§19). Move `Operate` content into `/agents`. |
| `/playbook` | Reposition to the platform lead, reprice as a $249 kit, keep the three-tier files behind it if the Paddle ids are already configured. Out of the nav. |
| `/developers` | Keep but trim. The Runtime research section is good; the rest duplicates `/tools`. |
| `/academy` | Keep the three workshops, fold the page into `/consulting` as a section. |
| `/work` | Fold into `/about`. Keep the ARC case study prominent; the three career studies become a credentials block. |
| `README.md`, `package.json` | Delete "Studio," "Academy," "nonprofits, and communities." Describe what exists. |
| `OPPORTUNITIES.md` | Close or delete items referencing `arc-skills` and `aifit-engine`. Re-rank against the wedge. |
| `UAT.md` | Fix or retire acceptance criterion 5. |
| `lib/analytics.ts` | Add scan, assessment and contact events (§20). |

## O. Pages to remove

| Remove | Disposition |
| --- | --- |
| `/ai-fit` | 301 → `/labs/arc-stack-advisor`. |
| `/ai-fit-teams` | 301 → `/consulting#ai-readiness-audit`. |
| `/labs/arc-journey-scanner` | Archive page or GitHub-only. |
| `/labs/arc-workflow-scanner` | Archive page or GitHub-only. |
| `/labs/connectivity-scanner` | Archive page or GitHub-only. |
| `/labs/prompt-reviewer` | Archive page or GitHub-only. |
| `/services/modernize`, `/automate`, `/build` | 301 → `/consulting`. |
| `/services/operate` | 301 → `/agents`. Content moves, does not die. |
| `/advisory/[slug]` × 8 as standalone pages | Collapse into `/consulting` sections. Keep the two highest-intent (`ai-readiness-audit`, `security-compliance-posture`) as standalone if they get search traffic. |

TokenLoop is the one judgement call I will not make for you: it is real, it has
a free signup, and it is the only thing in the portfolio with actual users. But
its buyer is an engineering manager with a cost problem, not a platform lead
with an authority problem. It is **a different company.** Either spin it out, or
keep it as a clearly-labelled adjacent bet with its own front door — but do not
let it occupy nav space on a site about agent authority. (§13 note: it is also
the only thing you own that could plausibly become recurring revenue faster than
Registry.)

## P. Pages / products that need to be created

| New | What it is | Priority |
| --- | --- | --- |
| `/agents` | The wedge hub. Rebuild of `/platform`. | P0 |
| `/assessment` | The paid offer with a price. | P0 |
| **An image of the Agent Authority Record** | The artifact, shown. One designed panel or real screenshot. The site sells documents and shows none. | P0 |
| Email capture on the scan report | "Email me this report" / shareable permalink. | P0 |
| `/consulting` | Six pages collapsed into one. | P1 |
| `agent.contract.yaml` schema + reference validator | Published free, permissive licence. The standard play (§12). | P1 |
| `/offer/assessment` | Ad landing page for the assessment, reusing the `/offer/*` pattern that already works. | P1 |
| Agent Authority Starter Kit ($249) | Fills the ladder gap (§J). Built from assets you already own. | P1 |
| `/tools/archive` | Honest home for the four off-thesis scanners. | P2 |
| ARK Registry (software) | The wedge, built. | P2 → P1 after 5 assessments |
| Auditor-acceptance outreach | Not a page. Ten phone calls. Highest-leverage item in this document. | P1 |

## Q. 30-day roadmap

No new software. The goal is one named offer with a price and one measurable
funnel.

**Week 1 — decide and name.**
- Pick the name. ARK or ARC, one of them, everywhere. Audit every string.
- Write the one-sentence category line and put it in `lib/ark.ts` as the single source.
- Write the Agent Authority Assessment scope, deliverable and **price**. One page, one number.
- Kill the duplicates: delete `/ai-fit` and `/ai-fit-teams`, add the redirects. (2 hours, closes the credibility hole in §6.)

**Week 2 — the artifact and the offer.**
- Design the Agent Authority Record. One page, fictional-but-realistic data, labelled as an example. This is the most important deliverable of the 30 days.
- Build `/assessment` with the price, the artifact image, the 2-week scope and a Calendly link.
- Rewrite the homepage per §L.

**Week 3 — the funnel.**
- Rename the governance tool to Agent Authority Scan. Add "email me this report."
- Add analytics events: `scan_start`, `scan_complete`, `report_email_captured`, `assessment_view`, `assessment_cta_click`, `contact_submit`.
- Collapse the nav to six items. Change the button to "Run the free scan."

**Week 4 — distribution, and the only outbound that matters.**
- Ship the MCP 2026-07-28 rule pack + GitHub Action. Post it where MCP implementers are.
- Publish one research brief on the wedge: "What your auditor will ask about AI agents in 2027." Cited, dated, with the gap section.
- **Email 30 people in the first ICP.** Not a campaign — 30 individual notes offering the free scan. This is the step that validates or kills the whole thesis, and it cannot be skipped or automated.
- **Call three audit firms.** Ask one question: what would an agent-governance artifact need to contain for you to accept it as control evidence?

**30-day success test:** three assessment conversations with a known price, and
one sentence from an auditor about what the artifact needs. Not revenue —
revenue in 30 days would be luck.

## R. 90-day roadmap

**Days 31–60 — sell the assessment by hand, build nothing.**
- Deliver 2–3 assessments. Deliver them in Markdown and spreadsheets. Resist every urge to build tooling; the manual version is the requirements document.
- After each one, write down what you built by hand and what took longest. That list is the Registry backlog, and it is the only honest source for it.
- Ship the $249 starter kit from existing playbook assets, repositioned to the platform lead.
- Publish the `agent.contract.yaml` schema and validator. Free, permissive, with a conformance example.

**Days 61–90 — the first software slice.**
- Build exactly one thing: **contract file + drift check against MCP config and one cloud IAM role, as a CLI and a GitHub Action.** No UI. No accounts. No billing. A CLI that fails a build is a product a platform lead can adopt without procurement, and it is the one shape of software a solo founder ships in 30 days.
- Three design partners on the CLI, from the assessment customers. Free, with a written agreement that it becomes paid.
- Convert one assessment customer to the monthly Agent Release Review. This is the recurring-revenue proof point and it matters more than the CLI.
- Write the auditor-acceptance memo from the §Q conversations.

**90-day success test:** one monthly retainer signed, three assessments
delivered, one CLI in someone else's CI, one auditor on record about what the
artifact needs. If the assessment has not sold by day 90 at any price, the wedge
is wrong — and knowing that by day 90 is worth more than the revenue would have
been.

**What is explicitly not in 90 days:** a hosted dashboard, accounts, billing,
Agent Control, A2A, enforcement, outcome verification, any new Labs tool, and
any further investment in the playbook commerce stack.

## S. Website backlog — P0 / P1 / P2 / P3

### P0 — the site actively costs you money without these

| # | Item | Why P0 |
| --- | --- | --- |
| 1 | Put a price on the assessment | Zero prices above $20. Every meaningful offer dead-ends in a call. §B3. |
| 2 | Pick one name and apply it everywhere | Five names for one line. §B1. |
| 3 | Rebuild the homepage to the wedge | Agents are not mentioned above the fold on a site about agents. §L. |
| 4 | Email capture on the free scan report | Nine free tools, zero list. The most expensive omission in the repo. §I. |
| 5 | Delete `/ai-fit` and `/ai-fit-teams` | Two duplicate offers and a self-contradicting maturity label, inside the system the site is best at. §6, §18. |
| 6 | Show the artifact | You sell documents and display none. §P. |
| 7 | Analytics on the scan → assessment funnel | Only the $5 product is instrumented. §20. |

### P1 — these decide the next two quarters

| # | Item |
| --- | --- |
| 8 | `/platform` → `/agents`, rebuilt around the Authority Record and the execution gap |
| 9 | Collapse `/services` + `/advisory` + `/academy` into `/consulting`; nav slot five |
| 10 | Move `services/operate` content into `/agents` — it is already the right copy |
| 11 | Nav to six items; button becomes "Run the free scan" |
| 12 | Remove Agent Control's `flagship` flag; relabel "Roadmap · design partners"; rename route `/agent-control` |
| 13 | Ship the MCP 2026-07-28 rule pack + CI Action |
| 14 | Publish `agent.contract.yaml` + validator |
| 15 | Build the $249 starter kit from existing playbook assets |
| 16 | `/offer/assessment` ad landing page on the existing `/offer` pattern |
| 17 | Playbooks out of the nav; repositioned to the platform lead |
| 18 | Auditor-acceptance conversations (not a page — the highest-leverage item here) |

### P2 — cleanup and hygiene

| # | Item |
| --- | --- |
| 19 | Archive the four off-thesis scanners to `/tools/archive` |
| 20 | `/work` folds into `/about` |
| 21 | Fix `README.md` and `package.json` (Studio, Academy, nonprofits, communities) |
| 22 | Fix or retire `UAT.md` criterion 5 (`/labs/arc-skills`) |
| 23 | Re-rank `OPPORTUNITIES.md` against the wedge; close the dead-surface items |
| 24 | 301s for every removed route |
| 25 | Trim `/developers` to Runtime research + protocol work |
| 26 | Decide TokenLoop's home: spin out, or adjacent bet with its own front door |
| 27 | `marketSignals` on the homepage filtered to the agent/security/regulation cards only |

### P3 — only after the wedge is validated

| # | Item |
| --- | --- |
| 28 | Registry hosted UI and accounts |
| 29 | Billing beyond Paddle one-offs |
| 30 | Second and third drift integrations |
| 31 | Agent Control / payment-outcome verification page with a buyable scope |
| 32 | A2A — only when a paying customer asks |
| 33 | Case studies from the assessments (with permission) — the only proof that will matter in 2027 |

---

## Offer-by-offer classification

Every current offer in the repository, classified. 55 items.

### Service areas (`lib/services.ts`)

| Offer | Verdict | Note |
| --- | --- | --- |
| Modernize | **DEMOTE** | Good copy, wrong prominence. Section of `/consulting`. |
| Automate | **DEMOTE** | Same. |
| Build | **DEMOTE** | Same. |
| Operate | **REPOSITION** | Move into `/agents`. Its symptom list is the wedge's homepage copy. |

### "ARK products" (`lib/ark.ts`)

| Offer | Verdict | Note |
| --- | --- | --- |
| Agent Control | **FUTURE** | Keep the thesis page, drop the flagship slot, relabel roadmap. Enterprise destination, not first product. |
| Agent Readiness | **REPOSITION + SELL NOW** | Becomes the Agent Authority Assessment at $15k, 2 weeks, artifact-named. The one thing to sell. |
| AI Fit | **MERGE** | Into `/labs/arc-stack-advisor`. Delete the product page. |
| AI Fit Teams | **REMOVE** | Duplicate of the AI Readiness Audit. |

### Advisory engagements (`lib/content.ts`)

| Offer | Verdict | Note |
| --- | --- | --- |
| AI Readiness Audit | **KEEP + SELL NOW** | Absorbs AI Fit Teams. Needs a price. |
| Technical Architecture Review | **KEEP** | Real, credible, matches the career proof. `/consulting`. |
| Cloud & DevOps Readiness | **KEEP** | Same. |
| Data Health & Analytics Readiness | **KEEP** | Same. |
| Security & Compliance Posture Review | **KEEP + REPOSITION** | Closest adjacency to the wedge. Add the non-human-identity section as a lead-in to the assessment. |
| AI Solution Concept + MVP Scope | **DEMOTE** | Off-thesis. Keep for inbound, do not market. |
| Delivery Program Setup | **DEMOTE** | Same. |
| Integrated Transformation Diagnostic | **DEMOTE** | 5–7 weeks, flagship-flagged, maximum dilution. Keep for inbound only. |

### Retainers

| Offer | Verdict | Note |
| --- | --- | --- |
| Fractional Head of AI / Transformation | **REPOSITION** | Labor model → fixed-scope Agent Release Review. |
| Fractional TPM | **DEMOTE** | Not the wedge. Inbound only. |
| Fractional Cloud / Platform Advisor | **DEMOTE** | Same. |
| Post-Diagnostic Execution Retainer | **KEEP** | The natural follow-on from any review. |
| ARC Partner Retainer | **REMOVE** | 80+ hrs/month from one person is not a product; it is your entire calendar sold at a discount. |

### Labs tools

| Offer | Verdict | Note |
| --- | --- | --- |
| ARC Agent Governance | **KEEP + REPOSITION** | → Agent Authority Scan. Primary free tool. Add email capture. |
| MCP Conformance Scanner | **KEEP** | Second front door. Ship the July rule pack. |
| ARC AI Stack Advisor | **KEEP** | Canonical AI Fit page. Fix the maturity contradiction. |
| TokenLoop | **REPOSITION** | Different buyer, different company. Spin out or isolate. |
| ARC AI Security Scanner | **MERGE** | Fold into the Agent Authority Scan as a rule group, or archive. Two overlapping free security scanners split the same traffic. |
| Prompt Reviewer | **REMOVE** | Commodity, off-thesis. |
| Connectivity Scanner | **REMOVE** | Generic, off-thesis. |
| ARC Journey Scanner | **REMOVE** | Marketing tool. Clearest case of a tool built because it could be. |
| ARC Workflow Scanner | **REMOVE** | Process-consulting magnet for a different business. |

### Free frameworks (`lib/learn.ts`)

| Offer | Verdict | Note |
| --- | --- | --- |
| Agent Readiness Scorecard | **KEEP** | Add "email me this result." |
| Agent Operating Contract | **KEEP + BUILD** | This is the Registry spec. Highest-leverage asset in the repo. |
| Outcome Assurance Checklist | **KEEP** | The Control spec. |

### Paid playbooks

| Offer | Verdict | Note |
| --- | --- | --- |
| Define ($5) | **REPOSITION** | → component of the $249 starter kit. |
| Build ($10) | **REPOSITION** | Same. |
| Ship ($20) | **REPOSITION** | Same. The 20 skills / 20 architectures / 16 workflow templates are the most valuable part and the cheapest-signalling price. |
| The Paddle + Supabase commerce stack | **KEEP, FREEZE** | Built, tested, secure, works. Reuse it for the $249 kit. Invest nothing further. |

### Workshops

| Offer | Verdict | Note |
| --- | --- | --- |
| Digital Readiness Workshop | **DEMOTE** | Real, sellable, off-thesis. Section of `/consulting`. |
| Operator Working Session | **KEEP + REPOSITION** | Closest to the wedge. Could become a 1-day Agent Authority Workshop at $5–7k — a useful rung between the kit and the assessment. |
| Custom Team Workshop | **KEEP** | Zero marketing cost, pure inbound capture. |

### Research (8 briefs)

| Offer | Verdict |
| --- | --- |
| Agents with credentials (Aug 2026) | **KEEP** — on-thesis |
| Metered agents / AI spend control | **KEEP** — TokenLoop's thesis |
| EU AI Act transparency live | **KEEP** — on-thesis, dated obligation, feeds the first paid problem |
| AI development horizon: agents & protocols | **KEEP** |
| Security: zero trust & AI risk | **KEEP** — on-thesis |
| Operations workflow / process mining | **DEMOTE** — off-thesis, keep published |
| Cloud infrastructure / FinOps | **DEMOTE** — same |
| Digital transformation productivity J-curve | **DEMOTE** — same |
| **To create** | "What your auditor will ask about AI agents in 2027" — **BUILD** |

### Case studies

| Offer | Verdict |
| --- | --- |
| Enterprise cybersecurity release value | **KEEP** — credentials block in `/about` |
| Consumer CDP at 10M+ profiles | **KEEP** — same |
| LEGO / NFL brand programs | **DEMOTE** — impressive, actively off-message for a CISO buyer |
| Transformation diagnostic (ARC's own) | **KEEP** — the only ARC-delivered study. Needs three agent-governance siblings, which is what the first assessments are for. |

### Developer surface

| Offer | Verdict |
| --- | --- |
| Runtime (research) | **KEEP** — correctly labelled, good writing, no promise made |
| Protocols | **KEEP** |
| Open tools | **KEEP, trim to two** |
| Documentation | **KEEP** |

---

## Five things this repository does better than its competitors

Written down so the restructuring does not destroy them.

1. **Maturity labels with a published meaning.** `maturityLabel`, the `/labs` key explaining what each badge commits you to, and `Status` kept deliberately separate from `Maturity`. Almost nobody does this.
2. **A mandatory limits block.** `ark-product-page.tsx` makes "What this is not" part of the page shell so no product page can ship without it. That is a structural honesty guarantee, not a copy decision.
3. **Refusing to invent numbers.** `labsProof.note`: "We'll publish usage numbers when we have them." `provision.mjs` refusing a price that is not the exact advertised amount. "The repository does not invent price ids." This discipline is rare and it is worth real money with a technical buyer.
4. **`docs/WRITING.md`.** An enforced copy standard with ten tests, a retired-constructions table, and the Wynter layer order. Most companies at this stage have a tone-of-voice PDF nobody opens.
5. **Determinism as a trust mechanism.** Published rule counts, every finding quoting the user's own words, "a model never produces the score." In a market selling magic, this is a position — and it is a better one than "infrastructure."

**None of the restructuring above requires giving up any of these.** It requires
pointing them at one buyer.

---

## Six questions only you can answer

These change the recommendations materially.

1. **What was revenue in the last 12 months, and which line produced it?** If the four consulting pillars are 90% of it, the demotion in §19 is a staged migration, not a cut. If revenue is near zero, concentrate harder and faster than this document says.
2. **How many hours a week can you ship software?** If it is under 15, the Registry CLI in §R is a 6-month item and the business is productized consulting for 2026. That is a fine answer; it just changes every date here.
3. **Is there actually a design partner for Agent Control?** `/ark-control` says "a small number of teams." If that is zero, the page is making a claim the site's own standard forbids, and it is the one honesty breach that would hurt most.
4. **Has any playbook sold?** `playbook_checkout_start` and `playbook_purchase_complete` are instrumented. The number decides whether the §J repositioning is a rescue or a wind-down.
5. **Are the Paddle price ids configured in production?** If not, every playbook button currently reads "Checkout is not configured yet," and the site has been advertising three products it cannot sell.
6. **ARC or ARK?** Pick today. The domain, the Google Workspace mail and all the career proof are ARC. ARK is in `lib/ark.ts`, one route and a CSS comment. A rebrand costs you the only name anyone currently recognises; keeping ARC costs you nothing except the brief in front of me. I would keep **ARC** as the company and use **ARK** only as the product-line name if you want the distinction — "ARC Transformation Group" selling "ARK Registry" is coherent and costs no equity. What is not survivable is another six months of both.
