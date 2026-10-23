// ---------------------------------------------------------------------------
// Transformation methodology — the four phases of an engagement.
//
// Reconstructs the Magic Patterns `data/methodology` module. Built from
// `howWeEngage` (lib/content.ts) and the shape of the real engagements in
// `advisoryEngagements`, so the lengths and deliverables match what the
// /advisory pages already commit to.
//
// The promise that matters commercially is the gate: an engagement can end at
// the close of any phase and the client keeps what was produced.
// ---------------------------------------------------------------------------

export type Phase = {
  name: string;
  length: string;
  text: string;
  /** What arrives, in nouns. */
  output: string;
  /** The decision the phase exists to make possible. */
  gate: string;
};

export const methodology: Phase[] = [
  {
    name: "Diagnose",
    length: "2–7 weeks",
    text: "Find out what is actually in the way. We look at the systems, the data, the workflows and the people who run them, and rank what we find by business impact rather than by how interesting it is to fix.",
    output: "A findings list with owners, a sequence you can start on Monday, and a one-page summary for the board.",
    gate: "Is the larger work worth doing, and in what order?",
  },
  {
    name: "Decide",
    length: "1–3 weeks",
    text: "Score the options before anyone commits engineering time. This is where we say plainly which problems are ordinary automation, which belong in an AI system, and which should wait.",
    output: "A recommended architecture, the alternatives that were ruled out with reasons, named cost drivers and the open questions.",
    gate: "Build it, buy it, fix the prerequisite first, or defer?",
  },
  {
    name: "Build",
    length: "6–16 weeks",
    text: "Ship a narrow first version against a live workflow with real people on it, rather than a platform nobody has used. The integration and data work it depends on gets done rather than assumed.",
    output: "A working system in production, the controls around it, and a delivery cadence with named owners.",
    gate: "Does this hold up with real users, and is the second version ours to run?",
  },
  {
    name: "Operate",
    length: "Ongoing or none",
    text: "Put the governance, observability, evaluation and permissions around the system so it can be used without someone watching every run. Often your team does this and we are not needed.",
    output: "An agent and integration inventory, approval gates on the actions that warrant one, an evaluation set with thresholds, and verification of outcomes.",
    gate: "Can your team run this without us? That is the intended answer.",
  },
];
