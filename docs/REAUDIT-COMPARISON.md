# Re-audit comparison — 19 October 2026

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

Second pass of the commercial grill, the design critique, and the launch plan. Compared with `docs/GRILL-AUDIT.md`, `docs/IMPECCABLE-AUDIT.md`, and `docs/BRAG-LAUNCH-PLAN.md` from earlier the same day.

Method: dual-agent (A: `bc-99b6bbe2-c82e-5d7b-9b2b-f2d4aa240f33` · B: `bc-0d01a180-46d8-5a3d-9503-dfcc4550f9e3`). Detector re-run on `app` and `components`. Production checked with a live fetch of `https://arctransformationgroup.com` plus `/platform`, `/ark-control`, `/agent-readiness`, `/labs`, and `/playbook`. Tool homepages checked again. No production code was changed. No film was rendered.

## Scores

| Pass | Earlier | Now | Delta |
| --- | ---: | ---: | --- |
| Commercial clarity | 36/100 | 36/100 | 0 |
| Impeccable (design system, IA, conversion) | 44/100 | 44/100 | 0 |
| Nielsen | 22/40 | 22/40 | 0 |
| Technical health | 12/20 | 12/20 | 0 |
| Detector findings | 1 advisory | 1 advisory | 0 |
| Launch readiness | not ready | not ready | 0 |

The Nielsen total landing on 22 again is not a new measurement of a changed page. A blind re-score moved a few points between heuristics (error prevention read harsher, aesthetic and help read slightly kinder) and summed to the same number. The pages did not move.

## What was compared

`origin/main` is still `e0a3546`. The only commits since the first audits are the audit documents themselves. Production HTML matches the repo.

| Check | Earlier | Now |
| --- | --- | --- |
| Homepage H1 | "Make technology work for your business." | Same sentence, live |
| Homepage kicker | AI · Automation · Cloud · Security · Software | Same, live |
| Header | Services, Agent Infrastructure, Labs, Playbooks, Work, About, Talk to us | Same, live |
| Agent Control in the nav | "Permissions and approval gates" | Unchanged in `lib/content.ts` |
| `/platform` | Flagship plus "not a product you can buy" | Both strings are in the live HTML |
| `/ark-control` | "ARC product" and "Design partners" | Both strings are in the live HTML |
| Default CTA | "Book a 30-min discovery call" | Still `components/cta.tsx` |
| Playbook prices in the footer | Define $5, Build $10, Ship $20 | Still in the live footer |
| Detector | `codex-grid-background` at `app/globals.css:65` | Same file, same line |
| Focus rings outside `Button` | None | None |
| Contact `htmlFor` | Absent | Absent |
| Menu button | `h-9 w-9` | Still `site-header.tsx` |
| Reduced motion | Global `0.01ms` | Still `globals.css:103` |
| Agent Governance | HTTP 200, 19 rules, nothing stored | HTTP 200, same copy |
| MCP scanner | 0.9 beta | 0.9 beta, "Updated August 2026" |
| TokenLoop | Preview dollars | Preview still shows `$412.80` |

## What the second pass corrected

The re-score claimed the site has no skip link. That is wrong. `app/layout.tsx` has "Skip to content". It does not change the score. Flexibility stays at 2 because a staff engineer still shares the six-item bar with everyone else, not because the skip link is missing.

The re-score also found a third Agent Control verb that the first write-up under-named: the flagship panel button is "Read the Agent Control thinking" (`app/platform/page.tsx`), beside "Explore Agent Control" in the hero and "Book a 30-min discovery call" everywhere else. Same problem as before, one more label.

## Grill

The eight recommendations from the first grill are still recommendations. Nothing on the site accepted them. The frontier is the same because the facts are the same:

- The public company is still ARC Transformation Group.
- The homepage still sells four services.
- The paid assessment is still not a SKU.
- Playbooks are still in the header.
- AI Fit is still under Agent Infrastructure.
- Agent Control is still the loudest object on `/platform` and still not for sale.
- A2A and the runtime are still research.

## Impeccable

P0s are unchanged: the first screen does not separate today from later; the unshipped product is painted as the flagship; the primary action is still a discovery call. P1s are unchanged: maturity chips still collapse, `FlowChain` is still one chip style, the card is still the whole catalog, nav and footer still disagree, focus and form labels are still missing.

## Brag

Still one honest lead: ARC Agent Governance, alpha, 19 rules, nothing stored. Still not a launch of ARK Transformation Systems or Agent Control. The readiness checklist in `docs/BRAG-LAUNCH-PLAN.md` is unchecked on every item that required a page change or a collected proof. No new scan report, no new assessment, no new destination-system check, no new usage number.

## What would move the scores

A visible change on `/`, `/platform`, or the header. Documentation in this branch does not. Until one of those pages changes, another pass will return these same numbers.
