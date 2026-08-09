import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { PillarCard } from "@/components/pillar-card";
import { ProductCard } from "@/components/product-card";
import { CTA } from "@/components/cta";
import { pillars, stages, principles, labs, research, site } from "@/lib/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const doings = [
  "We build free open-source tools.",
  "We publish research and benchmarks.",
  "We consult on hard implementation problems.",
  "We productize the recurring work.",
  "We teach teams to adopt AI that ships.",
  "We contribute to the AI ecosystem.",
];

export default function HomePage() {
  const featuredLabs = labs.filter((p) => p.status === "live" || p.badge);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
        <Container className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-muted-foreground">
              ARC TRANSFORMATION GROUP
            </p>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI &amp; transformation for small and mid-sized companies
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              We build operational intelligence.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              ARC is one honest system across five pillars: free tools that build
              trust, advisory that solves hard problems, software that productizes
              the recurring work, research that tells the truth, and education that
              makes it stick. No buzzwords. No 18-month &ldquo;transformation
              journeys.&rdquo; Just work that ships.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={site.calendly} size="lg">
                Book a discovery call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/labs" variant="outline" size="lg">
                Try a free tool
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-x-8 gap-y-3 sm:grid-cols-2">
            {doings.map((d) => (
              <div key={d} className="flex items-center gap-3">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading
          kicker="The ecosystem"
          title="Five pillars. One flywheel."
          lead="Free tools build trust. Trust creates advisory work. Advisory reveals repeatable patterns. Patterns become software. Every part reinforces the others — which is a lot harder to copy than another consulting website."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <PillarCard key={p.id} pillar={p} />
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="ARC Labs"
            title="Start with something free."
            lead="Open-source tools you can run today. No signup wall, no sales call."
          />
          <Link
            href="/labs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            Browse all Labs tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featuredLabs.map((p) => (
            <ProductCard key={p.slug} product={p} basePath="/labs" />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="How ARC works"
          title="Five stages. One honest system."
          lead="Every engagement names where you are, so the work matches the moment instead of the pitch deck."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((s) => (
            <li key={s.number} className="bg-card p-6">
              <span className="font-mono text-sm text-muted-foreground">
                {s.number}
              </span>
              <h3 className="mt-3 text-base font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="ARC Intelligence"
            title="We publish what we learn."
            lead="Benchmarks and field reports in plain language — assumptions labeled, numbers included."
          />
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All research
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5">
          {research.slice(0, 2).map((a) => (
            <Link key={a.slug} href={`/research/${a.slug}`} className="group block">
              <Card className="flex flex-col gap-3 p-6 transition-all hover:border-foreground/20 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-medium">
                      {a.kind}
                    </span>
                    <StatusBadge status={a.status} />
                    <span>{formatDate(a.date)}</span>
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

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            kicker="How we think"
            title="The rules we hold ourselves to."
            lead="These are the principles every recommendation has to pass. If a piece of work doesn't pass them, we don't ship it. We'll usually call it out before you do."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {principles.slice(0, 4).map((p) => (
              <div key={p.number} className="rounded-lg border border-border bg-card p-5">
                <span className="font-mono text-xs text-muted-foreground">
                  {p.number}
                </span>
                <h3 className="mt-2 text-sm font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            See all eight principles and how we work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CTA />
    </>
  );
}
