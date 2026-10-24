// ============================================================================
// Agent infrastructure — the product work ARC publishes under its own name.
//
// Rule for this file: never describe a capability as further along than it is.
// Every product carries a maturity, and the copy has to match it. If Agent
// Control is not shipping, the page says so in the first screen.
// ============================================================================

import type { Maturity } from "@/lib/content";

export const ark = {
  positioning: "Infrastructure for reliable agent action.",
  /**
   * Stated as the thing we do. This says which check we run.
   */
  principle: "We check the system that was supposed to change.",
  loop: ["Measure", "Verify", "Govern", "Optimize"],
  question: "How should software that acts on its own be checked?",
  explainer:
    "Agent infrastructure from ARC: readiness, outcome checks, and the assessments that decide where AI belongs.",
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
  chain: [
    "Agent request",
    "Model decision",
    "Tool action",
    "System change",
    "Outcome evidence",
    "Verified outcome",
  ],
  takeaway: "Execution success is not a verified outcome.",
};

/**
 * The operating lifecycle this work is built around. This is the architecture
 * claim: agents need infrastructure at each of these points, not just a model.
 */
export const agentLifecycle: { name: string; text: string }[] = [
  {
    name: "Discover",
    text: "Find out which capabilities, tools and resources exist, and which ones apply to the task in hand.",
  },
  {
    name: "Authenticate",
    text: "Prove which agent is acting, on whose behalf, and under which credential.",
  },
  {
    name: "Understand",
    text: "Read schemas, contracts and side effects well enough to call a tool correctly the first time.",
  },
  {
    name: "Permission",
    text: "Resolve what this identity is allowed to do right now, including the actions that need a human.",
  },
  {
    name: "Execute",
    text: "Run the work in an environment that fits its privacy, latency, policy and cost constraints.",
  },
  {
    name: "Verify",
    text: "Collect evidence from the systems that were supposed to change, not from the agent's own report.",
  },
  {
    name: "Measure",
    text: "Attribute cost, latency and success to a unit of work a business can recognise.",
  },
  {
    name: "Remember",
    text: "Persist state so the next run starts from what happened, not from an empty context.",
  },
  {
    name: "Audit",
    text: "Keep a record someone can defend later: what was attempted, under what authority, with what result.",
  },
];

// ---------------------------------------------------------------------------
// Products.
// ---------------------------------------------------------------------------
export type ArkProduct = {
  slug: string;
  name: string;
  /** Short label for nav menus. */
  navLabel: string;
  tagline: string;
  /** One sentence for cards and the nav dropdown. */
  summary: string;
  maturity: Maturity;
  flagship?: boolean;
  ctaLabel: string;
  /** Where the primary CTA goes. External when the tool already exists. */
  ctaHref: string;
  /** What this is today, stated before anything aspirational. */
  todayLabel: string;
  today: string;
  /** Headline sections for the product page. */
  intro: string[];
  evaluates?: { group: string; items: string[] }[];
  capabilities?: { name: string; text: string }[];
  /** What the product does not do. Non-negotiable on every page. */
  limits: string[];
};

