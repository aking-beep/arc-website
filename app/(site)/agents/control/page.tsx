import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { ArkProductPage } from "@/components/ark-product-page";
import { Panel, PanelLabel, SplitClaim, Takeaway } from "@/components/diagram";
import { AgentChain } from "@/components/agent-chain";
import {
  AssuranceExamples,
  VerificationModel,
} from "@/components/assurance-examples";
import { agentChain, agentControl, executionGap } from "@/lib/ark";
import { assuranceChecklist } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Agent Control · Research, not a product",
  description:
    "Why verifying that an agent's intended outcome occurred is an integration problem, what it would take to solve, and why we are not selling it.",
  robots: { index: true, follow: true },
};

/** Only the tail of the chain. This page is about the two nodes we do not cover. */
const tail = agentChain.slice(5);

export default function AgentControlPage() {
  return (
    <ArkProductPage
      product={agentControl}
      ctaVariant="scan"
      ctaTitle="Verification is the wrong place to start."
      ctaLead="Almost nobody who asks us about outcome verification can yet list their agents. The free scan is where that starts, and it costs nothing."
      prologue={
        <>
          <Section>
            <SectionHeading
              kicker="Why this page exists and the product does not"
              title="Verifying an outcome means reading somebody else's system."
              lead="That is one connector per destination — your billing, your CRM, your ledger, your warehouse — and the value is zero until the connector you need is the one that exists."
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
                <PanelLabel>Where the chain runs out</PanelLabel>
                <AgentChain steps={tail} className="mt-6" />
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

          <AssuranceExamples />

          <VerificationModel className="bg-muted/30" />
        </>
      }
    >
      <Section>
        <SectionHeading
          kicker="What would change our mind"
          title="The condition for building this."
          lead="Stated so you can hold us to it, and so nobody reads this page as a roadmap."
        />
        <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            One design partner paying for one connector against one destination
            system, returning a pass, a fail, or an explicit unknown for a real
            class of action. Payments first, because the record is already
            structured and already reconciled.
          </p>
          <p>
            Until that exists, this is an argument rather than a product, and
            the page is written to be useful as an argument. If you are
            building the same thing, we would rather compare notes than market
            at you.
          </p>
        </div>
      </Section>
    </ArkProductPage>
  );
}
