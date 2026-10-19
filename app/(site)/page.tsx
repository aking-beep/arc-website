import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AgentChainCompact } from "@/components/agent-chain";
import { EvidenceArtifact } from "@/components/evidence-artifact";
import { SplitClaim, Takeaway } from "@/components/diagram";
import { MarketSignals } from "@/components/market-signals";
import { CTA } from "@/components/cta";
import { site } from "@/lib/content";
import { assessment, executionGap } from "@/lib/ark";
import { assuranceChecklist } from "@/lib/learn";
import { homeHero, homeLadder, homeSymptoms, homeWhy } from "@/lib/services";

export default function HomePage() {
  return (
    <>
      {/* The fold has one job: make the eight questions answerable without
          scrolling. Who it is for, what it is, what it costs, what is free,
          what is research, and what to do next. */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
        <Container className="relative py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
            <div className="animate-fade-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {homeHero.kicker}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                {homeHero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {homeHero.lead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={homeHero.primary.href} size="lg">
                  {homeHero.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={homeHero.secondary.href} variant="outline" size="lg">
                  {homeHero.secondary.label}
                </Button>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                {homeHero.note}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                What has to be true
              </p>
              <AgentChainCompact className="mt-6" />
            </div>
          </div>
        </Container>
      </section>

      {/* Recognition before anything about us. No cards — this is a list of
          sentences a visitor should recognise, not a product grid. */}
      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {homeSymptoms.title}
          </h2>
          <div>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border">
              {homeSymptoms.items.map((item) => (
                <li
                  key={item}
                  className="bg-card px-5 py-4 text-base leading-relaxed text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg font-medium">{homeSymptoms.close}</p>
          </div>
        </div>
      </Section>

      {/* The one dominant element on the page. The site sells a document, so
          the document is the biggest thing on it. */}
      <Section className="py-28 sm:py-40">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              kicker="The deliverable"
              title="You end up holding this."
              lead="Every agent, what it can change, who approved it, and when it was last checked. Two to three weeks, one fixed fee."
            />
            <div className="mt-8">
              <Button href="/assessment">
                How the assessment works
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <EvidenceArtifact />
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Why it is hard"
          title={executionGap.headline}
          lead={executionGap.lead}
        />
        <SplitClaim
          className="mt-12"
          leftLabel="What the run reported"
          rightLabel="What the record asks"
          left={[
            { label: "Status", value: "completed" },
            { label: "Steps", value: "7 / 7" },
            { label: "Tool calls", value: "12 ok, 0 failed" },
            { label: "Latency", value: "4.2s" },
          ]}
          right={assuranceChecklist.map((step) => step.question)}
        />
        <Takeaway className="mt-12">{executionGap.takeaway}</Takeaway>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading kicker="Why ARC" title={homeWhy.title} lead={homeWhy.lead} />
          <div>
            <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              {homeWhy.items.map((item) => (
                <div key={item.name} className="bg-card p-6">
                  <dt className="text-sm font-semibold">{item.name}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {site.team.lead}{" "}
              <Link
                href="/about"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Who does the work
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* Prices visible, in order, with the free rung first. */}
      <Section className="bg-muted/30">
        <SectionHeading
          kicker="How this works"
          title="Start free. Pay when the answer is uncomfortable."
          lead="Three steps, three prices, in the order most people take them. Nothing here requires a call to find out what it costs."
        />
        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {homeLadder.map((rung, i) => (
            <li key={rung.name}>
              <Card className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-semibold tracking-tight">
                    {rung.price}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {rung.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {rung.text}
                </p>
                <Link
                  href={rung.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
                >
                  {rung.linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <MarketSignals
        limit={3}
        title="What changed recently, and what to do about it."
        lead="Dated and sourced. If a change does not affect what you should do next, it does not go on this list."
        footer={
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            Read the research briefs behind these
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <CTA
        variant="scan"
        title="Start with the list you do not have."
        lead={`The scan is free and runs in your browser. If the report is uncomfortable, the assessment is ${assessment.price?.amount} and takes ${assessment.price?.duration}.`}
      />
    </>
  );
}
