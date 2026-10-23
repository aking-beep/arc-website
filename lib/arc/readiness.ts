// ---------------------------------------------------------------------------
// The six-question readiness check on /services.
//
// Reconstructs the Magic Patterns `data/readiness` module. Deliberately
// different from the 20-question Agent Readiness Scorecard at
// /playbooks/agent-readiness-scorecard: that one asks whether agents can
// operate your systems, this one asks whether the organisation is ready to
// put AI anywhere. Each dimension maps to one of the six solution areas, and
// the band language follows `scorecardBands` (lib/learn.ts).
//
// Scored in the browser. Nothing is stored or sent.
// ---------------------------------------------------------------------------

export type ReadinessQuestion = {
  id: string;
  dimension: string;
  text: string;
  /** Four options, scored 0–3 by index. Worst first. */
  options: [string, string, string, string];
  /** Shown when this dimension is one of the two weakest. */
  advice: string;
  /** Slug from lib/arc/solutions.ts. */
  solution: string;
};

export const questions: ReadinessQuestion[] = [
  {
    id: "q1",
    dimension: "Strategy",
    text: "Can you name the business number a successful AI project would move?",
    options: [
      "No. The goal is to be using AI.",
      "Roughly — a theme like efficiency, but nothing measured.",
      "Yes, for one or two initiatives.",
      "Yes, with a baseline, an owner and a review date for each.",
    ],
    advice:
      "Start by scoring the opportunities against a number rather than against enthusiasm. Without a baseline you cannot tell a working system from a popular one.",
    solution: "ai-strategy",
  },
  {
    id: "q2",
    dimension: "Data",
    text: "If a system needed your operational data tomorrow, could it get it?",
    options: [
      "It lives in spreadsheets and people's heads.",
      "In systems, but access takes weeks and quality is unknown.",
      "Accessible through APIs, with known quality problems.",
      "Accessible, documented, with owners and quality monitored.",
    ],
    advice:
      "Fix access and quality before building on top of it. Data work is where most AI timelines actually go, and it is cheaper to find that out now.",
    solution: "cloud-modernization",
  },
  {
    id: "q3",
    dimension: "Infrastructure",
    text: "How long does it take to get a change from merged to running in production?",
    options: [
      "Weeks, and it needs a change-control meeting.",
      "Days, with manual steps someone has to remember.",
      "Hours, mostly automated.",
      "Minutes, automated, with the rollback tested.",
    ],
    advice:
      "A delivery pipeline this slow will set the pace of every AI project you start. Modernization here pays for itself across all of them.",
    solution: "cloud-modernization",
  },
  {
    id: "q4",
    dimension: "Workflow",
    text: "Is the work you would automate actually documented anywhere?",
    options: [
      "No. It differs by person.",
      "A wiki page, last updated some time ago.",
      "Documented for the main paths, not the exceptions.",
      "Documented including exceptions, with volumes measured.",
    ],
    advice:
      "Map the workflow as it is really run, exceptions included, before automating it. Automating the documented version of a process nobody follows is how pilots die.",
    solution: "workflow-automation",
  },
  {
    id: "q5",
    dimension: "Governance",
    text: "Can you list every AI tool and agent already running in the business, and what each can reach?",
    options: [
      "No, and we suspect there are several.",
      "The ones we bought. Not the ones vendors switched on.",
      "Most of them, with permissions reviewed annually.",
      "All of them, each with an identity, an owner and scoped access.",
    ],
    advice:
      "Inventory first, then narrow authority. The blast radius of an agent is the scope of its credential at the moment something goes wrong.",
    solution: "ai-governance",
  },
  {
    id: "q6",
    dimension: "Delivery",
    text: "When a technology initiative ships, who owns it afterwards?",
    options: [
      "It is unclear, which is why some of them stalled.",
      "A team, without dedicated capacity for it.",
      "A named owner, with capacity for the main systems.",
      "A named owner with capacity, a budget and success measures.",
    ],
    advice:
      "Name owners with real capacity before the build, not after. A system nobody owns is not a system, however well it was built.",
    solution: "ai-development",
  },
];

export const bands = [
  {
    min: 0,
    max: 39,
    label: "Not ready",
    text: "An AI project started here would be carried by individual effort rather than by anything repeatable. The gaps are structural rather than cosmetic: start with data access and ownership, because everything else depends on them.",
  },
  {
    min: 40,
    max: 64,
    label: "Early",
    text: "Enough capability to start, not enough to know whether it worked. This is the most common band and the easiest one in which to ship something that quietly fails — the usual missing pieces are measurement and governance.",
  },
  {
    min: 65,
    max: 84,
    label: "Workable",
    text: "You could put an AI system into production here and defend the decision. The remaining gaps are usually verification and ownership: you can see what was attempted, and cannot always confirm what changed.",
  },
  {
    min: 85,
    max: 100,
    label: "Ready",
    text: "Unusually well prepared. At this level the useful work is narrowing authority and proving outcomes independently, rather than adding more capability.",
  },
];

export function readinessLevel(pct: number) {
  return bands.find((b) => pct >= b.min && pct <= b.max) ?? bands[0];
}

/** Highest score available per question. Options are scored by index. */
export const maxScorePerQuestion = 3;
