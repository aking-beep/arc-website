// ---------------------------------------------------------------------------
// Cloud architecture explorer on /services.
//
// Reconstructs the Magic Patterns `data/architecture` module.
//
// This is a REFERENCE ESTATE, not a client's. It describes the pattern we keep
// finding, and the moves that keep being worth making, drawn from the
// `modernize` service area (lib/services.ts) and the cloud-infrastructure
// research brief. No client system is depicted.
// ---------------------------------------------------------------------------

export type Layer = {
  id: string;
  name: string;
  /** `layer` stacks vertically; `cross` runs alongside the whole stack. */
  kind: "layer" | "cross";
  current: { components: string[]; risks: string[] };
  target: { components: string[]; moves: string[] };
};

export const layers: Layer[] = [
  {
    id: "agents",
    name: "Agents and AI workloads",
    kind: "layer",
    current: {
      components: ["ad-hoc scripts", "vendor copilots", "notebook jobs"],
      risks: [
        "Agents run under a person's credentials, so their reach is whatever that person's reach is.",
        "Vendor-embedded assistants were switched on inside tools you already pay for, and nobody registered them.",
        "Spend moves with usage and the invoice is the first time anyone sees the number.",
      ],
    },
    target: {
      components: ["registered agents", "policy gateway", "evaluation harness"],
      moves: [
        "Give every agent its own short-lived, audience-restricted identity and an accountable human owner.",
        "Put a policy decision point in front of tool calls, in monitor mode first so you can tune before you enforce.",
        "Attribute cost to a unit of completed work rather than to tokens, so a budget holder can read it.",
      ],
    },
  },
  {
    id: "apps",
    name: "Applications and APIs",
    kind: "layer",
    current: {
      components: ["monolith", "point integrations", "manual steps"],
      risks: [
        "Point-to-point integrations mean every new consumer is a new bespoke connection.",
        "Capabilities are documented for humans, so nothing can discover them programmatically.",
        "Releases need a change-control meeting, which sets the pace of everything downstream.",
      ],
    },
    target: {
      components: ["service boundaries", "published schemas", "MCP surfaces"],
      moves: [
        "Publish machine-readable schemas for the capabilities other systems and agents need.",
        "Extract the services that change most often first, rather than attempting the whole monolith.",
        "Automate the pipeline to the point where rollback is tested rather than theoretical.",
      ],
    },
  },
  {
    id: "data",
    name: "Data and storage",
    kind: "layer",
    current: {
      components: ["warehouse copies", "spreadsheet exports", "unowned tables"],
      risks: [
        "Several numbers answer the same question and leadership has learned not to trust any of them.",
        "Access for a new use case takes weeks, which is where AI timelines quietly go.",
        "No owner for quality, so problems are discovered in meetings.",
      ],
    },
    target: {
      components: ["governed sources", "quality monitors", "documented access"],
      moves: [
        "Name one source of truth per business question, and retire the copies that disagree.",
        "Monitor quality on the fields decisions depend on, and alert the owner rather than the consumer.",
        "Make access a request with an SLA instead of a project.",
      ],
    },
  },
  {
    id: "platform",
    name: "Compute and platform",
    kind: "layer",
    current: {
      components: ["lift-and-shift VMs", "snowflake environments", "manual scaling"],
      risks: [
        "Environments drift, so what passed in staging is not evidence about production.",
        "Capacity is sized for peak and paid for continuously.",
        "Recovery has never been exercised end to end.",
      ],
    },
    target: {
      components: ["declarative infrastructure", "managed runtimes", "autoscaling"],
      moves: [
        "Define environments in code so staging is a statement about production.",
        "Move the workloads where managed runtimes are cheaper than the operational burden.",
        "Exercise recovery on a schedule, and treat an unexercised plan as no plan.",
      ],
    },
  },
  {
    id: "identity",
    name: "Identity and access",
    kind: "cross",
    current: {
      components: ["standing credentials", "shared service accounts", "annual review"],
      risks: [
        "Long-lived tokens with no expiry, where revocation depends on someone noticing.",
        "Shared service accounts, so an action cannot be attributed to an actor.",
        "Permissions granted for a project and never narrowed afterwards.",
      ],
    },
    target: {
      components: ["workload identity", "short-lived tokens", "scoped grants"],
      moves: [
        "Issue per-workload identities with expiry set at issue time, not by policy review.",
        "Constrain tokens to a sender and an audience so a leaked one is worth less.",
        "Automate registration, ownership, rotation and expiry at creation.",
      ],
    },
  },
  {
    id: "observability",
    name: "Observability and evidence",
    kind: "cross",
    current: {
      components: ["app logs", "uptime checks", "cost dashboard"],
      risks: [
        "Traces show what was attempted, and nothing confirms what changed.",
        "Alerts fire on infrastructure, not on the business outcome that failed.",
        "Audit questions are answered by reconstructing events from several systems by hand.",
      ],
    },
    target: {
      components: ["outcome verification", "audit store", "unit economics"],
      moves: [
        "Collect evidence from the system that was supposed to change, not from the caller's report.",
        "Report an unverifiable outcome as unverifiable, never as success.",
        "Keep an append-only record a person who was not in the room can read later.",
      ],
    },
  },
];
