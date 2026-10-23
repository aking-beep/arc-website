// ---------------------------------------------------------------------------
// Options for the multi-step inquiry form on /contact.
//
// Reconstructs the Magic Patterns `data/inquiry` module. The ids are what gets
// sent to POST /api/contact as `type`, which the endpoint maps onto the
// existing `topic` field, so deep links like /contact?topic=ark-control that
// already exist elsewhere on the site keep working.
// ---------------------------------------------------------------------------

import { solutions } from "@/lib/arc/solutions";

export type ProjectType = { id: string; label: string; hint: string };

export const projectTypes: ProjectType[] = [
  {
    id: "control",
    label: "ARC Control design partnership",
    hint: "Agents act on your production systems and you need to prove what changed.",
  },
  {
    id: "strategy",
    label: "AI strategy and readiness",
    hint: "Work out where AI belongs before anyone commits engineering time.",
  },
  {
    id: "build",
    label: "Build or integrate a system",
    hint: "The problem is named and you need it scoped and shipped.",
  },
  {
    id: "automation",
    label: "Workflow automation",
    hint: "Known-volume manual work that a machine should be doing.",
  },
  {
    id: "modernization",
    label: "Cloud, data or infrastructure",
    hint: "Something in the estate is slowing every release down.",
  },
  {
    id: "governance",
    label: "AI governance and security",
    hint: "Controls, evidence and oversight for systems that act on their own.",
  },
  {
    id: "labs",
    label: "An ARC Labs tool",
    hint: "A question, a bug, or you want one of the scanners run at scale.",
  },
  {
    id: "other",
    label: "Something else",
    hint: "Including 'we are not sure what we need'. That is a normal answer.",
  },
];

/** Deep links from a solution area land on the matching project type. */
export const serviceToType: Record<string, string> = {
  "ai-strategy": "strategy",
  "ai-development": "build",
  "workflow-automation": "automation",
  "cloud-modernization": "modernization",
  "ai-governance": "governance",
  "emerging-technology": "build",
};

/** Guard against a solution slug drifting out of the mapping above. */
export const unmappedSolutions = solutions
  .map((s) => s.slug)
  .filter((slug) => !(slug in serviceToType));

export const sizes = [
  "Under 50 people",
  "50–250",
  "250–1,000",
  "1,000+",
  "Nonprofit or public sector",
];

export const budgets = [
  "Under $25k",
  "$25k–$75k",
  "$75k–$250k",
  "$250k+",
  "Not sure yet",
];

export const timelines = [
  "Now — something is broken",
  "This quarter",
  "Next quarter",
  "Planning for next year",
  "Exploring",
];

export function typeLabel(id: string): string {
  return projectTypes.find((p) => p.id === id)?.label ?? "";
}

/**
 * Which project type a deep link should preselect. Pages across the site link
 * to /contact in four different shapes, and all four should land on the right
 * option rather than on an empty first step.
 *
 * Exported separately from the form so it can be unit-tested.
 */
export function initialProjectType(params: {
  type?: string | null;
  service?: string | null;
  topic?: string | null;
  readiness?: string | null;
}): string {
  const byType = params.type && projectTypes.some((p) => p.id === params.type)
    ? params.type
    : undefined;
  if (byType) return byType;

  const byService = params.service ? serviceToType[params.service] : undefined;
  if (byService) return byService;

  // ?topic= predates this form. `ark-control` and `ai-fit-teams` are the two
  // values other pages still use.
  const topic = params.topic ?? "";
  if (topic.includes("control")) return "control";
  if (topic.includes("ai-fit") || topic.includes("readiness")) return "strategy";
  if (topic.includes("labs")) return "labs";

  if (params.readiness) return "strategy";

  return "";
}
