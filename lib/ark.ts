// ============================================================================
// Agent governance — the ARC work for software that acts on its own.
//
// Rule for this file: never describe a capability as further along than it is.
// Every product carries a state, and the copy has to match it. The assessment
// is the only thing here that can be bought, so it is the only thing that
// carries a price.
// ============================================================================

import type { State } from "@/lib/content";

export const ark = {
  positioning: "Know what your agents can reach, change and prove.",
  /** Stated as the thing we do. This says which check we run. */
  principle: "We check the system that was supposed to change.",
  question: "What are your agents allowed to do, and who signed off?",
  explainer:
    "Agent governance from ARC: an inventory of every agent, what it can change, and which actions need a person.",
};

/**
 * The problem statement. A model response succeeding is not the same thing as
 * the work being done, and this is the list of ways that gap shows up.
 */
export const executionGap = {
  headline: "Your agent said it finished. Did it?",
  lead: "A successful model response is not the same thing as a successful business outcome.",
  failures: [
    "An agent can complete a run while the payment failed.",
    "It can report that a record was updated when the destination system never changed.",
    "It can call the correct tool with the wrong authority.",
    "It can finish a workflow while violating the policy that should have governed it.",
  ],
  takeaway: "Execution success is not a verified outcome.",
};

// ---------------------------------------------------------------------------
// The canonical chain.
//
// One diagram, used on the home page, the agents hub and the assessment page.
// Every other chain in the codebase was retired into prose, because a visitor
// who reads two pages should not meet two models of the same process.
//
// `coverage` is what keeps this honest. Drawing nine nodes at equal weight
// would present research as shipped capability, which is the thing the state
// badges exist to prevent.
// ---------------------------------------------------------------------------
export type ChainCoverage = "covered" | "partial" | "research";

export type ChainNode = {
  name: string;
  coverage: ChainCoverage;
  text: string;
};

export const chainCoverageLabel: Record<ChainCoverage, string> = {
  covered: "In the assessment",
  partial: "Partial — named in the report",
  research: "Research — not for sale",
};

export const agentChain: ChainNode[] = [
  {
    name: "Agent",
    coverage: "covered",
    text: "Which agents exist, who turned them on, and which are running without a named owner.",
  },
  {
    name: "Identity",
    coverage: "covered",
    text: "Which credential each one acts under, and whether you can tell two agents apart in a log.",
  },
  {
    name: "Permission",
    coverage: "covered",
    text: "What that identity is allowed to do, and whether it is narrower than the person it works for.",
  },
  {
    name: "Tool / MCP / API",
    coverage: "covered",
    text: "Every tool, MCP server and API the agent can reach, and which of them can change something.",
  },
  {
    name: "Action",
    coverage: "partial",
    text: "What was attempted, reconstructed from the logs you already keep — where you keep them.",
  },
  {
    name: "System change",
    coverage: "research",
    text: "Whether the destination system actually changed. Reading that means a connector per system, which is why it is research rather than a product.",
  },
  {
    name: "Evidence",
    coverage: "research",
    text: "A record of the change that does not come from the agent claiming to have made it.",
  },
  {
    name: "Verified outcome",
    coverage: "research",
    text: "A pass, a fail, or an explicit unknown. Missing evidence is never converted into success.",
  },
];

// ---------------------------------------------------------------------------
// The architecture model.
//
// Five layers rather than a sequence. A2A sits inside Execution alongside
// tool calls, APIs and MCP — it is a surface, not a separate product, and
// nothing here claims an implementation that does not exist.
// ---------------------------------------------------------------------------
export const architectureModel: {
  layer: string;
  text: string;
  items: { name: string; state: State }[];
}[] = [
  {
    layer: "Identity",
    text: "Who is acting, and on whose behalf.",
    items: [
      { name: "Human → Agent", state: "available" },
      { name: "Agent → Tool", state: "available" },
      { name: "Agent → MCP", state: "available" },
      { name: "Agent → Agent", state: "research" },
    ],
  },
  {
    layer: "Authority",
    text: "What that identity may do, and who can stop it.",
    items: [
      { name: "Permissions", state: "available" },
      { name: "Delegation", state: "available" },
      { name: "Approval", state: "available" },
      { name: "Revocation", state: "available" },
    ],
  },
  {
    layer: "Execution",
    text: "How the action actually leaves the agent.",
    items: [
      { name: "Tool calls", state: "available" },
      { name: "APIs", state: "available" },
      { name: "MCP", state: "available" },
      { name: "A2A", state: "research" },
    ],
  },
  {
    layer: "Evidence",
    text: "What is left behind afterwards.",
    items: [
      { name: "Attempt", state: "available" },
      { name: "Action", state: "available" },
      { name: "Destination state", state: "research" },
      { name: "Outcome", state: "research" },
    ],
  },
  {
    layer: "Assurance",
    text: "What the evidence adds up to.",
    items: [
      { name: "Verified", state: "research" },
      { name: "Failed", state: "research" },
      { name: "Unknown", state: "research" },
    ],
  },
];

