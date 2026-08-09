# ARC Transformation Group — Website

The front door to the ARC ecosystem: **Labs · Studio · Research · Academy.**

This is not a consulting brochure — it's the operating system for the ARC ecosystem, built so every new product becomes *content* on shared infrastructure instead of a brand-new website.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with a CSS-variable design system (light + dark mode)
- **IBM Plex Sans / Mono** via `next/font`
- **next-themes** for theme switching
- **lucide-react** for icons
- Zero database — content lives in `lib/content.ts`
- Contact form posts to `/api/contact` (optional Resend delivery)

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

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, **New Project → Import** the repo. Framework preset auto-detects **Next.js**.
3. Optional env vars for the contact form: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Add your custom domain. **Pick one canonical domain** — the live site is `.org` but the ARC email is `.com`. Choose one, set it primary, and 301-redirect the other in Vercel's Domains settings.

## Project structure

```
app/
  layout.tsx            Root layout, fonts, theme provider, header/footer
  page.tsx              Home — ecosystem front door
  api/contact/route.ts  Contact form API (Resend when configured)
  labs/page.tsx         ARC Labs (free tools)
  labs/[slug]/page.tsx  Reusable PRODUCT template (demo/GitHub/docs/roadmap)
  studio/page.tsx       ARC Studio (consulting: 9 services, 5 stages, principles)
  research/page.tsx     ARC Research (benchmarks + reports)
  research/[slug]/page.tsx  Reusable ARTICLE/RESEARCH template
  academy/page.tsx      ARC Academy (workshops)
  about/page.tsx        About + contact
  work/[slug]/page.tsx  Reusable CASE STUDY template
components/
  ui/                   Design-system primitives (button, card, badge, section, container)
  site-header.tsx       Product-first navigation
  site-footer.tsx       Shared footer + ecosystem map
  product-card.tsx      Reusable product/service card
  theme-provider.tsx    next-themes wrapper
  theme-toggle.tsx      Light/dark switch
lib/
  content.ts            Single source of truth for all ecosystem content
  utils.ts              cn() helper
```

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
6. **Smoke test:** home, `/labs/mcp-conformance-scanner`, `/about` contact form, `/privacy`.
7. **Dependabot:** enable on the GitHub repo for dependency alerts.

Analytics ships via `@vercel/analytics` with no extra config once the project is on Vercel.

This is a static/server-rendered marketing site with **no database, no user
accounts, and no stored customer data.** The attack surface is deliberately
tiny — there is nothing to breach on the pages themselves, and Vercel manages
the servers, TLS, and platform patching. That removes the entire category of
"stale server got exploited" that compromises most small-business sites.

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

Threat level rises only when you build the **Platform** pillar with real logins
and customer data. That warrants its own security design (auth, session
management, data handling, least-privilege access) — handle it then, not now.

### Contact-form environment variables

| Variable             | Required | Purpose                                        |
| -------------------- | -------- | ---------------------------------------------- |
| `RESEND_API_KEY`     | prod     | Sends the email. Without it, submissions are logged only. |
| `CONTACT_TO_EMAIL`   | optional | Where inquiries go. Defaults to the site email. |
| `CONTACT_FROM_EMAIL` | optional | Verified sender. Defaults to a Resend test address. |
