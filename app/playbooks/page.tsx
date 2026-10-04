import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { FlowChain, PanelLabel, Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { playbookHref, playbooks } from "@/lib/learn";
import { academy, research } from "@/lib/content";

export const metadata: Metadata = {
  title: "Playbooks · Use our methods without hiring us",
  description:
    "Playbooks, frameworks, free assessments and checklists from ARC. Three are free and complete on the page. The AI Product Playbook is $39.",
};

export default function PlaybooksPage() {
  const featured = playbooks.find((p) => p.featured);
  const rest = playbooks.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        kicker="ARC Learn"
        title="Use our methods without hiring us."
        lead="These are the frameworks we run on paid work, published. Three of the four are free and complete on the page — no email gate, no drip sequence. If you can get the result yourself, that is a good outcome for both of us."
      />

      {featured ? (
        <Section>
          <Link href={playbookHref(featured)} className="group block">
            <Card className="p-8 ring-1 ring-brand/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <PanelLabel>Featured · {featured.kind}</PanelLabel>
                    <span className="font-mono text-xs font-medium">
                      {featured.price}
                    </span>
                  </div>
                  <h2 className="mt-4 flex items-start gap-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                    {featured.name}
                    <ArrowUpRight className="mt-2 h-5 w-5 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h2>
                  <p className="mt-4 text-xl leading-relaxed">{featured.tagline}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {featured.summary}
                  </p>
                </div>
                {featured.chain ? (
                  <div className="rounded-xl border border-border bg-muted/40 p-6">
                    <PanelLabel>The system</PanelLabel>
                    <FlowChain steps={featured.chain} className="mt-5" highlightLast />
                  </div>
                ) : null}
              </div>
            </Card>
          </Link>
        </Section>
      ) : null}

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Free"
          title="Three things you can use this afternoon."
          lead="An assessment, a framework and a checklist. All published in full, all scored or worked on the page itself."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={playbookHref(p)} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <PanelLabel>{p.kind}</PanelLabel>
                  <span className="font-mono text-xs font-medium">{p.price}</span>
                </div>
                <h3 className="mt-4 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                  {p.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 text-sm font-medium">{p.tagline}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                {p.chain ? (
                  <FlowChain
                    steps={p.chain}
                    className="mt-5 border-t border-border/60 pt-5"
                  />
                ) : null}
                <p className="mt-5 text-sm font-medium text-foreground">
                  {p.ctaLabel}
                  <span className="text-muted-foreground"> →</span>
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <Takeaway className="max-w-3xl">
          Everything here is written to be used by someone who will never
          contact us. That is the test it has to pass.
        </Takeaway>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Research"
            title="The arguments behind the frameworks."
            lead="Short cited briefs on agents, security, cost and operations. If we cannot source a claim, we leave it out."
          />
          <Link
            href="/research"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All {research.length} briefs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {research.slice(0, 3).map((a) => (
            <Link key={a.slug} href={`/research/${a.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                    {a.topic}
                  </span>
                  <span>{a.sources.length} sources</span>
                </div>
                <h3 className="mt-4 flex items-start gap-1.5 text-base font-semibold leading-snug">
                  {a.title}
                  <ArrowUpRight className="mt-0.5 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {a.summary}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Workshops"
            title="When the room is the problem."
            lead="Sometimes the blocker is not the technology, it is that leadership and operators describe the same problem in different words. That is a session rather than a six-week diagnostic."
          />
          <Link
            href="/academy"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All workshops
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {academy.map((w) => (
            <Link key={w.slug} href={`/academy/${w.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="flex items-center gap-1.5 text-base font-semibold">
                  {w.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {w.text}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        title="Used the framework and hit a wall?"
        lead="That is usually where the paid work starts. Thirty minutes is enough to tell you whether the wall is a system, an organization, or a decision nobody has made yet."
      />
    </>
  );
}
