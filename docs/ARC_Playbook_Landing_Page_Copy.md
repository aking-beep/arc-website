# ARC Playbooks — Landing Page Copy

Source of truth for `/playbook`, alongside `lib/playbook.ts`. The page sells
three separate playbooks. It does not sell them as one book.

| Playbook | Price | What it is |
| --- | --- | --- |
| Define | USD $5, one-off | Part I, chapters 01–04. Should this product exist? |
| Build | USD $10, one-off | Part II, chapters 05–08. How should the system be built? |
| Ship | USD $20, one-off | Parts III–V. Evaluation, launch, operations, plus 20 skills, 20 architectures, 16 workflows, and the 30-day sprint. |

Buying one does not include the others. All three together are $35, as three checkouts.

The charge is the Paddle price id for that playbook. The page does not invent one. A missing id leaves that playbook's button as "Checkout is not configured yet".

- **Routes:** `/playbook`, `/playbook/define`, `/playbook/build`, `/playbook/ship`
- **Public preview:** `/playbook/preview.pdf` is the opening of Define. Build and Ship are not in it.
- **Paid files:** one private PDF and one private ZIP per playbook. They are not in this repository.

## Page order

1. Hero. Three playbooks, buy the part of the work you are in.
2. The three prices, each with its own checkout.
3. The question each one answers.
4. The free preview, labelled as the opening of Define.
5. Who it is for.
6. FAQ, including that they are separate purchases.
