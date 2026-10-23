// ---------------------------------------------------------------------------
// ARC Control console preview — demonstration data.
//
// Reconstructs the Magic Patterns `data/console` module.
//
// EVERYTHING IN THIS FILE IS INVENTED. "Northwind Demo Co." is not a customer.
// No agent, run, policy, finding or number here comes from a real deployment,
// and ARC Control is in design-partner development, so there is no real
// deployment to draw from. Every surface that renders this data carries a
// `DemoLabel`, which the design treats as mandatory.
//
// It is modelled on the capability list in `arkProducts[ark-control]`
// (lib/ark.ts) so the preview shows the product that is being built rather
// than a more impressive one.
// ---------------------------------------------------------------------------

export const consoleTenant = {
  name: "Northwind Demo Co.",
  slug: "northwind-demo · production",
  note: "Agent names, events, policies and findings are invented to show how ARC Control is intended to work. Capabilities may change during design-partner development.",
};

export type AgentRisk = "low" | "medium" | "high";
export type AgentState = "active" | "review" | "paused";

export type Agent = {
  id: string;
  name: string;
  owner: string;
  framework: string;
  identity: string;
  risk: AgentRisk;
  state: AgentState;
  runs24h: number;
  /** Percentage of this agent's outcomes independently verified. */
  verified: number;
  lastSeen: string;
  scopes: string[];
  tools: string[];
};

export const agents: Agent[] = [
  {
    id: "a1",
    name: "svc-refunds-agent",
    owner: "Payments platform",
    framework: "In-house · MCP client",
    identity: "spiffe://northwind/ns/payments/sa/refunds-agent",
    risk: "high",
    state: "active",
    runs24h: 1284,
    verified: 97,
    lastSeen: "2 min ago",
    scopes: ["refunds.write:max=250", "orders.read", "ledger.read"],
    tools: ["payments.refund", "orders.get", "ledger.query"],
  },
  {
    id: "a2",
    name: "svc-crm-sync",
    owner: "Revenue operations",
    framework: "Vendor-embedded",
    identity: "spiffe://northwind/ns/revops/sa/crm-sync",
    risk: "medium",
    state: "review",
    runs24h: 806,
    verified: 61,
    lastSeen: "9 min ago",
    scopes: ["crm.contact.write", "crm.account.read"],
    tools: ["crm.updateContact", "crm.getAccount"],
  },
  {
    id: "a3",
    name: "svc-ticket-triage",
    owner: "Customer support",
    framework: "In-house · classifier",
    identity: "spiffe://northwind/ns/support/sa/ticket-triage",
    risk: "low",
    state: "active",
    runs24h: 4120,
    verified: 99,
    lastSeen: "under a minute ago",
    scopes: ["tickets.read", "tickets.label"],
    tools: ["tickets.list", "tickets.addLabel"],
  },
  {
    id: "a4",
    name: "svc-infra-remediation",
    owner: "Platform engineering",
    framework: "In-house · MCP client",
    identity: "spiffe://northwind/ns/platform/sa/infra-remediation",
    risk: "high",
    state: "review",
    runs24h: 94,
    verified: 72,
    lastSeen: "41 min ago",
    scopes: ["k8s.deployment.scale", "alerts.read", "runbooks.read"],
    tools: ["k8s.scale", "alerts.ack", "runbook.fetch"],
  },
  {
    id: "a5",
    name: "copilot-finance-close",
    owner: "Finance",
    framework: "Vendor-embedded · unmanaged",
    identity: "oauth://vendor-suite/finance-copilot",
    risk: "medium",
    state: "active",
    runs24h: 212,
    verified: 44,
    lastSeen: "16 min ago",
    scopes: ["ledger.read", "reports.write", "drive.read"],
    tools: ["ledger.query", "reports.publish", "drive.search"],
  },
  {
    id: "a6",
    name: "svc-contract-review",
    owner: "Legal operations",
    framework: "In-house · retrieval",
    identity: "spiffe://northwind/ns/legal/sa/contract-review",
    risk: "low",
    state: "paused",
    runs24h: 0,
    verified: 0,
    lastSeen: "6 days ago",
    scopes: ["documents.read"],
    tools: ["documents.search"],
  },
];