export const arkProducts: ArkProduct[] = [
  {
    slug: "ark-control",
    // Renamed to ARC Control in the Magic Patterns redesign and moved to
    // /control. The slug stays so the sitemap, redirects and anything keyed
    // on it keep working.
    name: "ARC Control",
    navLabel: "ARC Control",
    tagline: "Outcome assurance for production AI agents.",
    summary:
      "Understand what agents attempted, what authority they used, and whether the intended outcome occurred.",
    maturity: "design-partners",
    flagship: true,
    ctaLabel: "Talk to us about design partnership",
    ctaHref: "/contact?topic=ark-control",
    todayLabel: "Where this is today",
    today:
      "ARC Control is in design-partner development. It is not a product you can buy or sign up for yet. We are working through the verification model with a small number of teams running agents against production systems. There is no pricing page because there is nothing to price yet.",
    intro: [
      "Seeing a trace tells you what the agent attempted. Assurance asks a different question: did the intended outcome occur?",
      "ARC Control is being built to connect execution evidence — the trace, the tool call, the identity, the policy decision — with outcome evidence collected from the systems that were supposed to change.",
    ],
    capabilities: [
      {
        name: "Execution record",
        text: "What the agent attempted, which tools and protocols it used, and how long each step took.",
      },
      {
        name: "Authority record",
        text: "Which identity acted, which credential it used, which policy applied, and whether a human approved.",
      },
      {
        name: "Outcome evidence",
        text: "Independent confirmation from the destination system that the intended change exists.",
      },
      {
        name: "Verification result",
        text: "A pass, a fail, or an explicit unknown. An unverifiable outcome is reported as unverifiable, never as success.",
      },
      {
        name: "Cost attribution",
        text: "Spend tied to a unit of completed work rather than to tokens, so the number means something to a budget holder.",
      },
      {
        name: "Audit trail",
        text: "A record built to be read later by someone who was not in the room when it ran.",
      },
    ],
    limits: [
      "It is not available for purchase. Design-partner conversations only.",
      "It is not a model-evaluation product and does not score answer quality.",
      "It cannot verify an outcome in a system it has no read access to — the evidence has to come from somewhere.",
      "It is not a compliance certification. It produces the evidence; your auditor draws the conclusion.",
    ],
  },
  {
    slug: "agent-readiness",
    name: "Agent Readiness",
    navLabel: "Agent Readiness",
    tagline: "Make your systems usable by agents.",
    summary:
      "Evaluate whether agents can safely and reliably interact with your applications, APIs, tools and workflows.",
    maturity: "available",
    ctaLabel: "Run the readiness scorecard",
    ctaHref: "/playbooks/agent-readiness-scorecard",
    todayLabel: "Where this is today",
    today:
      "Available in two forms. The scorecard is free and takes a few minutes. The full assessment is a two-to-three week engagement run by ARC against the systems you already operate, and it uses the open scanners in Labs as part of the evidence.",
    intro: [
      "Most systems were designed for humans clicking through a screen. Agents arrive through a different door: they discover capabilities, read schemas, authenticate as themselves and act without a person watching each step.",
      "Agent readiness is the question of whether your systems can survive that. Not whether an agent can be made to work once in a demo, but whether it can act correctly, within its authority, and leave a record.",
    ],
    evaluates: [
      {
        group: "Interface",
        items: ["Discovery", "APIs", "MCP and agent protocols", "Schemas", "Tool interfaces"],
      },
      {
        group: "Authority",
        items: ["Authentication", "Identity", "Permissions", "Approval paths", "Revocation"],
      },
      {
        group: "Operations",
        items: ["Security", "Reliability", "Observability", "Cost", "Failure behaviour"],
      },
    ],
    limits: [
      "It is not a penetration test and not a red-team exercise.",
      "It does not certify anything. It tells you what is ready and what is not.",
      "The free scorecard is self-reported, so it is a starting point rather than evidence.",
    ],
  },
  {
    slug: "ai-fit",
    name: "AI Fit",
    navLabel: "AI Fit",
    tagline: "Determine where AI belongs before you build it.",
    summary:
      "Evaluate the problem, workload, economics, architecture and risks before committing engineering resources.",
    maturity: "available",
    ctaLabel: "Open AI Fit",
    ctaHref: "https://arc-stack-advisor.vercel.app",
    todayLabel: "Where this is today",
    today:
      "Available free on the web with no account and nothing stored. Deterministic rules match your description to a published catalogue of architecture shapes. A model never produces the recommendation or the score.",
    intro: [
      "The most expensive AI decision is the one nobody scored. A team picks an agent because agents are what people are building, and discovers nine months later that the answer was a database lookup with a good interface.",
      "AI Fit takes a use case, the data behind it, the budget and the constraints, and returns a decision you can defend: the recommended shape, what was ruled out and why, the cost drivers that move, and a brief you can hand to a board.",
    ],
    capabilities: [
      {
        name: "Recommended shape",
        text: "An architecture class. No vendor name, nothing you get locked into.",
      },
      {
        name: "Ruled-out alternatives",
        text: "What was considered and rejected, with the reason attached to each one.",
      },
      {
        name: "Named cost drivers",
        text: "What will drive spend. Never an invented price.",
      },
      {
        name: "Open questions",
        text: "The things the tool cannot decide for you, listed rather than glossed over.",
      },
    ],
    limits: [
      "It is deliberately not a vendor recommendation engine.",
      "It will not invent pricing it cannot source.",
      "It answers the architecture question. The organisational one is AI Fit Teams.",
    ],
  },
  {
    slug: "ai-fit-teams",
    name: "AI Fit Teams",
    navLabel: "AI Fit Teams",
    tagline: "Prepare the organization around the technology.",
    summary:
      "Understand AI readiness across teams, workflows, capabilities, governance and adoption.",
    maturity: "available",
    ctaLabel: "Start a team assessment",
    ctaHref: "/contact?topic=ai-fit-teams",
    todayLabel: "Where this is today",
    today:
      "Available as a three-to-four week assessment run by ARC. It is the organisational counterpart to AI Fit: the same scoring discipline, applied to the teams, workflows and habits that decide whether anything ships.",
    intro: [
      "Technology readiness and organisational readiness fail differently. A sound architecture still dies if nobody owns the workflow, the data access takes four months, or the people expected to run it were never asked.",
      "AI Fit Teams scores four dimensions against the work your organisation does: what it can do today, what it is trying to achieve, whether the teams can support it, and the habits that will carry or kill the change.",
    ],
    capabilities: [
      {
        name: "Readiness scorecard",
        text: "Capability, intent, teams and habits, each scored with evidence rather than opinion.",
      },
      {
        name: "Shadow-AI inventory",
        text: "Which tools and agents are already running, who switched them on, and what they can reach.",
      },
      {
        name: "Classified backlog",
        text: "Ship now, fix the prerequisite first, or defer — with the prerequisite named.",
      },
      {
        name: "30/60/90 roadmap",
        text: "Named owners and success measures, including the human-review gates.",
      },
    ],
    limits: [
      "It is an assessment. Running the change afterwards is separate work.",
      "It will tell you to defer work when that is the answer.",
    ],
  },
];

