# ARC as an AI studio: competitive set, gaps, and what to change

Researched 4 November 2026. Every competitor below was read from its own
live pricing or services page, and every figure is attributed.

## The correction this makes

`docs/COMPETITIVE-AUDIT-2026-11.md` measured ARC against Okta, IBM, RSA and
Palo Alto. That was the wrong comparison set. Those vendors sell an agent
authorization product to enterprise security buyers. ARC is a studio that
builds and runs AI systems for companies of roughly 1 to 200 people. The
buyer is an owner or an operator, not a CISO, and the competition is other
studios.

The earlier audit's central conclusion survives the correction, and arrives
with more force. Hold that thought until the gaps section.

## Who ARC is actually up against

| Studio | Buyer | Entry offer | Build | Ongoing |
| --- | --- | --- | --- | --- |
| [Renga](https://rengatechnologies.com/pricing) | SMB, US/UK/EU | $99 Blueprint, 5–7 days, credited | $4,997–$9,997 | — |
| [Develop It Today](https://developit.today/pricing) | SMB | from $997 | 16 productized services, all priced | — |
| [Oyepa](https://oyepa.com/packages) | SMB | $499 | from $1,199, you own it | none by design |
| [Hardihood](https://www.hardihood.studio/services/ai-automation-small-business) | small business | free call | $1,500 / $2,500 / $4,000; to $14,000+ | post-tuning support |
| [Built by Kerr](https://builtbykerr.com/services/ai-automation.html) | local SMB | $1,500 audit, plan is yours | $3,500 / $7,500 | $400/mo |
| [Tama OS](https://tamaos.ai/ai) | service businesses, 3–30 people | free 30 min | $5,000 / $9,500 / $15,000 | $500–1,500/mo |
| [Fezorra](https://fezorra.com/) | small business | free audit | $3,500–$29,500 | $1,000 / $2,900 / $10,000/mo |
| [Pineapples](https://www.pineapples.dev/) | SMB, founders, investors | $4,900 pilot, 7 days, credited | $18K–$35K per workflow | $6,500/mo |
| [Teravexa](https://teravexa.com/b2b-packages) | B2B | — | $15,000 / $30,000 fixed | SLA-backed |
| [Build AI Studio](https://buildaistudio.io/) | SMB | free discovery | $5K–$50K, 4–12 weeks | optional retainer |
| [Creative Genius](https://creativegenius.ai/ai-for-small-business) | SMB to F500 | $4,500–$9,500 sprint | $18K–$75K | $1,500+ |

## What all eleven do that ARC does not

1. **They publish a price.** Eleven out of eleven. ARC publishes none, and
   says so on purpose: *"there is no published rate card, because the right
   size depends entirely on what you already have."*
2. **They publish a timeline in days.** "Live in 15 business days."
   "5–7 business days." ARC offers "2–7 weeks" and "6–16 weeks".
3. **They sell a cheap, credited way in.** Renga's $99 Blueprint is credited
   in full against a build. Pineapples' $4,900 pilot credits within 30 days.
   Built by Kerr's $1,500 audit leaves the plan with you either way.
4. **Fixed scope, fixed price, no hourly billing** — stated as a promise,
   usually with the words "no scope creep".
5. **Explicit ownership transfer.** "Code in your repo." "Source code,
   hosting, and credentials transferred at launch."
6. **Guarantees.** Renga: late means 25% back, and a full refund if it does
   not do what was agreed. Fezorra: a measurable target agreed up front, hit
   in 90 days or money back.
7. **They name the buyer by size.** "Service businesses with 3–30 people
   where the owner is buried in messages, scheduling and billing."

ARC's copy is written for a different company. The AI Strategy page opens on
*"Leadership teams with pressure to adopt AI and no shortlist"*, scores
*"the work your organisation actually does"*, and sells an *"Integrated
Transformation Diagnostic"*. A 15-person firm does not buy that sentence,
and a 90-person firm cannot tell what it costs.

**This is the first gap, and it is ARC's own: the offer is unbuyable.** No
price, no timeline in days, no entry point under a conversation, and
vocabulary aimed at a company ten times the size of the stated market.

## The gaps in the competitive set

Where the eleven are weak, they are weak in the same place, and it is
documented rather than a matter of opinion.

### 1. Everyone sells the build. Nobody sells what happens after it

- **42%** of European and North American organisations abandoned most of
  their AI initiatives in 2025, up from **17%** the year before
  ([S&P Global / 451 Research, Oct 2025, n=1,006](https://www.canihireanai.com/blog/en/the-no-code-gap/)).
  Abandonment nearly tripled in a year.
- In an audit of 50 failed agency engagements, **60%** had no dashboards, no
  accuracy tracking and no monitoring for drift or regressions
  ([NoFluff](https://www.nofluff.pro/blog/why-ai-agencies-fail)). In their
  words: *"The system might be working great, or it might be silently
  producing garbage. Nobody knows."*
- **70%** of those failed engagements had no measurable KPI at the start.
- MIT's *GenAI Divide: State of AI in Business 2025* is widely reported as
  finding roughly **95%** of enterprise AI pilots deliver no measurable
  return. That figure is enterprise, not SMB, and is contested — but the
  direction matches everything above.

Every competitor's ongoing plan is hosting, monitoring of *uptime*, and
fixes. Not one of them sells evidence that the thing still produces correct
work. Fezorra's monthly "hours-saved report" is the closest, and it is
self-reported by the party being paid.

### 2. Silent failure is the most expensive mode, and nobody addresses it

Webhook delivery success drops to 94.2% during EU peak hours, and **3.8% of
those failures return HTTP 200** — the receiving system reports success while
the event never triggers downstream processing
([Carrier Integrations, 2025, via Can I Hire an AI](https://www.canihireanai.com/blog/en/the-no-code-gap/)).
On 500 events a day that is roughly **19 lost events every day**. The write-up
puts it plainly: *"Nobody notices until a customer calls, a payment goes
missing, or a regulator asks for a report nobody can reconstruct."*

**This is exactly the clause the earlier audit found was ARC's only
uncontested ground.** "Whether the outcome actually happened" is not a
product-category differentiator looking for a market. It is the most
expensive, best-documented failure in the market ARC actually serves, and
none of the eleven studios sells against it.

### 3. No operating owner is the single most common killer

The pattern, reported independently by three sources: the agent ships, works
for two weeks, drifts in week 4 as the model or the data shifts, nobody
notices because nobody owns noticing, and by week 12 the team has stopped
using it ([Aayush Jain](https://aayushjain.com/blog/why-smb-ai-pilots-fail)).
An Australian practitioner lists the tells: nobody can name the day-to-day
owner, outputs land somewhere nobody opens, the vendor has gone quiet, the
team still runs the manual process in parallel with no end date, and
exceptions queue up untriaged
([Office Pro Consulting](https://officeproconsulting.com.au/why-ai-pilots-fail/)).

The sharpest framing of the fix: *"Treat the automation like a staff member:
it has a job, it has a manager, and someone notices when it doesn't show
up."* ([Nelson AI](https://www.nelsonai.co.nz/insights/why-most-nz-smb-ai-projects-fail))

### 4. Closed-platform lock-in

A large share of these studios build on Voiceflow, Landbot, Botpress, Make or
GoHighLevel. *"If an agency builds your AI on a platform you don't control,
you don't own the automation. You're leasing it."*
([NoFluff](https://www.nofluff.pro/blog/why-ai-agencies-fail)) AiHustle's
packages are explicitly a GoHighLevel subscription at $97–$497/mo bundled
with the build.

### 5. Nobody publishes what they will not automate

The 2026 buyer's guide names this as the test question — *"What do you
recommend we NOT automate?"* — and says a vague answer means the vendor has
not deployed enough to know where things break
([AI Agent Corps](https://www.agentcorps.co/blog/ai-automation-agency-buyers-guide-2026-red-flags-pricing-how-to-choose)).

ARC already has this and buries it. The AI Strategy page classifies each
opportunity as *fix the process first, ordinary automation, AI-assisted, or
not yet*, and `engagementShapes` ends with a shape literally called
**"Nothing"**. That is the single most credible thing on the site for this
buyer, and it is the last row of a table on a secondary page.

### 6. The 50–200 band is underserved

The specific ones aim low: Tama OS says 3–30 people, Built by Kerr serves
local trades, Fezorra sells gym and salon apps. The ones that go upmarket
(Creative Genius at $18K–$75K, Teravexa at $15K–$30K) are generic about who
they serve. Nobody owns the company with 60 to 200 people that has real
systems, a compliance questionnaire arriving from its own customers, perhaps
one IT person — too small for Slalom, too complicated for a $3,500 Zapier
shop.

## What to change

### The promise

Stop selling six capabilities. Sell one thing nobody else sells: **ARC builds
it, and proves it is still working.**

That sentence does real work. It is differentiated against all eleven, it is
grounded in the best-documented failure in the market, it unifies the studio
with ARC Control instead of leaving them as two unrelated businesses, and it
is the honest description of what ARC already knows how to do.

### Specific copy, drafted for approval

**`arcSite.positioning`** — currently *"ARC builds the controls that let AI
agents act on production systems safely, modernizes the infrastructure they
depend on, and turns emerging technology into products people actually use."*
Three clauses, no buyer, no outcome, and `people actually use` uses a
construction `docs/WRITING.md` retires.

> ARC is an AI studio for companies of 1 to 200 people. We build the
> automations and agents that take real work off your team, and we prove
> every month that they are still doing it.

**`arcSite.metaDescription`** — currently lists ARC Control, ARC Labs and
"senior-led enterprise delivery". The word enterprise is actively repelling
the stated market.

> An AI studio for companies of 1 to 200 people. Fixed-price builds in weeks,
> code you own, and monthly proof that what we built still works.

**A line the site does not have at all**, and the one most likely to win a
comparison:

> Most studios hand over a working automation and a hosting plan. Four weeks
> later the model drifts, a webhook starts returning success for work it
> never did, and nobody notices until a customer calls. We monitor whether
> the work actually happened, and we show you the evidence.

### The offer ladder

ARC needs a published ladder. Four rungs, each one buyable without a
conversation, each one ending somewhere a buyer can stop:

1. **A paid diagnostic that credits toward the build.** Competitors run $99
   to $2,500. ARC already has the free `AI Fit` self-assessment above it and
   the $5–$20 playbooks below it, so this rung completes a funnel that
   currently jumps from a $20 PDF to an unpriced consulting conversation.
2. **One automation, fixed price, shipped in days.** The volume rung.
   Competitors: $1,500–$7,500.
3. **A connected system.** Competitors: $7,500–$30,000.
4. **Outcome Assurance, monthly.** The differentiated rung. Not hosting and
   fixes — reconciliation of what the automation claimed against what changed
   in the systems it touched, a named owner, an exception queue someone
   triages, and a monthly evidence pack. This is ARC Control's thesis sold as
   a service at a price a 40-person company can pay, and it is the one rung
   no competitor offers.

Plus the two shapes already on the site that should be kept and promoted:
fractional leadership, and **"Nothing"**.

### Three commitments to publish

Each one answers a documented failure, and each is cheap for ARC and
expensive for a no-code shop to copy:

- **You own it.** Code in your repository, infrastructure in your accounts,
  no platform only ARC can edit.
- **We write down what it will not do.** The boundary ships with the build,
  because unbounded scope is the failure mode behind most abandoned
  automations.
- **A named owner and a heartbeat.** Every build ships with a person
  responsible for noticing, and a weekly check that it ran and the output was
  sane.

## What this does not settle

Prices. The ladder above is benchmarked against eleven competitors, but what
ARC charges is a business decision with revenue consequences, and nothing in
this research tells you ARC's cost base or capacity. The numbers need to come
from the person who carries them.
