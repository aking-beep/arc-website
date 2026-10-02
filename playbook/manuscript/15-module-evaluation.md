---
section: module
number: "06"
title: Evaluation
step: Harden
---

# Module 06 · Evaluation

**The decision.** What does "working" mean in numbers, and which failures have
you accepted?

**Why it is cheaper here.** A threshold set before you measure is a test. The
same threshold set after you measure is a description of the result you already
had. Once you have seen the output, you cannot unsee it, and every number you
choose afterwards will be quietly influenced by what you know is achievable.
This is not a character flaw, it is how everyone works, and the only defence is
sequence.

## The work

### Build the evaluation set from real inputs

Start with the twenty inputs from module 02 and grow to somewhere between fifty
and two hundred. Size matters less than composition. You need:

- **The ordinary case**, in bulk. Most of the set.
- **The messy real ones** — bad formatting, missing fields, wrong language,
  someone's scanned fax.
- **The edge cases you know about** from the conversations in module 02.
- **The ones that should be refused.** Out of scope, harmful, or asking for
  something the product should decline. A product with no refusal cases in its
  eval set has never been tested on what it does when it should say no.

Do not clean the inputs. The messiness is the signal. If you cannot find enough
real inputs, that is a validation problem rather than an evaluation problem,
and module 02 is where you fix it.

### Choose how each output is judged

Three mechanisms, in descending order of reliability and ascending order of
cost per item:

| Mechanism | Use it for | Watch out for |
| --- | --- | --- |
| Deterministic check | Structure, schema, required fields, forbidden content, length, a known correct value | It only tests what you can specify exactly, which is less than you think |
| Model-as-judge | Tone, relevance, whether the answer addresses the question | The judge has its own failure modes; calibrate it against human labels on a sample or you are measuring one model's opinion of another |
| Human review | Anything where being subtly wrong matters | Expensive, so reserve it for a sample and for the cases the other two flag |

Most products need all three. Run the deterministic checks on everything, the
judge on everything it is calibrated for, and humans on a rotating sample plus
all disagreements.

### Write the thresholds down, dated, before you run

One line per criterion, with the number and the consequence:

> Structural validity ≥ 99%. Below this we do not ship, no exceptions.
> Acceptable-without-edit ≥ 70% on the ordinary set. Below this we ship behind
> a human review gate rather than not shipping.
> Correct refusal ≥ 95% on the refusal set. Below this we do not ship.

Note that the thresholds have different consequences. Not every number is a
launch blocker, and pretending otherwise means the one that really is a blocker
gets negotiated along with the rest.

Date the page. This is the artefact that makes the result meaningful.

### Enumerate the failure modes and decide about each one

List how this can be wrong, and sort:

- **Accepted.** Documented, visible to the user, within the defined boundary.
  "Occasionally too verbose" belongs here.
- **Mitigated.** Still possible, but caught — a validator, a retry, a fallback,
  a review step.
- **Blocking.** Cannot ship with this. Fabricating a figure in a financial
  summary, leaking one customer's data into another's output, taking an action
  the user did not authorise.

Every accepted failure needs a sentence you would be willing to say to a
customer. If you would not say it out loud, it is not accepted, it is ignored.

### Make it repeatable, and keep the history

One command, full set, results in a file with a date and the version of what
you ran. Keep every run.

The history is what tells you whether last week's prompt change helped or just
moved the failures around. Without it, you have an opinion about the direction
of travel.

## You should be holding

- [ ] An evaluation set of real inputs, including refusal cases
- [ ] A judging mechanism chosen per criterion, with the judge calibrated
- [ ] Dated thresholds written before the first measured run
- [ ] A failure-mode list sorted into accepted, mitigated and blocking
- [ ] A one-command run, with results kept over time

→ **Worksheet 9 — Evaluation plan**

## Where this bites

**The symptom:** the eval set is made of examples that work. They got added
because someone was demonstrating something. A set that passes at 100% is
measuring nothing — add the inputs that fail until it does not.

**The second symptom:** the score moved and nobody can say why. Change one
thing per run, or accept that you are tuning blind and will eventually tune
backwards.

**The third symptom:** the threshold was met by redefining the criterion. The
honest version is to miss the threshold and ship anyway with the reason
recorded. That leaves you with a true number and a decision. Redefining leaves
you with a false number and no decision.