export type RunOutcome = "verified" | "unverified" | "blocked" | "pending";

export type Run = {
  id: string;
  time: string;
  agent: string;
  action: string;
  tool: string;
  policy: string;
  outcome: RunOutcome;
  latency: string;
};

export const runs: Run[] = [
  {
    id: "r1",
    time: "14:22:08",
    agent: "svc-refunds-agent",
    action: "Refund order #48213 ($84.20)",
    tool: "payments.refund",
    policy: "refund-threshold",
    outcome: "verified",
    latency: "2.5 s",
  },
  {
    id: "r2",
    time: "14:21:44",
    agent: "svc-crm-sync",
    action: "Update contact 9f21c",
    tool: "crm.updateContact",
    policy: "crm-write-scope",
    outcome: "unverified",
    latency: "1.1 s",
  },
  {
    id: "r3",
    time: "14:20:03",
    agent: "svc-refunds-agent",
    action: "Refund order #48209 ($1,840.00)",
    tool: "payments.refund",
    policy: "refund-threshold",
    outcome: "blocked",
    latency: "0.2 s",
  },
  {
    id: "r4",
    time: "14:19:51",
    agent: "svc-ticket-triage",
    action: "Label 38 tickets as billing",
    tool: "tickets.addLabel",
    policy: "read-mostly",
    outcome: "verified",
    latency: "640 ms",
  },
  {
    id: "r5",
    time: "14:18:12",
    agent: "svc-infra-remediation",
    action: "Scale checkout-api to 12 replicas",
    tool: "k8s.scale",
    policy: "prod-change-window",
    outcome: "pending",
    latency: "—",
  },
  {
    id: "r6",
    time: "14:17:30",
    agent: "copilot-finance-close",
    action: "Publish draft close report",
    tool: "reports.publish",
    policy: "unmanaged-agent",
    outcome: "unverified",
    latency: "3.8 s",
  },
  {
    id: "r7",
    time: "14:16:02",
    agent: "svc-refunds-agent",
    action: "Refund order #48201 ($112.00)",
    tool: "payments.refund",
    policy: "refund-threshold",
    outcome: "unverified",
    latency: "2.2 s",
  },
  {
    id: "r8",
    time: "14:14:48",
    agent: "svc-infra-remediation",
    action: "Acknowledge alert cpu-sat-7",
    tool: "alerts.ack",
    policy: "read-mostly",
    outcome: "verified",
    latency: "310 ms",
  },
];

export type Policy = {
  id: string;
  name: string;
  appliesTo: string;
  rule: string;
  mode: "enforce" | "monitor";
  hits24h: number;
  blocks24h: number;
};

export const policies: Policy[] = [
  {
    id: "pol-01",
    name: "Refund threshold",
    appliesTo: "svc-refunds-agent",
    rule: "allow payments.refund when amount <= 250 else require approval(finance-oncall)",
    mode: "enforce",
    hits24h: 1284,
    blocks24h: 7,
  },
  {
    id: "pol-02",
    name: "Production change window",
    appliesTo: "svc-infra-remediation",
    rule: "allow k8s.* when window = business-hours and approver present",
    mode: "enforce",
    hits24h: 94,
    blocks24h: 3,
  },
  {
    id: "pol-03",
    name: "CRM write scope",
    appliesTo: "svc-crm-sync",
    rule: "allow crm.contact.write when field not in (email, billing_address)",
    mode: "monitor",
    hits24h: 806,
    blocks24h: 0,
  },
  {
    id: "pol-04",
    name: "Unmanaged agent quarantine",
    appliesTo: "any identity not in agent inventory",
    rule: "deny *.write and alert security-oncall",
    mode: "monitor",
    hits24h: 212,
    blocks24h: 0,
  },
  {
    id: "pol-05",
    name: "Evidence required",
    appliesTo: "all agents",
    rule: "require outcome_evidence for any tool marked side_effect = true",
    mode: "enforce",
    hits24h: 2496,
    blocks24h: 0,
  },
];

