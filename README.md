# ARC Transformation Group — Website

The front door to the ARC ecosystem: **Labs · Studio · Platform · Intelligence · Academy.**

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
  platform/page.tsx     ARC Platform (productized operating intelligence)
  research/page.tsx     ARC Intelligence (benchmarks + research)
  research/[slug]/page.tsx  Reusable ARTICLE/RESEARCH template
  academy/page.tsx      ARC Academy (courses, certifications, workshops)
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

- Real product screenshots / architecture diagrams (dashed placeholders on product pages).
- MDX pipeline if you want research authored in Markdown instead of `lib/content.ts`.
- Analytics: drop in Vercel Analytics or Plausible in `app/layout.tsx`.
