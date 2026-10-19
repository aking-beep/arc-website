import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArkProductPage } from "@/components/ark-product-page";
import { StartHere } from "@/components/start-here";
import { AgentChain } from "@/components/agent-chain";
import { EvidenceArtifact } from "@/components/evidence-artifact";
import { FlowStack, Panel, PanelLabel } from "@/components/diagram";
import { assessment } from "@/lib/ark";
import { scorecardDimensions, scorecardQuestions } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Agent Access Assessment · $15,000, two to three weeks",
  description:
    "An inventory of every agent running against your systems, what each one can change, and which actions should need a person. Fixed fee, fixed scope, and you keep the Agent Access Record.",
};

const weeks = [
  {
    name: "Week 1 · Find them",
    text: "Every agent we can reach: the ones you bought, the ones a vendor switched on, and the ones a team started without telling anyone. Credentials, tools, MCP servers and API scopes against each.",
  },
  {
    name: "Week 2 · Rank the damage",
    text: "What each identity could change that you cannot undo — payments, deletions, outbound mail, production deploys — and which of those has an approval path today.",
  },
  {
    name: "Week 3 · Write it down",
    text: "The Agent Access Record, the gates we recommend and where they have to live to be real, and a 30/60/90 plan with a named owner on each line. Then a readout for whoever asked you the question.",
  },
];

export default function AssessmentPage() {
  return (
    <ArkProductPage
      product={assessment}
      ctaVariant="assessment"
      ctaTopic="assessment"
      ctaTitle="Been asked what your agents can do?"
      ctaLead="Thirty minutes is enough to scope this and tell you whether the assessment is the right size for the problem — including when it is not."
      artifact={<EvidenceArtifact />}
      prologue={
        <Section className="bg-muted/30">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                kicker="What it covers"
                title="Six of the nine links in the chain."
                lead="The last two are research and we do not pretend otherwise. Here is exactly which parts of the problem this engagement answers and which it only names."
              />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Verification and evidence need read access to every destination
                system an agent touches. That is a connector per system, and
                anyone who tells you they have solved it for your stack should
                be asked which connectors they have shipped.
              </p>
              <div className="mt-8">
                <Button href="/agents/control" variant="outline">
                  Why verification is still research
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Panel className="p-6 sm:p-8">
              <PanelLabel>Chain coverage</PanelLabel>
              <AgentChain className="mt-6" />
            </Panel>
          </div>
        </Section>
      }
    >
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="How it runs"
              title="Two to three weeks, against the systems you already operate."
              lead="No platform to install, no agent to deploy, and no access beyond read. We work from configuration, permissions and the logs you already keep."
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The senior person on your first call is the person who does the
              work. If the answer turns out to be that you have four agents and
              they are all fine, the assessment says that and stops.
            </p>
          </div>
          <Panel className="p-6 sm:p-8">
            <PanelLabel>Engagement shape</PanelLabel>
            <FlowStack steps={weeks} className="mt-6" />
          </Panel>
        </div>
      </Section>

      <StartHere className="bg-muted/30" secondary="scorecard" />

      <Section>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The difference between the free versions and this engagement is
          evidence. The scan reads what you type. The assessment reads what you
          run.{" "}
          <Link
            href="/frameworks"
            className="font-medium text-foreground underline underline-offset-4"
          >
            All the free frameworks
          </Link>
          .
        </p>
      </Section>
    </ArkProductPage>
  );
}
