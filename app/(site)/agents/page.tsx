import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StateBadge } from "@/components/ui/badge";
import { AgentChain } from "@/components/agent-chain";
import { EvidenceArtifact } from "@/components/evidence-artifact";
import { Panel, PanelLabel, SplitClaim, Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { ArchitectureModel } from "@/components/architecture-model";
import { ProductJourney } from "@/components/product-journey";
import { ExecutionGap } from "@/components/execution-gap";
import { StartHere } from "@/components/start-here";
import {
  assessment,
  executionGap,
  operatingContract,
} from "@/lib/ark";
import { assuranceChecklist } from "@/lib/learn";
import { labs } from "@/lib/content";
import { serviceAreas } from "@/lib/services";

export const metadata: Metadata = {
  title: "Agent infrastructure · Readiness, authority and outcome assurance",
  description:
    "AI Fit, Agent Readiness and Agent Control: decide whether AI belongs, prepare your systems for agents, and verify what actually changed. Each one carries its real state.",
};

const operate = serviceAreas.find((a) => a.slug === "operate");

/** The two tools that produce evidence for the assessment. */
const supportingTools = ["arc-agent-governance", "mcp-conformance-scanner"];

export default function AgentsPage() {
  const tools = supportingTools
    .map((slug) => labs.find((p) => p.slug === slug))
    .filter((p): p is (typeof labs)[number] => Boolean(p));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <Container className="relative py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="animate-fade-up">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Agent governance
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Your vendors turned on agents. Nobody wrote down what they can
                reach.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                An agent inside your CRM or your code editor holds the
                permissions of whoever switched it on. This is the part of ARC
                that answers what exists, what it can change, and which actions
                should stop and wait for a person.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/labs/arc-agent-governance" size="lg">
                  Run the free scan
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/assessment" variant="outline" size="lg">
                  Assess Agent Readiness
                </Button>
              </div>
            </div>
            <Panel className="p-6 sm:p-8">
              <PanelLabel>What has to be true</PanelLabel>
              <AgentChain className="mt-6" />
            </Panel>
          </div>
        </Container>
      </section>

      {operate ? (
        <Section>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              You are probably here because of one of these.
            </h2>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border">
              {operate.symptoms.map((symptom) => (
                <li
                  key={symptom}
                  className="bg-card px-5 py-4 text-base leading-relaxed text-muted-foreground"
                >
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <ProductJourney className="bg-muted/30" kicker="Three products" />

      <ArchitectureModel />

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="The deliverable"
              title="The answer is a document, and here is what it looks like."
              lead="Every agent, what it can change, who approved it, and when it was last checked. Dated and signed, so it survives being handed to somebody who was not in the room."
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

      <ExecutionGap kicker="The execution gap" />

      <StartHere className="bg-muted/30" secondary="assessment" />

      <Section>
        <SectionHeading
          kicker="Evidence"
          title="The assessment uses open tools you can run yourself."
          lead="Nothing in the engagement depends on a black box. Both of these are free, and both carry their state."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/labs/${tool.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="flex items-center gap-1.5 text-base font-semibold">
                    {tool.name}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <StateBadge state={tool.state} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tool.tagline}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="The operating contract"
              title={operatingContract.headline}
              lead={operatingContract.lead}
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A prompt is an instruction. A contract is something you can check
              afterwards and hand to someone else. The framework is free and
              published in full — there is no email gate on it.
            </p>
            <div className="mt-8">
              <Button href="/frameworks/agent-operating-contract" variant="outline">
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

      <CTA
        variant="scan"
        title="Running agents you cannot list?"
        lead="Start with the free scan. If the report is uncomfortable, thirty minutes is enough to scope the assessment and tell you what it would cost."
      />
    </>
  );
}