// ---------------------------------------------------------------------------
// The product journey. Decide, prepare, verify.
// ---------------------------------------------------------------------------
export const productJourney: {
  step: string;
  name: string;
  href: string;
  question: string;
  purpose: string;
  state: State;
  note?: string;
}[] = [
  {
    step: "Decide",
    name: "AI Fit",
    href: "/labs/arc-stack-advisor",
    question: "Should this use AI at all?",
    purpose:
      "Work out whether the workload belongs in AI, in ordinary automation, in plain software, or in a different architecture entirely.",
    state: "labs",
    note: "Free on the web. No account, nothing stored.",
  },
  {
    step: "Prepare",
    name: "Agent Readiness",
    href: "/assessment",
    question: "Are our systems ready for agents?",
    purpose:
      "Assess interfaces, APIs, MCP, identity, authentication, permissions, approval paths, security, reliability, observability and cost.",
    state: "available",
    note: "The engagement you can buy today.",
  },
  {
    step: "Verify",
    name: "Agent Control",
    href: "/agents/control",
    question: "Did the agent actually accomplish what it claimed?",
    purpose:
      "Connect execution evidence, identity, authority and destination-system evidence into a verified outcome.",
    state: "research",
    note: "Research. Not for sale, and there is no waiting list.",
  },
];

// ---------------------------------------------------------------------------
// The deliverable, as an object. The site sells a document, so it shows one.
// This is illustrative data and every surface that renders it says so.
// ---------------------------------------------------------------------------
export type RecordRow = {
  agent: string;
  canChange: string;
  approver: string | null;
  checked: string;
  state: "ok" | "warn" | "bad";
};

export const accessRecordExample: {
  title: string;
  caption: string;
  rows: RecordRow[];
} = {
  title: "Agent Access Record",
  caption:
    "Illustrative. Not a customer record — the real one is built from your systems.",
  rows: [
    {
      agent: "crm-sync",
      canChange: "Opportunity stage, amount",
      approver: "J. Patel",
      checked: "2 days ago",
      state: "ok",
    },
    {
      agent: "invoice-bot",
      canChange: "Create charge, send invoice",
      approver: null,
      checked: "never",
      state: "bad",
    },
    {
      agent: "support-copilot",
      canChange: "Send email as support@",
      approver: "M. Chen",
      checked: "2 days ago",
      state: "ok",
    },
    {
      agent: "deploy-agent",
      canChange: "Production deploy, rollback",
      approver: "R. Osei",
      checked: "31 days ago",
      state: "warn",
    },
    {
      agent: "sheets-helper",
      canChange: "Read finance drive",
      approver: null,
      checked: "never",
      state: "warn",
    },
  ],
};

// ---------------------------------------------------------------------------
// Products.
// ---------------------------------------------------------------------------
export type ArkProduct = {
  slug: string;
  /** Canonical route. Set explicitly so a rename never silently moves a page. */
  href: string;
  name: string;
  navLabel: string;
  tagline: string;
  summary: string;
  state: State;
  /** Only something that can be bought carries a price. */
  price?: {
    amount: string;
    unit: string;
    duration: string;
    includes: string[];
    note: string;
  };
  ctaLabel: string;
  ctaHref: string;
  /** What this is today, stated before anything aspirational. */
  todayLabel: string;
  today: string;
  intro: string[];
  evaluates?: { group: string; items: string[] }[];
  capabilities?: { name: string; text: string }[];
  /** What the product does not do. Non-negotiable on every page. */
  limits: string[];
};

