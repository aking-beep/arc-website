import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaturityBadge } from "@/components/ui/badge";
import {
  FlowChain,
  FlowStack,
  Panel,
  PanelLabel,
  SplitClaim,
  Takeaway,
} from "@/components/diagram";
import { CTA } from "@/components/cta";
import {
  agentLifecycle,
  ark,
  arkProducts,
  developerAreas,
  executionGap,
  operatingContract,
} from "@/lib/ark";
import { assuranceChecklist } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Agent infrastructure · Readiness, records, and checks",
  description:
    "Agent infrastructure from ARC Transformation Group: readiness, outcome checks for production agents, protocols, and runtime research.",
};

export default function PlatformPage() {
  const flagship = arkProducts.find((p) => p.flagship);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Agent infrastructure
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Infrastructure for software that acts on its own.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Agents hold credentials, call tools, and change production systems
              without a person watching each step. This is the ARC work for the
              part that still has to be checked: whether those actions can be
              trusted, verified, and governed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/agent-readiness" size="lg">
                Assess agent readiness
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/control" variant="outline" size="lg">
                Explore ARC Control
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="This part of ARC"
              title="Readiness, a record, and a check."
              lead="The same company that runs the advisory work publishes these pages. Agent Readiness asks whether your systems can survive an agent. Agent Control, still with design partners, asks whether the intended change happened."
            />
            <p className="mt-8 text-lg font-medium leading-snug">{ark.question}</p>
          </div>
          <Panel className="p-6 sm:p-8">
            <PanelLabel>The system</PanelLabel>
            <FlowChain steps={ark.loop} className="mt-6" highlightLast />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-brand">
              {ark.principle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Measure what happened. Verify it against the system that was
              supposed to change. Govern the authority it ran under. Optimize
              against cost per verified outcome rather than cost per token.
            </p>
            <div className="mt-8 border-t border-border pt-6">
              <PanelLabel>Agent operating lifecycle</PanelLabel>
              <FlowStack steps={agentLifecycle} className="mt-5" />
            </div>
          </Panel>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="The execution gap"
          title={executionGap.headline}
          lead={executionGap.lead}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {executionGap.failures.map((failure) => (
            <li
              key={failure}
              className="rounded-lg border border-border bg-card p-5 text-base leading-relaxed text-muted-foreground"
            >
              {failure}
            </li>
          ))}
        </ul>
        <SplitClaim
          className="mt-10"
          leftLabel="What the run reported"
          rightLabel="What assurance asks"
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

      <Section id="products" className="scroll-mt-24">
        <SectionHeading
          kicker="Products"
          title="Four products, each with its maturity attached."
          lead="The runtime work, the protocol work and the individual scanners are deliberately not on this list. They sit underneath, in Developers and Labs, because presenting an experiment as a product is how trust gets spent."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {arkProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className={p.flagship ? "group block h-full md:col-span-2" : "group block h-full"}
            >
              <Card
                className={
                  p.flagship
                    ? "flex h-full flex-col p-6 ring-1 ring-brand/20 transition-all hover:border-foreground/20 hover:shadow-sm sm:p-8"
                    : "flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
                }
              >
                <div className="flex flex-wrap items-center gap-3">
                  <MaturityBadge maturity={p.maturity} />
                  {p.flagship ? (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Flagship
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 flex items-center gap-1.5 text-xl font-semibold tracking-tight">
                  {p.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 text-base font-medium">{p.tagline}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <p className="mt-5 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {p.todayLabel}:{" "}
                  </span>
                  {p.today}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {flagship ? (
        <Section className="bg-muted/30">
          <Panel className="p-8 sm:p-12">
            <div className="max-w-3xl">
              <PanelLabel>Flagship</PanelLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {flagship.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {flagship.intro[0]}
              </p>
              <p className="mt-6 rounded-lg border border-brand/30 bg-brand/10 p-5 text-sm leading-relaxed">
                <span className="font-medium">{flagship.todayLabel}: </span>
                {flagship.today}
              </p>
              <div className="mt-8">
                <Button href="/control">
                  Explore ARC Control
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Panel>
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="The operating contract"
              title={operatingContract.headline}
              lead={operatingContract.lead}
            />
            <FlowChain steps={operatingContract.chain} className="mt-8" highlightLast />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A prompt is an instruction. A contract is something you can check
              afterwards and hand to someone else. The framework is free and
              published in full — there is no email gate on it.
            </p>
            <div className="mt-8">
              <Button href="/playbooks/agent-operating-contract" variant="outline">
                Use the framework
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {operatingContract.needs.map((need) => (
              <div key={need.name} className="bg-card p-5">
                <dt className="text-sm font-semibold">{need.name}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {need.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Underneath"
            title="The layers that are not products yet."
            lead="Runtime, protocols, open tools and documentation. Each labelled with what it is, which in some cases is research."
          />
          <Link
            href="/developers"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            Developer surface
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {developerAreas.map((area) => (
            <Card key={area.name} className="flex h-full flex-col p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold">{area.name}</h3>
                <MaturityBadge maturity={area.maturity} />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {area.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CTA
        title="Running agents you cannot yet verify?"
        lead="Start with the free readiness scorecard, or book thirty minutes and we will tell you whether the problem is your interfaces, your authority model, or the fact that nothing confirms what changed."
      />
    </>
  );
}
