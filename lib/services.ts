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
  /** Optional shorter meta description where `body` runs past ~155 characters. */
  metaDescription?: string;
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
    metaDescription:
      "We look at the technology you already have, find what is getting in the way, and give you a plan for fixing it in an order you can afford.",
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
    metaDescription:
      "You do not need AI everywhere. We find where it saves time or improves a decision, say plainly where ordinary automation is the better answer.",
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
    metaDescription:
      "From a problem to an architecture to something people use, without building more than the business needs. A narrow first version, shipped.",
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
    metaDescription:
      "Getting an agent to work once is easy. We put the controls, monitoring, evaluation and permissions around it so it can run without a babysitter.",
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
  title: "Make technology work for your business.",
  kicker: "AI · Automation · Cloud · Security · Software",
  lead: "ARC helps growing companies work out what to improve, what to automate and what to build — and then helps get it working.",
  primary: { label: "Tell us what's not working", href: "/contact" },
  secondary: { label: "See how we can help", href: "/services" },
};

/**
 * Pain recognition, before anything about us. A visitor should hit at least
 * one of these and think: that is my week.
 */
export const homeSymptoms = {
  title: "Technology is moving faster. Your business still has to work.",
  items: [
    "You are being pushed to adopt AI and you are not sure where it belongs.",
    "Your systems do not talk to each other.",
    "Your team spends too much time on work that should already be automated.",
    "The data exists, and nobody fully trusts it.",
    "You built an AI prototype and now it has to be reliable enough to use.",
    "Or the way the company uses technology is not keeping up with where the business is going.",
  ],
  close: "That's where we come in.",
};

export const homeClose = {
  title: "Not sure which one you need?",
  lead: "Good. You shouldn't have to diagnose your own technology problem before talking to someone who does this for a living. Tell us what's happening and we'll help work out whether you need a small fix, a focused project, a larger programme — or nothing from us at all.",
  cta: "Talk to ARC",
};
