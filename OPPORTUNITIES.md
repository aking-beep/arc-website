# Opportunities

Living list. Ranked. Cap 15 active. Updated 2026-10-19.

**Re-rank note (2026-10-19).** The site now leads with agent access governance
(see `docs/GRILL-AUDIT.md` and `docs/IMPECCABLE-AUDIT.md`). Items below that
point at `arc-skills`, `aifit-engine` or "Studio Warden" reference surfaces
that no longer exist on this site; they are moved to Closed rather than left
pointing at dead routes. Anything that does not serve the agent-access wedge
is now a side bet, and should be ranked as one.

Evidence dates are when *this run* confirmed the source, not when the event first happened.

## Active

1. **Ship a Claude Code plugin marketplace + Cursor/Claude install deep links for ARC Skills**
   - **Gap:** Catalog is copy / download / raw markdown. Official path is `/plugin marketplace add` and a team marketplace. Operators on HN are already symlink-farming because install is broken across tools.
   - **Applies to:** `arc-skills` (site page `/labs/arc-skills`; roadmap already lists “Open in Cursor / Claude deep links” as undone)
   - **Evidence:** [Ask HN, 6 Sep 2026](https://news.ycombinator.com/item?id=49589914) (268/248 as of 7 Sep 18:50 UTC); [Claude plugin marketplaces](https://code.claude.com/docs/en/discover-plugins); [Cursor Teams marketplace](https://cursor.com/docs/account/teams/pricing)
   - **Effort:** M (marketplace.json + install URLs; no schema/auth)
   - **Confidence:** high

2. **Show which model answered on Cursor Auto — not just dollars**
   - **Gap:** TokenLoop syncs spend. It does not attribute burn to routed model / Auto mode. After today, that *is* the invoice.
   - **Applies to:** TokenLoop
   - **Evidence:** [Cursor Models & Pricing](https://cursor.com/docs/models-and-pricing) (legacy Enterprise Auto “until September 7, 2026” still on the live page this afternoon); [Teams pricing / Token Rate](https://cursor.com/docs/account/teams/pricing); site research [Metered Agents](https://github.com/aking-beep/arc-website/blob/main/lib/research.ts) already cited the 24 Aug change
   - **Effort:** M (admin usage API fields → dashboard column)
   - **Confidence:** high — expiry is on the primary page; invoice reaction is still `single-source`

3. **Refresh homepage `marketSignals` for skills-ops + Auto expiry (past tense)**
   - **Gap:** Cost signal still says the Enterprise flat rate “expires 7 September 2026.” No skills signal exists. The site’s own README says drop or rewrite dated claims in the same pass.
   - **Applies to:** `arc-website` (`lib/content.ts`)
   - **Evidence:** same Cursor primary page; [Ask HN](https://news.ycombinator.com/item?id=49589914); [Claude `/skill-doctor`](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
   - **Effort:** S
   - **Confidence:** high
   - **Note:** A separate build PR is the vehicle; do not mix into the intel PR.

4. **Ship the MCP 2026-07-28 rule pack — and grade today’s SDK transport/auth defaults**
   - **Gap:** Flagship scanner roadmap still has the July pack unchecked. Today the official Python SDK (v2.2.0 / v1.30.0) also defaulted to same-origin redirects, 30-minute idle Streamable HTTP expiry, a 10k session cap, and OAuth `issuer` checks. Servers that still follow cross-origin redirects or keep zombie sessions will fail against the reference client.
   - **Applies to:** `mcp-conformance-scanner`
   - **Evidence:** [MCP 2026-07-28 spec](https://modelcontextprotocol.io/specification/2026-07-28/server/discover); [python-sdk v2.2.0](https://github.com/modelcontextprotocol/python-sdk/releases/tag/v2.2.0) (7 Sep 2026 15:53 UTC, 24,230 stars live); [v1.30.0](https://github.com/modelcontextprotocol/python-sdk/releases/tag/v1.30.0); [AWS Architecture Blog](https://aws.amazon.com/blogs/architecture/mcp-went-stateless-is-your-aws-mcp-server-deployment-well-architected/) (restates the July revision)
   - **Effort:** M
   - **Confidence:** high — spec gap was already real; today’s SDK release is independent corroboration of what “conformant” now means in practice
   - **Corroboration (7 Sep afternoon):** official SDK, not a blog recap.

5. **Add a “skill cost / unused” view to ARC Skills (mirror `/skill-doctor`)**
   - **Gap:** Official CLI now names unused skills and their context tokens. The catalog has no weight, no “when last useful,” no prune advice.
   - **Applies to:** `arc-skills`
   - **Evidence:** [CHANGELOG `/skill-doctor`, v2.1.261, 4 Sep 2026](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md); HN comments on token cost ([mlmonkey](https://news.ycombinator.com/item?id=49601500), [70rd](https://news.ycombinator.com/item?id=49600486))
   - **Effort:** M
   - **Confidence:** high

6. **Ingest Codex / ChatGPT Work usage into TokenLoop**
   - **Gap:** Roadmap item still open. Today’s 5-hour-cap thread is people discovering they have no spend pane for Codex at all.
   - **Applies to:** TokenLoop
   - **Evidence:** [Tell HN, 7 Sep 2026](https://news.ycombinator.com/item?id=49600233) (98/95 by afternoon); [ChatGPT Business FAQ](https://help.openai.com/en/articles/8542115-chatgpt-business-faq)
   - **Effort:** L (new provider; auth/API)
   - **Confidence:** medium — the cap itself is two weeks old; today’s thread is corroboration

7. **Name payments and bulk outbound email as high-risk tool classes in Agent Governance / Warden**
   - **Gap:** Tool inventory today is “what can this agent reach.” Bottleneck’s fleet used Stripe invoices as an email bypass and billed strangers $12k. Warden should require a human gate before an agent can create a charge or send unsolicited mail — not just list MCP servers.
   - **Applies to:** `arc-agent-governance`, Studio Warden
   - **Evidence:** [Bottleneck Labs, 7 Sep 2026](https://www.bottlenecklabs.com/blog/benchmarking-7-autonomous-businesses); [HN](https://news.ycombinator.com/item?id=49601338) (practitioner liability comments). Prompt was coercive (“make as much money as you can”); the control implication does not depend on the prompt being fair.
   - **Effort:** S (rubric + copy on the live product page; full runtime enforcement is a later product)
   - **Confidence:** high on the control; medium on the experiment as a capability claim

8. **Score skills / plugins / MCP add-ons as a supply-chain surface in Agent Governance**
   - **Gap:** Tool inventories prompts for agents and MCP. Skills-as-packages (with their own trust story) are the layer AIR just raised against. packslip now signs skills next to binaries; that is provenance, not permission.
   - **Applies to:** `arc-agent-governance`, Studio Warden
   - **Evidence:** [AIR $50M, 1 Sep 2026](https://techcrunch.com/2026/09/01/air-raises-50m-to-help-companies-vet-the-skills-and-add-ons-ai-agents-use/); HN demand for a “community trust layer” ([Skill Grill](https://news.ycombinator.com/item?id=49600924)); [packslip announcement, 5 Sep 2026](https://jdx.dev/posts/2026-09-05-introducing-packslip/) (`thin-evidence` on uptake: 3/0 on HN)
   - **Effort:** M
   - **Confidence:** medium — funding is six days old; packslip is two days old and quiet
   - **Corroboration (7 Sep afternoon):** signed skill-with-binary distribution is now a real format, not just a security-vendor pitch.

9. **Fit: split ChatGPT into plan-tier outcomes (Plus/Standard session-capped vs Pro/Premium)**
   - **Gap:** Fit treats ChatGPT as one tool. The 5-hour Work/Codex cap makes the $20 and $100 seats different products.
   - **Applies to:** `aifit-engine`
   - **Evidence:** [Tell HN](https://news.ycombinator.com/item?id=49600233); [Business FAQ](https://help.openai.com/en/articles/8542115-chatgpt-business-faq)
   - **Effort:** S (registry + copy)
   - **Confidence:** medium

10. **Prompt Reviewer: accept a `SKILL.md` and grade it as a skill, not a system prompt**
    - **Gap:** Skills are “special-purpose prompts” (HN) that now have unused/cost failure modes. The reviewer rubric does not name progressive disclosure, trigger quality, or context tax.
    - **Applies to:** `prompt-reviewer`
    - **Evidence:** [Ask HN](https://news.ycombinator.com/item?id=49589914); `/skill-doctor` changelog
    - **Effort:** S
    - **Confidence:** medium

11. **Research brief: skills as context-injection libraries (ops, cost, trust)**
    - **Gap:** Research has agent-credentials and metered-agents papers. Nothing dated on the skills/plugin supply chain that just ate a front-page thread.
    - **Applies to:** `arc-website` research
    - **Evidence:** items 1 and 5
    - **Effort:** M
    - **Confidence:** high on demand; writing it is a content bet

## Closed

_(empty)_
