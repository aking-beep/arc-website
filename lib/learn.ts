// ============================================================================
// ARC Playbooks — the Learn layer.
//
// These exist so someone can use ARC's methods without hiring ARC. All three
// are free and complete on the page. The paid playbooks live at /playbook.
// ============================================================================

export type PlaybookKind = "playbook" | "framework" | "assessment" | "checklist";

export type Playbook = {
  slug: string;
  kind: PlaybookKind;
  name: string;
  tagline: string;
  summary: string;
  /** Display price. "Free" where it is free. */
  price: string;
  ctaLabel: string;
  /**
   * What you can do with this right now. The free assets are
   * complete on their page; the paid one is not shipping yet and says so.
   */
  availability: string;
  /** Steps shown as a chain on the card. */
  chain?: readonly string[];
  /** Set where the asset lives outside /playbooks/[slug]. */
  href?: string;
  featured?: boolean;
};

export const playbooks: Playbook[] = [
  {
    slug: "agent-readiness-scorecard",
    kind: "assessment",
    name: "Agent Readiness Scorecard",
    tagline: "Can agents operate your systems?",
    summary:
      "Twenty questions across interfaces, identity, permissions, observability, security and reliability. Scored in the browser, stored nowhere.",
    price: "Free",
    ctaLabel: "Run the assessment",
    availability:
      "Free and complete on the page. Scored in your browser; nothing is submitted anywhere.",
  },
  {
    slug: "agent-operating-contract",
    kind: "framework",
    name: "Agent Operating Contract",
    tagline: "What an agent needs before it owns ongoing work.",
    summary:
      "A one-page framework for defining the goal, trigger, state, boundary, evidence and owner behind any agent you let run unattended.",
    price: "Free",
    ctaLabel: "Use the framework",
    availability:
      "Free and published in full, with a worked bad and good example for every field. No email gate.",
    chain: ["Goal", "Trigger", "State", "Boundary", "Evidence", "Owner"],
  },
  {
    slug: "outcome-assurance-checklist",
    kind: "checklist",
    name: "Outcome Assurance Checklist",
    tagline: "Six questions between a finished run and a finished job.",
    summary:
      "The sequence we use to decide whether an agent's reported success can be believed, and what it cost to find out.",
    price: "Free",
    ctaLabel: "Open the checklist",
    availability:
      "Free and published in full, including the failure mode each step exists to catch. No email gate.",
    chain: ["Attempted", "Authority", "Changed", "Evidence", "Verified", "Cost"],
  },
];

export function getPlaybook(slug: string) {
  return playbooks.find((p) => p.slug === slug);
}

/** The paid Playbook sells from /playbook; the free assets live under the hub. */
export function playbookHref(playbook: Playbook) {
  return playbook.href ?? `/playbooks/${playbook.slug}`;
}

// ---------------------------------------------------------------------------
// Agent Operating Contract — the full framework, published on the page.
// ---------------------------------------------------------------------------
export const operatingContractFields = [
  {
    field: "Goal",
    question: "What does done look like, stated so someone else could check it?",
    bad: "Keep the CRM tidy.",
    good: "Every opportunity closed in the last 24 hours has a stage, an amount and a close reason.",
  },
  {
    field: "Trigger",
    question: "What starts the work, and what must already be true?",
    bad: "Runs continuously.",
    good: "Hourly, only when the nightly sync finished without errors.",
  },
  {
    field: "State",
    question: "What may it remember between runs, and for how long?",
    bad: "Full conversation history, indefinitely.",
    good: "Last processed record id and the last run's failures, for 30 days.",
  },
  {
    field: "Boundary",
    question: "What can it reach, enforced as permissions rather than asked for in a prompt?",
    bad: "Has the integration user's standing API key.",
    good: "Read opportunities, write stage and close reason. No delete, no export, no email.",
  },
  {
    field: "Evidence",
    question: "What must exist afterwards to show the work was done?",
    bad: "A log line saying success.",
    good: "The changed record id, its before and after values, and the policy decision that allowed it.",
  },
  {
    field: "Owner",
    question: "Which named person is accountable when it goes wrong?",
    bad: "The platform team.",
    good: "A named individual, with a named deputy, reviewed quarterly.",
  },
];

export const operatingContractStops = [
  "Stop condition: what makes it halt rather than retry — and the retry budget before that point.",
  "Recovery behaviour: what happens to work already in flight when it halts.",
  "Escalation: who is told, through which channel, and within what time.",
  "Review: when the contract itself is re-examined, because permissions rot.",
];

