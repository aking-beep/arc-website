import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { ArkProductPage } from "@/components/ark-product-page";
import {
  FlowChain,
  Panel,
  PanelLabel,
  SplitClaim,
  Takeaway,
} from "@/components/diagram";
import { ark, executionGap, getArkProduct } from "@/lib/ark";
import { assuranceChecklist } from "@/lib/learn";

const product = getArkProduct("ark-control");

export const metadata: Metadata = {
  title: "ARK Control · Outcome assurance for production AI agents",
  description:
    "Understand what agents attempted, what authority they used, and whether the intended outcome occurred. In design-partner development.",
};

export default function ArkControlPage() {
  if (!product) notFound();

  return (
    <ArkProductPage
      product={product}
      ctaTitle="Running agents against systems you cannot verify?"
      ctaLead="We are working through the verification model with a small number of design partners. If that is the problem you have, a thirty-minute call is the right starting point."
      ctaTopic="ark-control"
      capabilitiesClassName=""
      prologue={
        <>
          <Section>
            <SectionHeading
              kicker="The problem"
              title={executionGap.headline}
              lead={executionGap.lead}
            />
            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <ul className="grid gap-4">
                {executionGap.failures.map((failure) => (
                  <li
                    key={failure}
                    className="rounded-lg border border-border bg-card p-5 text-base leading-relaxed text-muted-foreground"
                  >
                    {failure}
                  </li>
                ))}
              </ul>
              <Panel className="p-6 sm:p-8">
                <PanelLabel>Where the gap opens</PanelLabel>
                <FlowChain
                  steps={executionGap.chain}
                  className="mt-6"
                  highlightLast
                />
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Most tooling stops at the fourth node. Tracing tells you the
                  agent called the right tool. It does not tell you the
                  destination system changed, and it certainly does not tell you
                  the change was the one you wanted.
                </p>
              </Panel>
            </div>
            <Takeaway className="mt-12">{executionGap.takeaway}</Takeaway>
          </Section>

          <Section className="bg-muted/30">
            <SectionHeading
              kicker="Observability is not assurance"
              title="Two different questions."
              lead="Seeing a trace tells you what the agent attempted. Assurance asks whether the intended outcome occurred, and insists the answer come from somewhere other than the agent."
            />
            <SplitClaim
              className="mt-12"
              leftLabel="What the run reported"
              rightLabel="What assurance asks"
              left={[
                { label: "Status", value: "completed" },
                { label: "Steps", value: "7 / 7" },
                { label: "Tool calls", value: "12 ok, 0 failed" },
                { label: "Latency", value: "4.2s" },
                { label: "Tokens", value: "38,410" },
              ]}
              right={assuranceChecklist.map((step) => step.question)}
            />
          </Section>
        </>
      }
    >
      <Section>
        <SectionHeading
          kicker="The loop"
          title="Measure. Verify. Govern. Optimize."
          lead={`${ark.principle} Each stage feeds the next, and the loop is what turns a pile of traces into something a budget holder and an auditor can both use.`}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Measure",
              text: "Capture the execution record: what was attempted, by which identity, through which tools, at what cost.",
            },
            {
              name: "Verify",
              text: "Confirm the state change in the destination system independently of the agent that claims to have made it.",
            },
            {
              name: "Govern",
              text: "Enforce the authority, the approval path and the stop conditions the work was supposed to run under.",
            },
            {
              name: "Optimize",
              text: "Report cost per verified outcome, so improvement means more verified work rather than fewer tokens.",
            },
          ].map((stage, i) => (
            <div
              key={stage.name}
              className="rounded-lg border border-border bg-card p-6"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {stage.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stage.text}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </ArkProductPage>
  );
}
