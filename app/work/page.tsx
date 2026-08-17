import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CTA } from "@/components/cta";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work · Outcomes over narratives",
  description:
    "Verifiable scope and outcomes from Fortune 100/500 delivery and ARC Studio engagements. Where we cannot name the client, we name the scale.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Work"
        title="Outcomes over narratives."
        lead="Problem, intervention, deliverable, measurable outcome, timeframe. Where confidentiality applies, we name the scale instead of the logo. We do not invent clients."
      />

      <Section>
        <SectionHeading
          kicker="Evidence"
          title="What shipped, and what it was worth."
          lead="Career delivery inside Fortune 100 and Fortune 500 environments, plus ARC Studio diagnostics. Client names withheld where required."
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
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                      {study.kind === "career" ? "Prior delivery" : "ARC Studio"}
                    </span>
                    <span>{study.industry}</span>
                    <span>· {study.timeframe}</span>
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
                  {study.outcomes.slice(0, 3).map((o) => (
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
        title="Want this standard of work on your problem?"
        lead="Most Studio work starts with a diagnostic. A 30-minute call is enough to tell you whether that is the right first step — and what size of engagement the problem actually needs."
      />
    </>
  );
}
