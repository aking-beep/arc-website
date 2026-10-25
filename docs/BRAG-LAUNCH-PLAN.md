# ARK launch plan

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

What this repository, and the public tools it links to, can actually support as a launch. No production code was changed.

The public company is still **ARC Transformation Group**. **ARK** is a positioning line in `lib/ark.ts` ("Infrastructure for reliable agent action") and a direction. It is not the name on the domain, the invoices, or a product you can buy. A launch that opens with "ARK Transformation Systems" as a shipped company is the inflated film this brief refuses.

Tone for every cut below: technical, specific, quiet. Preset if a film is rendered later: `polished`. Creative direction: a proof reel, not a startup launch. Bundled music in the brag skill is upbeat business pop. That bed fights this story. If a film is cut from this plan, use silence or one soft UI tick. Do not lay happy-beats under a page that says a product is not for sale.

Live checks on 19 October 2026, HEAD requests only. A 200 means the app answered. It does not mean a customer used it.

| URL | Status |
| --- | --- |
| https://arc-agent-governance.vercel.app | 200 |
| https://www.arctransformationgrouplab.dev | 200 |
| https://tokenloop.vercel.app | 200 |
| https://arc-stack-advisor.vercel.app | 200 |
| https://arc-ai-security-scanner.vercel.app | 200 |
| https://promptreviewer.arctransformationgrouplab.dev | 200 |

---

## Inventory

### SHIPPED

Things a stranger can finish in this repository, or that this repository sells with code and tests behind them.

| Thing | Evidence | What it is not |
| --- | --- | --- |
| The marketing site | Next.js app, routes, tokens, dark mode | A control plane |
| Define $5, Build $10, Ship $20 | `lib/playbook.ts`, Paddle webhook, signed download tokens, Vitest for signature, price match, idempotent `recordPurchase`, entitlement checks | Agent infrastructure. A founder PDF. Checkout is real. The buyer is not the ICP. |
| Agent Readiness Scorecard | 20 questions in `lib/learn.ts`, scored in the browser, nothing submitted | Evidence. It is self-reported. The page says so. |
| Agent Operating Contract | Full framework on the page, bad and good example per field | Software |
| Outcome Assurance Checklist | Six questions: attempted, authority, changed, evidence, verified, cost | A verifier. It is the standard the verifier would have to meet. |
| Contact form | `/api/contact`, Resend only if configured | A pipeline |
| Playbook preview images | `public/playbook/` cover and three page shots | A product demo |

Tests in this repo prove commerce: webhook signatures, price matching, idempotent purchases, token hashing, entitlement checks. They do not prove that an agent was detected, gated, or verified.

### WORKING BETA

Apps that answer on the public internet. The marketing site marks them alpha, experiment, or open source. None has a published usage number. `labsProof` says those numbers will be published when they exist. Do not invent them.

| Thing | What the live page actually says | Site maturity | Launch use |
| --- | --- | --- | --- |
| **ARC Agent Governance** | "Know what your AI agents can reach." Free, no account, MIT, nothing stored. 19 deterministic rules. Paste is refused if a live credential is detected. 40,000 character cap. | `alpha` | **This is the lead demo.** It is the wedge, and it runs. It does not enforce anything. |
| **MCP Conformance Scanner** | "0.9 Beta." Scan in about 15–30 seconds. Free for basic scans. Security, configuration, best practice. "Updated August 2026." | `open-source`, badge Flagship | Developer proof that a scanner runs. The repo roadmap still has the 2026-07-28 rule pack unchecked. Do not claim current-spec coverage. |
| **TokenLoop** | Free, no paid tier. Claude Code and Cursor. Admin keys encrypted. Kill switch and chargeback are in the product description. The dashboard preview is labeled Preview and uses sample rows and sample dollars. | `alpha` | A real beta for a different problem (coding-agent spend). Do not quote the preview dollars as a customer result. |
| **ARC AI Stack Advisor (AI Fit)** | Free, no account, nothing stored. Deterministic rules. Architecture shapes, not vendors. | `alpha` on the lab, `available` on `/ai-fit` | A real tool. The wrong front door for this launch. The two maturity words are a bug. |
| **ARC AI Security Scanner** | Free defensive review. Deterministic. Not a penetration test. | `alpha` | Supporting lab. Not the launch. |
| **Prompt Reviewer** | Live. Static review, no model call, per the site. | `open-source` | Developer utility. Off the launch spine. |

### PROTOTYPE

