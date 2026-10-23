// ---------------------------------------------------------------------------
// ARC Control page content.
//
// The prototype hardcoded these lists inside its components, with comments
// pointing back at this repository ("From the repository's `limits` for Agent
// Control (lib/ark.ts). Non-negotiable on this page."). They are read from
// lib/ark.ts here instead, so the product page and the limits cannot drift.
//
// Naming: the product is `arkProducts[ark-control]`, recorded there as "Agent
// Control" at /ark-control. The redesign renames it ARC Control at /control
// and the old route redirects. See docs/MAGIC_PATTERNS_AUDIT.md §3.6.
// ---------------------------------------------------------------------------

import { agentLifecycle, executionGap, getArkProduct } from "@/lib/ark";

const product = getArkProduct("ark-control");

if (!product) {
  // A build-time guard: the page below is written against this entry, and a
  // silent fallback would ship a product page with no limits section.
  throw new Error("lib/arc/control.ts: arkProducts is missing the 'ark-control' entry");
}

export const control = {
  name: "ARC Control",
  /** Kept so /ark-control can redirect and so the sitemap stays correct. */
  legacyPath: "/ark-control",
  path: "/control",
  maturity: product.maturity,
  tagline: "Infrastructure for agents that act on real systems.",
  lead: "Authorization, auditable execution, MCP validation and observability for AI agents, so you can prove what an agent did, under whose authority, and whether the outcome actually happened.",
  today: product.today,
  todayLabel: product.todayLabel,
  previewNote:
    "The console on this page is an interactive preview with fictional data. It shows the direction of the product, not a shipping feature set.",
  limits: product.limits,
  intro: product.intro,
};

export const gap = {
  headline: executionGap.headline,
  lead: executionGap.lead,
  failures: executionGap.failures,
  takeaway: executionGap.takeaway,
  /**
   * The six links in the chain. The first three are what tracing already
   * captures; the last three are what ARC Control is built to verify.
   */
  chain: executionGap.chain.map((name, i) => ({
    name,
    covered: i < 3 ? ("trace" as const) : ("control" as const),
  })),
};

export type ConsoleTab =
  | "inventory"
  | "activity"
  | "policies"
  | "audit"
  | "findings"
  | "health";

/**
 * The six capabilities, each wired to the console view that demonstrates it.
 * The wording matches `capabilities` on the product entry; the status column
 * is what we can honestly claim during design-partner development.
 */
export type ControlCapability = {
  name: string;
  text: string;
  detail: string;
  /** What exists today. Never "available" for anything inside ARC Control. */
  state: "design-partners" | "in-development" | "research" | "open-source";
  tab: ConsoleTab;
  tabLabel: string;
};

export const controlCapabilities: ControlCapability[] = [
  {
    name: "Agent authorization and permissions",
    text: "Every agent gets its own identity, scoped credentials and a record of who it acts for.",
    detail: "Actions above a threshold route to a named human approver, with an expiry.",
    state: "design-partners",
    tab: "inventory",
    tabLabel: "Agent inventory",
  },
  {
    name: "Auditable execution",
    text: "Each run produces a record built to be read later by someone who was not in the room.",
    detail: "Actor, credential, policy decision, tool call, response, outcome source, verdict.",
    state: "design-partners",
    tab: "audit",
    tabLabel: "Audit evidence",
  },
  {
    name: "MCP security and conformance",
    text: "Model Context Protocol servers are checked for conformance and unsafe tool descriptions before agents rely on them.",
    detail:
      "Built on the open-source MCP Conformance Scanner from ARC Labs, which you can run today without us.",
    state: "open-source",
    tab: "findings",
    tabLabel: "Security findings",
  },
  {
    name: "Agent observability",
    text: "See what agents attempted, how long each step took, and which outcomes were verified, failed or unknown.",
    detail: "An unverifiable outcome is reported as unverifiable, never as success.",
    state: "in-development",
    tab: "activity",
    tabLabel: "Execution activity",
  },
  {
    name: "Agent governance and policy",
    text: "Write policy once and apply it to agents, tools and arguments, with monitor mode before enforcement.",
    detail: "Policy hits and blocks are counted, so you can tune before you enforce.",
    state: "in-development",
    tab: "policies",
    tabLabel: "Permission policies",
  },
  {
    name: "Infrastructure reliability",
    text: "One inventory of every agent, including the ones vendors switched on inside software you already pay for, and the health of the control plane itself.",
    detail: "Coverage and verification rates by owner, for the people accountable for them.",
    state: "research",
    tab: "health",
    tabLabel: "Operational health",
  },
];

/**
 * The nine lifecycle points, from `agentLifecycle` (lib/ark.ts). ARC Control
 * addresses four of them; the rest is where Services and the Labs scanners
 * come in, which is worth saying rather than implying coverage of all nine.
 */
export const lifecycleSteps = agentLifecycle;

export const lifecycleControlled = ["Authenticate", "Permission", "Verify", "Audit"];

export const controlCtas = {
  primary: { label: "Apply to be a design partner", href: "/contact?type=control" },
  secondary: { label: "Request a demo", href: "/contact?type=control&demo=1" },
  team: { label: "Contact the team", href: "/contact" },
};
