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

/**
 * The real operator console, captured from a running server and published as
 * static HTML under `public/ark-control/console/`. Came in with the
 * `/ark-control` page from `main`; see components/arc/control/console-showcase.
 *
 * `revision` and `pageCount` match `public/ark-control/console/build.json`,
 * which records the commit each page was rendered from. A test asserts the
 * capture still contains what this section claims it does.
 */
export const consoleShowcase = {
  /** A file in public/, not a route. */
  entry: "/ark-control/console/index.html",
  revision: "648998d",
  pageCount: 123,
  provenance: [
    {
      term: "Real",
      detail:
        "The policy decisions and their rule-by-rule traces, an approval that was cast and consumed, the evidence records, the hash-chained audit log those records verify against, and the nine control assessments evaluated over them.",
    },
    {
      term: "Simulated",
      detail:
        "The connector effects. No money moves and no issue is filed — the same way the shipped demo seed behaves for anyone running it locally.",
    },
    {
      term: "Inert",
      detail:
        "Anything that would write. Approve, reject, suspend and scan are rendered and disabled, each saying what it does in the live console.",
    },
    {
      term: "Not green",
      detail:
        "Three controls report not assessable or attested rather than passing, and that is the product working. A control the platform cannot decide from its own records says so — reporting it green would convert an unexamined risk into a documented assurance.",
    },
  ],
  sections: [
    ["Overview", "What needs a human, ordered by consequence"],
    ["Approvals", "The request, the policy that held it, the authority required"],
    ["Activity", "Every action that reached the gateway, and what governed it"],
    ["Agents", "Who is authorized, and what they have attempted"],
    ["Tools", "What may be asked for, at what risk"],
    ["Policies", "Each policy as a decision ladder"],
    ["Access", "Which policies govern which agent and tool"],
    ["Assurance", "Nine controls, and what each one does not establish"],
    ["Risks", "Inherent, and the residual a named human reviewed"],
    ["Findings", "What failed, against which subject, and how often"],
    ["Security", "Connector posture and an MCP manifest scan"],
    ["Evidence", "One record per attempt, with its integrity digests"],
    ["Audit", "The chain, and what verifying it does not prove"],
    ["Reports", "A snapshot over a window it always states"],
    ["Settings", "What this deployment does, and what it cannot yet prove"],
  ] as const satisfies readonly (readonly [string, string])[],
  caveat:
    "ARC Control is in design-partner development. The console is real and running, and the assurance layer reports honestly on what it cannot establish — including that operator identity is not yet authenticated, which the Settings page states in those words.",
};
