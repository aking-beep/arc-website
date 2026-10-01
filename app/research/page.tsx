import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { PanelLabel, Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { research } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research · Cited briefs on agents, security, cost and operations",
  description:
    "ARC Research publishes grounded briefs with academic and industry citations you can verify. If we cannot source a claim, we leave it out.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResearchPage() {
  const sourceCount = research.reduce((sum, a) => sum + a.sources.length, 0);
  const topics = Array.from(new Set(research.map((a) => a.topic)));

  return (
    <>
      <PageHero
        kicker="ARC Research"
        title="Research from the work, with sources."
        lead={`${research.length} briefs across ${topics.length} topics and ${sourceCount} cited sources. Each one names the evidence, what an operator should do with it, and where the argument is weak.`}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="The standard"
              title="If we cannot source a claim, we leave it out."
              lead="Every brief carries its citations, its publication date, and an explicit section on where the argument could be wrong. That is the whole method."
            />
            <Takeaway className="mt-10">
              Evidence, not claims. It applies to what we write as much as to
              what we build.
            </Takeaway>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {[
              { metric: String(research.length), label: "Published briefs" },
              { metric: String(sourceCount), label: "Cited sources" },
              { metric: String(topics.length), label: "Topics covered" },
              { metric: "Dated", label: "Every claim timestamped" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card p-6">
                <div className="text-2xl font-semibold tracking-tight">
                  {stat.metric}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
            <div className="bg-card p-6 sm:col-span-2">
              <PanelLabel>Topics</PanelLabel>
              <ul className="mt-4 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Library"
          title="The library."
          lead="Newest first. Each paper has evidence, what an operator should do with it, where the argument is weak, and links to the sources."
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
                  <h3 className="mt-3 flex items-start gap-1.5 text-lg font-semibold tracking-tight">
                    {a.title}
                    <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="From research to practice"
            title="The frameworks come out of these."
            lead="A brief argues the case. A playbook is what you do about it. Three of the four are free and complete on the page."
          />
          <Link
            href="/playbooks"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All playbooks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CTA
        title="Want this applied to your stack?"
        lead="We can take a paper and score it against your environment: what to do first, what to ignore, who owns it."
      />
    </>
  );
}
