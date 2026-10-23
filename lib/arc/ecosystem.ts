// ---------------------------------------------------------------------------
// The homepage ecosystem map — how the four parts of ARC fit together.
//
// Reconstructs the Magic Patterns `data/ecosystem` module. Copy is drawn from
// `ark`, `arkProducts` (lib/ark.ts), `serviceAreas` (lib/services.ts) and the
// research briefs, so nothing here claims more than the rest of the site does.
//
// `x`/`y` are percentages inside the blueprint panel. Four nodes around a
// centre at 50/52: two on the left rail, two on the right.
// ---------------------------------------------------------------------------

import type { Maturity } from "@/lib/content";

export type EcoNode = {
  id: string;
  name: string;
  /** Two or three words under the name, in mono. */
  role: string;
  maturity?: Maturity;
  what: string;
  forWho: string;
  connects: string;
  cta: string;
  to: string;
  x: number;
  y: number;
};

export const ecoNodes: EcoNode[] = [
  {
    id: "control",
    name: "ARC Control",
    role: "agent infrastructure",
    maturity: "design-partners",
    what: "Authorization, auditable execution, MCP validation and observability for AI agents, so you can prove what an agent did, under whose authority, and whether the outcome actually happened.",
    forWho:
      "Platform and security teams running agents against systems that hold money, records, infrastructure or customers.",
    connects:
      "Its MCP validation is the open-source scanner from ARC Labs, running as a product surface. The verification model came out of Services engagements where a run reported success and nobody could confirm the change.",
    cta: "Explore ARC Control",
    to: "/control",
    x: 18,
    y: 26,
  },
  {
    id: "labs",
    name: "ARC Labs",
    role: "applied research",
    maturity: "open-source",
    what: "Developer tools and scanners for teams building with AI. Nine of them are published, most are free with no account, and the open-source ones link to their code.",
    forWho:
      "Engineers and architects who want to check something today rather than book a call about it.",
    connects:
      "Lab tools become evidence inside readiness assessments and components inside ARC Control. The questions come from client work; the answers get published whether or not they flatter us.",
    cta: "Explore ARC Labs",
    to: "/labs",
    x: 18,
    y: 78,
  },
  {
    id: "services",
    name: "Enterprise Services",
    role: "delivery practice",
    maturity: "available",
    what: "Senior-led strategy, readiness, modernization, governance and build work. Six solution areas, each starting from a business problem rather than a discipline name.",
    forWho:
      "Leadership teams who have to decide what to improve, what to automate and what to build — and then need it working.",
    connects:
      "Services pays for the lab and sets ARC Control's roadmap. The person on your first call is the one who writes the scanners.",
    cta: "Explore our solutions",
    to: "/services",
    x: 82,
    y: 26,
  },
  {
    id: "research",
    name: "Research",
    role: "published evidence",
    maturity: "open-source",
    what: "Dated, cited briefs on agent infrastructure, MCP security, AI governance, cost control and cloud modernization. Updated when the facts change rather than when the marketing calendar says so.",
    forWho:
      "Anyone who has to defend a technology decision to a board, an auditor or an engineering team.",
    connects:
      "Every brief is written from the same work that produces the tools and the controls. Where a claim is ours rather than a source's, it says so.",
    cta: "Read the research",
    to: "/research",
    x: 82,
    y: 78,
  },
];
