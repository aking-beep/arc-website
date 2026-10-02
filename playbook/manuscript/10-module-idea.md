---
section: module
number: "01"
title: Idea
step: Validate
---

# Module 01 · Idea

**The decision.** What is the one-sentence claim this product makes, and what
would have to be true for it to be worth building?

**Why it is cheaper here.** An idea stated as a sentence can be argued with. An
idea stated as a working prototype can only be defended, because by then you
have paid for it. The cost of changing your mind rises with every hour of
build time, and it rises fastest right after the first demo gets a polite
reaction.

## The work

### Write the hypothesis as one sentence

Use this shape, and resist the urge to improve it:

> **For** [a specific person] **who** [has a specific problem], **this gives
> them** [a specific outcome] **instead of** [what they do today].

Four slots. If any slot contains a category rather than a specific — "for
teams", "for businesses", "for developers" — you do not have a hypothesis yet,
you have a market. Narrow it until a real person you could name fits in the
first slot.

The fourth slot is the one people skip. "Instead of nothing" is almost never
true. Whatever your product does, someone is currently doing it with a
spreadsheet, an intern, a Slack channel, or by tolerating the problem. That is
your real competitor, and it is usually much stronger than the obvious
alternative because it already has their trust and costs nothing to keep using.

### Name the riskiest assumption

List everything that has to be true for the sentence to hold. You will get
somewhere between five and fifteen items. They fall into four kinds:

| Kind | The question | Typical failure |
| --- | --- | --- |
| Demand | Do they want this outcome enough to change behaviour? | They agree it is a problem and keep doing it the old way. |
| Capability | Can the technology actually produce the outcome reliably? | It works in the demo and fails on real inputs. |
| Access | Can you reach these people at a cost the price supports? | The product works and nobody finds it. |
| Workflow | Does the outcome fit where they already work? | It requires them to open one more tab, so they do not. |

Now pick the single assumption that, if false, kills the product. Not the one
that is most interesting, and not the one you most enjoy working on. One
assumption. Circle it.

For AI products the riskiest assumption is usually capability or workflow, and
founders usually test demand, because demand is the easiest to ask about and
the most flattering to hear about.

### Decide the cheapest test

Against the circled assumption, write the cheapest thing that would produce
evidence. Cheap means hours, not weeks.

Some tests that cost almost nothing and are routinely skipped:

- **For capability:** run the hardest twenty real inputs you can find through
  the model by hand, in a chat window, before building anything. If it fails on
  nine of them, you have learned the most valuable thing available to you this
  month.
- **For workflow:** watch one person do the task the current way, with their
  real data, without interrupting. Count the steps.
- **For demand:** ask what they tried already and what they stopped using.
  People are unreliable about what they will do and quite reliable about what
  they have done.
- **For access:** try to find ten of these people this week by the channel you
  are planning to use at launch.

### Write what you will do if it fails

One line. If the test comes back negative, do you narrow the customer, change
the outcome, or stop? Writing it now is the only way the answer is honest,
because after the result arrives you will be attached to the work.

## You should be holding

- [ ] A hypothesis sentence with four specific slots, no categories
- [ ] A list of assumptions, sorted into demand, capability, access, workflow
- [ ] One assumption circled as the riskiest
- [ ] A test against it you can run in hours, not weeks
- [ ] A written decision for what happens if the test fails

→ **Worksheet 1 — Product hypothesis**
→ **Worksheet 2 — Assumption register**

## Where this bites

**The symptom:** you find yourself explaining the product by describing what it
does rather than who it is for. Watch for the phrase "it could also be used
for." Every clause after that phrase is a different product you are not
building, and each one makes the first slot of the hypothesis less specific.

**The other symptom:** your riskiest assumption is the one you already tested.
That is motivated reasoning doing its job. Go back and pick the one you have
been avoiding.