export const assessment: ArkProduct = {
  slug: "assessment",
  href: "/assessment",
  name: "Agent Readiness Assessment",
  navLabel: "Assessment",
  // Deliberately not `ark.positioning`. The company line is broader than any
  // one engagement; a product that borrows it says nothing about itself.
  tagline: "Can our systems safely support agents?",
  summary:
    "An inventory of every agent running against your systems, what each one can change, and which actions should need a person. Two to three weeks, fixed fee.",
  state: "available",
  ctaLabel: "Scope an Agent Readiness Assessment",
  ctaHref: "/contact?topic=assessment",
  todayLabel: "Where this is today",
  today:
    "Available now, run by the senior person on your first call. Two to three weeks against the systems you already operate, using the open scanners in Labs as part of the evidence. The deliverable is a document, not software you have to install. Scope and fee are agreed before the work starts.",
  intro: [
    "Your vendors turned agents on inside tools you already pay for. A CRM assistant, a coding agent, a connected copilot — each one holding the permissions of whoever switched it on, and none of them in a list anyone maintains.",
    "This is the engagement that produces the list. Not a maturity model and not a strategy deck: an inventory of what exists, what it can change, and which actions a person should have to approve before they happen.",
  ],
  evaluates: [
    {
      group: "Inventory",
      items: ["Agents", "Identities", "Credentials", "Tools", "MCP servers", "APIs"],
    },
    {
      group: "Authority",
      items: ["Permissions", "Blast radius", "Approval paths", "Revocation", "Ownership"],
    },
    {
      group: "Evidence",
      items: ["Logging", "Attribution", "Retention", "What an auditor can be shown"],
    },
  ],
  capabilities: [
    {
      name: "The inventory",
      text: "Every agent we can find, including the ones a team switched on without telling anyone.",
    },
    {
      name: "Blast radius",
      text: "Ranked by what each identity could change irreversibly — payments, deletions, outbound mail.",
    },
    {
      name: "Approval gates",
      text: "Which actions should stop and wait for a person, and where that gate has to live to be real.",
    },
    {
      name: "The Agent Access Record",
      text: "The artifact: agent, authority, approver, last checked. Dated and signed.",
    },
    {
      name: "Revocation paths",
      text: "How fast each agent can be switched off, and from how many places.",
    },
    {
      name: "30/60/90 plan",
      text: "What to fix first, with a named owner against each line.",
    },
  ],
  limits: [
    "It is not a penetration test and not a red-team exercise.",
    "It does not certify anything. It tells you what is reachable and what is not governed.",
    "It reads configuration and logs. It does not verify that a change happened in a destination system — that is Agent Control, and it is research.",
    "It is a document, not a running control. Enforcement is your systems' job, and we say where it has to live.",
  ],
};

/**
 * Observability answers "what did the agent attempt". Assurance answers
 * "did the intended outcome occur". These are the worked examples of the gap.
 */
export const assuranceExamples: {
  claim: string;
  executionEvidence: string[];
  assuranceAsks: string[];
}[] = [
  {
    claim: "I issued the refund.",
    executionEvidence: [
      "Payment API called",
      "Request returned successfully",
      "Workflow completed",
    ],
    assuranceAsks: [
      "Does the payment system contain the refund?",
      "Was the correct customer affected?",
      "Was the agent authorized to issue it?",
      "Was approval required first?",
      "What evidence proves the outcome?",
    ],
  },
  {
    claim: "I updated the CRM.",
    executionEvidence: ["CRM API called", "Request succeeded"],
    assuranceAsks: [
      "Does the destination CRM now contain the intended state?",
      "Which record changed, and from what to what?",
      "Was the change made under the right identity?",
    ],
  },
];

/** What a verification would be assembled from, and what it can return. */
export const verificationModel = {
  inputs: [
    { name: "Execution record", text: "What was attempted, through which tools, at what cost." },
    { name: "Authority record", text: "Which identity acted, under which credential." },
    { name: "Policy decision", text: "Which rule applied, and whether a human approved." },
    { name: "Outcome evidence", text: "What the destination system says changed." },
  ],
  results: [
    { name: "Verified", text: "The destination system confirms the intended change." },
    { name: "Failed", text: "The destination system contradicts the agent's claim." },
    { name: "Unknown", text: "No independent evidence exists. This is never reported as success." },
  ],
  rule: "Missing evidence is an unknown, not a pass.",
};

