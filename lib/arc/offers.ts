// ---------------------------------------------------------------------------
// The published engagement ladder.
//
// WHY THIS EXISTS
//
// Eleven competing AI studios were read on 4 November 2026 (see
// docs/STUDIO-POSITIONING-2026-11.md). All eleven publish a price and a
// timeline in days. ARC published neither, and said so deliberately:
// "there is no published rate card, because the right size depends entirely
// on what you already have."
//
// That reasoning is sound for a 5,000-person client and wrong for the market
// ARC says it serves. A 40-person firm comparing three studios will discard
// the one that cannot tell it what anything costs, and it will never reach
// the conversation where the sizing argument could be made.
//
// PRICES HERE ARE DRAFTS.
//
// They are benchmarked against the eleven studios in that document, placed
// above the ones aiming at 3-30 person service businesses and below the
// generalists charging $18K-$75K. They are not ARC's numbers: nothing in the
// research knows ARC's cost base or capacity. `pricingApproved` stays false
// until the person who carries the revenue sets them, and the tests assert
// every rung still has a price and a timeline so this cannot half-ship.
//
// Naming follows docs/WRITING.md: the buyer's situation leads, and the
// contract name sits behind it.
// ---------------------------------------------------------------------------

/**
 * NOT PUBLISHED. There is no /pricing route: it was taken down on
 * 5 November 2026 because these figures are benchmarked from competitors and
 * were never ARC's own. The site must not carry a price ARC has not agreed
 * to, and /products is the only pricing surface, with figures read from the
 * app's own plan config.
 *
 * The ladder, the stop points and the commitments are kept because the
 * research behind them stands and the route can come back in one commit once
 * the numbers are set. Setting them means editing the `price` fields and
 * flipping this flag; a test holds it false until someone does.
 *
 * Flips to true when the prices below have been set by ARC rather than
 * benchmarked by research. Until then the ladder renders with a banner
 * saying the figures are indicative, because publishing a number ARC has
 * not agreed to is worse than publishing none.
 */
export const pricingApproved = false;

export type Offer = {
  slug: string;
  /** The situation the buyer is in, in their words. Leads on the page. */
  situation: string;
  /** The contract name. Secondary. */
  name: string;
  /** Draft until `pricingApproved`. */
  price: string;
  /** In business days or weeks, never "2-7 weeks". */
  timeline: string;
  summary: string;
  includes: string[];
  /** What a buyer can do after this rung without buying the next one. */
  stopPoint: string;
  /** Set where a rung answers a documented failure from the research. */
  answers?: string;
};

