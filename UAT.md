# UAT — Homepage market signals: skills-ops + Auto expiry past tense

## What changed and why

The live homepage (and Labs) still said Cursor’s Enterprise Auto flat rate “expires 7 September 2026.” That carve-out ended today. There was also no skills-ops signal, despite a front-page Ask HN and Claude Code’s `/skill-doctor`. This is [OPPORTUNITIES.md #3](https://github.com/aking-beep/arc-website/blob/market-intel/2026-09-07/OPPORTUNITIES.md). Evidence: [Cursor Models & Pricing](https://cursor.com/docs/models-and-pricing), [Ask HN](https://news.ycombinator.com/item?id=49589914), [Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md). Dated TokenLoop audience copy and the Metered Agents research brief were updated in the same pass so the site does not contradict itself.

## Acceptance criteria

1. Home `/` Market signals shows a Skills card dated 6 Sep 2026 whose headline names unused skills / a meter, linking to `/labs/arc-skills`, with Ask HN and the Claude Code changelog as sources.
2. Home Cost card uses past tense (“expired 7 September 2026”), does not say “expires 7 September 2026”, still links to `/labs/tokenloop`, and cites Cursor’s Models & Pricing page.
3. Labs `/labs` renders the same two signals.
4. TokenLoop `/labs/tokenloop` audience copy says enterprise flat rates “have expired”, not “are expiring”.
5. ~~`/labs/arc-skills` returns 200~~ — retired. ARC Skills ships inside the Ship playbook; `/labs/arc-skills` now 301s to `/playbook/ship`.
6. `/research/metered-agents-ai-spend-control` uses ended/until language for the 7 September carve-out, not “expiring” / “keeps the old flat rate”.
7. Production build and lint succeed.

## Verification results

1. **PASS.** Browser UAT on `http://127.0.0.1:3000/` (computer use) plus curl. Headline seen: “Unused skills now have a meter. Operators cannot keep them in sync.” CTA “Browse ARC Skills →” to `/labs/arc-skills`. Sources: “Ask HN — How do you manage skills files?” and “Claude Code changelog — /skill-doctor”. Screenshot: `uat/home-signals-dark.webp`.

```
$ curl -sS http://127.0.0.1:3000/ | python3 -c "..."
FOUND Unused skills now have a meter
FOUND Ask HN
home bytes 129079
HTTP 200
```

2. **PASS.** Cost body seen in browser: “The legacy flat rate for Enterprise Auto expired 7 September 2026.” Source “Cursor — Models & Pricing” (`https://cursor.com/docs/models-and-pricing`) and Anthropic costs docs. CTA “Open TokenLoop →”. Screenshot: `uat/home-cost-expired-and-skills.webp`.

```
FOUND expired 7 September 2026
MISSING expires 7 September
cursor.com/docs/models-and-pricing present in HTML
```

3. **PASS.** `/labs` HTTP 200; same strings present. Screenshot: `uat/labs-signals.webp`.

```
labs 200
FOUND Unused skills now have a meter
FOUND expired 7 September 2026
MISSING expires 7 September
```

4. **PASS.** Browser quote on TokenLoop: “now that enterprise flat rates have expired and billing follows whichever model the router picked.”

```
tokenloop 200
FOUND have expired
MISSING are expiring
```

5. **PASS.**

```
arc-skills 200
```

Browser navigation from the Skills CTA landed on the live ARC Skills product page, not a 404.

6. **PASS.** Research article HTTP 200. Quotes: “with the legacy enterprise flat rate ending 7 September 2026” and “Legacy enterprise Auto kept the old flat rate only until 7 September 2026.”

```
FOUND ending 7 September 2026
FOUND kept the old flat rate only until 7 September 2026
MISSING expiring 7 September
MISSING keeps the old flat rate
```

7. **PASS.** `npm run lint` — “No ESLint warnings or errors.” `npm run build` — compiled successfully, 54/54 static pages generated, including `/`, `/labs`, `/labs/tokenloop`, `/labs/arc-skills`, `/research/metered-agents-ai-spend-control`. There is no unit-test script in this repo (`package.json` has `dev`, `build`, `start`, `lint` only).

Dark mode and viewports (computer use): Skills card readable after theme toggle; 1280px 3-column grid and 390px single column, no overflow. Screenshots: `uat/home-signals-desktop-1280.webp`, `uat/home-signals-mobile-390.webp`.

## What I did NOT verify

- No Jest/Playwright (or any) test runner exists; I did not add one. Regression coverage is lint + production build + one local `next start` session.
- Production Vercel / the canonical domain. Only `127.0.0.1:3000` from this morning’s `next build`.
- External source URLs in a real browser click-through (Ask HN, Cursor docs, Anthropic changelog). They are present as `href`s; I did not load those third-party pages from the site.
- The Metered Agents citation [1] still points at CellCog industry coverage, not the Cursor primary page. I changed tense only there.
- Keyboard / screen-reader paths, focus order, and reduced-motion.
- Intermediate breakpoints between 390 and 1280.
- Pages that do not render `marketSignals` (Studio, Academy, About, Work) beyond confirming the build emitted them.
- Console: computer-use DevTools showed a 404 / analytics script failure (`@vercel/analytics` on localhost). I did not chase it; it is unrelated to this copy change.
- Whether Cursor has actually billed anyone at routed-model rates yet. The site now matches Cursor’s live docs; invoice reaction in the market is still `single-source`.

## Risk and rollback

Wrong tense or a stale skills claim would sit on the homepage, which is the highest-trust surface on the site. Andrew would see it on `/` and `/labs`. Revert this PR (or restore the previous `marketSignals` entries and the two TokenLoop / research sentences). No database, no auth, no deploy-config change.

## Where I'm uncertain

- I left the Cost signal’s **date** as 2026-08-24 (the Auto pricing change) and put the expiry into `soWhat`. A case exists for dating the card 2026-09-07 because that is when the carve-out died. README says date the change itself; I followed that.
- Seven signal cards now wrap to a third row on desktop. Fine, but denser than the previous six. Dropping a sub-quarter card was not in scope.
