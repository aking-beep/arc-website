import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CTA } from "@/components/cta";
import { research } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research · Cited briefs",
  description:
    "ARC Research publishes grounded briefs on AI, security, operations, cloud, digital transformation, and product — with academic and industry citations you can verify.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        kicker="ARC Research"
        title="Research you can verify."
        lead="Six grounded briefs across AI development, security, operations, cloud, digital transformation, and product. Plain language, cited sources, operator outcomes. If we cannot source a claim, we say so."
      />

      <Section>
        <SectionHeading
          kicker="Library"
          title="Research briefs"
          lead="Each paper includes academic background, evidence, operator outcomes, limitations, and a citation list with links to primary sources."
        />
        <div className="mt-12 grid gap-5">
          {research.map((a) => (
            <Link key={a.slug} href={`/research/${a.slug}`} className="group block">
              <Card className="flex flex-col gap-4 p-6 transition-all hover:border-foreground/20 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                      {a.kind}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-0.5 font-medium text-foreground/80">
                      {a.topic}
                    </span>
                    <span>{formatDate(a.date)}</span>
                    <span>· {a.readingTime} read</span>
                    <span>· {a.sources.length} sources</span>
                  </div>
                  <h3 className="mt-3 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                    {a.title}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.summary}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        title="Want these findings applied to your stack?"
        lead="Studio can turn a research brief into a scored plan for your environment — what to do first, what to ignore, and who owns it. Book a 30-minute call."
      />
    </>
  );
}
