import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { CTA } from "@/components/cta";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Case studies",
  description:
    "Selected ARC Studio engagements: honest challenges, sequenced approaches, and outcomes you can measure.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Work"
        title="Outcomes over narratives."
        lead="Case studies from ARC Studio engagements. We publish what shipped, what we would do differently, and the numbers that mattered — not polished fiction."
      />

      <Section>
        <SectionHeading
          kicker="Engagements"
          title="Selected work"
          lead="More real engagements will land here as clients approve publication. The structure is ready; the honesty is non-negotiable."
        />
        <div className="mt-12 grid gap-5">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group block"
            >
              <Card className="flex flex-col gap-4 p-6 transition-all hover:border-foreground/20 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <StatusBadge status={study.status} />
                    <span>{study.industry}</span>
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {study.client}
                  </p>
                  <h3 className="mt-1 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                    {study.title}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {study.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 sm:flex-col sm:items-end">
                  {study.outcomes.slice(0, 2).map((o) => (
                    <div key={o.label} className="text-left sm:text-right">
                      <div className="text-xl font-semibold tracking-tight">
                        {o.metric}
                      </div>
                      <p className="text-xs text-muted-foreground">{o.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        title="Want a similar outcome?"
        lead="Most engagements start with a fixed-price diagnostic. Book a 30-minute call and we'll tell you straight whether there's a fit."
      />
    </>
  );
}
