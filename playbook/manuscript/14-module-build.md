---
section: module
number: "05"
title: Build
step: Architect
---

# Module 05 · Build

**The decision.** In what order are you building this, and which parts are you
not delegating to a model?

**Why it is cheaper here.** With an assistant in the editor, the default build
order is whatever the model suggests next, which is usually whatever is easiest
to generate. That produces a lot of code quickly and leaves the risky part
until last, because the risky part is the hardest to generate. The order is
the whole point: the cheapest build sequence is the one that attacks the
largest unknown first, while changing your mind is still free.

## The work

### Sequence by risk, not by layer

The instinct is to build bottom-up: schema, API, interface. The instinct is
wrong here, because the schema encodes assumptions you cannot test until
something is running end to end.

Build one vertical slice through the riskiest part first. For most AI products
that means: the single hardest AI call, running on twenty real inputs, with the
crudest possible interface around it. Ugly is fine. The slice exists to tell
you whether the capability assumption from module 01 survives contact with
production conditions.

Then widen. Each subsequent slice should produce something demonstrable — a
thing you could show someone and get a reaction to. If a step on your build
list produces nothing demonstrable, it is probably infrastructure you have not
yet justified.

### Write the definition of done per slice

Three lines each. What works, what is tested, and what you deliberately left
rough.

The third line is the one that prevents the slow accumulation of unacknowledged
debt. "The retry logic is a fixed three attempts, no backoff, because we have
not yet seen the failure distribution" is a known shortcut. The same code with
no note is a landmine.

### Name what the model does not decide

With an assistant generating most of the code, the scarce resource is not
typing, it is judgement. Decide in advance which things a human owns:

| Owned by a human | Why |
| --- | --- |
| The data model | It is the most expensive thing to change and the model will happily produce a plausible-looking one that encodes the wrong assumption. |
| Anything touching auth, permissions or money | A confident wrong answer here is a security incident rather than a bug. |
| The AI boundary contract | What the component is allowed to return, and what happens when it does not. |
| Dependencies added | Every one is a maintenance commitment, and models add them freely. |
| What gets deleted | Models are reluctant to remove code. Left alone, the codebase only grows. |

Everything else is fair game, and should be — refusing the leverage because it
is fashionable to worry about it is just slower.

> **ARC Skills, appendix A.** Twenty agent skills with triggers, steps and
> guardrails, for operator work like PR review, incident timelines and prompt
> ship review. They are most useful here: the review skills are how you keep
> the quality bar constant when the volume of generated code goes up.

> **AI Workflow Templates, appendix C.** Sixteen end-to-end workflows with the
> prompt, the tools it calls, the input schema and the human gate already in
> place. Start from the nearest one rather than from an empty file.

### Keep the evaluation set running from day one

The twenty real inputs you collected in module 02 become a script you can run
at any time. Not a test suite yet — module 06 does that — just a command that
produces output for all twenty so you can look at them.

The value is the comparison. When you change a prompt, you want to know what
else moved. Without the set, prompt changes are judged on the one example you
were thinking about, which is how a product gets better at the case you
demonstrated and worse at everything else.

### Set a cost ceiling before the first real user

Work out what one complete run of the workflow costs in tokens and calls, and
multiply by the usage you expect. Do this at the first slice, not at launch.

If the number is uncomfortable, the fix is architectural — a smaller model for
the routine path, caching, fewer passes — and architectural fixes are cheap now
and expensive later. This also feeds the per-user operating cost in module 07.

## You should be holding

- [ ] A build order starting with the riskiest slice, each step demonstrable
- [ ] A definition of done per slice, including what you left rough
- [ ] A written list of what a human decides regardless of assistant output
- [ ] A runnable script over the twenty real inputs
- [ ] A measured cost per complete workflow run

→ **Worksheet 8 — Build sequence**
→ **Appendix A — ARC Skills library**
→ **Appendix C — AI Workflow Templates**

## Where this bites

**The symptom:** the product is mostly built and the hardest AI call has not
been tried on real data. That is the risk sequence inverted, and it is the
single most common way an AI product arrives at launch and fails there.

**The second symptom:** code volume is going up and nobody has read a diff in
a week. Generated code you have not reviewed is not an asset, it is a liability
with good syntax. Keep the review rate constant and let it bound the build rate.

**The third symptom:** you cannot say what a run costs. You will find out from
an invoice, at the worst possible time, in the week your usage first grows.