// ---------------------------------------------------------------------------
// Outcome Assurance Checklist.
// ---------------------------------------------------------------------------
export const assuranceChecklist = [
  {
    step: "01",
    question: "What did the agent attempt?",
    detail:
      "The intent, the plan and the tools it chose — separately from whether any of it worked.",
    failure: "You only have a final status, so a wrong plan that executed cleanly looks like success.",
  },
  {
    step: "02",
    question: "What authority did it use?",
    detail:
      "Which identity acted, under which credential, and which policy allowed the action.",
    failure:
      "Everything runs as one shared integration account, so you cannot attribute anything to anyone.",
  },
  {
    step: "03",
    question: "What changed?",
    detail:
      "The concrete state change in the destination system: the record, the row, the transaction, the file.",
    failure: "The only record of the change is the agent's own claim that it made one.",
  },
  {
    step: "04",
    question: "What evidence exists?",
    detail:
      "Something independent of the agent — a webhook, a ledger entry, a downstream read, a reconciliation.",
    failure: "Your evidence and your claim come from the same place.",
  },
  {
    step: "05",
    question: "Was the outcome verified?",
    detail:
      "A pass, a fail, or an explicit unknown. Unknown is a valid and useful answer.",
    failure: "Unverifiable outcomes are being counted as successes because nothing marks them otherwise.",
  },
  {
    step: "06",
    question: "What did the verified outcome cost?",
    detail:
      "Total spend across retries and failed attempts, divided by outcomes that verified.",
    failure:
      "You are reporting cost per run, which flatters you every time a cheap failure inflates the denominator.",
  },
];

// ---------------------------------------------------------------------------
// Agent Readiness Scorecard — questions and scoring.
// Scored entirely in the browser. Nothing is submitted anywhere.
// ---------------------------------------------------------------------------
export type ScorecardAnswer = { label: string; score: 0 | 1 | 2 };

export type ScorecardQuestion = {
  id: string;
  dimension: string;
  question: string;
  answers: [ScorecardAnswer, ScorecardAnswer, ScorecardAnswer];
};

export const scorecardDimensions = [
  "Discovery",
  "Interfaces",
  "Identity",
  "Permissions",
  "Observability",
  "Security",
  "Reliability",
] as const;

