import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FlowChain, Panel, PanelLabel, SplitClaim, Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { executionGap } from "@/lib/ark";
import { assuranceChecklist, getPlaybook } from "@/lib/learn";

const playbook = getPlaybook("outcome-assurance-checklist");

export const metadata: Metadata = {
  alternates: { canonical: "/playbooks/outcome-assurance-checklist" },
  title: "Outcome Assurance Checklist · Six questions between a finished run and a finished job",
  description:
    "The sequence we use to decide whether an agent's reported success can be believed, and what it cost to find out. Free and published in full.",
};

export default function AssuranceChecklistPage() {
  if (!playbook) notFound();

  return (
    <>
      <PageHero
        kicker="Free checklist"
        title="Six questions between a finished run and a finished job."
        lead={executionGap.lead}
      >
        <FlowChain steps={playbook.chain ?? []} highlightLast />
      </PageHero>

      <Section>
        <SectionHeading
          kicker="The checklist"
          title="Run these in order."
          lead="Each step has a failure mode it exists to catch. If you cannot answer one of them, stop there — the later answers inherit the doubt."
        />
        <ol className="mt-12 grid gap-5">
          {assuranceChecklist.map((step) => (
            <li
              key={step.step}
              className="grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-[1.3fr_1fr]"
            >
              <div className="bg-card p-6 sm:p-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {step.step}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance">
                  {step.question}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
              <div className="bg-card p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 flex-none text-amber-500" />
                  <PanelLabel>How it fails</PanelLabel>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.failure}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Why it matters"
          title={executionGap.headline}
          lead="A successful model response and a successful business outcome are different events. Most agent tooling reports the first one and lets you assume the second."
        />
        <SplitClaim
          className="mt-12"
          leftLabel="What the run reported"
          rightLabel="What the checklist asks"
          left={[
            { label: "Status", value: "completed" },
            { label: "Steps", value: "7 / 7" },
            { label: "Tool calls", value: "12 ok, 0 failed" },
            { label: "Latency", value: "4.2s" },
            { label: "Tokens", value: "38,410" },
          ]}
          right={assuranceChecklist.map((step) => step.question)}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {executionGap.failures.map((failure) => (
            <li
              key={failure}
              className="rounded-lg border border-border bg-card p-5 text-base leading-relaxed text-muted-foreground"
            >
              {failure}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Panel className="p-8 sm:p-12">
          <PanelLabel>The number that matters</PanelLabel>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Cost per verified outcome, not cost per run.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Cost per run flatters you every time a cheap failure inflates the
            denominator. Divide total spend — including retries and abandoned
            attempts — by the outcomes that verified, and the number
            stops being comfortable and starts being useful.
          </p>
        </Panel>
        <Takeaway className="mt-12 max-w-3xl">{executionGap.takeaway}</Takeaway>
      </Section>

      <CTA
        title="Cannot answer question four?"
        lead="Then your evidence and your claim are coming from the same place. That is the problem Agent Control is being built for, and we are working through it with design partners now."
      />
    </>
  );
}
