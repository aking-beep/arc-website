// ---------------------------------------------------------------------------
// Agent execution scenarios for the homepage visualization.
//
// Reconstructs the Magic Patterns `data/execution` module.
//
// EVERYTHING IN THIS FILE IS INVENTED. It is a worked illustration of the
// argument in `executionGap` (lib/ark.ts): a successful model response is not
// a successful business outcome. The four scenarios are the four failure modes
// that file lists. The component that renders this is required to show a
// `DemoLabel`, and does.
// ---------------------------------------------------------------------------

export type StepState = "pass" | "fail" | "hold" | "unknown";

export type ExecutionStep = {
  stage: string;
  title: string;
  detail: string;
  ms: number;
  state: StepState;
};

export type ExecutionScenario = {
  id: string;
  label: string;
  summary: string;
  steps: ExecutionStep[];
  verdict: { state: StepState; text: string };
};

export const scenarios: ExecutionScenario[] = [
  {
    id: "verified",
    label: "Verified",
    summary:
      "The run reported success and the destination system agrees. This is the only case that should be reported as done.",
    steps: [
      {
        stage: "identity",
        title: "Agent authenticated",
        detail: "svc-refunds-agent, workload credential, 15-minute lifetime.",
        ms: 42,
        state: "pass",
      },
      {
        stage: "policy",
        title: "Permission resolved",
        detail: "refunds.write allowed up to $250. Request is $84.20.",
        ms: 61,
        state: "pass",
      },
      {
        stage: "tool",
        title: "payments.refund called",
        detail: "Arguments matched the schema. Gateway returned a refund id.",
        ms: 1180,
        state: "pass",
      },
      {
        stage: "evidence",
        title: "Ledger read back",
        detail: "Independent read of the payments ledger shows the refund posted.",
        ms: 2240,
        state: "pass",
      },
      {
        stage: "outcome",
        title: "Outcome confirmed",
        detail: "Order state is refunded. Customer record and ledger agree.",
        ms: 2510,
        state: "pass",
      },
    ],
    verdict: { state: "pass", text: "Verified — the system that was meant to change did change." },
  },
  {
    id: "silent-failure",
    label: "Silent failure",
    summary:
      "The agent finished and reported success. The payment never moved. Tracing alone would call this a good run.",
    steps: [
      {
        stage: "identity",
        title: "Agent authenticated",
        detail: "svc-refunds-agent, workload credential, 15-minute lifetime.",
        ms: 39,
        state: "pass",
      },
      {
        stage: "policy",
        title: "Permission resolved",
        detail: "refunds.write allowed up to $250. Request is $112.00.",
        ms: 58,
        state: "pass",
      },
      {
        stage: "tool",
        title: "payments.refund called",
        detail: "Gateway returned 200 with an empty body. The agent read that as done.",
        ms: 940,
        state: "pass",
      },
      {
        stage: "evidence",
        title: "Ledger read back",
        detail: "No matching refund in the payments ledger. Order still shows as paid.",
        ms: 2080,
        state: "fail",
      },
      {
        stage: "outcome",
        title: "Outcome contradicted",
        detail: "Run reported success. Evidence says nothing changed. Flagged for a human.",
        ms: 2190,
        state: "fail",
      },
    ],
    verdict: { state: "fail", text: "Failed — the run said done and the ledger disagrees." },
  },
  {
    id: "held",
    label: "Held for approval",
    summary:
      "Correct tool, correct arguments, more authority than the agent holds. The action stops rather than retrying.",
    steps: [
      {
        stage: "identity",
        title: "Agent authenticated",
        detail: "svc-refunds-agent, workload credential, 15-minute lifetime.",
        ms: 44,
        state: "pass",
      },
      {
        stage: "policy",
        title: "Threshold exceeded",
        detail: "Request is $1,840.00. refunds.write is capped at $250 for this identity.",
        ms: 66,
        state: "hold",
      },
      {
        stage: "approval",
        title: "Routed to a named approver",
        detail: "Finance on-call, 30-minute expiry. The agent is not asked again.",
        ms: 180,
        state: "hold",
      },
      {
        stage: "tool",
        title: "Tool call not attempted",
        detail: "No call is made while the decision is open. Nothing to roll back.",
        ms: 180,
        state: "unknown",
      },
      {
        stage: "outcome",
        title: "Awaiting a person",
        detail: "Held, with the request, the identity and the policy that stopped it on the record.",
        ms: 180,
        state: "hold",
      },
    ],
    verdict: { state: "hold", text: "Held — above this agent's authority, waiting on a named human." },
  },
  {
    id: "unverifiable",
    label: "Unverifiable",
    summary:
      "The action probably worked. There is no read access to the system that would prove it, so it is reported as unknown — never as success.",
    steps: [
      {
        stage: "identity",
        title: "Agent authenticated",
        detail: "svc-crm-sync, workload credential, 15-minute lifetime.",
        ms: 41,
        state: "pass",
      },
      {
        stage: "policy",
        title: "Permission resolved",
        detail: "crm.contact.write allowed. No approval threshold on this action.",
        ms: 55,
        state: "pass",
      },
      {
        stage: "tool",
        title: "crm.updateContact called",
        detail: "Vendor API returned 202 Accepted. Processing is asynchronous.",
        ms: 760,
        state: "pass",
      },
      {
        stage: "evidence",
        title: "No read path",
        detail: "The CRM tenant grants write scope only. There is nothing to read the result back from.",
        ms: 1120,
        state: "unknown",
      },
      {
        stage: "outcome",
        title: "Reported as unknown",
        detail: "Counted against verification coverage, with the missing scope named as the fix.",
        ms: 1150,
        state: "unknown",
      },
    ],
    verdict: {
      state: "unknown",
      text: "Unverifiable — no evidence path. Reported as unknown, not as success.",
    },
  },
];
