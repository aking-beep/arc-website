---
section: module
number: "07"
title: Production readiness
step: Harden
---

# Module 07 · Production readiness

**The decision.** What breaks, who finds out, and what does running this
actually cost you per user?

**Why it is cheaper here.** Everything in this module is work you will do
eventually. The only question is whether you do it on a Tuesday afternoon or
during an incident with a customer on the phone. The second version costs the
same engineering hours plus the trust, and trust is the expensive part for a
product nobody has used yet.

## The work

### Security, as a pass against a written list

Not a philosophy. A list you walk down, with a yes or a dated ticket beside
each line.

- Secrets are in environment configuration, not in the repository or the
  client bundle. Check the built bundle, not the source.
- Every endpoint that does something has an authorisation check, and the check
  is server-side. A hidden button is not an authorisation model.
- Inputs that reach a model are treated as untrusted, including anything the
  model retrieved. Content a user supplied can contain instructions, and the
  model has no reliable way to tell those apart from yours.
- Model output that reaches a tool, a shell, a query or a page is validated
  against a schema or escaped before it gets there. This is the single highest
  severity failure mode in AI products: the boundary from module 04 is exactly
  where it is defended.
- Rate limits exist on anything expensive, anything that sends email, and
  anything unauthenticated.
- Dependencies have been looked at once, deliberately.

### Privacy, as answers you can give out loud

Four questions a customer will eventually ask, so have the answers written:

What personal data do you hold, and why. Where does it go, including which
third parties and which model providers. How long do you keep it. How does
someone get it deleted, and what is the actual mechanism rather than the
intention.

If the model provider's terms allow training on your inputs and you have not
turned that off, that is a decision. Make it consciously and write down which
way you went.

### Decide what you watch, then cut it

List every signal you could watch. Then cross out everything nobody would get
out of bed for.

What remains is monitoring. The rest is a dashboard, which is fine, but a
dashboard nobody is looking at during the failure is not a safety mechanism.

For AI products the list that usually matters is short: error rate at the
boundary, latency at the high percentile rather than the average, cost per
day against the ceiling from module 05, refusal and fallback rate, and the
rate at which humans override the output where a review gate exists.

That last one is the most undervalued signal you have. A rising override rate
is quality degrading before any user complains.

Then set exactly one alert that pages a person, with a threshold that has not
fired in testing. An alert that fires weekly trains everyone to ignore it, and
after a month you have no alerting at all, just noise with a pager attached.

### Analytics: instrument the decisions, not the surface

Pick the handful of events that tell you whether the product worked for
someone: the workflow started, the workflow completed, the output was accepted,
the output was rejected or edited, the user came back. Five or six events,
named consistently, is more useful than forty inconsistent ones.

Name them before you implement them. Renaming an event after it has history is
how analytics quietly becomes untrustworthy.

### Cost per user, honestly

Take the per-run cost from module 05, multiply by the runs an active user
actually makes in a month, and add the fixed infrastructure divided across the
users you expect.

Compare that to the price. If the margin is thin at the usage level of your
most enthusiastic user, you have a pricing or an architecture problem, and
module 08 needs to know about it before you set a price.

### Write the operations page

One page, so that the person on call at 2am — probably you, in six months,
having forgotten all of this — can act.

How to deploy. How to roll back. What to do if the model provider is down,
which they will be. Who to contact. Where the logs are. What the one alert
means and what to do about it.

## You should be holding

- [ ] The security list walked, each line a yes or a dated ticket
- [ ] Written privacy answers: what, where, how long, how deleted
- [ ] A short watch list, and exactly one alert that pages someone
- [ ] Five or six consistently named product events
- [ ] An honest cost per active user, compared against the price
- [ ] A one-page operations runbook

→ **Worksheet 10 — Production readiness checklist**

## Where this bites

**The symptom:** model output goes straight into a query, a shell, a tool call
or raw HTML. Everything you built at the boundary in module 04 is undone by one
unvalidated path, and this is the failure mode that turns into a disclosure
rather than a bug report.

**The second symptom:** there are eleven alerts and everyone has muted the
channel. More alerting than you can act on is less alerting than one you
respect.

**The third symptom:** nobody knows the cost per user. The margin is a number
you either chose or discovered. Discovering it usually happens in the month
things finally start working.
