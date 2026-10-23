import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/arc/ui/container";
import { ArcButton } from "@/components/arc/ui/button";
import { ServiceExplorer } from "@/components/arc/services/service-explorer";
import { ReadinessAssessment } from "@/components/arc/services/readiness-assessment";
import { CloudExplorer } from "@/components/arc/services/cloud-explorer";
import { EngagementShapes } from "@/components/arc/services/engagement-shapes";
import { ClosingCta } from "@/components/arc/closing-cta";
import { solutions } from "@/lib/arc/solutions";
import { serviceAreas } from "@/lib/services";
import { arcSite } from "@/lib/arc/site";

const title = "Solutions · Enterprise AI, automation and modernization";
const description =
  "Six solution areas: AI strategy and readiness, AI development and integration, enterprise workflow automation, cloud and infrastructure modernization, AI governance and security, and emerging technology prototyping. Senior-led, scoped so you can stop at the end of any phase.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ARC Transformation Group` },
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services", type: "website" },
  twitter: { title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ARC Transformation Group solution areas",
  url: `${arcSite.domain}/services`,
  itemListElement: solutions.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.short,
      provider: { "@type": "Organization", name: arcSite.name, url: arcSite.domain },
      url: `${arcSite.domain}/services?area=${s.slug}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="svc-title" className="border-b border-line">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[13px] text-brand">Solutions</p>
            <h1
              id="svc-title"
              className="mt-5 font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-balance text-ink sm:text-[56px]"
            >
              Senior people on the work, from the first call to production.
            </h1>
            <p className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-pretty text-ink-2">
              Six solution areas, each starting from the business problem. The person on your first
              call stays on the work, and every phase can end in a decision to stop.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ArcButton href="#readiness" variant="secondary">
              Take the readiness check
            </ArcButton>
            <ArcButton href="/contact" arrow>
              Talk to ARC
            </ArcButton>
          </div>
        </Container>
      </section>

      {/* useSearchParams needs a Suspense boundary so the rest of the page
          still prerenders statically. */}
      <Suspense
        fallback={<div className="min-h-[600px]" aria-hidden="true" />}
      >
        <ServiceExplorer />
      </Suspense>

      <ReadinessAssessment />
      <CloudExplorer />
      <EngagementShapes />

      {/* The four buyer-problem pages predate the redesign, rank, and go
          deeper on symptoms than the explorer does. They stay linked. */}
      <section
        aria-labelledby="deeper-title"
        className="border-t border-line bg-paper py-16 sm:py-20"
      >
        <Container>
          <h2
            id="deeper-title"
            className="font-serif text-[28px] leading-tight text-ink sm:text-[32px]"
          >
            Or start from the symptom
          </h2>
          <p className="mt-3 max-w-[620px] text-[15.5px] leading-relaxed text-ink-2">
            Four pages written around what a week looks like when something is wrong, with the
            symptoms listed before anything we sell.
          </p>
          <ul className="mt-8 grid gap-x-10 border-t border-ink sm:grid-cols-2">
            {serviceAreas.map((area) => (
              <li key={area.slug} className="border-b border-line py-5">
                <Link href={`/services/${area.slug}`} className="group block">
                  <span className="block text-[16.5px] font-semibold text-ink group-hover:text-brand">
                    {area.heading}
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-ink-2">
                    {area.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingCta
        id="services-cta"
        title="Tell us the problem, not the discipline."
        lead="Working out which solution you need is our job. Describe what’s happening and we’ll come back with a recommended first step and a rough shape — or tell you we’re not the right fit."
      />
    </>
  );
}
