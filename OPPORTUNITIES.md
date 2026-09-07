# Opportunities

Living list. Ranked. Cap 15 active. Updated 2026-09-07.

Evidence dates are when *this run* confirmed the source, not when the event first happened.

## Active

1. **Ship a Claude Code plugin marketplace + Cursor/Claude install deep links for ARC Skills**
   - **Gap:** Catalog is copy / download / raw markdown. Official path is `/plugin marketplace add` and a team marketplace. Operators on HN are already symlink-farming because install is broken across tools.
   - **Applies to:** `arc-skills` (site page `/labs/arc-skills`; roadmap already lists “Open in Cursor / Claude deep links” as undone)
   - **Evidence:** [Ask HN, 6 Sep 2026](https://news.ycombinator.com/item?id=49589914) (264/246); [Claude plugin marketplaces](https://code.claude.com/docs/en/discover-plugins); [Cursor Teams marketplace](https://cursor.com/docs/account/teams/pricing)
   - **Effort:** M (marketplace.json + install URLs; no schema/auth)
   - **Confidence:** high

2. **Show which model answered on Cursor Auto — not just dollars**
   - **Gap:** TokenLoop syncs spend. It does not attribute burn to routed model / Auto mode. After today, that *is* the invoice.
   - **Applies to:** TokenLoop
   - **Evidence:** [Cursor Models & Pricing](https://cursor.com/docs/models-and-pricing) (legacy Enterprise Auto “until September 7, 2026”); [Teams pricing / Token Rate](https://cursor.com/docs/account/teams/pricing); site research [Metered Agents](https://github.com/aking-beep/arc-website/blob/main/lib/research.ts) already cited the 24 Aug change
   - **Effort:** M (admin usage API fields → dashboard column)
   - **Confidence:** high — expiry is on the primary page; invoice reaction is still `single-source`

3. **Refresh homepage `marketSignals` for skills-ops + Auto expiry (past tense)**
   - **Gap:** Cost signal still says the Enterprise flat rate “expires 7 September 2026.” No skills signal exists. The site’s own README says drop or rewrite dated claims in the same pass.
   - **Applies to:** `arc-website` (`lib/content.ts`)
   - **Evidence:** same Cursor primary page; [Ask HN](https://news.ycombinator.com/item?id=49589914); [Claude `/skill-doctor`](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
   - **Effort:** S
   - **Confidence:** high

4. **Add a “skill cost / unused” view to ARC Skills (mirror `/skill-doctor`)**
   - **Gap:** Official CLI now names unused skills and their context tokens. The catalog has no weight, no “when last useful,” no prune advice.
   - **Applies to:** `arc-skills`
   - **Evidence:** [CHANGELOG `/skill-doctor`, v2.1.261, 4 Sep 2026](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md); HN comments on token cost ([mlmonkey](https://news.ycombinator.com/item?id=49601500), [70rd](https://news.ycombinator.com/item?id=49600486))
   - **Effort:** M
   - **Confidence:** high

5. **Ingest Codex / ChatGPT Work usage into TokenLoop**
   - **Gap:** Roadmap item still open. Today’s 5-hour-cap thread is people discovering they have no spend pane for Codex at all.
   - **Applies to:** TokenLoop
   - **Evidence:** [Tell HN, 7 Sep 2026](https://news.ycombinator.com/item?id=49600233); [ChatGPT Business FAQ](https://help.openai.com/en/articles/8542115-chatgpt-business-faq)
   - **Effort:** L (new provider; auth/API)
   - **Confidence:** medium — the cap itself is two weeks old; today’s thread is corroboration

6. **Ship the MCP 2026-07-28 rule pack (server/discover, per-request `_meta`, routing headers)**
   - **Gap:** Flagship scanner roadmap still has this unchecked. Spec is 40 days old; AWS is now writing migration architecture around it.
   - **Applies to:** `mcp-conformance-scanner`
   - **Evidence:** [MCP 2026-07-28 spec](https://modelcontextprotocol.io/specification/2026-07-28/server/discover); [AWS Architecture Blog](https://aws.amazon.com/blogs/architecture/mcp-went-stateless-is-your-aws-mcp-server-deployment-well-architected/) (restates the July revision; not a new spec)
   - **Effort:** M
   - **Confidence:** high on the gap; this run did not find a new protocol drop

7. **Score skills / plugins / MCP add-ons as a supply-chain surface in Agent Governance**
   - **Gap:** Tool inventories prompts for agents and MCP. Skills-as-packages (with their own trust story) are the layer AIR just raised against.
   - **Applies to:** `arc-agent-governance`, Studio Warden
   - **Evidence:** [AIR $50M, 1 Sep 2026](https://techcrunch.com/2026/09/01/air-raises-50m-to-help-companies-vet-the-skills-and-add-ons-ai-agents-use/); HN demand for a “community trust layer” ([Skill Grill](https://news.ycombinator.com/item?id=49600924))
   - **Effort:** M
   - **Confidence:** medium — funding is six days old; product still opaque

8. **Fit: split ChatGPT into plan-tier outcomes (Plus/Standard session-capped vs Pro/Premium)**
   - **Gap:** Fit treats ChatGPT as one tool. The 5-hour Work/Codex cap makes the $20 and $100 seats different products.
   - **Applies to:** `aifit-engine`
   - **Evidence:** [Tell HN](https://news.ycombinator.com/item?id=49600233); [Business FAQ](https://help.openai.com/en/articles/8542115-chatgpt-business-faq)
   - **Effort:** S (registry + copy)
   - **Confidence:** medium

9. **Prompt Reviewer: accept a `SKILL.md` and grade it as a skill, not a system prompt**
   - **Gap:** Skills are “special-purpose prompts” (HN) that now have unused/cost failure modes. The reviewer rubric does not name progressive disclosure, trigger quality, or context tax.
   - **Applies to:** `prompt-reviewer`
   - **Evidence:** [Ask HN](https://news.ycombinator.com/item?id=49589914); `/skill-doctor` changelog
   - **Effort:** S
   - **Confidence:** medium

10. **Research brief: skills as context-injection libraries (ops, cost, trust)**
    - **Gap:** Research has agent-credentials and metered-agents papers. Nothing dated on the skills/plugin supply chain that just ate a front-page thread.
    - **Applies to:** `arc-website` research
    - **Evidence:** items 1 and 4
    - **Effort:** M
    - **Confidence:** high on demand; writing it is a content bet

## Closed

_(empty — first run on this hub)_