| Thing | State |
| --- | --- |
| Journey Scanner, Workflow Scanner | Experiments. Live URLs exist in the repo. Not inspected end to end. Not the launch. |
| `product-visual.tsx` frames | Sample UI: `mcp.example.com`, a B−, $514.10, fictional agents. Not a product. |
| TokenLoop preview numbers | Fixture, sitting on a real beta. |

### RESEARCH

| Thing | State |
| --- | --- |
| Nine research briefs in `lib/research.ts` | Written, sourced, dated. The one that belongs on a launch is "Agents With Credentials" (7 Sep 2026). FinOps, process mining, the J-curve, and generic product discovery do not. |
| Runtime routing | `developerAreas` marks it `research`. No implementation in this repo. |
| Agent-to-agent patterns | A sentence on the developers page. No spec implementation, no demo. |
| The nine-step lifecycle | A diagram of an ambition. Not a system that runs. |

### ROADMAP

| Thing | Why it is not a demo |
| --- | --- |
| **Agent Control** | Design partners. The page says it cannot be bought, there is no price, and it cannot check a system it cannot read. There is no agent-control package, API, or test in this repo. |
| **AI Fit Teams** | A 3–4 week assessment described in copy. Same shape as the AI Readiness Audit. No tool. No price. |
| Continuous agent inventory | Not built. The governance scanner is a paste-in rubric, not a connector. |
| Outcome verification against a destination system | The checklist describes it. Nothing in the repo reads a CRM, a ledger, or a ticket system and returns pass, fail, or unknown. |
| MCP 2026-07-28 rule pack, CI GitHub Action | Still unchecked on the scanner roadmap in `lib/content.ts`. |
| TokenLoop: which model answered, Codex ingestion | Open roadmap items in `OPPORTUNITIES.md`. |
| ARC Skills as a product | `OPPORTUNITIES.md` still points at `/labs/arc-skills`. That route is gone. Skills ship inside the $20 playbook, as files, not as a governance product. |
| Approval gates that block a payment or an email | Named as a control implication in `OPPORTUNITIES.md`. Not enforced by any tool in this repo. |

### Founder record, kept in its lane

Three case studies are prior delivery: a cybersecurity release program (300+ features, 25% release-value claim), a CDP at tens of millions of profiles, and brand programs that name LEGO and the NFL. One case study is an ARC Integrated Transformation Diagnostic, client unnamed, five weeks, three initiatives resequenced. None of them is an agent-governance deployment. They support "a senior person has shipped hard programs." They do not support "ARK controls agents in production."

---

## 1. Recommended launch story

Problem. A run can finish while the payment failed, the record never changed, or the tool was called with the wrong authority. That sentence is already on the site (`executionGap` in `lib/ark.ts`).

Why traces and vendor agents are not enough. A trace records what the agent attempted. The platform the agent lives in governs that platform. Neither one answers, across tools, what the agent was allowed to change and whether the destination system changed. The site's own August 2026 brief is the source list. Do not add statistics the brief does not contain.

The wedge. Know what agents exist, what identity they use, what they can reach, and which actions have no human gate. The check that comes after that — did the system change, and can you prove it — is the standard. It is not a product yet.

What works today. Paste a sanitized description into ARC Agent Governance. Nineteen published rules return an inventory and findings that quote the input. Nothing is stored. A live credential is refused. Beside it, a twenty-question scorecard and a six-question assurance checklist, both complete on the site, both free.

What is not being launched. Agent Control. A runtime. Agent-to-agent governance. A certification. A customer count.

What comes next. The same check, re-read on a schedule, against the systems the first assessments actually find. One destination system, returning pass, fail, or unknown. Not nine stages.

The line that should end every cut, because it is already the site's own line: **We check the system that was supposed to change.**

## 2. What product should lead

**ARC Agent Governance**, introduced as a free alpha with a published rule pack. Not as "ARK Control." Not as infrastructure.

Second beat, for a technical room: the **MCP Conformance Scanner**, named as 0.9 beta, with the gap on the July 2026 pack said out loud if someone asks about spec currency.

The idea that makes the demo mean something is the **Outcome Assurance Checklist**. It is the script. The scanner is the proof that a check runs.

## 3. What not to promote yet

