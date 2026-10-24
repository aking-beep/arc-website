import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/arc/ui/container";
import { ArcMaturityBadge } from "@/components/arc/ui/maturity-badge";
import { LabCard } from "@/components/arc/labs/product-card";
import { ClosingCta } from "@/components/arc/closing-cta";
import {
  featuredLabProducts,
  labCounts,
  moreLabProducts,
  retiredIntoPlaybook,
} from "@/lib/arc/products";
import { arcSite } from "@/lib/arc/site";
import { jsonLdScript } from "@/lib/arc/json-ld";

const title = "ARC Labs · Applied technology, tested in public";
const description =
  "Developer tools and scanners for teams building with AI: MCP conformance, prompt review, connectivity checks and AI architecture fit. Free to use, no account, and each one shows its real maturity.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/labs" },
  openGraph: { title, description, url: "/labs", type: "website" },
  twitter: { title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ARC Labs",
  url: `${arcSite.domain}/labs`,
  description,
  hasPart: [...featuredLabProducts, ...moreLabProducts].map((p) => ({
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: p.tagline,
    url: p.app ?? `${arcSite.domain}${p.href}`,
  })),
};

export default function LabsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <section aria-labelledby="labs-title" className="border-b border-line">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[13px] text-brand">ARC Labs</p>
            <h1
              id="labs-title"
              className="mt-5 font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-balance text-ink sm:text-[56px]"
            >
              Applied technology, tested in public.
            </h1>
            <p className="mt-6 max-w-[580px] text-[18px] leading-relaxed text-pretty text-ink-2">
              Developer tools and scanners for teams building with AI. Most are free with no
              account and store nothing. Each one shows its real maturity, and says what it
              checked rather than only what it scored.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-4 border-t border-line pt-5 text-[13.5px]">
            <div>
              <dt className="text-ink-3">Published tools</dt>
              <dd className="mt-1 font-serif text-[30px] tabular text-ink">{labCounts.total}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Free to use now</dt>
              <dd className="mt-1 font-serif text-[30px] tabular text-ink">
                {labCounts.usable}
              </dd>
            </div>
            <div>
              <dt className="text-ink-3">Alpha or experiment</dt>
              <dd className="mt-1 font-serif text-[30px] tabular text-ink">
                {labCounts.earlyStage}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section aria-labelledby="gallery-title" className="py-14 sm:py-16">
        <Container>
          <h2 id="gallery-title" className="sr-only">
            Featured tools
          </h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {featuredLabProducts.map((p) => (
              <li key={p.slug} className="flex">
                <LabCard product={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="more-title"
        className="border-t border-line bg-paper py-16 sm:py-20"
      >
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h2
              id="more-title"
              className="font-serif text-[28px] leading-tight text-ink sm:text-[32px]"
            >
              Also in the lab
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
              Earlier-stage tools. Free to use, no account, nothing stored, and labelled alpha or
              experiment because that’s what they are.
            </p>
            <p className="mt-6 border-t border-line pt-5 text-[14px] leading-relaxed text-ink-3">
              {retiredIntoPlaybook.note}{" "}
              <Link
                href={retiredIntoPlaybook.href}
                className="font-medium text-brand hover:underline"
              >
                See the Ship playbook
              </Link>
              .
            </p>
          </div>
          <ul className="border-t border-ink">
            {moreLabProducts.map((t) => (
              <li
                key={t.slug}
                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[200px_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="text-[15px] font-semibold text-ink">
                  <Link href={t.href} className="hover:text-brand">
                    {t.name}
                  </Link>
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink-2">
                  {t.tagline}
                  {t.app ? (
                    <>
                      {" "}
                      <a
                        href={t.app}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-0.5 whitespace-nowrap font-medium text-brand hover:underline"
                      >
                        Open
                        <ArrowUpRight size={12} aria-hidden="true" />
                        <span className="sr-only">
                          {t.name} (opens in a new tab)
                        </span>
                      </a>
                    </>
                  ) : null}
                </span>
                <span>
                  <ArcMaturityBadge maturity={t.maturity} />
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingCta
        id="labs-cta"
        title="Want one of these inside your stack?"
        lead="Lab tools become evidence in our readiness assessments and components of ARC Control. If a tool fits a problem you have at scale, we can run it with you."
        primary={{ label: "Talk to ARC", href: "/contact?type=labs" }}
      />
    </>
  );
}
