---
section: front
title: How to use this Playbook
---

# How to use this Playbook

## Read in order the first time

The modules are sequenced by cost. Each one is cheaper to answer before the one
after it, and most of the expensive mistakes in AI products come from answering
them out of order — building the architecture before the workflow is decided,
or deciding the price after the infrastructure is chosen.

If you already have something running, do not skip ahead. Start at module 01
and move fast through what you have genuinely answered. You will find at least
one gap, and it will be in validation or evaluation.

## Fill in the worksheets as you go

Every module points at one or more worksheets. They are at the back of this
PDF, and they are also in the ZIP as editable Markdown so you can keep them
with the project rather than in a drawer.

A module is done when its worksheet is filled in with something you would be
willing to show another person. Not when you have read it.

## The three libraries

Appendices A, B and C are working libraries rather than reading material:

- **Appendix A — ARC Skills.** Agent skills you can drop into Cursor or Claude.
  Each one has triggers, steps and guardrails. Use these where a module says
  "you could hand this to an agent."
- **Appendix B — Reference Architectures.** System shapes with the decisions,
  failure modes and when-not-to-use-it notes already written. Module 04 sends
  you here.
- **Appendix C — AI Workflow Templates.** End-to-end workflows with the prompt,
  the tools, the input schema and the human gate in place. Modules 03 and 05
  send you here.

All three are also published openly under the MIT licence. Appendix D has the
repository links and the licence text. What this Playbook adds is the ordering:
each entry is attached to the module where you would actually reach for it, so
you are not browsing a catalog of twenty things hoping one applies.

## Conventions

| Mark | Meaning |
| --- | --- |
| **The decision** | The one thing the module exists to settle. |
| **The work** | The method. This is the part you do. |
| **You should be holding** | The module's output, as a checklist. |
| **Where this bites** | The common failure, and the early symptom. |
| → Worksheet | The page to fill in. |

## If you only have an hour

Do module 02 (Validation) and module 06 (Evaluation). Those two are where
almost every AI product we have reviewed was weakest, and they are the two that
a model genuinely cannot do for you.
