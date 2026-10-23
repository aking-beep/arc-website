// ---------------------------------------------------------------------------
// Solution areas — the enterprise services side of the business.
//
// Reconstructs the Magic Patterns `data/services` module. The prototype had
// eight unnamed areas; these are the six the redesign brief specifies, written
// from the four `serviceAreas` (lib/services.ts) and the eight
// `advisoryEngagements` (lib/content.ts) that already exist.
//
// Each area names the scoped engagements behind it, so a visitor moves from
// "this is my problem" to a page with a real scope and a real length on it.
// None of those pages changed and none of their URLs moved.
// ---------------------------------------------------------------------------

export type Solution = {
  slug: string;
  name: string;
  /** One line, for the nav rail and the card. */
  short: string;
  /** Stated as the buyer's situation, before anything we sell. */
  problem: string;
  approach: string;
  outcomes: string[];
  ideal: string;
  /** Three steps. Longer than three and nobody reads it. */
  process: [string, string, string];
  /** Engagement slugs under /advisory that deliver this. */
  engagements: { slug: string; name: string }[];
  /** Other places on the site that answer part of this. */
  related?: { href: string; label: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "ai-strategy",
    name: "AI Strategy & Readiness",
    short: "Where AI belongs, and what has to be true first.",
    problem:
      "You are being pushed to adopt AI and nobody can say where it helps. Someone has already turned tools on, there are pilots on three credit cards, and none of it ties to a number the business recognises.",
    approach:
      "We score the opportunities against the work your organisation actually does: the workflow, the data behind it, the infrastructure it would run on, the governance it would need and whether anyone owns it. Each opportunity is classified — fix the process first, ordinary automation, AI-assisted, or not yet — and we say plainly which ones are the third category.",
    outcomes: [
      "A ranked list of workflows worth automating, each with the hours and cost behind it",
      "An inventory of the AI tools and agents already running, who switched them on, and what they can reach",
      "Infrastructure and data prerequisites named, with what each one blocks",
      "A 30/60/90-day plan with owners and a human review gate on anything touching judgment",
    ],
    ideal:
      "Leadership teams with pressure to adopt AI and no shortlist. Operators who found six pilots and want one plan.",
    process: [
      "Interviews and a systems walkthrough, not a questionnaire",
      "Scoring against workload, data, economics, architecture and risk",
      "A plan review where we argue the other side of our own recommendation",
    ],
    engagements: [
      { slug: "ai-readiness-audit", name: "AI Readiness Audit" },
      { slug: "integrated-transformation-diagnostic", name: "Integrated Transformation Diagnostic" },
    ],
    related: [
      { href: "/ai-fit", label: "AI Fit — score a use case yourself, free" },
      { href: "/ai-fit-teams", label: "AI Fit Teams — the organisational assessment" },
    ],
  },
  {
    slug: "ai-development",
    name: "AI Development & Integration",
    short: "From a scoped problem to something people use.",
    problem:
      "You know the problem and need someone to scope it for engineering. Or a prototype works and nobody knows how to get it into production without it becoming a platform the business never asked for.",
    approach:
      "We go from problem to architecture to a working first version, deliberately narrow, running against a live workflow with real people on it. The integration and data work it depends on gets done rather than assumed, and what is out of scope is written down so the build does not expand into it.",
    outcomes: [
      "A scoped build: functional requirements, architecture, and what is deliberately excluded",
      "A working first version in production, with people using it",
      "The integration, retrieval and evaluation work the system depends on",
      "A delivery cadence with named owners, so the second version does not need us",
    ],
    ideal:
      "Teams ready to commit build resources once the scope is settled, and product or engineering leads who want a build package rather than a strategy deck.",
    process: [
      "Scope and architecture, with the alternatives recorded",
      "Build against a live workflow, in slices you can stop after",
      "Handover: runbook, evaluation set, and your team on the keyboard",
    ],
    engagements: [
      { slug: "ai-solution-mvp-scope", name: "AI Solution Concept + MVP Scope" },
      { slug: "delivery-program-setup", name: "Delivery Program Setup" },
    ],
    related: [{ href: "/services/build", label: "Build — the fuller picture" }],
  },
  {
    slug: "workflow-automation",
    name: "Enterprise Workflow Automation",
    short: "Reliable automation where the hours actually go.",
    problem:
      "Your team spends hours on work a machine should be doing, your systems do not talk to each other so people move data by hand, and the internal tool everyone depends on is a spreadsheet.",
    approach:
      "We map the workflow as it is really run — including the steps that exist because a system cannot do something — then automate the parts where the hours and the error rate justify it. Most of the value is usually in integration and process design rather than in a model.",
    outcomes: [
      "The workflow documented as it is actually run, including the workarounds",
      "Automation built where the hours and error rate justify it, with the rest left alone and explained",
      "Integrations that remove the manual data movement between systems",
      "Failure behaviour defined: what stops, what retries, who is told",
    ],
    ideal:
      "Operations, finance and support teams carrying known-volume manual work, and anyone whose integration backlog keeps getting deferred.",
    process: [
      "Shadow the work and measure where the hours go",
      "Automate the highest-value steps, narrowly",
      "Instrument it, then hand over the runbook",
    ],
    engagements: [
      { slug: "delivery-program-setup", name: "Delivery Program Setup" },
      { slug: "integrated-transformation-diagnostic", name: "Integrated Transformation Diagnostic" },
    ],
    related: [
      { href: "/labs/arc-workflow-scanner", label: "ARC Workflow Scanner — describe a workflow, free" },
    ],
  },
  {
    slug: "cloud-modernization",
    name: "Cloud & Infrastructure Modernization",
    short: "Fix what is slowing every release down.",
    problem:
      "Releases take longer every quarter and nobody can say why. You have dashboards and leadership does not trust the numbers. The cloud bill grows faster than the business does, and something in the estate is a security problem nobody has priced.",
    approach:
      "We look at the technology you already have, find what is getting in the way, and sequence the fixes in an order you can afford. Most of the value in an estate is in systems that already run the business, so that is where we start rather than with a rewrite.",
    outcomes: [
      "A map of the current state: services, data flows, integrations and who owns each",
      "Findings ranked by business impact, with what remediation costs",
      "A migration or remediation sequence with owners, costed and ordered by what it unblocks",
      "Cost attribution that ties spend to a team or a product rather than to an account",
    ],
    ideal:
      "Teams where the technology is slowing the business down, leaders planning a migration or a rewrite, and anyone who has to defend a modernization budget.",
    process: [
      "Architecture and data review against the published well-architected guidance",
      "Findings ranked by impact, cost and what each one blocks",
      "A sequence with owners, and the one-pager that gets it funded",
    ],
    engagements: [
      { slug: "technical-architecture-review", name: "Technical Architecture Review" },
      { slug: "cloud-devops-readiness", name: "Cloud & DevOps Readiness Review" },
      { slug: "data-health-analytics", name: "Data Health & Analytics Readiness" },
    ],
    related: [
      { href: "/labs/connectivity-scanner", label: "Connectivity Scanner — check an endpoint, free" },
      { href: "/labs/tokenloop", label: "TokenLoop — see agent spend before the invoice" },
    ],
  },
  {
    slug: "ai-governance",
    name: "AI Governance & Security",
    short: "Controls, evidence and oversight for systems that act.",
    problem:
      "An agent works in a demo and you will not let it touch a customer. Your vendors switched on agents inside tools you already pay for. Nobody can list what those agents can reach, and a run reports success without anyone being able to confirm something changed.",
    approach:
      "Getting an agent to work once is easy; trusting it every day inside a business is the hard part. We inventory what is running, rank blast radius, put approval gates on the actions that warrant one, build an evaluation set with thresholds, and arrange for confirmation to come from the system that was supposed to change rather than from the agent's own report.",
    outcomes: [
      "An inventory of every agent and integration, what it can reach and what it can change",
      "Blast radius ranked, with approval gates and named human owners on the actions that warrant them",
      "An evaluation set and thresholds, so a model change becomes a measurable event",
      "Audit evidence a person who was not in the room can read later",
    ],
    ideal:
      "Teams putting automated systems in front of customers, money or regulated data, and anyone whose vendors shipped agent features they did not ask for.",
    process: [
      "Inventory and blast-radius review, including the agents nobody registered",
      "Controls and policy, in monitor mode before enforcement",
      "Evidence and reporting your auditor and your board can both use",
    ],
    engagements: [
      { slug: "security-compliance-posture", name: "Security & Compliance Posture Review" },
      { slug: "ai-readiness-audit", name: "AI Readiness Audit" },
    ],
    related: [
      { href: "/control", label: "ARC Control — the product this work became" },
      { href: "/labs/arc-agent-governance", label: "ARC Agent Governance — review agent access, free" },
      { href: "/playbooks/agent-readiness-scorecard", label: "Agent Readiness Scorecard — 20 questions, free" },
    ],
  },
  {
    slug: "emerging-technology",
    name: "Emerging Technology Prototyping",
    short: "Find out if it works before it becomes a programme.",
    problem:
      "Something new might matter to the business and the only honest answer is that nobody knows yet. Deciding by deck is expensive; so is a nine-month build that proves the idea was wrong in week three.",
    approach:
      "We build the smallest thing that answers the question, against real data and real constraints, and we agree up front what result would make you stop. This is the same practice that produces the ARC Labs tools, which is why the prototypes tend to end up with something usable in them.",
    outcomes: [
      "A working prototype against real data, not a mock",
      "The result written down, including when the result is 'do not build this'",
      "Cost, latency and risk measured rather than estimated",
      "A go or no-go recommendation with the evidence attached",
    ],
    ideal:
      "Teams evaluating a new protocol, model capability or interaction pattern who want evidence inside a quarter, and innovation functions tired of pilots that never conclude.",
    process: [
      "Agree the question and the result that would stop the work",
      "Build the narrowest prototype that answers it",
      "Report what happened, including the uncomfortable version",
    ],
    engagements: [{ slug: "ai-solution-mvp-scope", name: "AI Solution Concept + MVP Scope" }],
    related: [{ href: "/labs", label: "ARC Labs — what this practice has published" }],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/**
 * How engagements get sized. Reflects `howWeEngage` and `retainers`
 * (lib/content.ts). No rate card, for the reason the last row gives.
 */
export const engagementShapes: { name: string; length: string; text: string }[] = [
  {
    name: "Diagnostic",
    length: "2–7 weeks",
    text: "A scoped review of one area. You leave with findings, owners and a sequence, and you can stop there. Most engagements start here because it is the cheapest way to find out whether the bigger work is worth doing.",
  },
  {
    name: "Working session",
    length: "Half a day to 2 days",
    text: "For when the problem is getting leadership and operators to agree rather than a lack of analysis. A facilitated room with a decision at the end instead of a six-week study.",
  },
  {
    name: "Delivery",
    length: "6–16 weeks",
    text: "If the plan still needs hands on it, we stay and implement. Sized from the problem rather than from a bench, in slices you can stop after.",
  },
  {
    name: "Fractional leadership",
    length: "Monthly, rolling",
    text: "A senior owner for AI, delivery or platform work, part-time, when the role is real but not yet a hire. Cancellable monthly.",
  },
  {
    name: "Nothing",
    length: "—",
    text: "If the answer is that you do not need us, that is the recommendation you get. Pricing is scoped after the first conversation and there is no published rate card, because the right size depends entirely on what you already have.",
  },
];