- Agent Control, in any sentence that could be heard as "you can buy this" or "this is running."
- The name ARK Transformation Systems as the company that just launched.
- "Infrastructure for reliable agent action" as a description of what shipped. It is a direction. The shipped sentence is the check.
- TokenLoop's preview dollars, demo inboxes, or any implication of a measured customer saving.
- AI Fit and AI Fit Teams as part of the agent-control story.
- The $5 / $10 / $20 playbooks in the same breath as the scanner. They are a side door. Mention them only if the audience is founders building a product.
- Journey scanner, workflow scanner, connectivity scanner.
- LEGO, the NFL, Ticketmaster-scale CDP, and the 300-feature program as proof of agent infrastructure.
- Usage counts, grades from `product-visual.tsx`, "average scan 15–30 seconds" as an ARK SLA. That timing line is on the MCP lab page. Repeat it only for that scanner, and only as the lab's own claim.
- A2A, runtime routing, EU AI Act readiness, and FinOps, in this launch.

## 4. Demo sequence

Ten minutes. One laptop. No slide that claims a platform.

1. **Thirty seconds.** Read the six checklist questions. Stop on "What changed?" Say the failure the site already names: the only record of the change is the agent's claim.
2. **Four minutes. Agent Governance.** Paste the prose example the app already ships, or a sanitized fixture written for the launch and labeled SAMPLE. Show the inventory, one finding that quotes the input, and the limitations block. Show the refusal behavior only with a fake-looking token in a throwaway string, never a real secret. Point at "nothing stored."
3. **Two minutes. The boundary.** Say what did not happen. No system was connected. No action was blocked. The score is from rules, not from a model. The marketing page calls this alpha.
4. **Two minutes. MCP scanner, if the room writes servers.** Paste or point at a server the room owns. If you do not have a server you are allowed to show, skip this beat. Do not scan a stranger's URL for a recording.
5. **Ninety seconds. What is not for sale.** Open `/ark-control`. Read "not a product you can buy" from the page. Do not apologize. That sentence is the credibility.
6. **Close.** The next thing to buy is a two-to-three week access assessment. It is not on a price page yet. Do not pretend it is. Offer the conversation, and say the deliverable: the inventory, the blast radius, the gates, and the list of what could not be seen.

## 5. Screens needed

Capture these. Do not design new ones for the launch.

| Shot | Source | Label on the frame |
| --- | --- | --- |
| Governance empty state with the three promises: free, MIT, nothing stored | Live app | None. It is the product. |
| Governance result from the built-in prose or JSON example | Live app | SAMPLE if the example is illustrative |
| The credential-refused state | Live app, fake token only | None |
| MCP scanner idle, including the "0.9 Beta" line | Live app | None |
| One real report, only if the server owner agrees | Live app | Name the server or redact it |
| Scorecard, mid-answer and result band | `/playbooks/agent-readiness-scorecard` | "Self-reported" |
| Split claim: run status on the left, assurance questions on the right | `/platform` or `/ark-control` | None |
| Agent Control aside: not for sale, no price | `/ark-control` | Do not crop this out |
| Playbook cover | `public/playbook/cover.png` | Only in the founder/SMB cut |

Do not capture: TokenLoop preview dollars, `product-visual.tsx`, the homepage service grid, career metric cards.

## 6. Product-video storyboard

This is the film to render when a render is requested. 22 seconds. Landscape. Silence. No narration. Every line is already in the product or the site.

| Time | On screen | Read |
| --- | --- | --- |
| 0.0–3.0 | Black. One line, IBM Plex, ink on the site's off-white `#ffffff` or the panel `#` from `--panel` (224 36% 7%). | The agent said it finished. |
| 3.0–7.0 | The split: left column `completed`, right column the question. | A finished run is not a finished job. |
| 7.0–13.0 | Three lines, held, not flashed. | What did it attempt. What authority did it use. What changed. |
| 13.0–18.0 | Governance UI, the real empty state or a SAMPLE result. Small line under it. | 19 rules. Nothing stored. Alpha. |
| 18.0–22.0 | Wordmark ARC. One rule. | We check the system that was supposed to change. |

Not on screen: ARK Transformation Systems, infrastructure, revolutionary, a dashboard with money, a network graph, Agent Control as a button.

## 7. 30-second version

Spoken, if someone is in the room. The 22-second film can sit under the first three sentences with the last line held.

"The agent said it finished. That is not the same thing as the record changing. We published the check: what it attempted, what authority it used, what changed, what evidence exists, whether that verified, what it cost. The tool you can run today pastes a description and grades it against 19 rules. It stores nothing. It does not block an action. The product that would check the destination system is not for sale."

## 8. 60-second version

Add one contrast and one boundary.