export type AuditRecord = {
  id: string;
  run: string;
  time: string;
  summary: string;
  result: "pass" | "fail" | "unknown";
  evidence: Record<string, string>;
};

export const auditRecords: AuditRecord[] = [
  {
    id: "ev-7f3a01",
    run: "run_7f3a",
    time: "2026-10-22T14:22:08Z",
    summary: "Refund posted and confirmed against the payments ledger.",
    result: "pass",
    evidence: {
      actor: "svc-refunds-agent",
      identity: "spiffe://northwind/ns/payments/sa/refunds-agent",
      credential: "workload-jwt · 15m · exp 14:35:12Z",
      acting_for: "support-case #CS-19204",
      policy: "pol-01 refund-threshold · allow",
      tool: "payments.refund",
      arguments: "order=48213 amount=84.20 currency=USD",
      tool_response: "200 refund_id=re_9Kp2Qa",
      outcome_source: "ledger.query (independent read)",
      outcome_evidence: "ledger entry re_9Kp2Qa posted 14:22:10Z amount -84.20",
      verdict: "verified",
    },
  },
  {
    id: "ev-7f3a02",
    run: "run_81c4",
    time: "2026-10-22T14:16:02Z",
    summary: "Run reported success. The ledger has no matching entry.",
    result: "fail",
    evidence: {
      actor: "svc-refunds-agent",
      identity: "spiffe://northwind/ns/payments/sa/refunds-agent",
      credential: "workload-jwt · 15m · exp 14:29:40Z",
      acting_for: "support-case #CS-19188",
      policy: "pol-01 refund-threshold · allow",
      tool: "payments.refund",
      arguments: "order=48201 amount=112.00 currency=USD",
      tool_response: "200 (empty body)",
      outcome_source: "ledger.query (independent read)",
      outcome_evidence: "no entry for order 48201 · order state still 'paid'",
      verdict: "failed · reported success contradicted by evidence",
    },
  },
  {
    id: "ev-7f3a03",
    run: "run_55de",
    time: "2026-10-22T14:20:03Z",
    summary: "Refund above this identity's cap. Routed to a named approver.",
    result: "unknown",
    evidence: {
      actor: "svc-refunds-agent",
      identity: "spiffe://northwind/ns/payments/sa/refunds-agent",
      credential: "workload-jwt · 15m · exp 14:33:05Z",
      acting_for: "support-case #CS-19191",
      policy: "pol-01 refund-threshold · require approval",
      tool: "payments.refund (not called)",
      arguments: "order=48209 amount=1840.00 currency=USD",
      tool_response: "—",
      outcome_source: "approval queue",
      outcome_evidence: "pending · finance-oncall · expires 14:50:03Z",
      verdict: "held",
    },
  },
  {
    id: "ev-7f3a04",
    run: "run_a902",
    time: "2026-10-22T14:21:44Z",
    summary: "Write accepted asynchronously. No read scope to confirm it.",
    result: "unknown",
    evidence: {
      actor: "svc-crm-sync",
      identity: "spiffe://northwind/ns/revops/sa/crm-sync",
      credential: "workload-jwt · 15m · exp 14:34:51Z",
      acting_for: "nightly-sync schedule",
      policy: "pol-03 crm-write-scope · monitor",
      tool: "crm.updateContact",
      arguments: "contact=9f21c fields=[title, phone]",
      tool_response: "202 Accepted",
      outcome_source: "none available",
      outcome_evidence: "tenant grants write scope only · no read path",
      verdict: "unverifiable · missing crm.contact.read",
    },
  },
];

