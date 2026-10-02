---
section: module
number: "02"
title: Validation
step: Validate
---

# Module 02 · Validation

**The decision.** Have you seen enough evidence to justify building the MVP,
against a threshold you set before you looked?

**Why it is cheaper here.** Validation is the only module where the output can
be "stop", and stopping is worth the entire price of this Playbook if the
alternative was three months of building. Every later module assumes the
answer was "go", and quietly increases the cost of discovering it should not
have been.

## The work

### Set the threshold first

Before you talk to anyone, write down the result that means go and the result
that means stop.

> We will build the MVP if **at least [N] of [M]** people we speak to
> [specific observable behaviour]. If fewer than [N] do, we will
> [narrow / pivot / stop].

The behaviour must be observable, not stated. "Says they would use it" is not
observable. These are:

- Shows you the spreadsheet they currently use, unprompted
- Has already paid for something to solve this
- Agrees to a scheduled follow-up without being chased
- Gives you their real data to run the test on
- Asks when they can have it, twice

Pick a threshold that could realistically fail. If you set it where you are
confident of passing, you have not set a threshold, you have written a
prediction.

### Talk to the specific person, not the market

Five to ten conversations with people who fit slot one of your hypothesis beats
a hundred survey responses from a category. Ask about history, not intent:

| Ask this | Not this |
| --- | --- |
| How did you handle this last time? | Would you use a tool that…? |
| What did you try before that? | Does this sound useful? |
| Why did you stop using it? | How much would you pay? |
| What happens if you just do nothing? | Would you pay $39 for this? |
| Who else has this problem here? | Do you know anyone who needs this? |

Two questions carry most of the weight. **"What do you do today?"** tells you
the real alternative. **"What did you stop using, and why?"** tells you what
failure looks like in this person's world, which is the single most useful
input into module 06.

### Cost the alternative

Whatever they do today has a cost: hours per week, errors per month, a salary,
a licence fee, or a risk they are carrying. Get a number, even a rough one.
Then compare it to your price.

If the current alternative costs them twenty minutes a month, a $39 product has
to be nearly free to adopt and a $400 one is not happening. This is the single
cheapest way to find out whether your price is possible, and it costs one
question.

### Run the capability test on their data

For AI products this is the step that separates validation from a nice
conversation. Ask one person for twenty real inputs — their actual documents,
tickets, transcripts, rows. Run them by hand. Record what fraction produced an
answer they would accept.

You now have three things: a demand signal, a capability baseline, and the
beginnings of the evaluation set you will need in module 06. Keep those twenty
inputs. Name the file and put it somewhere permanent.

### Write the result against the threshold

One paragraph. What the threshold was, what happened, and the decision. Date
it. This paragraph is what stops you relitigating the decision in month three
when the build gets hard.

## You should be holding

- [ ] A go / no-go threshold written before any conversations
- [ ] Five to ten conversations with people matching slot one
- [ ] The named real alternative, and roughly what it costs them
- [ ] Twenty real inputs, saved, with a pass rate from running them by hand
- [ ] A dated paragraph recording the result against the threshold

→ **Worksheet 3 — Validation plan and threshold**
→ **Worksheet 4 — Conversation log**
→ **Worksheet 5 — Alternative cost**

## Where this bites

**The symptom:** every conversation is encouraging and none of them produces a
follow-up. Enthusiasm is cheap and almost perfectly uncorrelated with adoption.
Count commitments — data, time, money, a diary entry — and ignore sentiment.

**The second symptom:** you moved the threshold. If you find yourself
explaining why the original number was unrealistic, stop and read the dated
paragraph you wrote before you started. You are allowed to change your mind
about the product. You are not allowed to change the test after seeing the
result and still call it evidence.

**The third symptom:** you never ran the capability test, because the demo
worked. The demo used inputs you chose. Real inputs are messier in ways you
cannot predict, and the gap between the two is where most AI products die.