"Teams are connecting agents to the tools they already pay for. Those agents inherit someone's permissions. A trace will tell you the run completed. It will not tell you the payment failed or the row never updated. ARC publishes three free checks. A 20-question scorecard, self-reported. A one-page operating contract: goal, trigger, state, boundary, evidence, owner. And a governance scan: 19 deterministic rules, findings quoted from your own text, nothing stored, a live credential refused. Next to that, an MCP scanner in 0.9 beta will grade a server you point it at. We will not call that a control plane. Agent Control is in design-partner conversations. There is no price because there is nothing to price. The work you can hire today is the inventory: what exists, what it can change, and which actions have no human gate."

## 9. Two-minute technical version

Same spine. Add only mechanics that are in the repo or on the live page.

- Rules, not a model. Governance, the security scanner, and AI Fit all say a model does not produce the score. Same input, same output. Findings cite a quote from the paste.
- Governance splits text into statements and matches a published pack. The page says this. Repeat it. Do not invent rule IDs that are not on the screen you are showing.
- Storage. Nothing stored on the paste-in tools. TokenLoop is the exception: an account, admin keys, AES-256-GCM at rest, keys not returned to the browser. Say that only if TokenLoop is in the room, and say the preview numbers are a preview.
- MCP. Point at a URL or a local process. The site lists handshake, capability, and schema checks. The July 2026 pack (`server/discover`, per-request `_meta`, routing headers) is still on the roadmap. Say that before someone else does.
- Commerce tests, only if a developer asks "what is tested in the site repo": webhook signature, price match, idempotent purchase records, hashed download tokens. That is the playbook, not the scanner.
- The assurance chain, drawn with a break. Trace stops at the action. "What changed" is empty until a destination system is read. Agent Control's own limit: it cannot verify a system it cannot read.
- Close on the assessment deliverable, still unpriced: inventory, authority, blast radius, human gates, and an explicit list of what was not seen.

## 10. Founder narrative

Use this. Do not use a company origin myth.

The person who answers the call is the person who does the work. The record behind that is enterprise delivery: release programs, customer-data platforms, brand and live-event systems. That is why a two-week inventory is credible. It is not a case study of agent control.

The firm is small on purpose. There is no bench to hide a prototype behind. The pages say when something is alpha, and Agent Control says it is not for sale. That restraint is the reputation. A launch that spends it on a platform announcement would be the first false sentence.

Do not say "we secured the NFL" or "we ran Ticketmaster's data" as the product story. If a biography is required: prior programs in cybersecurity, consumer data, and live entertainment, then the sentence "ARC is the practice. The agent check is what we are building in public."

## 11. Website launch messaging

Do not redesign in this pass. When the homepage moves, the first screen is this and only this.

**Kicker.** Agent action

**Headline.** The agent said it finished.

**Lead.** A finished run is not a finished job. ARC shows what an agent can reach, and what you still cannot prove.

**Three rows.**

- Agent Governance. Alpha. Free. Run it.
- Readiness scorecard. Free. Self-reported.
- Agent Control. Not for sale.

**Button.** Run the governance scan.

**Secondary.** Read the checklist.

Do not put "Book a discovery call" on that screen until the assessment has a price and a name on the page. The Grill wants the assessment as the commercial front door. It is not launchable as a button until the number exists. Launch the tool. Sell the assessment in the conversation.

Do not retitle the site ARK Transformation Systems in the same change.

## 12. GitHub launch messaging

The GitHub surface that exists is `github.com/aking-beep`, plus the scanner and reviewer repos named from the lab pages. There is no `ark` organization in this repository.

A honest GitHub post, if those repos are public and the READMEs match the site:

"ARC Agent Governance is a deterministic rule pack. Paste a sanitized description of agents, tools, and data. It returns an inventory and findings that quote your text. It stores nothing. It is alpha. It does not enforce a policy. The MCP conformance scanner is 0.9 beta and does not yet grade the 2026-07-28 revision. Issues and disagreements with a rule belong on the repo."

Do not announce a platform, an SDK, or a hosted control plane.

## 13. LinkedIn launch concept

One post. No carousel of gradients. Four lines and a link.

The agent said it finished. We don't treat that as the job being done.

You can paste what your agents can reach. Nineteen rules. Nothing stored. Alpha, so it will change.

It will not block a payment, and it will not tell you the row in the other system changed. That check is the work. It is not a product yet.

Link: the governance app, not the homepage, until the homepage says this.

No "excited to announce." No headcount. No customer logos.

