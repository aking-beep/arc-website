---
section: front
title: The five-step system
---

# The five-step system

Five steps, in the order that makes each one cheaper.

<div class="system-grid">

**01 · Validate** — Is this worth building at all?
Turn the idea into a hypothesis with a named customer, a named problem and the
evidence that would change your mind.
*Modules 01, 02*

**02 · Define** — What exactly are we building, and what are we not?
Value proposition, the one workflow that matters, the requirements, and an
explicit list of what the MVP excludes.
*Module 03*

**03 · Architect** — How will this hold up once it is real?
Application shape, AI components, data, integrations, infrastructure and the
build sequence that follows from them.
*Modules 04, 05*

**04 · Harden** — How do we know it works, and what happens when it does not?
Evaluation criteria for the AI itself, then security, privacy, monitoring and
the operational load you are taking on.
*Modules 06, 07*

**05 · Launch** — How does anyone find it, and how do we know it worked?
Distribution, pricing, the measures that matter, and how you iterate once real
users arrive.
*Module 08*

</div>

## Why this order

The argument is cost, not tidiness.

Finding out nobody wants it costs a conversation in step 01. It costs a
rebuild in step 03, and a failed launch in step 05.

Deciding what the MVP excludes costs an argument in step 02. Deciding it after
the architecture exists costs you the parts of the architecture that only
existed to support the thing you just cut.

Setting an evaluation threshold costs ten minutes in step 04. Setting it after
you have seen the results costs you the ability to believe your own numbers,
because a threshold chosen afterwards is a description of what you already
wanted to do.

## The one page version

> Decide who it is for and what would change your mind. Decide the single
> workflow and write down what you are not building. Draw the system and mark
> the line where the AI starts. Decide what "working" means before you measure
> it, then make it safe to operate. Pick one channel, set a price you can
> defend, and name the two numbers that decide whether to keep going.

Everything after this page is that paragraph with the trade-offs filled in.

## What this Playbook does not cover

Worth knowing before you spend the time:

- **Fundraising.** Nothing here is about a deck or a round.
- **Hiring and team design.** The method assumes between one and five people.
- **Model training.** The assumption throughout is that you are composing
  existing models, not training your own. If you are training, modules 04 and
  06 still apply but they are not sufficient.
- **Regulated-sector compliance.** Module 07 covers security and privacy as
  engineering work. It is not a substitute for advice on a specific regime.
