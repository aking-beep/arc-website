import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MaturityBadge } from "@/components/ui/badge";
import { FlowChain, Panel, PanelLabel, Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { developerAreas, operatingContract } from "@/lib/ark";
import { labs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Developers · Protocols, open tools and runtime research",
  description:
    "The ARK developer surface: agent-facing protocols, MIT-licensed scanners and catalogues, architecture notes, and open research into where AI work should execute.",
};

/** Routing axes for the runtime question. Research, not a shipping product. */
const runtimeAxes = [
  {
    name: "Capability",
    text: "Does the work actually need a frontier model, or is a smaller local one sufficient and more predictable?",
  },
  {
    name: "Privacy",
    text: "Can this data leave the boundary at all? Some of it cannot, and that decides the answer on its own.",
  },
  {
    name: "Policy",
    text: "Which jurisdiction, retention rule or disclosure duty applies to this unit of work?",
  },
  {
    name: "Latency",
    text: "Is a round trip acceptable, or does the work sit inside something a person is waiting on?",
  },
  {
    name: "Cost",
    text: "What does this cost per verified outcome, not per token, once retries are counted?",
  },
];

export default function DevelopersPage() {
  const openTools = labs.filter((p) => p.links.github);

  return (
    <>
      <PageHero
        kicker="ARK · Developers"
        title="The layer underneath the products."
        lead="Protocols, open tools, architecture notes and the runtime research. Published with its real maturity attached, because an experiment presented as infrastructure wastes someone's week."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={site.github} variant="outline">
            <Github className="h-4 w-4" />
            Browse the GitHub org
          </Button>
          <Button href="/labs" variant="ghost">
            All ARK Labs tools
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          kicker="Areas"
          title="Four surfaces, four different levels of done."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {developerAreas.map((area) => {
            const external = area.href.startsWith("http");
            return (
              <Card key={area.name} className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">{area.name}</h3>
                  <MaturityBadge maturity={area.maturity} />
                </div>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                  {area.text}
                </p>
                {external ? (
                  <a
                    href={area.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
                  >
                    {area.linkLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={area.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
                  >
                    {area.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Protocols"
          title="Agent-facing interfaces, tested against the published spec."
          lead="The Model Context Protocol changed how servers start up in its 2026-07-28 revision. Existing servers keep working for about a year, which means a lot of them have an expiry date nobody has scheduled."
        />
        <Panel className="mt-12 p-6 sm:p-8">
          <PanelLabel>What a conformance run checks</PanelLabel>
          <FlowChain
            steps={[
              "Transport",
              "Handshake",
              "Capabilities",
              "Schemas",
              "Tools",
              "Report",
            ]}
            className="mt-6"
            highlightLast
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            &ldquo;It works in one client&rdquo; stopped being evidence the
            moment enterprise platforms started publishing tool surfaces by the
            dozen. The scanner is open source and runs from the CLI, so it can
            sit in CI rather than in someone&rsquo;s memory.
          </p>
          <div className="mt-8">
            <Button href="/labs/mcp-conformance-scanner" variant="outline">
              Check a server
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Panel>
      </Section>

      <Section id="runtime" className="scroll-mt-24">
        <div className="flex flex-wrap items-center gap-3">
          <MaturityBadge maturity="research" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Not a shipping product
          </span>
        </div>
        <SectionHeading
          className="mt-6"
          kicker="Runtime"
          title="Where should a unit of AI work execute?"
          lead="Local, edge and cloud are usually argued as an ideology. They are a routing decision, and the inputs to it are boring and measurable."
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {runtimeAxes.map((axis) => (
            <div key={axis.name} className="bg-card p-6">
              <dt className="text-sm font-semibold">{axis.name}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {axis.text}
              </dd>
            </div>
          ))}
        </dl>
        <Takeaway className="mt-12 max-w-3xl">
          We are publishing the thinking, not selling a runtime. When there is
          something to run, this page will say so.
        </Takeaway>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Open tools"
            title="MIT licensed, no account, most store nothing."
            lead={`${openTools.length} of the ARK Labs projects ship their source. Clone them, read the rules, disagree with the rules, open a pull request.`}
          />
          <Link
            href="/labs"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            All tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {openTools.map((tool) => (
            <Card key={tool.slug} className="flex h-full flex-col p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold">{tool.name}</h3>
                <MaturityBadge maturity={tool.maturity} />
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tool.tagline}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 border-t border-border/60 pt-4 text-sm">
                <Link
                  href={`/labs/${tool.slug}`}
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Details
                </Link>
                {tool.links.github ? (
                  <a
                    href={tool.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </a>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="Conventions"
          title="The agent architecture we build against."
          lead="Scope, identity, access, action, stop. Five things an agent needs settled before it is allowed to touch a production system."
        />
        <FlowChain
          steps={operatingContract.architecture}
          className="mt-10"
          highlightLast
        />
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
          The full framework — goal, trigger, state, boundary, evidence and owner,
          with worked examples of a bad and a good version of each — is published
          free.
        </p>
        <div className="mt-8">
          <Button href="/playbooks/agent-operating-contract" variant="outline">
            Agent Operating Contract
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <CTA
        title="Building the agent side of a real system?"
        lead="If you are implementing protocols, tool authority or verification against production systems, we would rather talk to you than market at you."
      />
    </>
  );
}
