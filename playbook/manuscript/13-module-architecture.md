---
section: module
number: "04"
title: Architecture
step: Architect
---

# Module 04 · Architecture

**The decision.** What are the parts, where does the AI boundary sit, and which
trade-offs have you knowingly accepted?

**Why it is cheaper here.** Architecture is the set of decisions that are
expensive to reverse. You will make them whether or not you do it deliberately
— defaulting is also a decision, just one nobody recorded. The cost of drawing
the diagram is an afternoon. The cost of discovering in month four that the AI
boundary was never defined is every conversation where someone argues that
model output should have been correct.

## The work

### Draw the components, then mark the boundary

Keep the diagram small enough to fit on one page. Boxes for: the interface, the
application logic, the AI components, the data stores, the external services,
and the jobs that run without a user present.

Then draw a line around everything whose output is probabilistic.

Inside the boundary, output can be wrong in ways you cannot fully prevent, only
detect and contain. Outside it, behaviour is deterministic and a wrong answer is
a bug. The line is the most useful thing on the diagram because it tells you
where validation, retries, human review and fallbacks have to live. Every one
of those belongs at the boundary, not scattered through the application.

Teams that skip this line end up defending model output as if it were a
database read.

### Decide the AI component shape

For each AI component, four questions:

| Question | The trade-off you are accepting |
| --- | --- |
| Single call, chain, or agent loop? | A loop can handle variety you did not anticipate; it also fails in ways you cannot enumerate, and costs are unbounded unless you bound them. |
| Does it need your data at inference time? | Retrieval adds a pipeline, a freshness problem and a relevance failure mode. Not retrieving means the answer is generic. |
| Does it call tools or only produce text? | Tools make it useful and make it capable of doing damage. Every tool needs a permission answer. |
| Who checks the output, and when? | A human gate caps your throughput. No gate caps your blast radius at nothing. |

Write the answers down with the trade-off beside each one. The trade-off is the
part you will need later; the decision on its own looks arbitrary in six months.

> **Reference architectures, appendix B.** Twenty system shapes from delivery
> work, each naming the problem, the component shape, the key decisions, the
> failure modes, when not to use it, and the scaling path. Find the closest
> shape and start from it. Do not adopt one whose "when not to use it" section
> describes your situation.

### Follow the data

For each thing the product needs to know: where it comes from, who owns it, how
fresh it has to be, where it is stored, how long you keep it, and whether it
leaves your infrastructure.

That last column is the one that becomes a procurement question later. If
customer data is going to a third-party model provider, decide now whether that
is acceptable and write down what you will tell a customer who asks. The answer
is much harder to construct after you have signed someone.

Personal data gets a retention period here, not in module 07. Retention chosen
after launch means a migration.

### Choose infrastructure by operational load, not by preference

The question is not which platform is best. It is how much operational work you
are signing up for, given how many people you have. One person running a
Kubernetes cluster is one person not building the product.

Default to boring: managed database, managed hosting, managed queue if you need
one. Introduce something you have to operate yourself only when you can name
what it buys you.

### Record the decisions

Short entries. Decision, the options you did not take, the reason, and the
signal that would make you revisit it. Five to ten of these covers a V1
architecture.

The revisit signal is what makes the record useful rather than ceremonial: "we
chose a single call rather than a loop; revisit if more than one in five inputs
needs a second pass."

## You should be holding

- [ ] A one-page component diagram with the AI boundary drawn on it
- [ ] Shape decisions for each AI component, with trade-offs named
- [ ] A data table: source, owner, freshness, storage, retention, egress
- [ ] An infrastructure choice justified by operational load
- [ ] Five to ten decision records, each with a revisit signal

→ **Worksheet 7 — Architecture decision record**
→ **Appendix B — Reference Architectures**

## Where this bites

**The symptom:** the diagram has no boundary on it, and discussions about
quality keep turning into discussions about bugs. Until the line exists, nobody
agrees on which failures are defects and which are the cost of using a model.

**The second symptom:** you chose an agent loop because it was the interesting
option. Loops are appropriate when the task genuinely varies in structure. If
the task is the same shape every time, a loop is a chain with unpredictable
cost and a harder debugging story.

**The third symptom:** nobody can say where customer data ends up. If three
people give three answers, you do not have an architecture, you have an
implementation that happened.