export type Severity = "critical" | "high" | "medium" | "low";

export type Finding = {
  id: string;
  title: string;
  severity: Severity;
  source: string;
  target: string;
  detail: string;
  fix: string;
};

export const findings: Finding[] = [
  {
    id: "MCP-INIT-03",
    title: "Tool calls accepted before the client is initialized",
    severity: "high",
    source: "MCP validation",
    target: "erp-mcp.internal",
    detail:
      "The server answers tools/call without having seen a completed initialization sequence, so protocol version and client capabilities are never established. An unauthenticated caller can reach tool handlers directly.",
    fix: "Gate every tools/* handler on a completed initialization, and reject calls that arrive without per-request protocol metadata.",
  },
  {
    id: "MCP-DESC-04",
    title: "Tool description contains instructions aimed at the model",
    severity: "critical",
    source: "MCP validation",
    target: "vendor-crm-mcp",
    detail:
      "The description for crm.updateContact includes imperative text telling the assistant to ignore earlier constraints. Tool descriptions are fetched from the server and injected into the model's context, so this is a prompt-injection surface inside a trusted channel.",
    fix: "Treat descriptions as untrusted input: strip imperative language, pin the server's tool manifest, and alert on changes to it.",
  },
  {
    id: "PERM-11",
    title: "Agent holds a write scope with no read scope",
    severity: "medium",
    source: "Permission review",
    target: "svc-crm-sync",
    detail:
      "crm.contact.write is granted without crm.contact.read, so no outcome can be confirmed. 39% of this agent's runs in the last 24 hours are reported as unverifiable for this reason alone.",
    fix: "Add the narrowest matching read scope, or mark the tool as unverifiable by design so coverage reporting stays honest.",
  },
  {
    id: "INV-02",
    title: "Agent acting in production is not in the inventory",
    severity: "high",
    source: "Coverage check",
    target: "copilot-finance-close",
    detail:
      "A vendor-embedded assistant is authenticating with an OAuth grant issued outside the agent registration path. It inherits a finance user's roles, so its reach is whatever that person's reach is.",
    fix: "Register it with its own identity and an accountable owner, or revoke the grant. Inherited human roles are not an agent authorization model.",
  },
  {
    id: "CRED-07",
    title: "Standing credential with no expiry",
    severity: "medium",
    source: "Permission review",
    target: "svc-infra-remediation",
    detail:
      "One of this agent's two credentials is a long-lived token with no expiry recorded. Revocation would depend on someone noticing.",
    fix: "Replace it with a short-lived, audience-restricted workload credential and set expiry at issue time rather than by policy review.",
  },
  {
    id: "POL-03",
    title: "Policy has been in monitor mode for 94 days",
    severity: "low",
    source: "Coverage check",
    target: "pol-03 crm-write-scope",
    detail:
      "The rule has evaluated 61,400 times and would have blocked 212 calls, none of which were blocked. Monitor mode is the right first step; three months is longer than tuning needs.",
    fix: "Review the 212 would-block cases, then move the policy to enforce.",
  },
];

export const health = {
  verifiedRate: 94,
  unverified24h: 148,
  blocked24h: 10,
  p95Latency: "3.1 s",
  /** 14 days of daily verified-outcome rate, as percentages. */
  series: [91, 92, 90, 93, 93, 92, 94, 93, 95, 94, 93, 95, 94, 96],
  services: [
    { name: "Policy decision point", status: "ok" as const, note: "p99 8 ms · 5 regions" },
    { name: "Evidence collector", status: "ok" as const, note: "6 connectors healthy" },
    { name: "MCP validator", status: "degraded" as const, note: "1 of 9 servers unreachable" },
    { name: "Audit store", status: "ok" as const, note: "append-only · 14-month retention" },
    { name: "Approval router", status: "ok" as const, note: "3 approvers on call" },
  ],
};
