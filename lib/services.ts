// ---------------------------------------------------------------------------
// The four things ARC does, named the way a buyer would describe their own
// situation.
//
// This file replaced a nine-item service grid. The grid was accurate and
// commercially weak: it asked a visitor to diagnose their own problem and map
// it onto our discipline names before they could tell whether to call us.
//
// Everything here is held to docs/WRITING.md. The short rule: name the
// situation before the technology, and show evidence instead of claiming
// credibility.
// ---------------------------------------------------------------------------

import type { IconName } from "@/components/icon";

export type ServiceArea = {
  slug: "modernize" | "automate" | "build" | "operate";
  /** The verb used in navigation, where there is room for one word. */
  verb: string;
  /** The homepage heading. A sentence a buyer could say. */
  heading: string;
  /** One line under the heading, for nav menus and cards. */
  summary: string;
  icon: IconName;
  /**
   * The symptoms. A visitor should find themselves in this list before we
   * describe anything we sell.
   */
  symptoms: string[];
  /** Two or three sentences. What we do about it. */
  body: string;
  /** What arrives, in nouns. */
  youGet: string[];
  /** Named so somebody can tell whether this is their situation. */
  whoFor: string;
  /** Said plainly, because disqualifying people early is cheaper for both. */
  notFor: string;
  /** Slugs from advisoryEngagements that belong to this area. */
  engagements: string[];
  linkLabel: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "modernize",
    verb: "Modernize",
    heading: "Fix what isn't working.",
    summary: "Cloud, architecture, data, security and delivery.",
    icon: "Layers",
    symptoms: [
      "Releases take longer every quarter and nobody can say why",
      "Your systems do not talk to each other, so people move data by hand",
      "You have dashboards, and leadership does not trust the numbers",
      "Something in the estate is a security problem nobody has priced",
      "The cloud bill grows faster than the business does",
    ],
    body: "We look at the technology you already have, find what is getting in the way, and give you a plan for fixing it in an order you can afford. Most of the value in a technology estate is in systems that already run the business, so that is where we start.",
    youGet: [
      "A map of the current state: services, data flows, integrations and who owns each",
      "A findings list ranked by business impact and what remediation costs",
      "A sequence of fixes you can start on Monday, with owners against each",
      "A one-page summary for the board or the investor conversation",
    ],
    whoFor:
      "Teams where the technology is slowing the business down, leaders planning a rewrite or a migration, and anyone who has to defend a modernization budget.",
    notFor:
      "Line-by-line code review for a compliance sign-off, or a team to take over IT next week.",
    engagements: [
      "technical-architecture-review",
      "cloud-devops-readiness",
      "data-health-analytics",
      "security-compliance-posture",
      "integrated-transformation-diagnostic",
    ],
    linkLabel: "Explore technology modernization",
  },
  {
    slug: "automate",
    verb: "Automate",
    heading: "Put AI and automation to work.",
    summary: "Where it saves time, and where it does not belong.",
    icon: "Sparkles",
    symptoms: [
      "You are being pushed to adopt AI and nobody can say where it helps",
      "Your team spends hours on work a machine should be doing",
      "Someone already turned on AI tools and you are not sure what they can reach",
      "You tried a pilot, it demoed well, and it never reached anyone",
      "You are paying for AI features you cannot tie to a number",
    ],
    body: "You probably do not need AI everywhere. You need it where it saves time, improves a decision, or makes something possible that was not. We find those places, say plainly which ones are ordinary automation instead, and help turn the rest into working systems.",
    youGet: [
      "A list of the workflows worth automating, each with the hours and cost behind it",
      "Each opportunity classified: fix the process first, plain automation, AI-assisted, or not yet",
      "An inventory of the AI tools already running in your business and what they can reach",
      "A 30/60/90-day plan with owners, and the human review gate on anything touching judgment",
    ],
    whoFor:
      "Leadership teams with pressure to adopt AI and no shortlist. Operators who found six pilots on three credit cards and want one plan.",
    notFor:
      "Teams who already have a scoped build and need hands to implement it. Start at Build instead.",
    engagements: ["ai-readiness-audit", "ai-solution-mvp-scope"],
    linkLabel: "Explore AI and automation",
  },
  {
    slug: "build",
    verb: "Build",
    heading: "Build what you actually need.",
    summary: "Products, applications, integrations and workflows.",
    icon: "Boxes",
    symptoms: [
      "You know the problem and need someone to scope it for engineering",
      "The internal tool everyone depends on is a spreadsheet",
      "Two systems need to talk and the integration keeps getting deferred",
      "A prototype works and nobody knows how to get it into production",
      "Projects keep expanding past what the business asked for",
    ],
    body: "We help you go from a problem to an architecture to something people use, without building more than the business needs. That usually means shipping a narrow first version against a live workflow rather than a platform nobody has used yet.",
    youGet: [
      "A scoped build: functional requirements, architecture and what is deliberately out",
      "A working first version running against a live workflow, with people on it",
      "The integration and data work it depends on, done rather than assumed",
      "A delivery cadence with named owners, so the second version does not need us",
    ],
    whoFor:
      "Teams ready to commit build resources once the scope is settled. Product and engineering leads who want a build package rather than a strategy deck.",
    notFor:
      "Discovery that has not happened yet. If the problem is not named, scoping it first will save you the build.",
    engagements: ["ai-solution-mvp-scope", "delivery-program-setup"],
    linkLabel: "Explore product and engineering",
  },
  {
    slug: "operate",
    verb: "Operate",
    heading: "Make intelligent systems reliable.",
    summary: "Governance, observability, controls and evaluation.",
    icon: "ShieldCheck",
    symptoms: [
      "An agent works in a demo and you will not let it touch a customer",
      "Your vendors switched on AI agents inside tools you already pay for",
      "Nobody can list what your agents can reach or what they can change",
      "A run reports success and you cannot confirm anything changed",
      "Spend moves with usage and the invoice is the first time you see it",
    ],
    body: "Getting an agent to work once is easy. Trusting it to work every day inside a business is the hard part. We put the controls, monitoring, evaluation and permissions around automated systems so they can be used without someone watching every run.",
    youGet: [
      "An inventory of every agent and integration, what it can reach, and what it can change",
      "Blast radius ranked, with approval gates on the actions that warrant one",
      "An evaluation set and thresholds, so a change to the model is a measurable event",
      "Confirmation from the system that was supposed to change, rather than a run that reports success",
    ],
    whoFor:
      "Teams putting automated systems in front of customers, money or regulated data. Anyone whose vendors shipped agent features they did not ask for.",
    notFor:
      "A research sandbox where autonomous tool use is the point. These controls exist for systems with consequences.",
    engagements: ["security-compliance-posture", "delivery-program-setup"],
    linkLabel: "Explore agent infrastructure",
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

// ---------------------------------------------------------------------------
// The homepage.
//
// Order matters more than wording here: what is this, is it for me, do I want
// the outcome, why this company, what is the next step. The old homepage
// opened on our operating philosophy, which is the fourth question.
// ---------------------------------------------------------------------------

export const homeHero = {
  title: "What are your agents allowed to do, and who signed off?",
  kicker: "Agent governance",
  lead: "Your vendors turned agents on inside tools you already pay for. Each one holds the permissions of whoever switched it on, and none of them is in a list anyone maintains. ARC writes that list, ranks what each agent could break, and says which actions should stop and wait for a person.",
  primary: { label: "Run the free scan", href: "/labs/arc-agent-governance" },
  secondary: { label: "See the assessment — $15,000", href: "/assessment" },
  note: "For the person who owns security, IT or the system of record at a 50–500 person company.",
};

/**
 * Pain recognition, before anything about us. These are the Operate symptoms,
 * which were the sharpest copy on the old site and were sitting in the fourth
 * slot of a dropdown.
 */
export const homeSymptoms = {
  title: "Agents are already running against your systems.",
  items: [
    "Nobody can list what your agents can reach or what they can change.",
    "Your vendors switched on agent features inside tools you already pay for.",
    "A run reports success and you cannot confirm anything actually changed.",
    "An agent works in a demo and you will not let it near a customer.",
    "Someone has asked what the agents can do, and the honest answer is a page in Notion.",
  ],
  close: "That list is the thing we produce.",
};

export const homeWhy = {
  title: "Deterministic, quoted, and limited on purpose.",
  lead: "Three things that are unusual enough to be worth stating, because each one is checkable rather than claimed.",
  items: [
    {
      name: "Rules, not a model",
      text: "Published rules produce every finding and every score. A model never generates a number, so the same input always gives the same report.",
    },
    {
      name: "Your own words",
      text: "Each finding quotes the sentence that triggered it. You can disagree with a rule and see exactly which one to argue with.",
    },
    {
      name: "Limits on the page",
      text: "Every page says what the thing is not, and what state it is in. Two of the nine links in the chain are research, and we mark them that way.",
    },
  ],
};

/** The ladder, with prices visible. */
export const homeLadder = [
  {
    name: "Agent access scan",
    price: "Free",
    text: "Describe your agents, tools and permissions. Get a graded report with every finding quoting your own words. Nothing is stored.",
    href: "/labs/arc-agent-governance",
    linkLabel: "Run the scan",
  },
  {
    name: "Agent Access Assessment",
    price: "$15,000",
    text: "Two to three weeks against your own systems. The inventory, the blast-radius ranking, the approval gates, and the Agent Access Record.",
    href: "/assessment",
    linkLabel: "See what is in it",
  },
  {
    name: "Everything else",
    price: "Scoped",
    text: "Cloud, data, security, delivery and the AI readiness work. Still here, still sold, and no longer the first thing on this page.",
    href: "/consulting",
    linkLabel: "See the consulting work",
  },
];

export const homeClose = {
  title: "Not sure whether this is your problem?",
  lead: "Run the scan. It is free, it runs in your browser, and it will tell you in a few minutes whether there is anything here worth paying for.",
  cta: "Run the free scan",
};
