import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaturityBadge } from "@/components/ui/badge";
import { ArkProductPage } from "@/components/ark-product-page";
import { FlowStack, Panel, PanelLabel } from "@/components/diagram";
import { agentLifecycle, getArkProduct } from "@/lib/ark";
import { labs } from "@/lib/content";
import { scorecardDimensions, scorecardQuestions } from "@/lib/learn";

const product = getArkProduct("agent-readiness");

/** Labs tools that produce evidence used in the paid assessment. */
const supportingTools = [
  "arc-agent-governance",
  "mcp-conformance-scanner",
  "connectivity-scanner",
  "arc-ai-security-scanner",
];

export const metadata: Metadata = {
  title: "Agent Readiness · Make your systems usable by agents",
  description:
    "Evaluate whether agents can safely and reliably interact with your applications, APIs, tools and workflows. Free scorecard, or a full assessment against your own systems.",
};

export default function AgentReadinessPage() {
  if (!product) notFound();
  const tools = supportingTools
    .map((slug) => labs.find((p) => p.slug === slug))
    .filter((p): p is (typeof labs)[number] => Boolean(p));

  return (
    <ArkProductPage
      product={product}
      ctaTitle="Want the assessment rather than the self-assessment?"
      ctaLead="The full engagement runs against your own systems: the inventory, the blast-radius ranking, the approval gates and a hardening plan with named owners. Thirty minutes is enough to scope it."
      ctaTopic="agent-readiness"
    >
      <Section>
        <SectionHeading
          kicker="Two ways to run it"
          title="Start free. Escalate if the answer is uncomfortable."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Card className="flex h-full flex-col p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <PanelLabel>Free · self-assessed</PanelLabel>
              <span className="font-mono text-xs">Free</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              Agent Readiness Scorecard
            </h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
              {scorecardQuestions.length} questions across {scorecardDimensions.length}{" "}
              dimensions, scored in your browser. Nothing is submitted anywhere.
              You get a band, the
              dimensions dragging the score down, and what to fix first.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 border-t border-border/60 pt-5">
              {scorecardDimensions.map((d) => (
                <li
                  key={d}
                  className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="/playbooks/agent-readiness-scorecard">
                Run the scorecard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="flex h-full flex-col p-8 ring-1 ring-foreground/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <PanelLabel>Paid · evidence-based</PanelLabel>
              <span className="font-mono text-xs">2–3 weeks</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              Agent Readiness Assessment
            </h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
              Run by ARC against your actual systems rather than your impression
              of them. We inventory what is already live — including the agents a
              team switched on without telling anyone — rank what each one could
              damage, and put approval and revocation gates on the actions that
              matter.
            </p>
            <ul className="mt-6 grid gap-2 border-t border-border/60 pt-5 text-sm text-muted-foreground">
              {[
                "Agent, tool and credential inventory",
                "Blast-radius ranking per identity",
                "Approval and revocation gates for irreversible actions",
                "Spend guardrails with a named owner",
                "30/60/90 hardening plan",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-border"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="/contact?topic=agent-readiness" variant="outline">
                Scope an assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="Why it is a different question"
              title="Agents arrive through a different door."
              lead="A human finds the button. An agent has to discover the capability, read the schema, authenticate as itself, resolve what it is allowed to do, act, and leave something behind that proves what happened."
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Readiness is measured against that sequence. Each step can fail on
              its own, and a system that passes eight of nine is still the system
              that cannot tell you who did what.
            </p>
          </div>
          <Panel className="p-6 sm:p-8">
            <PanelLabel>Agent operating lifecycle</PanelLabel>
            <FlowStack steps={agentLifecycle} className="mt-6" />
          </Panel>
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="Evidence"
          title="The assessment uses open tools you can run yourself."
          lead="Nothing in the engagement depends on a black box. These are in Labs, free, and carry their own maturity."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/labs/${tool.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-base font-semibold">{tool.name}</h3>
                  <MaturityBadge maturity={tool.maturity} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tool.tagline}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </ArkProductPage>
  );
}