export const offerLadder: Offer[] = [
  {
    slug: "diagnostic",
    situation: "You have six ideas and no way to tell which one pays.",
    name: "Automation Diagnostic",
    price: "$2,500",
    timeline: "5 business days",
    summary:
      "We walk the work with the people who do it, cost the time each step takes, and come back with a ranked list. Every item is classified as fix the process first, ordinary automation, AI-assisted, or not yet.",
    includes: [
      "A systems walkthrough with the people doing the work, not a questionnaire",
      "The hours and cost behind each candidate, so the ranking has a number under it",
      "An inventory of the AI tools already switched on in your company, who turned them on, and what they can reach",
      "A written boundary for the first build: what it touches and what it never touches",
    ],
    stopPoint:
      "The plan is yours whether or not you build with us, and the fee comes off the first build if you start one within 30 days.",
    answers:
      "70% of failed agency engagements had no measurable target at the start.",
  },
  {
    slug: "single-automation",
    situation: "One job is eating your week and it is the same job every week.",
    name: "Single Automation",
    price: "$6,500",
    timeline: "10 business days",
    summary:
      "One workflow, built against your own data, running in your own accounts, with a person approving anything that carries risk.",
    includes: [
      "Built and tested against your historical cases before it goes live, rather than against sample data",
      "Up to two integrations with the tools you already run",
      "A human approval step wherever the cost of being wrong is higher than the cost of a glance",
      "Code in your repository and credentials in your accounts from day one",
      "A written list of what it will refuse to do",
      "Three weeks of tuning against live use after launch",
    ],
    stopPoint:
      "You own the code and the infrastructure. If you never speak to us again it keeps running.",
    answers:
      "The gap between a demo and production is where most of these projects die; 30% of interactions break on first contact with live customers.",
  },
  {
    slug: "connected-system",
    situation:
      "The work crosses four tools and it breaks in the gaps between them.",
    name: "Connected System",
    price: "From $18,000",
    timeline: "4 to 6 weeks",
    summary:
      "Several steps joined into one process that holds its state, retries when a call fails, and queues the exceptions somewhere a person reads.",
    includes: [
      "Everything in a Single Automation, across the whole process",
      "State held between steps, so a half-finished run resumes instead of vanishing",
      "Retries with backoff, and an alert channel that reaches a person when a step fails at 02:00",
      "An exception queue with a named owner, because untriaged exceptions are how trust collapses",
      "An evaluation harness, so you can tell whether it is getting better or worse",
      "Training for the team who will run it, and a written runbook",
    ],
    stopPoint:
      "Shipped, documented and handed over. The care plan below is optional and cancellable.",
    answers:
      "No-code tools model work as stateless trigger-action chains; a process needing approval, retries or memory either gets a brittle workaround or needs designing for state from the start.",
  },
  {
    slug: "outcome-assurance",
    situation: "It shipped months ago and nobody is watching it.",
    name: "Outcome Assurance",
    price: "$1,200 / month",
    timeline: "Monthly, cancel any month",
    summary:
      "We reconcile what your automations reported against what changed in the systems they touched, and send you the evidence. When the two disagree you hear it from us first.",
    includes: [
      "Monthly reconciliation of claimed work against the state of the systems underneath",
      "Drift watch on model behaviour and on the shape of your incoming data",
      "A named owner at ARC whose job is noticing, and a weekly check that each automation ran and its output was sane",
      "The exception queue triaged, with anything needing your decision escalated",
      "An evidence pack you can hand to a customer running a security review",
      "Fixes and tuning as your business changes",
    ],
    stopPoint:
      "Cancel any month and keep everything, including the monitoring configuration.",
    answers:
      "60% of audited engagements had no drift or regression monitoring at all. 3.8% of failed webhook deliveries return HTTP 200, reporting success for work that never happened.",
  },
  {
    slug: "fractional",
    situation: "You need a senior owner before you need a headcount.",
    name: "Fractional leadership",
    price: "From $6,000 / month",
    timeline: "Monthly, rolling",
    summary:
      "A senior owner for AI, delivery or platform work, part-time, when the role is there but the hire is not yet affordable.",
    includes: [
      "A named person, not a rotating bench",
      "Hiring and vendor decisions argued with you rather than handed to you",
      "Standing down when the hire is made, including help making it",
    ],
    stopPoint: "Cancellable monthly.",
  },
  {
    slug: "nothing",
    situation: "You might not need us.",
    name: "Nothing",
    price: "$0",
    timeline: "One conversation",
    summary:
      "Sometimes the answer is that an off-the-shelf tool already does this, or that the process needs fixing before anything automates it. That is the recommendation you get, and we will say which tool.",
    includes: [
      "A named alternative, with what it costs",
      "What would have to change for the answer to be different",
    ],
    stopPoint: "No invoice.",
  },
];

/**
 * The commitments. Each answers a failure documented in the research, and
 * each is cheap for ARC and expensive for a studio reselling a closed
 * platform, which is what makes them worth publishing.
 */
export const commitments: { heading: string; text: string }[] = [
  {
    heading: "You own it",
    text: "Code in your repository, infrastructure in your accounts, credentials in your name. Nothing we build lives on a platform only we can edit. If an automation lives somewhere you cannot reach, you are renting it.",
  },
  {
    heading: "We write down what it will not do",
    text: "Every build ships with its boundary: the systems it touches, the systems it never touches, and where it stops and hands to a person. Scope creeping one small request at a time is the failure behind most abandoned automations, and a written boundary is what it attacks first.",
  },
  {
    heading: "Somebody is responsible for noticing",
    text: "Every build ships with a named owner and a weekly check that it ran and the output looked sane. An automation has a job and needs a manager, the same as anyone else on the team.",
  },
  {
    heading: "Fixed price, agreed before we start",
    text: "The price and the delivery date are in a written scope you approve. There is no hourly overage and no discovery invoice. If you change what you want mid-build, that is priced and agreed before anything moves.",
  },
];

export function getOffer(slug: string): Offer | undefined {
  return offerLadder.find((offer) => offer.slug === slug);
}
