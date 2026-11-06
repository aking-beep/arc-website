# The wedge, the products, and the gap between the site and the build

Written 5 November 2026 from the repositories and the live deployments, not
from the marketing site. Every claim below is checked against code or a
Vercel deployment record, and where something does not exist yet it is
written as not existing.

## The finding that matters most

**ARC already chose its wedge, three weeks ago, and the website does not
mention it.**

[ADR-0009](https://github.com/aking-beep/ark/blob/main/docs/adr/0009-action-accountability-wedge.md),
accepted 19 October 2026:

> The wedge is approval and accountability for consequential agent actions.

Not agent authorization in general. Not observability. One question, asked at
the moment it matters: *may this agent refund $750 on this order, for this
org, now?*

Nothing on arctransformationgroup.com says this. The site sells six ARC
Control capabilities, an AI Fit Teams "three-to-four week assessment run by
ARC", and a Solutions page written for leadership teams. The build moved and
the site did not.

## What is actually built

Checked in `aking-beep/ark` at HEAD.

| Piece | State | Evidence |
| --- | --- | --- |
| Decision kernel `decideAction` | Built, tested | `packages/core/src/governance/action.ts` + tests. Pure, synchronous, deterministic id, policy id and version, closed reason codes, TTL capped at 24h |
| In-process guard | Built, tested | `packages/guard/src/guard.ts`, plus `guard-hardening.test.ts` and a refund demo |
| Decision persistence | Built, tested | `packages/db/src/action-receipts.ts` + tests |
| Receipts view in Control | Built | `apps/control/src/app/actions/page.tsx` |
| **Approval service** | **Does not exist** | `apps/control/src/lib/receipts.ts:42` — *"there is no approval service"*. `guard.ts:527` stops the action on `require_approval` |
| External validation | **None** | ADR-0009: *"no customer outside this repository has instrumented production"* |

So the wedge is roughly two thirds built. An action can be decided, guarded,
recorded and reviewed. It cannot yet be *approved by a human*, which means
today the product can allow and deny but cannot escalate.

### The rest of the estate

| Asset | State |
| --- | --- |
| AI Fit Teams (`apps/business`) | Self-serve app. Shipped 2 Nov with *"Teams workspaces, billing, Control export"* and *"Teams billing portal and alerts"* |
| AI Fit (`apps/consumer`) | Self-serve quiz, accounts and Pro tier |
| 9 ARC Labs scanners | All live and reachable. Last **deployed** 17 Aug 2026; the 28 Sep timestamp was a settings change, not a release. Labelled 0.9 beta, alpha or experiment |
| MCP Conformance Scanner | Live, free, open source, ~15–30s scan, has docs/changelog/roadmap |
| 3 library repos | arc-skills, reference-architectures, ai-workflow-templates |

## The site is two months behind the build

This is the cheapest revenue available, because the work is already done.

| The site says | The build says |
| --- | --- |
| ARC Control is in "design-partner development" | Control has a working receipts view over persisted decisions |
| AI Fit Teams is "a three-to-four week assessment run by ARC", CTA to a contact form | AI Fit Teams is a self-serve app with workspaces and a billing portal, shipped 2 Nov |
| Nothing about approval of consequential actions | The accepted wedge since 19 October |
| ARC Labs tools listed as a catalogue | Nine live, free, self-serve scanners — the only front door of its kind in this market |

A buyer reading the site is offered a consulting conversation. A buyer
reading the repository is offered a product.

## Why this wedge is the right one commercially

The user's four constraints, tested against ADR-0009's design.

**Not expensive.** The guard is an in-process library at one tool boundary
the customer opts into. There is no gateway to buy, no platform to migrate
to, no per-seat licence. A pilot is one action.

**Legitimate against competitors.** The November audit found seven vendors
selling agent authorization — Okta, IBM, RSA, Palo Alto, Oleria, SecureAuth,
NewCore — all aimed at enterprise security buyers. It also found eleven AI
studios serving small companies, **none of which can do authorization at
all**. ARC's position sits in the gap neither side serves: a 15–150 person
engineering team that has an agent touching money and no way to answer who
allowed what. Determinism, policy versioning, replay from a digest and closed
reason codes are more rigorous than anything the eleven studios offer, and
cheaper to adopt than anything the seven vendors sell.

**Scalable.** ADR-0009 keeps Control out of the request path. ARC's costs do
not grow with the customer's traffic, and ARC being down cannot authorize
anything. That is the difference between a studio selling hours and a product
with margin.

**Retentive.** The receipts accumulate. After six months the switching cost
is the decision history — the answer to "who approved that refund in March"
lives in ARC. Retention here is a property of the product rather than a
support contract, which is what every competing studio sells instead.

## The ladder, grounded in what exists

Each rung says plainly what must be true before it can be sold.

**0. Free scanners.** Nine, live, self-serve. The front door no competitor
has. *Sellable now.* Needs a redeploy and a maturity honesty pass — several
say "Updated August 2026" on the page.

**1. AI Fit Teams, self-serve.** Estimator with workspaces and billing.
*Sellable now, and already has a billing portal.* Blocked only by the website,
which still routes it to a contact form.

**2. Guard pilot — one consequential action.** One named action behind the
guard, with its policy and its receipts. *Needs the approval service.* Until
`require_approval` can reach a human, the pilot can only offer allow and deny,
which fits fewer workloads.

**3. Control subscription — receipts, drift, cost per outcome.** The Observe
loop from ADR-0008, now the supporting loop rather than the wedge.
*Needs rung 2 running at a customer.*

## The tension you have to resolve

The repositories and the website describe two different companies.

**The website sells a services company.** Solutions, engagements, scoped
reviews, delivery. The `/pricing` ladder I added yesterday extends that: a
diagnostic, a fixed-price automation build, a connected system. That is the
business the eleven competing studios are in, and it is priced by the hour
underneath whatever the fixed price says.

**The repositories build a product company.** ADR-0009 names one wedge, binds
a list of things ARK refuses to be, and keeps Control out of the request path
so that margin does not leak as traffic grows.

Those have different economics. A services ladder scales by hiring; a product
scales by deploying. Your four constraints — inexpensive, legitimate,
scalable, retentive — all point at the product, and the ADRs have already
reasoned it through more carefully than a competitor scan can.

That does not make the services ladder wrong. It makes it a **funding
mechanism and a source of design partners**, not the destination. Builds pay
the bills and put ARC next to exactly the workloads the guard is for. The
error would be to let the site present services as the whole company while
the thing with margin stays invisible.

My recommendation: keep the services ladder, stop treating it as the
positioning, and hold `/pricing` until rung 1 is correct. The numbers on it
are still drafts and `pricingApproved` is still false, so nothing has shipped.

## What to do next, in order

1. **Build the approval service.** It is the single missing piece between a
   decision kernel and a sellable product, and ARC's own ADR names it as
   missing. Nothing else on this list unlocks as much.
2. **Update the website to describe what shipped.** AI Fit Teams is a product
   with billing, not a four-week engagement. This is pure margin: the work is
   done and the site is turning buyers away from it.
3. **Put the wedge on the site.** No page currently says ARC answers whether
   an agent may take a consequential action.
4. **Redeploy the scanners and correct their dates.** They are the cheapest
   lead source ARC has and they look abandoned.
5. **Get one external workload instrumented.** ADR-0008's own kill criterion
   — instrumenting a real workload must take under a day of a customer
   engineer's time — is still untested. Every willingness-to-pay claim here
   is a hypothesis until it is.

## What this document does not do

It does not write site copy for the approval service, the guard pilot or the
Control subscription. Two of those cannot be delivered today, and the standing
rule on this project is that the site does not describe capabilities or
deployment status ARC does not have. Rungs 0 and 1 can be written up as soon
as someone confirms the public tiers and prices of the AI Fit apps, which are
in the billing code rather than in anything I should guess at.
