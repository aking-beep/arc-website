# ARC Transformation Group — Website

The front door to one question: **what are your agents allowed to do, and who
signed off?**

The site leads with agent governance. The free scan and the frameworks are the
top of the funnel, the Agent Access Assessment is the thing with a price on it,
and the consulting work that pays the bills today sits one click behind
`/consulting` rather than on the home page.

Content lives in `lib/`, so a new engagement or tool is an entry in an array
rather than a new website.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with a CSS-variable design system (light + dark mode)
- **IBM Plex Sans / Mono** via `next/font`
- **next-themes** for theme switching
- **lucide-react** for icons
- Marketing content lives in `lib/content.ts` — no CMS, no database behind the pages
- Contact form posts to `/api/contact` (optional Resend delivery)
- Three commercial products at `/playbook`: **Define ($5)**, **Build ($10)**,
  and **Ship ($20)**, sold separately through Paddle with purchases stored in
  Supabase. Everything commerce-related is env-driven and inert until
  configured — see [Selling the Playbooks](#selling-the-playbooks).

Design direction is deliberately restrained (Linear / Vercel / Anthropic / Stripe): whitespace, strong typography, subtle motion, almost no stock photography.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — set RESEND_API_KEY for email delivery
npm run dev                  # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

Checks:

```bash
npm run lint
npm run typecheck
npm test          # token validation and webhook idempotency
```

Build the sellable Playbook artefacts (PDF + ZIP):

```bash
npm run playbook:build
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, **New Project → Import** the repo. Framework preset auto-detects **Next.js**.
3. Optional env vars for the contact form: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Add the custom domain. The canonical host is **`arctransformationgroup.com`** — it is the domain we own and the one Google Workspace mail already runs on. See the DNS cutover below.

## DNS cutover to Vercel

`arctransformationgroup.com` is registered at Squarespace Domains and its DNS is
served by Google Cloud nameservers (`ns-cloud-a*.googledomains.com`), left over
from Google Domains. Edit the records in the Squarespace domain dashboard.

**Change these** (use the exact values on the domain card in Vercel → project →
Settings → Domains; Vercel assigns per-project anycast addresses, so do not copy
an IP out of a blog post):

| Record | Host | From | To |
| ------ | ---- | ---- | -- |
| A | `@` | Squarespace: `198.185.159.144/145`, `198.49.23.144/145` | the A value on the Vercel domain card |
| CNAME | `www` | `ext-sq.squarespace.com` | the CNAME target on the Vercel domain card |

**Leave these alone** — they carry the mail for `aking@arctransformationgroup.com`:

| Record | Host | Value |
| ------ | ---- | ----- |
| MX | `@` | `smtp.google.com` (priority 1) |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |
| TXT | `google._domainkey` | the DKIM public key |

Do **not** delegate the nameservers to Vercel. Nameserver delegation moves the
whole zone, and any record not recreated on the new provider — mail included —
stops resolving. Changing the two web records at the current provider keeps mail
untouched.

Two things to check while you are in there: disconnect the domain from the
Squarespace site first, or Squarespace may re-add its own A records; and there is
no `_dmarc` TXT record on the domain, so SPF and DKIM are in place but nothing
tells receivers what to do with mail that fails them. Adding one is unrelated to
the deploy but worth doing.

After DNS propagates, load the site in a private window. Vercel's deployment
protection is what makes the generated `*.vercel.app` URLs demand a login;
production custom domains should be public, and that is worth confirming with
your own eyes rather than assuming.

## Project structure

```
app/
  layout.tsx              Root layout: fonts, theme provider, nothing else
  (site)/                 Everything with the site header and footer
    page.tsx              Home — the chain, the artifact, the ladder
    agents/               The wedge hub
    agents/control/       Agent Control — research, deliberately not in the nav
    assessment/           The one offer with a price on it
    labs/                 Free tools, each carrying its state
    frameworks/           The three free frameworks (was /playbooks)
    research/             Cited briefs
    consulting/           Modernize / Automate / Build / Operate, engagements,
                          retainers, workshops — one page
    services/[slug]/      The four areas, kept for inbound links
    advisory/             How engagements are shaped
    playbook/             The three paid PDFs and their checkout
  (offer)/offer/          Ad landing pages: no site nav, one decision each
  api/                    Contact, Paddle webhook, playbook download
components/
  ui/                     Primitives (button, card, badge, section)
  agent-chain.tsx         The canonical nine-node chain, with coverage state
  evidence-artifact.tsx   The Agent Access Record, shown rather than described
  price-block.tsx         A price, where a buyer can see it
  capture-form.tsx        One-field email capture
  cta.tsx                 Four closing asks, by intent
  diagram.tsx             Panel, FlowChain, FlowStack, SplitClaim, Takeaway
lib/
  content.ts              Labs, engagements, signals, nav, the state scale
  ark.ts                  The chain, the assessment, Agent Control
  services.ts             The four areas and the home page copy
  research.ts             Cited briefs
  learn.ts                The free frameworks and the scorecard
docs/
  WRITING.md              The copy standard every page has to pass
  GRILL-AUDIT.md          Commercial audit
  IMPECCABLE-AUDIT.md     Product design, IA and conversion audit
```

### States

Five, and they render differently from each other on purpose:

| State | Means |
| --- | --- |
| `available` | Buy it or use it today. The page says what it costs. |
| `beta` | Works, in use, surface still moving. |
| `labs` | Free tool. Source published. No account. |
| `research` | Thinking, no implementation. Nothing to sign up for. |
| `soon` | Committed, not built. The page says what is missing. |

Shape carries the meaning alongside colour, so the scale survives greyscale.
`lib/content.ts` holds the scale; `components/ui/badge.tsx` renders it.

## Keeping the site current

`marketSignals` in `lib/content.ts` is the dated read on what changed in the
market, rendered on the home and Labs pages. Every signal needs a date, at
least one source URL, and an internal link to the tool or brief that answers
it. Update `marketSignalsUpdated` when you review the list, and delete signals
older than a quarter rather than letting them age on the homepage. If a
protocol, price, or regulation changes, fix the affected product copy in the
same pass — stale product claims cost more trust than a thin signal list.

Every page has to pass the copy standard in [`docs/WRITING.md`](docs/WRITING.md)
before it ships. The short version: name the buyer's problem before naming the
discipline, and do not announce a quality the page can demonstrate instead.

The header carries six entries and no dropdowns. Every one is a destination;
the hub pages carry the depth. `lib/content.ts` holds the list. Agent Control
is deliberately absent from it — it is research, it cannot be bought, and a nav
slot would imply otherwise.

Consulting engagements live under `/advisory/<slug>` and are collected on
`/consulting`. When you add one, give it a `focus` label describing the problem
it solves rather than an internal codename.

## Adding a new product (the whole point)

1. Add an entry to the relevant array in `lib/content.ts`.
2. It appears automatically on its pillar page and, if it has a `slug`, gets a full product page via the template.

No new website. Just content.

## Still intentional placeholders

- Photography / real product screenshots when the Labs tools have polished UIs worth capturing (product pages currently use designed report mock panels).
- MDX pipeline if you want research authored in Markdown instead of `lib/content.ts`.

## First deploy checklist

1. **Accounts:** enable 2FA on GitHub and Vercel.
2. **Repo:** push this project to a GitHub repo (org or personal).
3. **Vercel:** New Project → Import the repo → Framework = Next.js.
4. **Env vars** (Production + Preview):
   - `RESEND_API_KEY` — from [Resend](https://resend.com)
   - `CONTACT_TO_EMAIL` — usually `aking@arctransformationgroup.com`
   - `CONTACT_FROM_EMAIL` — a verified Resend sender
5. **Domain:** pick one canonical host (`.com` or `.org`), set it primary, 301 the other.
6. **Smoke test:** home, `/agents`, `/assessment`, `/labs/mcp-conformance-scanner`, `/frameworks`, `/contact`.
7. **Dependabot:** enable on the GitHub repo for dependency alerts.

Analytics ships via `@vercel/analytics` with no extra config once the project is on Vercel.

This is a static/server-rendered marketing site with **no user accounts and no
login.** Vercel manages the servers, TLS, and platform patching, which removes
the entire category of "stale server got exploited" that compromises most
small-business sites.

It is not quite "no stored customer data" any more. The Playbook stores one row
per purchase in Supabase: a Paddle transaction id, the buyer's email, the amount,
and a **hash** of the download token. The raw token exists only in the buyer's
email, so a leak of that table grants nobody a download. See
[Selling the Playbook](#selling-the-playbook) for the full posture.

The real risks are operational, not in the code. In priority order:

1. **Turn on 2FA — your accounts are the actual attack surface.** Whoever
   controls the **Vercel** and **GitHub** accounts can deploy anything to your
   domain. Enable two-factor auth on both. This is the single highest-value
   thing you can do and takes five minutes. Consider Vercel's Git-based deploy
   protections and requiring PR review before production deploys.

2. **Keep secrets in environment variables, never in the repo.** The contact
   form reads `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`
   from `process.env` (set them in Vercel → Project → Settings → Environment
   Variables). Never commit a key. `.env*` is already git-ignored. Leaked keys
   in a public repo are one of the most common real-world breaches.

3. **The contact form is the one input from strangers.** `app/api/contact/route.ts`
   already: rejects non-JSON, validates and length-caps every field
   server-side (client limits are bypassable), drops honeypot hits silently,
   and never reflects user input back in responses. If you get spam, add a
   rate limit (e.g. `@upstash/ratelimit` keyed on IP) or Vercel's built-in
   protections / a CAPTCHA. Do not remove the honeypot.

4. **Watch dependency alerts.** npm packages occasionally get CVEs. Enable
   **Dependabot** on the GitHub repo; updates are usually a one-line bump.
   Run `npm audit` before big releases.

Threat level rises only when a product with real logins and customer data
exists. That warrants its own security design (auth, session
management, data handling, least-privilege access) — handle it then, not now.

## Selling the Playbooks

`/playbook` sells three separate products. **Define** is USD 5 (modules 01–03
and worksheets 1–6). **Build** is USD 10 (modules 04, 05, and 07, and
worksheets 7, 8, and 10). **Ship** is USD 20 (modules 06 and 08, worksheets 9
and 11, and the skills, architectures, and workflow files). Buying one does
not include the others. Paddle takes the payment, a webhook records which
price was paid and emails a private download link, and the link resolves to
short-lived signed URLs for that playbook's PDF and ZIP in a private bucket.
There are no accounts.

The page prints those three amounts. Paddle charges whatever price id you put
in the matching variable, so each id has to be a one-time price of that amount.
The repository does not invent price ids. Until a playbook's id is set, its
button on `/playbook` reads "Checkout is not configured yet".

Ad destinations are `/offer`, `/offer/define`, `/offer/build`, and `/offer/ship`.
Point a campaign at the page for that playbook. The same checkout opens there
once the price id is set. Until then, the button asks for a payment link by
email, and the price on the button is the price on the page.

### How a purchase flows

1. `/playbook` renders the three playbooks. A checkout button loads
   `@paddle/paddle-js` on first click and opens Paddle's hosted overlay.
2. Paddle takes payment and posts `transaction.completed` to
   `/api/paddle/webhook`.
3. The webhook verifies the `Paddle-Signature` HMAC, mints a random entitlement
   token, and inserts one row keyed on the Paddle transaction id. The row stores
   only the **SHA-256 of the token**.
4. The token is emailed to the buyer as
   `/playbook/download/<token>`. It is never stored and never put in a query
   string.
5. The download page validates the token by hash, then a server route mints a
   5-minute signed URL for the requested object and counts the download.
6. `/playbook/success` thanks the buyer. It will offer an immediate download
   only after re-confirming the transaction against the Paddle API server-side,
   and only within 24 hours of payment — arriving at that URL proves nothing.

### Security posture

| Property | How |
| --- | --- |
| No secrets in the client bundle | Only `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` and the price id reach the browser, both public Paddle values. Server config is behind `server-only` in `lib/commerce/config.ts`. |
| Webhook signatures verified | HMAC-SHA256 over `ts:rawBody`, constant-time compare, 5-minute freshness window (`lib/commerce/paddle.ts`). |
| Idempotent processing | A unique index on `paddle_transaction_id` plus `resolution=ignore-duplicates`. A redelivery returns the original row, so the buyer's first token stays valid and no second email goes out. |
| Private storage only | The bucket is private. Nothing is ever served from a public object URL. |
| Signed URLs minted server-side | `signBundleUrl()` runs on the server after the entitlement check and the URL is used immediately, never rendered into the page. |
| Raw tokens never stored | Only the hash is persisted, in the database and in logs (first 8 characters, for support correlation). |
| No email in URLs | The download path carries a token and nothing else. |
| Rate limiting | Per-token and per-IP windows on the download route, per-IP on the webhook, per-transaction on the success action. In-memory and per-instance — the durable limit is the download count in Postgres. See `lib/commerce/rate-limit.ts`. |
| Tokenised routes are noindex | `noindex, nofollow, nocache` on `/playbook/download/[token]` and `/playbook/success`, plus `Disallow` in `robots.txt`. |

### Manual setup you have to do

None of this can be done from the repository, and nothing is fabricated here —
every identifier below has to come from your own accounts.

**1. Paddle**

1. Create a Paddle Billing account and work in **sandbox** first.
2. Catalog → Products → create three products, each with one one-time price:
   - *ARC Playbook: Define* at **USD 5.00** → `PLAYBOOK_DEFINE_PADDLE_PRICE_ID`
   - *ARC Playbook: Build* at **USD 10.00** → `PLAYBOOK_BUILD_PADDLE_PRICE_ID`
   - *ARC Playbook: Ship* at **USD 20.00** → `PLAYBOOK_SHIP_PADDLE_PRICE_ID`
   Copy each **price id** (`pri_...`). Do not reuse `PLAYBOOK_PADDLE_PRICE_ID`;
   that variable belonged to the old single product and is ignored.
3. Developer tools → Authentication → create an **API key** →
   `PADDLE_API_KEY`.
4. Developer tools → Authentication → **client-side token** →
   `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`.
5. Developer tools → Notifications → new destination,
   URL `https://<your-domain>/api/paddle/webhook`, event
   **`transaction.completed`**. Copy the secret key into
   `PADDLE_WEBHOOK_SECRET`.
6. Checkout settings → add your domain to the approved domains list, or the
   overlay will refuse to open.
7. Repeat all of the above in the production account when you are ready, and
   set `PADDLE_ENVIRONMENT=production`. Sandbox and production credentials are
   not interchangeable.

**2. Supabase**

1. Create a project. Copy the project URL into `SUPABASE_URL` and the
   **service-role** key into `SUPABASE_SERVICE_ROLE_KEY`.
2. Run `supabase/migrations/0001_playbook_purchases.sql` in the SQL editor.
3. Storage → create a bucket, **private** (public toggle off). Put its name in
   `PLAYBOOK_STORAGE_BUCKET`.
4. Build the three products with `npm run playbook:build`. That writes, under
   `playbook/build/` (gitignored):

   | Playbook | PDF | ZIP |
   | --- | --- | --- |
   | Define | `define/arc-playbook-define.pdf` | `define/arc-playbook-define.zip` |
   | Build | `build/arc-playbook-build.pdf` | `build/arc-playbook-build.zip` |
   | Ship | `ship/arc-playbook-ship.pdf` | `ship/arc-playbook-ship.zip` |

   The public preview at `public/playbook/preview.pdf` is the opening of
   Define, through the first page of Module 01. It is not a paid file.
5. With `PADDLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and
   `PLAYBOOK_STORAGE_BUCKET` in `.env.local`, `npm run playbook:provision`
   creates the three one-time sandbox prices and uploads the six objects.
   It writes the price ids and object paths into `.env.local`. It refuses a
   price that is not one-time USD 5.00, 10.00, or 20.00 for its playbook.
   Sandbox is the default. Live prices require `PADDLE_ENVIRONMENT=production`
   and `--confirm-production`. It cannot mint the client-side token or, unless
   you pass `--create-webhook` with a public https site URL, the webhook secret.

**3. Email**

1. Verify your sending domain in Resend, or delivery is limited to your own
   address.
2. Set `PLAYBOOK_FROM_EMAIL` and optionally `PLAYBOOK_REPLY_TO_EMAIL`.

**4. Vercel**

1. Add every variable below to Production and Preview.
2. Set `NEXT_PUBLIC_SITE_URL` explicitly in Production — otherwise the link in
   the purchase email is built from the per-deployment `VERCEL_URL`.

### Playbook environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `PADDLE_ENVIRONMENT` | optional | `sandbox` (default) or `production`. |
| `PADDLE_API_KEY` | checkout | Server-side confirmation of a transaction on the success page. |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | checkout | Opens the hosted overlay. Public by design. |
| `PLAYBOOK_DEFINE_PADDLE_PRICE_ID` | Define checkout | One-time USD 5.00 price id. No default. |
| `PLAYBOOK_BUILD_PADDLE_PRICE_ID` | Build checkout | One-time USD 10.00 price id. No default. |
| `PLAYBOOK_SHIP_PADDLE_PRICE_ID` | Ship checkout | One-time USD 20.00 price id. No default. |
| `PADDLE_WEBHOOK_SECRET` | fulfillment | Without it the webhook rejects every delivery. |
| `SUPABASE_URL` | fulfillment | Project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | fulfillment | Server-only. Never prefix with `NEXT_PUBLIC_`. |
| `PLAYBOOK_STORAGE_BUCKET` | download | Must be a private bucket. Shared by all three. |
| `PLAYBOOK_DEFINE_PDF_OBJECT` | Define download | Object path of the Define PDF. |
| `PLAYBOOK_DEFINE_ZIP_OBJECT` | Define download | Object path of the Define ZIP. |
| `PLAYBOOK_BUILD_PDF_OBJECT` | Build download | Object path of the Build PDF. |
| `PLAYBOOK_BUILD_ZIP_OBJECT` | Build download | Object path of the Build ZIP. |
| `PLAYBOOK_SHIP_PDF_OBJECT` | Ship download | Object path of the Ship PDF. |
| `PLAYBOOK_SHIP_ZIP_OBJECT` | Ship download | Object path of the Ship ZIP. |
| `PLAYBOOK_SIGNED_URL_TTL` | optional | Seconds, default 300, capped at 3600. |
| `RESEND_API_KEY` | email | Shared with the contact form. |
| `PLAYBOOK_FROM_EMAIL` | email | Verified sender. |
| `PLAYBOOK_REPLY_TO_EMAIL` | optional | Where replies go. |
| `NEXT_PUBLIC_SITE_URL` | email | Builds the download link. Set this in Production. |

Each group degrades independently. With nothing set, `/playbook` still renders
in full and the button reads *"Checkout is not configured yet"*.

### Testing the purchase flow in sandbox

1. Set the sandbox variables in `.env.local` and run `npm run dev`.
2. Expose the webhook so Paddle can reach it — `ngrok http 3000` or a Vercel
   preview deployment — and point the sandbox notification destination at
   `<public-url>/api/paddle/webhook`.
3. Open `/playbook`, buy one playbook, and pay with Paddle's test card
   `4242 4242 4242 4242`, any future expiry, any CVC.
4. Expect, in order: a `purchase recorded` line in the server log, a row in
   `playbook_purchases`, and the email. Each log line carries the transaction
   id; none carries the token.
5. Open the emailed link, download both files, and confirm `download_count`
   increments.
6. Replay the webhook from Paddle's notification log. The second delivery must
   log `duplicate delivery, already fulfilled` and must not send a second
   email.
7. Try a tampered token (change one character) — expect the "not valid" page.
   Try the download route a dozen times in a minute — expect a 429.

### Shipping a new edition of the PDF

`npm run playbook:build` regenerates the six artefacts; see
[`playbook/README.md`](playbook/README.md). Upload them over the same object
paths — `npm run playbook:provision` does that when the storage keys are set.
Buyers keep their existing links, which is what makes "free updates to this
edition" free to honour.

### Contact-form environment variables

| Variable             | Required | Purpose                                        |
| -------------------- | -------- | ---------------------------------------------- |
| `RESEND_API_KEY`     | prod     | Sends the email. Without it, submissions are logged only. |
| `CONTACT_TO_EMAIL`   | optional | Where inquiries go. Defaults to the site email. |
| `CONTACT_FROM_EMAIL` | optional | Verified sender. Defaults to a Resend test address. |