export const agentControl: ArkProduct = {
  slug: "agent-control",
  href: "/agents/control",
  name: "Agent Control",
  navLabel: "Agent Control",
  tagline: "Outcome assurance for production AI agents.",
  summary:
    "Connect what an agent attempted with evidence, collected from the systems that were supposed to change, that it happened.",
  state: "research",
  ctaLabel: "Read the thinking",
  ctaHref: "/agents/control",
  todayLabel: "Where this is today",
  today:
    "Research. It is not a product, it is not in beta, and there is nothing to sign up for. It is not in the site navigation on purpose. We will build it when a design partner is paying for one connector that returns a pass, a fail, or an explicit unknown — and this page will say so on the day that happens.",
  intro: [
    "Seeing a trace tells you what the agent attempted. Assurance asks a different question: did the intended outcome occur?",
    "The honest problem with building it is integration. Verifying an outcome means reading the destination system — your billing, your CRM, your ledger — and that is one connector per system. We are publishing the thinking rather than pretending the connectors exist.",
  ],
  capabilities: [
    {
      name: "Execution record",
      text: "What the agent attempted, which tools it used, and how long each step took.",
    },
    {
      name: "Authority record",
      text: "Which identity acted, under which credential, which policy applied, and whether a human approved.",
    },
    {
      name: "Outcome evidence",
      text: "Independent confirmation from the destination system that the intended change exists.",
    },
    {
      name: "Verification result",
      text: "A pass, a fail, or an explicit unknown. An unverifiable outcome is reported as unverifiable, never as success.",
    },
  ],
  limits: [
    "It is not available for purchase, and there is no waiting list.",
    "It is not a model-evaluation product and does not score answer quality.",
    "It cannot verify an outcome in a system it has no read access to — the evidence has to come from somewhere.",
    "It is not a compliance certification. It would produce evidence; your auditor draws the conclusion.",
  ],
};

export const arkProducts: ArkProduct[] = [assessment, agentControl];

// ---------------------------------------------------------------------------
// The agent operating contract — the framework ARC publishes free.
//
// This is a document schema rather than a process, which is why it stays a
// separate diagram from the chain above.
// ---------------------------------------------------------------------------
/**
 * The six fields, named once. Both the agents hub and the free framework page
 * render from this, so the two cannot drift apart.
 */
export const operatingContractChain = [
  "Goal",
  "Trigger",
  "State",
  "Boundary",
  "Evidence",
  "Owner",
] as const;

export const operatingContract = {
  headline: "Agents need operating contracts.",
  chain: operatingContractChain,
  lead: "An agent responsible for ongoing work needs more than instructions.",
  needs: [
    { name: "A defined objective", text: "What done looks like, in terms someone else could check." },
    { name: "A trigger", text: "What starts the work, and what must be true before it does." },
    { name: "Persistent state", text: "What it is allowed to remember between runs, and for how long." },
    { name: "Enforced authority", text: "What it can reach, written as permissions rather than as guidance in a prompt." },
    { name: "Evidence requirements", text: "What has to be produced to show the work was done." },
    { name: "A human owner", text: "A named person. A team inbox does not count." },
    { name: "Stop conditions", text: "What makes it halt rather than retry." },
    { name: "Recovery behaviour", text: "What happens to work already in flight when it does." },
  ],
};

// ---------------------------------------------------------------------------
// Developer surface. Lower-level work lives here rather than being presented
// as a standalone commercial product.
// ---------------------------------------------------------------------------
export const developerAreas: {
  name: string;
  state: State;
  text: string;
  href: string;
  linkLabel: string;
}[] = [
  {
    name: "Protocols",
    state: "labs",
    text: "Agent-facing interfaces: MCP and the machine-to-machine conventions forming around it. We test against the published specs and publish what breaks.",
    href: "/labs/mcp-conformance-scanner",
    linkLabel: "Check a server",
  },
  {
    name: "Open tools",
    state: "labs",
    text: "Scanners, catalogues and reference implementations from Labs. MIT licensed, no account, most of them store nothing.",
    href: "/labs",
    linkLabel: "Browse the tools",
  },
  {
    name: "Runtime",
    state: "research",
    text: "Where a unit of AI work should execute, decided from capability, privacy, policy, latency and cost rather than from habit. Published thinking, no implementation.",
    href: "/developers#runtime",
    linkLabel: "Read the thinking",
  },
  {
    name: "Agent-to-agent",
    state: "research",
    text: "What governing an agent-to-agent call would require. Nobody we work with is running this yet, so it stays a note rather than a roadmap.",
    href: "/developers#a2a",
    linkLabel: "Read the note",
  },
];
