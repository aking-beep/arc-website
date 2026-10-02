/**
 * The three open-source libraries that ship inside the Playbook bundle.
 *
 * They live in their own repositories and those repositories are the source of
 * truth. Nothing here is a copy of their content — only enough to find it.
 */

export const libraries = [
  {
    id: "skills",
    appendix: "A",
    title: "ARC Skills library",
    owner: "aking-beep",
    repo: "arc-skills",
    /** Where the catalog lives inside the repo. */
    dir: "skills",
    /** Catalog entries are directories containing this file. */
    entryFile: "SKILL.md",
    license: "MIT",
    lead:
      "Agent skills you can drop into Cursor, Claude Code, or anything else that loads a SKILL.md. Each one carries its own triggers, steps and guardrails, so the skill is the specification rather than a prompt you have to maintain.",
    useWhen:
      "Reach for these where a module says the work is repeatable. A skill is worth adopting when you would otherwise write the same instructions a third time.",
  },
  {
    id: "architectures",
    appendix: "B",
    title: "Reference Architectures",
    owner: "aking-beep",
    repo: "reference-architectures",
    dir: "content",
    /** Catalog entries are Markdown files nested one category deep. */
    entryFile: null,
    license: "MIT",
    lead:
      "System shapes taken from delivery work. Each one names the problem it solves, the component shape, the decisions it forces, the failure modes, the scaling path, and — the section worth reading first — when not to use it.",
    useWhen:
      "Module 04 sends you here. Find the closest shape and start from it. Do not adopt one whose \u201cwhen not to use it\u201d section describes your situation.",
  },
  {
    id: "templates",
    appendix: "C",
    title: "AI Workflow Templates",
    owner: "aking-beep",
    repo: "ai-workflow-templates",
    dir: "content",
    entryFile: null,
    license: "MIT",
    lead:
      "End-to-end workflows with the prompt, the tools it calls, the input schema and the human-in-the-loop gate already in place. They are starting points, not products.",
    useWhen:
      "Modules 03 and 05 send you here. Starting from the nearest template is usually faster than starting from an empty file, and it means the human gate is there from the first version rather than added after an incident.",
  },
];

export function libraryById(id) {
  const found = libraries.find((library) => library.id === id);
  if (!found) throw new Error(`Unknown library: ${id}`);
  return found;
}
