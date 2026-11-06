# Competitive audit · November 2026

Researched 4 November 2026 against live vendor pages. Every claim below links
to the page it came from. Where a date is given, it is the vendor's own.

## The finding, in one paragraph

ARC Control's six capabilities were a defensible position when they were
written. They are not now. Agent authorization, agent identity, runtime
enforcement and the audit trail have become a product category owned by
Okta, IBM, Palo Alto Networks, RSA, SecureAuth, Oleria and NewCore — most
of them generally available, one shipping on 16 November. ARC Control is in
design-partner development. The site describes a product that six larger
vendors already sell.

## What shipped while the positioning stood still

| Vendor | Product | Status |
| --- | --- | --- |
| Palo Alto Networks | [Prisma AIRS AI Gateway](https://www.paloaltonetworks.com/ai-security/ai-gateway) | GA 16 July 2026. Named a Gartner "Company to Beat" in AI security, June 2026 |
| IBM | [Agent Identity](https://www.ibm.com/new/announcements/ibm-agent-identity-is-now-generally-available-building-trust-for-the-agentic-era) | GA 26 October 2026 |
| RSA | [Agent ID](https://www.rsa.com/products/rsa-agent-id/) | Discover and Secure ship 16 November 2026; Govern early 2027 |
| Okta | [Okta for AI Agents](https://www.okta.com/products/govern-ai-agent-identity/) | Shipping: Agent Gateway, shadow-agent discovery, kill switch |
| Oleria | [AI Agent Governance](https://www.oleria.com/product/ai-agent-governance) | Shipping: MCP + REST gateway, OPA policy, microVM containment |
| SecureAuth | [Agent Authority](https://secureauth.com/products/agent) | Shipping: agent registry, per-argument authorization, "Agent Trail" |
| NewCore | [Agent Guardian](https://newcore.com/platform/agent-guardian) | Shipping: brokered credentials, per-call authorization |

## Capability by capability

| ARC Control capability | Who else sells it | Verdict |
| --- | --- | --- |
| Agent authorization and permissions | All seven | Commodity |
| Auditable execution | All seven | Commodity |
| MCP security and conformance | Oleria, RSA, Palo Alto gateways speak MCP | Contested — but see below |
| Agent observability | Palo Alto, plus the whole LLM-observability field | Commodity |
| Agent governance and policy | All seven | Commodity |
| Infrastructure reliability | Generic | Not a category |

## The language collision

ARC Control's lead sentence:

> prove what an agent did, under whose authority, and whether the outcome
> actually happened

Oleria's bullet, on a shipping product:

> Track what an agent did, when, and under whose authority

SecureAuth's description of Agent Trail:

> Every call an agent made, the person behind it, the arguments it carried
> and the rule that decided it

The first two thirds of ARC's sentence is now the category's house style. A
visitor who has seen any competitor page reads ARC's as the same claim from
a smaller vendor who has not shipped.

## The one clause that is still ARC's

The last third — **whether the outcome actually happened** — is the part
nobody else leads with. Every vendor above stops at the tool call and the
policy decision. None of them claims to confirm that the refund settled.

That is a real gap, and ARC named it before the category did. It is also no
longer unclaimed:

- [Pruvz](https://pruvz.ai/blog/ai-agent-outcome-verification) sells outcome
  verification directly, with a published evidence-packet schema (v1.0.0)
  that derives trust level server-side, dated 28 July 2026.
- An [arXiv paper](https://arxiv.org/html/2609.31301v1) formalises it as
  EffectMatch and the Effect Commit Contract.
- [Dr Joe Shepherd](https://www.drjoeshepherd.com/insights/outcome-assurance-for-agentic-systems/)
  splits it into Decision, Action, Execution and End-State assurance,
  6 October 2026 — a framing that shows ARC's single sentence is doing four
  jobs at once.
- Practitioner writing has named the failure mode
  ["silent success"](https://tianpan.co/blog/2026/04/23/agent-silent-success-effect-reconciliation).

So the niche is young, the vocabulary is forming in public, and there is one
direct competitor rather than seven.

## What to change

**1. Narrow ARC Control to outcome verification.** Drop authorization,
identity, policy and observability from the headline claim. They are table
stakes a buyer will get from Okta or IBM, and listing them invites the
comparison ARC loses. Lead with the refund example already on the site: the
agent reported success and finance cannot confirm the ledger changed.

**2. Rewrite the lead sentence.** It currently collides near-verbatim with
Oleria. The replacement should be about end state, not authority.

**3. Say where ARC sits next to the gateway vendors.** A buyer running Okta
or Prisma AIRS needs to know whether ARC replaces it or checks its work. The
honest answer is the second, and saying so makes ARC complementary rather
than outgunned.

**4. Adopt the forming vocabulary deliberately.** "Outcome verification",
"end-state assurance" and "silent success" are becoming the search terms.
ARC currently uses none of them.

**5. Lead ARC Labs with the MCP Conformance Scanner.** It is free, shipped,
and the large vendors sell conformance only inside a paid gateway. It is the
strongest proof ARC has that it builds rather than describes.

**6. Fix one style violation in the tagline.** "Infrastructure for agents
that act on real systems" uses `real X`, which `docs/WRITING.md` retires.

## Proposed copy, ready to drop in

These are drafts for approval, not changes I have made. Positioning is a
business decision and `lib/arc/control.ts` still reads as it did.

**`tagline`** — currently "Infrastructure for agents that act on real
systems." The `real X` construction is retired by `docs/WRITING.md`, and
"infrastructure" is what all seven competitors call themselves.

> Proof that the agent's work landed.

**`lead`** — currently opens on authorization, identity and observability,
and its first two thirds match Oleria's shipping product almost word for
word. It also uses "actually", which the manuscript copy pass retired.

> Your agents report success. Your ledgers, tickets and inboxes are the only
> places that can confirm it. ARC Control reconciles what an agent said it
> did against what changed in the systems it touched, and tells you when the
> two disagree.

That sentence does three things the current one does not: it names the
failure mode rather than the feature list, it does not claim the four
capabilities competitors already ship, and it puts ARC beside Okta and
Prisma AIRS rather than against them.

**A new paragraph, to sit under the lead** — because the first question a
buyer running a gateway will ask is whether this replaces it.

> ARC Control is not an identity provider or a policy gateway. If you run
> Okta, IBM Verify or Prisma AIRS, keep them: they decide whether an agent
> may act. ARC Control checks whether the act had the effect the agent
> claimed.

**`capabilities`** — drop agent authorization, governance and policy, and
infrastructure reliability from the headline list. They invite a comparison
against GA products. Keep auditable execution and observability only as
supporting detail under outcome verification, and keep MCP conformance,
which is backed by something shipped.

## What not to change

The maturity labels. Every competitor above is GA or dated; ARC Control says
design-partner development and the site refuses to offer a purchase. In a
category this crowded, being the one vendor that does not overclaim is worth
more than a borrowed adjective.