export const scorecardQuestions: ScorecardQuestion[] = [
  {
    id: "d1",
    dimension: "Discovery",
    question: "Can an agent find out what your systems can do without a human explaining it?",
    answers: [
      { label: "No machine-readable description exists", score: 0 },
      { label: "Some APIs are documented for humans", score: 1 },
      { label: "Capabilities are discoverable from a published schema or manifest", score: 2 },
    ],
  },
  {
    id: "d2",
    dimension: "Discovery",
    question: "When a capability changes, how does a calling agent find out?",
    answers: [
      { label: "It does not — things break and someone investigates", score: 0 },
      { label: "We version and announce changes to known consumers", score: 1 },
      { label: "Versioning is in the contract and consumers can detect it at call time", score: 2 },
    ],
  },
  {
    id: "i1",
    dimension: "Interfaces",
    question: "Are the operations an agent would need available as APIs rather than screens?",
    answers: [
      { label: "Core workflows only exist in the UI", score: 0 },
      { label: "Some are exposed, with gaps that need a person", score: 1 },
      { label: "The workflows that matter are fully available programmatically", score: 2 },
    ],
  },
  {
    id: "i2",
    dimension: "Interfaces",
    question: "Do you expose an MCP server or an equivalent agent-facing interface?",
    answers: [
      { label: "No", score: 0 },
      { label: "An experiment exists, untested against the current spec", score: 1 },
      { label: "Yes, and it is tested against the published spec", score: 2 },
    ],
  },
  {
    id: "i3",
    dimension: "Interfaces",
    question: "Are side effects described well enough that a caller knows what an operation will change?",
    answers: [
      { label: "No — you have to read the implementation", score: 0 },
      { label: "Documented in prose for most operations", score: 1 },
      { label: "Declared in the schema, including whether the call is safe to retry", score: 2 },
    ],
  },
  {
    id: "id1",
    dimension: "Identity",
    question: "Can you tell which agent performed an action?",
    answers: [
      { label: "Everything runs as a shared service account", score: 0 },
      { label: "Agents share a few accounts by environment or team", score: 1 },
      { label: "Each agent has its own identity, distinguishable in logs", score: 2 },
    ],
  },
  {
    id: "id2",
    dimension: "Identity",
    question: "When an agent acts for a person, is that relationship recorded?",
    answers: [
      { label: "No — the agent's own identity is all that is recorded", score: 0 },
      { label: "Sometimes, in application logs", score: 1 },
      { label: "Yes, delegation is explicit and carried through to the destination system", score: 2 },
    ],
  },
  {
    id: "id3",
    dimension: "Identity",
    question: "How are agent credentials issued and rotated?",
    answers: [
      { label: "Long-lived keys, rotated when someone remembers", score: 0 },
      { label: "Rotated on a schedule", score: 1 },
      { label: "Short-lived, scoped credentials issued per task", score: 2 },
    ],
  },
  {
    id: "p1",
    dimension: "Permissions",
    question: "Is an agent's authority narrower than the human it works for?",
    answers: [
      { label: "No — it inherits everything that user can do", score: 0 },
      { label: "Partly, through a restricted role", score: 1 },
      { label: "Yes, scoped to the specific operations the task requires", score: 2 },
    ],
  },
  {
    id: "p2",
    dimension: "Permissions",
    question: "Do irreversible actions — payments, deletions, outbound messages — require approval?",
    answers: [
      { label: "No", score: 0 },
      { label: "For some, by convention rather than enforcement", score: 1 },
      { label: "Yes, enforced at the system that performs the action", score: 2 },
    ],
  },
  {
    id: "p3",
    dimension: "Permissions",
    question: "How quickly can you revoke an agent's access entirely?",
    answers: [
      { label: "We are not sure where all its credentials are", score: 0 },
      { label: "Hours, with manual work across several systems", score: 1 },
      { label: "Minutes, from one place", score: 2 },
    ],
  },
  {
    id: "o1",
    dimension: "Observability",
    question: "Can you reconstruct what an agent did on a specific day last month?",
    answers: [
      { label: "No", score: 0 },
      { label: "Partially, by correlating several log sources by hand", score: 1 },
      { label: "Yes, end to end, including the tools it called", score: 2 },
    ],
  },
  {
    id: "o2",
    dimension: "Observability",
    question: "Do you verify outcomes in the destination system, or trust the agent's report?",
    answers: [
      { label: "We trust the reported status", score: 0 },
      { label: "We spot-check manually", score: 1 },
      { label: "Outcomes are confirmed independently of the agent", score: 2 },
    ],
  },
  {
    id: "o3",
    dimension: "Observability",
    question: "Do you know what a completed unit of agent work costs?",
    answers: [
      { label: "We see a total bill", score: 0 },
      { label: "Cost by team or by model", score: 1 },
      { label: "Cost attributed to a unit of work, including retries and failures", score: 2 },
    ],
  },
  {
    id: "s1",
    dimension: "Security",
    question: "Have you assessed prompt injection against the agent's tool authority?",
    answers: [
      { label: "No", score: 0 },
      { label: "We have discussed it", score: 1 },
      { label: "Yes, and untrusted content cannot reach high-authority tools unchecked", score: 2 },
    ],
  },
  {
    id: "s2",
    dimension: "Security",
    question: "Can an agent reach data belonging to a tenant or user it is not acting for?",
    answers: [
      { label: "Possibly — isolation is enforced in application code only", score: 0 },
      { label: "Unlikely, but it has not been tested", score: 1 },
      { label: "No, isolation is enforced below the application and tested", score: 2 },
    ],
  },
  {
    id: "s3",
    dimension: "Security",
    question: "Are the agent's outbound destinations restricted?",
    answers: [
      { label: "No egress controls", score: 0 },
      { label: "Network-level controls only", score: 1 },
      { label: "Explicit allowlist of tools and destinations per agent", score: 2 },
    ],
  },
  {
    id: "r1",
    dimension: "Reliability",
    question: "What happens when a tool call fails halfway through a multi-step task?",
    answers: [
      { label: "Unclear — partial state is left behind", score: 0 },
      { label: "It retries, and we clean up manually when that fails", score: 1 },
      { label: "Defined compensation and stop conditions", score: 2 },
    ],
  },
  {
    id: "r2",
    dimension: "Reliability",
    question: "Are your write operations safe to retry?",
    answers: [
      { label: "No — a retry can duplicate the effect", score: 0 },
      { label: "Some are", score: 1 },
      { label: "Yes, writes are idempotent by key", score: 2 },
    ],
  },
  {
    id: "r3",
    dimension: "Reliability",
    question: "Is there a named owner accountable for each agent in production?",
    answers: [
      { label: "No", score: 0 },
      { label: "A team owns them collectively", score: 1 },
      { label: "Yes, a named person per agent", score: 2 },
    ],
  },
];

export const scorecardBands = [
  {
    min: 0,
    max: 39,
    label: "Not ready",
    text: "Agents acting against these systems would be operating on trust. The gaps are structural rather than cosmetic: start with identity and permissions, because everything else depends on being able to say who did what.",
  },
  {
    min: 40,
    max: 64,
    label: "Early",
    text: "The interfaces are coming along but the controls behind them have not caught up. This is the most common and most dangerous band — enough capability to put agents into production, not enough evidence to know what they did.",
  },
  {
    min: 65,
    max: 84,
    label: "Workable",
    text: "You could run agents here and defend the decision. The remaining gaps are usually verification and cost attribution: you can see what was attempted, but not always confirm what changed.",
  },
  {
    min: 85,
    max: 100,
    label: "Ready",
    text: "Unusually well prepared. At this level the useful work is narrowing authority further and proving outcomes independently, rather than adding more capability.",
  },
];
