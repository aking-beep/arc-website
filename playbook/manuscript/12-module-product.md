---
section: module
number: "03"
title: Product
step: Define
---

# Module 03 · Product

**The decision.** What is the single workflow the first version has to do well,
and what are you explicitly not building?

**Why it is cheaper here.** Scope that is never written down does not stay
constant, it grows. Every week it grows by whatever was most recently
suggested, and nobody notices because no version of the scope was ever
authoritative. An exclusions list costs an uncomfortable half hour now. The
same conversation in month three costs you the architecture you built for the
feature you are about to cut.

## The work

### State the value proposition in one line

Not a tagline. A sentence a customer would recognise as a description of their
own situation:

> [Customer] gets [outcome] in [time or effort] instead of [current cost].

If you cannot fill in the fourth slot with a number — hours, dollars, errors,
days — go back to module 02. You did not cost the alternative.

### Pick one workflow

Write out the complete path from the user's trigger to the point where they
have what they came for. Every step. Then ask of each one: if this step did
not exist in version one, is the outcome still achieved?

Most products have three or four plausible workflows and the temptation is to
support all of them partially. Partially supporting three workflows means
nobody completes any of them, and you learn nothing from usage because no path
was ever good enough to measure.

One workflow, end to end, is also the only scope small enough that you can tell
whether the AI component is good enough. Spread across three, a mediocre result
looks like a product problem rather than a capability problem.

### Sort requirements into three lists

| List | Test | What it means |
| --- | --- | --- |
| **Must** | The chosen workflow does not complete without it | Build it |
| **Should** | The workflow completes but the user is annoyed | Build it if the must list lands early |
| **Not yet** | Everything else, including good ideas | Write it down and stop discussing it |

The third list is the one that does the work. "Not yet" is not "no", and saying
so out loud is usually enough to end the argument — most scope disputes are
really about whether someone's idea has been heard.

Be suspicious of a must list longer than about ten items. A long must list
usually means the workflow is actually two workflows.

### Write the exclusions, and write why

Exclusions without reasons get reversed by whoever did not attend the meeting.
Give each one a sentence:

> **No multi-user accounts in V1.** The hypothesis is about an individual
> operator. Accounts add auth, roles, billing seats and a data model we would
> have to migrate if the hypothesis changes.

Four to eight exclusions is normal. Include at least one that will be
genuinely tempting, because an exclusions list made only of things nobody
wanted is decoration.

### Decide what "good enough" means for the AI part

One sentence, now, in plain language, before any architecture exists. Not a
metric yet — module 06 turns this into thresholds — but the shape of the
answer:

> The summary is good enough if a reviewer would send it without editing it,
> four times out of five, and the fifth needs a small edit rather than a
> rewrite.

Writing this in module 03 rather than module 06 matters because it is an input
to the architecture. "Four times out of five, with the fifth needing an edit"
implies a human review step. A product that needs to be right ninety-nine times
in a hundred implies something else entirely, and you want to know which one
you are building before you draw the diagram.

## You should be holding

- [ ] A value proposition line with a quantified alternative in it
- [ ] One workflow, written step by step from trigger to outcome
- [ ] Requirements sorted into must / should / not yet
- [ ] An exclusions list, each with a one-sentence reason
- [ ] A plain-language definition of good enough for the AI component

→ **Worksheet 6 — MVP scope and exclusions**

## Where this bites

**The symptom:** the must list grows and nothing ever moves to "not yet". A
scope list that only grows is not a scope list. Set the rule that adding a must
requires naming the must it displaces, and the conversation changes character
immediately.

**The second symptom:** you cannot describe the workflow without using the word
"or". Every "or" is a branch, and branches in version one are usually two
products wearing one name.

**The third symptom:** the definition of good enough is "accurate". Accurate
against what, judged by whom, how often? If the answer is vague here it will be
vague in module 06, and you will end up shipping on vibes and arguing about
quality with no shared reference.