## 14. Developer launch concept

Where: the MCP scanner repo and a short note on the governance repo. Not a Product Hunt moment.

Show a command or a URL, the grade, and one finding. Show the roadmap line that is still open, so the beta label is doing work. Invite a disagreement with a rule. The Prompt Reviewer can be a footnote for people who want a static prompt grade. It is not the announcement.

TokenLoop stays a separate sentence to people paying Claude Code and Cursor invoices: free, alpha, admin keys encrypted, preview numbers are not your invoice.

## 15. Enterprise-buyer launch concept

Not a launch event. A one-page note they can forward.

You cannot list what the agents in your CRM, your tickets, and your coding tools can change. We can run that inventory. The free scan is the sample of the method: you paste, it quotes you, it does not store it. The paid work is the same inventory against the systems you actually run, with the actions that move money, mail, delete, or export called out, and a list of what we could not see. We do not certify you. We do not sell a control plane today.

Attach nothing that says Flagship on Agent Control.

## 16. Proof points to emphasize

Only these. Each one can be pointed at.

- Six questions between a finished run and a finished job, published in full.
- Governance: 19 deterministic rules, quote-backed findings, nothing stored, live credentials refused. Confirmed on the live page.
- Scorecard: 20 questions, scored in the browser, self-reported, the page says it is not evidence.
- MCP scanner: 0.9 beta, a scan measured by the lab in seconds, not a spec certificate.
- Maturity labels that say alpha and "not for sale" on the pages that need them.
- Playbook checkout, if and only if the audience is buying a PDF: $5, $10, $20, tested webhook and token path.
- Founder delivery record, labeled as prior work, not as this product.

## 17. Proof still to collect

Do not launch a second wave without at least the first three.

1. One governance report the subject has agreed to show, with the input sanitized and the findings unchanged.
2. One MCP report against a server you operate, including a line that fails, so the grade is not a trophy.
3. A written note of what the 2026-07-28 pack does not grade yet, next to any "production readiness" claim. The lab page currently says production readiness. The repo says the new rule pack is undone. Reconcile those before the developer post.
4. One paid access assessment delivered, with the deliverable a stranger could recognize: inventory, authority, blast radius, gates, unseen.
5. One destination read that returns pass, fail, or unknown on a system a design partner owns. Until that exists, Agent Control stays off the poster.
6. A number you will stand behind: scans run, or assessments delivered. The site already refuses to invent one.
7. TokenLoop only if a real org agrees to show spend with the tenant redacted. The preview fixture does not count.
8. A price on the assessment, or a decision that the launch does not include a buy button.

## 18. Assets to create

| Asset | Why | Do not |
| --- | --- | --- |
| Sanitized governance fixture, input and output, committed beside the launch notes | So the demo does not depend on typing live | Use a customer paste |
| One allowed MCP report, redacted | Developer proof | Scan a third party for content |
| The five screenshots in section 5, 1280 and 390 | The film and the post | New illustrations |
| A single diagram: trace, then a break, then "not connected" | The two-minute version | Nine-stage lifecycle |
| A 22-second silent cut from section 6 | The only film | A 90-second brand anthem |
| A one-page enterprise note from section 15 | The buyer forward | A deck with a platform architecture |

No new logo, no ARK wordmark system, no fake dashboard, no music bed from the happy-beats catalog.

## 19. Launch-readiness checklist

The launch is ready when every box is true. It is not ready today.

- [ ] Homepage first screen matches section 11, or the launch link goes to the governance app and not to today's homepage.
- [ ] Agent Control is impossible to read as a product you can buy. The word Flagship is gone from `/platform`.
- [ ] AI Fit is not described as `available` in one place and `alpha` in another.
- [ ] MCP "production readiness" and the open 2026-07-28 roadmap item say the same thing.
- [ ] A SAMPLE governance report is frozen and matches the rules on the day of the post.
- [ ] No metric appears that `labsProof` would refuse.
- [ ] No career logo appears next to the word agent.
- [ ] The assessment either has a price and a deliverable list, or it is absent from the launch CTA.
- [ ] TokenLoop is absent, or the preview is captioned Preview.
- [ ] The 22-second cut contains only lines from section 6.
- [ ] A second person who did not write the copy can point at the screen for every claim in the post.

---

## What ARK should brag about

One thing. **A check you can run, that refuses to call a finished run a finished job, and that says what it cannot see.**

That is enough for someone to think the work is real. A control plane in the same video would undo it.
