# ARK commercial grill

> [!IMPORTANT]
> **Superseded. This audits the site as it was before the redesign.**
>
> It was written against `main` at `e0a3546` (19 October 2026). The site has
> since changed substantially, so the findings and any score in this document
> describe a version of the site that is no longer deployed:
>
> - the Magic Patterns redesign rebuilt the homepage, ARC Control, ARC Labs,
>   Solutions, Research, About, Contact and the 404 (#19)
> - every ARC GitHub link was removed and "Open source · live" became "Live" (#20)
> - the `/ark-control` console showcase was repaired and `/ark-control`
>   now redirects to `/control` (#21)
> - the founder's email address and LinkedIn came off every public surface,
>   replaced by the `/contact` form and Calendly (#22)
> - the mobile menu, which rendered 57px tall and unusable, was fixed, and the
>   real WCAG 2.1 A/AA violations were cleared (#23)
>
> Kept for the record and for the reasoning, which is largely still sound.
> Do not quote the scores as current.

Audit of the `arc-website` repository as it stands on `main` (`e0a3546`). No production code was changed.

This is an adversarial read of what the site actually sells, who it is for, and what a small company can credibly put in market. Recommendations are recommendations. The decisions that change the system are listed at the end and are not treated as settled.

The public company on every page is **ARC Transformation Group**. **ARK** exists as an internal module (`lib/ark.ts`) and as the line "Infrastructure for reliable agent action." It is not the name on the homepage, the nav, the domain, or the invoices.

---

## What the repository actually is

A Next.js 14 marketing site. Content is TypeScript, not a CMS. Commerce that works is three one-off PDFs through Paddle ($5, $10, $20) with Supabase tokens. Contact mail is optional Resend. There is no application in this repo that inventories agents, enforces a policy, or checks a destination system.

The site currently holds four businesses at once:

1. A generalist transformation practice: Modernize, Automate, Build, Operate, eight diagnostics, five retainers, three workshops.
2. A founder education SKU: Define / Build / Ship playbooks, plus a separate ad door at `/offer`.
3. A free-tool lab: nine scanners and advisors, each with its own Vercel app, most of them a paste-in rubric.
4. A future infrastructure story: Agent Control, a nine-step agent lifecycle, runtime research, and the word "infrastructure."

Those four businesses do not share a buyer.

### What is honest, and should survive any rewrite

Maturity labels are real. Agent Control's first screen says it cannot be bought. Labs says experiments are not products. The outcome checklist separates an agent claiming success from a destination system that changed. The writing standard in `docs/WRITING.md` is stricter than the offer architecture it sits on. Keep that discipline. The failure is not hype. The failure is that too many true things are being sold as one company.

### What is vague

- "Infrastructure for reliable agent action." A buyer cannot order it, budget it, or tell a colleague what arrived.
- "Make technology work for your business." The homepage sentence. It fits every consultancy in the category the site claims not to be.
- "10–500 person companies, nonprofits, and teams." That is not an ICP. It is a refusal to exclude.
- "We size the work from the problem." Combined with eight unpriced diagnostics, this means there is no offer.
- The nine-step lifecycle in `lib/ark.ts` (Discover, Authenticate, Understand, Permission, Execute, Verify, Measure, Remember, Audit). That is a platform map. A small company does not ship it. Publishing it as "the system" teaches the visitor to expect a suite.

---

## The twenty challenges

### 1. What ARK actually is

Today ARK is a positioning sentence and four pages. It is not a company, not a product, and not a priced offer.

The sentence worth keeping is already on the site, and it is narrower than the positioning line: **we check what an agent was allowed to do, and whether the system that was supposed to change actually changed.** That is a point of view. It becomes a company only after one buyer can pay for one artifact that uses it.

Until then, the company a stranger meets is ARC, a senior-led technology practice for growing companies.

### 2. Who the first ICP is

The site addresses all of these, often on the same page:

- A founder deciding whether an AI product should exist (playbooks, `/offer`).
- A mid-market operator with a cloud bill, a distrusted dashboard, or three competing initiatives (Modernize, the flagship diagnostic, three of four case studies).
- A CISO or CIO whose vendors turned agents on (Operate, Agent Readiness, Agent Governance).
- An engineering lead watching Claude Code and Cursor invoices (TokenLoop).
- A nonprofit in a digital-readiness workshop.

Pick one for the next two quarters. The evidence in this repo — the market signals, the August 2026 research brief, the Operate symptoms — points at one buyer who already has the pain:

**The person who would be blamed if an agent changed a customer record, moved money, sent email, or exported data.** Typical seat: security, IT, or the operator who owns the system of record. Company of roughly 50–500 people, or one named team inside a larger company. They did not ask for agents. Salesforce, Microsoft, Atlassian, and the coding tools turned them on, and the agents inherited somebody's permissions.

Everyone else is a different company. Serving them on the homepage makes this buyer leave.

### 3. What problem is painful enough to pay for

This one, already written on the Operate service and nowhere attached to a price:

> Nobody can list what the agents can reach or what they can change. A run reports success and nobody can confirm the destination system changed.

The first half is payable this quarter. The second half is the right principle and a bad first product, because verifying an outcome requires a read path into each destination system. `lib/ark.ts` already admits Agent Control cannot verify a system it cannot read. A small team that leads with universal outcome verification is describing a integration company it has not built.

Pay for: **a list of the agents, the tools, MCP servers, and APIs they can call, the actions that can move money or customer data, and which of those actions have a human gate.** That list is producible in a few weeks with interviews and read-only access. It goes stale, which is what makes the later software recurring.

Do not charge first for: architecture shape advice, a transformation roadmap, a $5 worksheet, prompt quality, or a connectivity grade.

### 4. What can be sold today

| Can take money this week | Cannot |
| --- | --- |
| A scoped assessment, if someone will say the price out loud. The site never does. | Agent Control. The page says so. Believe the page. |
| The three playbooks, if a founder wants a PDF. Checkout exists. | Any Labs tool. The FAQ says there is no paid tier. |
| A workshop or a retainer, as hours. That is a calendar, not a product. | A runtime, an agent gateway, A2A governance, or cross-system outcome verification. |

The only cash register in the repository is Paddle for Define ($5), Build ($10), and Ship ($20). That is not a business that funds infrastructure. It is a proof that checkout works.

### 5. What should remain consulting

The cross-vendor inventory, the blast-radius ranking, the decision about which actions need a human, and the hardening of the first two or three systems. That work is judgment plus access. It is how a small company learns which connectors are worth writing. Pretending it is software before three paying assessments is how the roadmap fills up with platforms.

Implementation after the assessment — actually putting the gate on payments, outbound email, delete, and export — stays consulting until the same gate is being installed the same way every time.

### 6. What should become software

One thing, later: **a continuous inventory that re-reads agents, tools, and permissions and alerts when something new appears or an action skips a gate.**

Permissions rot. A PDF from week three is wrong by week seven. That is the subscription. Not a nine-stage control plane.

Outcome verification becomes software only after the assessments keep landing on the same destination system. One connector, one evidence check, pass / fail / unknown. Unknown stays unknown. That rule in Agent Control is the best product sentence in the repo. It is not a product until it runs against one real system a customer depends on.

### 7. What should be free

- The Agent Readiness Scorecard (20 questions, browser-only, nothing stored).
- ARC Agent Governance, the paste-in inventory. It is a rubric with 19 rules. It is an acquisition tool.
- The Agent Operating Contract and the Outcome Assurance Checklist. These are the vocabulary. Giving them away is correct. They are not a moat.
- The MCP Conformance Scanner, for developers who ship servers. Different buyer. Free is correct because the protocol authors and the official SDKs will absorb conformance testing. The July 2026 rule pack is still unchecked in this repo's own roadmap. Do not build a company on a scanner that is already behind the spec it grades.

### 8. What should be removed from the commercial surface

Removed from the nav, the homepage, and the footer columns. URLs can stay so nothing 404s.

- Journey Scanner and Workflow Scanner. They audit marketing funnels and office processes. They are a different firm.
- Connectivity Scanner as a peer of agent work. Useful utility. Not this company.
- The five-retainer menu, especially Fractional TPM, Fractional Cloud Advisor, and the 80-hour ARC Partner retainer. Those are staff augmentation. They cap at one person's calendar and they tell a product buyer this is a body shop.
- Custom Team Workshop ("topic is yours: cloud, data, cybersecurity, CDP, governance, delivery, nonprofit programs, AI, or something else"). That sentence is the opposite of a wedge.
- Research briefs on process mining, FinOps, the productivity J-curve, and generic product discovery. They are a content mill for the generalist practice.
- Delivery Program Setup as an agent-infrastructure offer. It is a TPM starter kit.

### 9. What should be labeled research, prototype, or coming later

| Thing | Label it as | Why |
| --- | --- | --- |
| Agent Control | Design partners. Coming later. Not in the primary nav. | No pricing, no signup, no connector. The page is already honest. The nav is not. |
| Runtime ("where a unit of AI work should execute") | Research. | `developerAreas` already says research. A small company does not win a runtime against the model vendors and the clouds. |
| A2A | Research. Roadmap. | No offer, no page, no evidence in the market file that a buyer has a production agent-to-agent incident. |
| TokenLoop | Alpha. Side tool. | Admin-API overlay on Claude Code and Cursor. Anthropic already ships a per-request spend kill switch. Cursor bills natively. An overlay on their admin APIs is a feature they will ship. |
| Prompt Reviewer, Stack Advisor, AI Security Scanner | Labs. Alpha or open source, as they already are. | Fine as labs. Fatal as a product line beside the wedge. |
| The nine-step lifecycle | A map, not a roadmap commitment. | Printing it next to "the system" implies you operate every box. |

### 10. The initial wedge

**Agent access: what exists, what it can change, and which actions require a person.**

Sold first as a fixed-scope assessment. Rebuilt as software only for continuous inventory and drift. Outcome evidence is the second product, on one system. Everything else is a feature that waits.

This is the smallest wedge that is both painful and deliverable by one senior person with a rubric. It is also the only wedge the site has already written well.

Wedges rejected for the first product:

- **Universal outcome assurance.** Right idea. Requires a read connector per system. That is a platform.
- **A policy gateway in front of every agent.** You are then in the request path, competing with the model vendor's own gateway and with whatever the enterprise already uses for egress. Trust and latency kill small vendors here.
- **MCP conformance.** A developer utility. The spec moves faster than the scanner. The roadmap item for the 2026-07-28 pack is still open.
- **Coding-agent cost.** Real pain, crowded, and structurally owned by Anthropic and Cursor.
- **An agent runtime.** Out of scope for this team. Say so on the developers page and stop there.
- **"Where should we use AI?"** A workshop question. It does not become infrastructure.

### 11. Why a company would buy this from ARK instead of an incumbent

They will not buy a platform from ARK. They might buy the cross-vendor list, because the incumbents each own one room:

- The identity suites (Okta, SailPoint, CyberArk) are built for employees and are only now walking toward non-human identity. They do not inventory a Claude project, a Salesforce agent, and a stray MCP server for a 200-person company in the same month.
- The observability suites (Datadog, LangSmith, and the model vendors' own traces) show what the model attempted. They do not answer whether the action was allowed, or whether the destination system changed.
- Salesforce, Microsoft, ServiceNow, and Atlassian govern the agent inside their own cloud. The pain is that the agents span vendors and inherit standing permissions.
- AIR has raised to vet skills and add-ons. Do not fight a funded company on skill marketplaces. packslip and the official plugin catalogs are already the install path. ARC Skills is not even a page in this repo anymore; `OPPORTUNITIES.md` still points at `/labs/arc-skills`.
- Anthropic's apps gateway already enforces per-developer spend. TokenLoop's kill switch is a slower version of a feature the vendor ships.

The reason to hire ARC this year is narrow and perishable: **in a few weeks you get one inventory across the tools you actually run, with the dangerous actions named, from a person who will also say what cannot be seen.** The suite sells a checkbox inside one product. That advantage disappears the moment the website claims a control plane. It holds while the offer is the assessment and, later, inventory software for the two systems the assessments keep finding.

There is no defensibility in "we are more rigorous." Rigor is the writing standard. It is not a moat.

### 12. What creates defensibility

Almost nothing on the site is defensible today. A deterministic rubric with quoted evidence is copyable in a weekend. The playbooks are a method, and methods leak.

Defensibility has to be earned in this order:

1. The same assessment, delivered often enough that you know which systems and which tool classes actually show up. Payments, bulk email, delete, and export are already named in `OPPORTUNITIES.md` from the Bottleneck episode. That is a hypothesis, not yet a dataset.
2. Connectors and policy packs for those classes, so the second customer does not start from a blank page.
3. A record a customer is willing to show someone else: what was attempted, under what authority, what changed, what evidence exists, whether it verified, what it cost. The six lines of the Outcome Assurance Checklist are the only original frame in the repo. They become a moat when an auditor or a customer asks for that record and the alternative is a trace UI. They are not a moat as a free web page.

Do not look for defensibility in model quality, in MCP spec coverage, or in a marketplace of skills.

### 13. What creates recurring revenue

A one-time inventory does not. Playbooks do not ($35 if someone buys all three, and the FAQ says that is three checkouts). Workshops do not.

Recurring revenue that fits the wedge: **the inventory is re-read on a schedule, and a new tool, a wider permission, or a high-risk action with no gate opens an alert.** Price it as a subscription after the assessment, for the systems in scope. Not before.

Retainers recur and are the wrong engine. Five of them, from 30 hours to 80+, train the company to sell time. Time is the bridge while software does not exist. It is a ceiling if it stays the product. One follow-on retainer, scoped to implementing the gates from the assessment, is enough. The other four should come off the site.

### 14. What creates a natural expansion path

The path is already implied by the checklist, if you refuse to sell the whole path on day one:

1. Inventory (agents, tools, MCP, APIs, data).
2. Authority (which identity, which standing permission, what can be revoked).
3. Gates on a short list of dangerous actions.
4. Evidence from one destination system (pass, fail, or unknown).
5. Cost attached to a verified outcome, not to a token.
6. Only then, agents calling other agents.

Each step is purchased because the previous artifact made the next question obvious. The site currently offers steps 1 through 9, plus cloud, data, brand-scale CDP work, and a product-building PDF, on the first visit.

### 15. Whether A2A belongs in the first product

No. It belongs on a research list.

The market file (`market-intel/2026-09-07.md`) is about skills files, Cursor billing, MCP session defaults, and agents with a Stripe account. The research brief that matches the wedge is "Agents With Credentials." None of that evidence is agent-to-agent traffic. Buyers do not yet have a production A2A incident they can point at. They have one agent with too many tools. Building governance for a protocol your ICP is not running is how the wedge dies of sophistication.

Mention A2A once, on the developers page, marked research. Do not put it in the assessment deliverable. Do not put it in the nav.

### 16. Whether MCP governance is a wedge, a feature, or a free acquisition tool

A free acquisition tool for developers, and a feature inside the assessment ("which MCP servers exist, and do they still match the spec").

It is not the wedge. Conformance is a moving target owned by the protocol. The flagship scanner's own roadmap still has the 2026-07-28 pack undone. Enterprise buyers do not pay a platform price for a spec report. Developers will run a free one. Let them. The commercial use of the scanner is to make the assessment faster and to give a technical visitor a reason to trust the firm before the call.

### 17. Whether ARK Control should be the primary enterprise product

Not now.

The body copy is the most careful page in the repo: design partners, no price, no purchase, not a model eval, not a certification, cannot see a system it cannot read. Then the information architecture undoes it. Agent Control is the flagship in `arkProducts`, it sits in the header under Agent Infrastructure, and the header summary is wrong: the nav says "Permissions and approval gates for agent actions" while the page says "Outcome assurance for production AI agents." Those are different products. The footer adds a third gloss by rendering `ark.explainer`, which calls the whole effort "readiness, outcome checks, and the assessments that decide where AI belongs."

Make Agent Control the name you hope the second product grows into. Take it out of the primary navigation until a design partner is paying and one connector is producing pass / fail / unknown against one system. A primary nav item that cannot be bought is a promise the rest of the audit is trying to stop making.

### 18. Whether AI Fit and AI Fit Teams belong on this website

AI Fit can stay. AI Fit Teams should not have its own name.

AI Fit is the free Stack Advisor: deterministic, no account, architecture shapes rather than vendors. It answers "should this be an agent at all?" That is a useful labs tool and a bad sibling of Agent Control. It is in the Agent Infrastructure menu today. Move it to Labs. The buyers who need it are deciding a stack. The buyers who need the wedge already have agents they did not choose.

AI Fit Teams is a three-to-four week assessment of capability, intent, teams, and habits, with a shadow-AI inventory and a 30/60/90 plan. The AI Readiness Audit is the same engagement: same four dimensions, same shadow-AI inventory, same 30/60/90, same duration. Two names for one unpriced offer is a commercial bug. Merge them. If the first ICP is the access problem, this org-readiness assessment is a follow-on for teams that have not started, not the front door.

### 19. Whether Modernize / Automate / Build / Operate helps or dilutes

It dilutes the company you said you are building. It is a coherent structure for a different company: a senior practice that meets a buyer at their symptom. The file comment in `lib/services.ts` is explicit that it replaced a nine-item grid for that reason. As a consultancy site, the four verbs are better than the grid. As the front door of "infrastructure for reliable agent action," they are the grid one level up.

Operate is the only verb that is the wedge, and even Operate is a brochure. Its promised deliverable — an inventory, blast radius, approval gates, an evaluation set, confirmation from the destination system — is not backed by an engagement in `advisoryEngagements`. The engagements wired to Operate are Security & Compliance Posture (one bullet on non-human identity, inside a SOC 2 / GDPR review) and Delivery Program Setup (a charter and a RAID log). The page sells an assessment the catalog does not contain.

Modernize is where the biography is. The Fortune 100 release program, the CDP, LEGO, and the NFL are real and they are not agent infrastructure. Keep them. Put them on About. Do not make a buyer who needs an agent inventory sit through a cloud-and-data practice to find it.

Automate overlaps AI Fit Teams and the AI Readiness Audit. Build overlaps the MVP scope engagement and the playbooks. Four doors, one of which is the strategy, three of which are the old firm.

### 20. What the website should convert a visitor into

**A booked Agent Access Assessment.** One primary action.

The free scorecard and the governance scanner exist to make that booking specific: the visitor arrives with a score or a pasted inventory, not with "we should do AI."

The current conversion path is broken in a precise way:

- Homepage primary button is "Tell us what's not working" → `/contact` with no topic.
- Platform primary button is "Assess agent readiness" → `/agent-readiness`.
- Agent Readiness's primary button is "Run the readiness scorecard" → the free quiz.
- The paid assessment is a paragraph. It has no price, no SKU in `advisoryEngagements`, and no contact topic on the homepage.
- Agent Control's button correctly asks for a design partnership, which is a second conversion competing with the first.
- Playbook buttons ask for $5.

A visitor cannot tell what buying looks like, except the PDF.

---

## Classification of every current offer

Labels: KEEP, REPOSITION, MERGE, DEMOTE, REMOVE, BUILD, SELL NOW, FUTURE.

REMOVE means take it off the commercial surface (nav, homepage, footer, equal billing). It does not mean delete the URL in the same change.

### Company and category

| Offer | Verdict | Why |
| --- | --- | --- |
| Public name "ARC Transformation Group" | KEEP for now | Renaming the company before there is a product to rename around burns the only domain and the only proof. |
| Line "Infrastructure for reliable agent action" | REPOSITION | Keep it as the direction. Do not print it as if the infrastructure exists. |
| Homepage "Make technology work for your business" | REMOVE from the hero | It is the generalist practice. |
| Four services as the spine of the homepage | DEMOTE | Operate's problem stays. The four-up grid goes. |

### Services

| Offer | Verdict |
| --- | --- |
| Modernize | DEMOTE. Page can remain for inbound. Off the homepage. |
| Automate | MERGE into the assessment story or the AI readiness follow-on. Not a pillar. |
| Build | DEMOTE. Implementation after an assessment, scoped each time. Not a pillar and not a product. |
| Operate | REPOSITION. This is the problem statement. It is not yet an offer. |

### Advisory engagements

| Offer | Verdict |
| --- | --- |
| Agent Access Assessment (does not exist as a SKU) | BUILD, then SELL NOW. This is the hole. |
| AI Readiness Audit | MERGE with AI Fit Teams. Demote to a follow-on for teams that have not deployed anything. |
| Technical Architecture Review | DEMOTE |
| Cloud & DevOps Readiness | DEMOTE |
| Data Health & Analytics | DEMOTE |
| Security & Compliance Posture | MERGE the non-human identity portion into the new assessment. The SOC 2 wrapper is a different sale. DEMOTE the wrapper. |
| AI Solution Concept + MVP Scope | KEEP as an optional follow-on. Do not lead with it. It pulls the firm back into "build me an AI app." |
| Delivery Program Setup | REMOVE from this commercial system |
| Integrated Transformation Diagnostic (current flagship) | DEMOTE. It is the old flagship, it takes 5–7 weeks, and the only ARC case study is this engagement. Honest proof for a transformation buyer. Wrong proof for this wedge. |

### Retainers

| Offer | Verdict |
| --- | --- |
| Post-diagnostic execution, rewritten around the assessment's gates | REPOSITION. The only retainer that should be visible. |
| Fractional Head of AI / Transformation | DEMOTE. Hours, and the title fights "we are not your outsourced AI leader." |
| Fractional TPM | REMOVE from the surface |
| Fractional Cloud / Platform Advisor | REMOVE from the surface |
| ARC Partner (80+ hrs) | REMOVE from the surface |

### Agent-infrastructure pages

| Offer | Verdict |
| --- | --- |
| Agent Control | FUTURE. Keep the page honest. Remove from primary nav. |
| Agent Readiness scorecard | KEEP. Free. |
| Agent Readiness "2–3 week assessment" | BUILD as the priced SKU. SELL NOW. Today it is a paragraph whose button opens the quiz. |
| AI Fit / Stack Advisor | DEMOTE to Labs. KEEP the tool. |
| AI Fit Teams | MERGE. Drop the name. |
| Platform overview | REPOSITION around the assessment and the evidence rule. The nine-step map moves down or off the first screen. |
| Developers / runtime | KEEP, labeled research. |
| A2A | FUTURE. No page. |

### Labs

| Tool | Verdict |
| --- | --- |
| ARC Agent Governance | KEEP. This is the free acquisition tool for the ICP. It is not a product. |
| MCP Conformance Scanner | KEEP. Free developer acquisition. Not the wedge. |
| AI Security Scanner | KEEP in Labs. Adjacent. Not equal billing. |
| TokenLoop | DEMOTE. Alpha side tool. Do not price it as the company. |
| Prompt Reviewer | DEMOTE |
| Stack Advisor | DEMOTE (same object as AI Fit) |
| Connectivity Scanner | REMOVE from equal billing |
| Journey Scanner | REMOVE from equal billing |
| Workflow Scanner | REMOVE from equal billing |
| ARC Skills (`/labs/arc-skills`) | Already gone. `OPPORTUNITIES.md` and `UAT.md` still describe it. Stale. The skills market signal now links to `/playbook`, which sells a different thing. |

### Playbooks, frameworks, workshops, research, proof

| Offer | Verdict |
| --- | --- |
| Define $5, Build $10, Ship $20 | DEMOTE. Different ICP. Checkout works. Off the homepage and the main nav. `/offer` can stay as the ad door it already is. |
| Agent Operating Contract | KEEP. Free. |
| Outcome Assurance Checklist | KEEP. Free. This is the future record format. |
| Digital Readiness Workshop | DEMOTE |
| Operator Working Session | REPOSITION as a format the assessment can use, not a separate product. |
| Custom Team Workshop | REMOVE from the surface |
| Research: Agents With Credentials | KEEP |
| Research: Metered Agents | DEMOTE |
| Research: EU AI Act transparency | DEMOTE. Accurate and off-wedge. |
| Research: protocols horizon, zero trust | DEMOTE to an archive |
| Research: process mining, FinOps, J-curve, product discovery | REMOVE from the surface |
| Case studies: cybersecurity release, CDP, LEGO/NFL | DEMOTE to About. Founder history, not company proof for this category. |
| Case study: integrated diagnostic | KEEP, labeled as a transformation engagement, not as agent infrastructure. |

---

## The commercial ladder

One ladder. Anything that does not sit on it is a side door or it goes.

```
FREE TOOL
Agent Governance scan (paste what the agents can reach)
and the 20-question Agent Readiness Scorecard
        ↓
PAID ASSESSMENT
Agent Access Assessment, fixed fee, two to three weeks
Inventory, authority, blast radius, human-gate list,
and an explicit list of what could not be seen
        ↓
ADVISORY / IMPLEMENTATION
Install the gates and the evidence check
on the one to three systems the assessment named
One retainer shape. No menu of five.
        ↓
SOFTWARE PRODUCT
Continuous inventory: re-read, alert on drift,
alert when a high-risk action has no gate
Sold to assessment customers. Not on the homepage
until it has run more than once.
        ↓
ENTERPRISE PLATFORM
Outcome evidence on the systems the inventory
already covers (pass / fail / unknown),
then policy across those systems.
A2A, runtime, and a universal verifier are not
on this rung until the rung above is real.
```

The playbooks are a side door for founders, with their own checkout. They are not a rung. Labs utilities that are not the governance scanner are a basement, linked from Labs, not from the ladder.

---

## A–S

### A. Commercial clarity score: 36 / 100

| # | Dimension | Score |
| --- | --- | --- |
| 1 | A buyer can repeat what this company is | 3 |
| 2 | One ICP | 2 |
| 3 | One painful problem, clearly named | 6 |
| 4 | A priced offer that matches that problem | 2 |
| 5 | Consulting, software, and free are honestly separated | 7 |
| 6 | One ladder | 3 |
| 7 | Proof matches the category being claimed | 4 |
| 8 | The wedge is something a small company can build | 4 |
| 9 | A concrete reason to buy here rather than from a suite | 3 |
| 10 | The site converts to one action | 2 |
| | **Total** | **36** |

The 7 on honesty is the site's real asset. Agent Control is not dressed up as GA. That restraint is why the score is 36 and not the high teens. The commercial system undoes it: four practices, nine tools, three PDFs, an unpriced flagship diagnostic, and a flagship product you cannot buy.

### B. Top positioning problems

1. Two companies, one URL. ARC the practice and ARK the infrastructure sentence.
2. The thing that can be sold (a paid access assessment) is not a SKU. The thing that cannot be sold (Agent Control) is in the nav. The thing with a price ($5–$20) is the wrong buyer.
3. Agent Readiness's button opens a free quiz. The paid work is body copy.
4. Operate promises an inventory the advisory catalog does not sell. Operate is wired to a compliance review and a delivery-program setup.
5. The nav calls Agent Control a permissions product. The page calls it outcome assurance.
6. AI Fit Teams and the AI Readiness Audit are the same offer twice.
7. Homepage proof is founder career history. One ARC case study is a general transformation diagnostic.
8. Nine labs tools are presented as a portfolio. Three of them have nothing to do with agents.
9. The skills market signal sends people to the playbook checkout.
10. No advisory price anywhere. "We size it on the call" is how a buyer hears "this is not a product."

### C. Recommended category

**Agent access assurance.**

Buyer language: know what your agents can reach and change, and which of those actions require a person. Later, prove what changed.

Reject "agent infrastructure," "AI platform," "digital transformation," and "observability" as the category you claim in market. The first is a suite you have not built. The second is the model vendors. The third is the old site. The fourth is Datadog.

### D. Recommended wedge

A living inventory of agents, tools, MCP servers, and APIs, with dangerous actions flagged and a human gate recommended or recorded.

First sale is the assessment. First software is drift detection on that inventory. Outcome verification is the expansion, on one system, under the Agent Control name, when a design partner is paying.

### E. First ICP

Security, IT, or the owner of the system of record at a company of about 50–500 people (or one team inside a larger one) whose vendors have already turned agents on. They need a list before they need a platform. They can approve a five-figure assessment without a six-month RFP.

Not the ICP: founders buying a $5 product worksheet, nonprofits booking a digital-readiness workshop, agencies watching Cursor spend, boards commissioning a 7-week transformation diagnostic.

### F. First paid problem

"We cannot list the agents already acting in tools we pay for, what those agents can change, or which of those actions anyone approved."

### G. Product that should be sold first

No software product should be sold first. There isn't one.

The first software product, after the assessments, is continuous agent inventory. Agent Control is not that product yet. Do not put a buy button on it.

### H. Consulting offer that should be sold first

**Agent Access Assessment.** Two to three weeks. Fixed fee, printed on the page. Deliverable:

- Every agent, assistant, MCP server, skill, and privileged API the team can find, including the ones vendors enabled.
- What each one can read and what it can change.
- Blast radius, with payments, outbound email, delete, and export called out as their own class.
- Which actions need a human gate, and which already have one.
- What could not be seen, named as unseen.

Publish a price. A senior two-to-three-week assessment for this buyer is a five-figure fixed fee. The exact number is a decision, not a copy problem. The absence of any number is the defect. Sitting next to a $5 PDF, an unpriced "flagship" reads as a hobby.

### I. Free tool that should drive acquisition

**ARC Agent Governance**, with the **Agent Readiness Scorecard** as the short version for someone who will not paste a manifest.

One tool on the homepage. The MCP scanner stays available for developers and is not the homepage. The other seven labs tools do not drive this acquisition.

### J. Product ladder

See the ladder above. Rungs in order: free scan → paid assessment → implementation retainer → inventory subscription → outcome evidence on the systems already in the inventory.

### K. Recommended website navigation

Five items and one button.

1. **Assess** — the paid assessment, with the free scorecard linked from that page.
2. **Method** — operating contract, outcome checklist, and the evidence rule (pass / fail / unknown).
3. **Labs** — governance scanner and MCP scanner up top; everything else under "Other tools."
4. **Work** — only proof that matches the offer. Until an assessment has been delivered, this page should be thin rather than padded with LEGO and the NFL.
5. **About** — the founder record lives here, including the Fortune 100 work.

Button: **Book the assessment.**

Not in the header: Modernize, Automate, Build, the four-service dropdown, Agent Control, AI Fit, AI Fit Teams, Playbooks, Academy, Research. Playbooks stay reachable at `/playbook` and `/offer`. Research stays reachable at `/research`. Agent Control stays reachable at `/ark-control` for anyone who is actually a design partner.

### L. Homepage information hierarchy

1. The blame sentence. Agents in tools you already pay for can change systems, and you cannot list them.
2. Who it is for, in one line, specific enough that a founder and a cloud-migration buyer both know to leave.
3. The free scan and the paid assessment, with the price on the assessment.
4. The deliverable, as nouns.
5. The evidence rule, in one paragraph, so a technical buyer believes you. Not the nine-step lifecycle.
6. What you will not do: no runtime, no model, no certification, no universal verifier.
7. One button.

Career metrics, four service cards, playbook prices, and "not sure which one you need?" come off the first four screens.

### M. Pages to keep

`/agent-readiness` (rewritten as the offer), `/playbooks/agent-readiness-scorecard`, `/playbooks/agent-operating-contract`, `/playbooks/outcome-assurance-checklist`, `/labs`, `/labs/arc-agent-governance`, `/labs/mcp-conformance-scanner`, `/ark-control` (honest, secondary), `/developers` (research labeled), `/about`, `/contact`, `/playbook` and `/offer` (side door), `/privacy`, `/terms`, the one ARC case study, the research brief on agents with credentials.

### N. Pages to change

| Page | Change |
| --- | --- |
| `/` | New hierarchy in L. |
| `/platform` | Stop being a second homepage for a suite. Point at the assessment. |
| `/agent-readiness` | Primary CTA becomes the paid assessment. Scorecard becomes secondary. Add price and the deliverable list. |
| `/services` and `/services/operate` | Operate becomes the problem essay behind the assessment, or it folds into `/agent-readiness`. |
| `/advisory` | One engagement leads. The other seven move behind "Other reviews" or off the page. |
| `/ark-control` | Keep the honesty. Align the nav summary or remove the nav item. Design-partner CTA only. |
| `/ai-fit` and `/ai-fit-teams` | Fit moves under Labs. Teams loses its name. |
| `/work` | Separate founder history from ARC engagements. |
| `/contact` | Default topic is the assessment. |
| Header and footer | Match K. Footer `ark.explainer` currently restates three businesses. |
| Market signal on skills | Stop linking "unused skills" to `/playbook`. |

### O. Pages to remove from the commercial surface

Do not delete routes in the first pass. Remove them from nav, homepage, and footer equality:

- `/services/modernize`, `/services/automate`, `/services/build` as primary entries
- Advisory pages for TPM, cloud readiness, data health, and the integrated diagnostic as the flagship
- `/labs/arc-journey-scanner`, `/labs/arc-workflow-scanner`, `/labs/connectivity-scanner` as peer products
- `/academy/custom-team-workshop` as an offer
- Research pages for process mining, FinOps, the J-curve, and generic product discovery
- Retainer blocks for TPM, cloud advisor, and ARC Partner

### P. Pages and products that need to be created

- The Agent Access Assessment as a real engagement object (it is not in `advisoryEngagements`) with a duration, a deliverable list, a price, and a contact topic.
- A one-page "what we will not build" is unnecessary if the assessment page states the limits. Do not add a vision page.
- No new product page for A2A, runtime, cost, or MCP governance.
- Software: nothing in this repository until the assessment has been delivered and the repeated systems are known. Building the inventory product inside the marketing repo is the wrong move anyway.

### Q. 30-day product roadmap

What should be true a month from this audit. This is a sequence of commercial decisions, not an engineering estimate.

1. Accept or override the open decisions at the bottom of this document.
2. Write the Agent Access Assessment as the only front-door offer: scope, deliverable, exclusions, price, who it is not for.
3. Merge AI Fit Teams and the AI Readiness Audit under one name, and make that name a follow-on.
4. Deliver the assessment by hand, with the free governance scanner and the scorecard as inputs. No new application.
5. After each delivery, write down which systems and which tool classes appeared. That note is the spec for software. If you skip it, the 90-day plan will invent a platform.
6. Leave Agent Control, A2A, and the runtime alone.

### R. 90-day product roadmap

What should be true a quarter from this audit, assuming the assessment is the front door.

1. Three paid assessments delivered to the ICP in E. If you cannot get three, the wedge is wrong or the offer is still vague, and software should not start.
2. A written repeat: the systems and the dangerous actions that showed up more than once.
3. A v0 continuous inventory aimed only at that repeat, sold back to those customers, marked alpha. Design-partner Agent Control only if the same destination system showed up and someone will pay to check it.
4. One retainer shape for implementing gates. The other retainers stay off the site.
5. A decision on the playbooks: keep them as a side checkout with no homepage presence, or stop advertising them. They are not the plan either way.
6. Labs tools that produced no assessment lead get archived in the nav. The MCP scanner stays either way, as the developer door.

### S. Website backlog

#### P0 — the site is commercially misleading until these change

- Homepage hero, symptoms, four-service grid, and primary CTA (`app/page.tsx`, `homeHero` and `homeSymptoms` in `lib/services.ts`).
- Header nav (`nav` in `lib/content.ts`): remove the four-service dropdown and Agent Control from primary; stop listing AI Fit as agent infrastructure.
- Fix the Agent Control nav summary. It currently says permissions and approval gates. The page says outcome assurance.
- Add the assessment engagement. `serviceAreas` for Operate points at `security-compliance-posture` and `delivery-program-setup`, which do not deliver the inventory the Operate page promises.
- Agent Readiness primary CTA (`lib/ark.ts`) points at the free scorecard. Point the primary action at the paid offer.
- Homepage proof block presents career studies as "programs we have delivered" before a buyer reaches the offer.

#### P1 — required for one ladder to be visible

- Footer columns (`components/site-footer.tsx`) and `ark.explainer`, which still describes three businesses.
- `/platform` first screen: assessment first, nine-step lifecycle off the hero.
- `/advisory`: one lead engagement, the rest demoted.
- `/ai-fit-teams` merged, nav and footer updated (`arkProducts` is what the footer maps).
- Playbooks off the homepage resources band and out of the main nav. Leave `/offer` intact.
- `/contact` default topic is the assessment. `ark-control` and `ai-fit-teams` stop being peer entry points.
- Work page: founder history moved to About.
- Skills market signal (`lib/content.ts`) stops linking to `/playbook`.

#### P2 — coherence once the front door is the assessment

- Labs groups: governance and MCP first; journey, workflow, and connectivity under other tools.
- Research index: agents-with-credentials leads; FinOps, process mining, J-curve, and product-discovery briefs leave the default list.
- Academy leaves the footer resources column.
- `OPPORTUNITIES.md` and `UAT.md` still describe `/labs/arc-skills` and a skills CTA. They are stale relative to the site and should be corrected so the next pass does not "restore" a page the strategy just killed.
- AI Fit copy that says the organisational question "is AI Fit Teams" (`lib/ark.ts` limits).

#### P3 — do not do these in the name of this strategy

- Renaming the company to ARK Transformation Systems before a product exists.
- A TokenLoop paid tier.
- Implementing the MCP 2026-07-28 rule pack inside this marketing repo (that work belongs in the scanner's repo, and it is still not the wedge).
- A runtime, a gateway, an A2A page, or a universal outcome verifier.
- New case studies that dress the founder biography up as agent-infrastructure deployments.

---

## Decisions that are not settled

The recommendations above assume the answers below. A "yes" accepts the recommendation. Anything else reopens the branches that hang off it.

1. For the next quarter the public company stays ARC Transformation Group. ARK is reserved as the name of the later control product, not a rename of the firm.
2. The first ICP is the security, IT, or system-of-record owner described in E, and the homepage is allowed to ignore founders, nonprofits, and modernization buyers.
3. The first thing with a price is the Agent Access Assessment. No software SKU is sold until three assessments have been delivered.
4. Modernize / Automate / Build leave the homepage and the header. The pages may remain for inbound.
5. Define, Build, and Ship leave the homepage and the header. Checkout stays.
6. AI Fit moves to Labs. The AI Fit Teams name is dropped and merged with the AI Readiness Audit as a follow-on, not the front door.
7. Agent Control leaves the primary nav until a design partner is paying for one real connector.
8. A2A and the runtime stay labeled research and are not part of the assessment deliverable.