export function getArkProduct(slug: string) {
  return arkProducts.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// The agent operating contract — the framework ARC publishes free.
// ---------------------------------------------------------------------------
export const operatingContract = {
  headline: "Agents need operating contracts.",
  chain: ["Goal", "Trigger", "State", "Boundary", "Evidence", "Owner"],
  architecture: ["Scope", "Identity", "Access", "Action", "Stop"],
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
  maturity: Maturity;
  text: string;
  href: string;
  linkLabel: string;
}[] = [
  {
    name: "Runtime",
    maturity: "research",
    text: "Where a unit of AI work should execute, decided from capability, privacy, policy, latency and cost rather than from habit. Local, edge and cloud are a routing decision.",
    href: "/developers#runtime",
    linkLabel: "Read the thinking",
  },
  {
    name: "Protocols",
    maturity: "open-source",
    text: "Agent-facing interfaces: MCP, agent-to-agent patterns, and the machine-to-machine conventions forming around them. We test against the published specs and publish what breaks.",
    href: "/labs/mcp-conformance-scanner",
    linkLabel: "Check a server",
  },
  {
    name: "Open tools",
    maturity: "open-source",
    text: "Scanners, catalogues and reference implementations from Labs. MIT licensed, no account, most of them store nothing.",
    href: "/labs",
    linkLabel: "Browse the tools",
  },
  {
    name: "Documentation",
    maturity: "open-source",
    text: "Architecture notes, schemas and implementation guides. Each tool documents itself on its own deployment.",
    href: "/research",
    linkLabel: "Read the research",
  },
];
