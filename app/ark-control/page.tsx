import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
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
  title: "Agent Control · Outcome assurance for production AI agents",
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

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="See it"
          title="The operator console, as it actually renders."
          lead="Ten sections against a running control plane: what needs a human, what every agent attempted, which policy decided and why, and whether the record still verifies. This is the real console's own output, captured page by page from the running server — not a mock-up."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Panel className="p-6 sm:p-8">
            <PanelLabel>What you are looking at</PanelLabel>
            <dl className="mt-6 grid gap-5 text-sm leading-relaxed">
              {[
                {
                  term: "Real",
                  detail:
                    "The policy decisions and their rule-by-rule traces, an approval that was cast and consumed, the evidence records, and the hash-chained audit log those records verify against.",
                },
                {
                  term: "Simulated",
                  detail:
                    "The connector effects. No money moves and no issue is filed — the same way the shipped demo seed behaves for anyone running it locally.",
                },
                {
                  term: "Inert",
                  detail:
                    "Anything that would write. Approve, reject, suspend and scan are rendered and disabled, each saying what it does in the live console.",
                },
              ].map((item) => (
                <div key={item.term}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {item.term}
                  </dt>
                  <dd className="mt-1.5 text-muted-foreground">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                ["Overview", "What needs a human, ordered by consequence"],
                ["Approvals", "The request, the policy that held it, the authority required"],
                ["Agents", "Who is authorized, and what they have attempted"],
                ["Tools", "What may be asked for, at what risk"],
                ["Policies", "Each policy as a decision ladder"],
                ["Access", "Which policies govern which agent and tool"],
                ["Evidence", "One record per attempt, with its integrity digests"],
                ["Audit", "The chain, and what verifying it does not prove"],
                ["Security", "Connector posture and an MCP manifest scan"],
                ["Reports", "A snapshot over a window it always states"],
              ].map(([name, text]) => (
                <li
                  key={name}
                  className="rounded-lg border border-border bg-card px-4 py-3"
                >
                  <span className="text-sm font-semibold tracking-tight">
                    {name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <Button href="/ark-control/console/index.html" size="lg">
              Open the console
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href="https://github.com/aking-beep/arc-control"
              className="text-sm font-medium underline underline-offset-4"
            >
              The code it was rendered from
            </a>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            Agent Control is in design-partner development. The console is real
            and running; what is not yet settled is the verification model it
            reports on, which is the conversation we are having with design
            partners.
          </p>
        </div>
      </Section>
    </ArkProductPage>
  );
}
