# ARC Playbooks — Landing Page Copy

Source of truth for `/playbook`, alongside `lib/playbook.ts`. The page sells
three separate playbooks. It does not sell them as one book.

| Playbook | Price | What it is |
| --- | --- | --- |
| Define | USD $5, one-off | Modules 01–03 (Idea, Validation, Product) and worksheets 1–6. |
| Build | USD $10, one-off | Modules 04, 05, and 07 (Architecture, Build, Production readiness) and worksheets 7, 8, and 10. |
| Ship | USD $20, one-off | Modules 06 and 08 (Evaluation, Launch), worksheets 9 and 11, plus 20 skills, 20 architectures, and 16 workflow templates. |

Buying one does not include the others. All three together are $35, as three checkouts.

The charge is the Paddle price id for that playbook. The page does not invent one. A missing id leaves that playbook's button as "Checkout is not configured yet".

- **Routes:** `/playbook`, `/playbook/define`, `/playbook/build`, `/playbook/ship`
- **Public preview:** `/playbook/preview.pdf` is the opening of Define, through the first page of Module 01. Build and Ship are not in it.
- **Paid files:** `npm run playbook:build` writes one PDF and one ZIP per playbook under `playbook/build/`, which is gitignored. `npm run playbook:provision` creates the Paddle prices and uploads those files when the account keys are present. It does not invent a price id.

## Page order

1. Hero. Three playbooks, buy the part of the work you are in.
2. The three prices, each with its own checkout.
3. The question each one answers.
4. The free preview, labelled as the opening of Define.
5. Who it is for.
6. FAQ, including that they are separate purchases.
