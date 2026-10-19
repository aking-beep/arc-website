import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FlowChain, Panel, PanelLabel, Takeaway } from "@/components/diagram";
import { CTA } from "@/components/cta";
import { operatingContract } from "@/lib/ark";
import {
  getPlaybook,
  operatingContractFields,
  operatingContractStops,
} from "@/lib/learn";

const playbook = getPlaybook("agent-operating-contract");

export const metadata: Metadata = {
  title: "Agent Operating Contract · What an agent needs before it owns work",
  description:
    "A free one-page framework: goal, trigger, state, boundary, evidence and owner. With a worked bad and good example for every field.",
};

export default function OperatingContractPage() {
  if (!playbook) notFound();

  return (
    <>
      <PageHero
        kicker="Free framework"
        title={operatingContract.headline}
        lead="An agent responsible for ongoing work needs more than instructions. Six fields, each with a worked example of the version that fails and the version that holds. Published in full — there is nothing to download and no email gate."
      >
        <FlowChain steps={operatingContract.chain} highlightLast />
      </PageHero>

      <Section>
        <SectionHeading
          kicker="The six fields"
          title="Fill these in before the agent runs unattended."
          lead="The bad column is not a straw man. It is what most agent definitions look like in practice, because a prompt feels like it covers these and does not."
        />
        <div className="mt-12 grid gap-5">
          {operatingContractFields.map((field, i) => (
            <div
              key={field.field}
              className="grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-[1fr_1fr_1fr]"
            >
              <div className="bg-card p-6">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {field.field}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {field.question}
                </p>
              </div>
              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 flex-none text-muted-foreground" />
                  <PanelLabel>Not this</PanelLabel>
                </div>
                <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground">
                  {field.bad}
                </p>
              </div>
              <div className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 flex-none text-emerald-500" />
                  <PanelLabel>This</PanelLabel>
                </div>
                <p className="mt-3 font-mono text-sm leading-relaxed">
                  {field.good}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="The other four lines"
              title="Most contracts stop one field too early."
              lead="The six fields above describe what the agent does. These describe what happens when it goes wrong, which is the part that gets written after the incident instead of before it."
            />
            <ul className="mt-8 grid gap-4">
              {operatingContractStops.map((stop) => (
                <li
                  key={stop}
                  className="rounded-lg border border-border bg-card p-5 text-base leading-relaxed text-muted-foreground"
                >
                  {stop}
                </li>
              ))}
            </ul>
          </div>
          <Panel className="p-6 sm:p-8">
            <PanelLabel>Enforcement architecture</PanelLabel>
            <FlowChain
              steps={operatingContract.chain}
              className="mt-6"
              highlightLast
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A boundary written in a prompt is a request. A boundary written as
              a permission is a boundary. Where the two disagree, the permission
              is the only one that holds when the agent reads something it should
              not have trusted.
            </p>
          </Panel>
        </div>
      </Section>

      <Section>
        <Takeaway className="max-w-3xl">
          If you cannot fill in the owner field with the name of one person,
          the agent is not ready to run unattended.
        </Takeaway>
      </Section>

      <CTA
        variant="assessment"
        title="Filled it in and found gaps?"
        lead="That is what it is for. The Agent Access Assessment turns those gaps into an inventory, a blast-radius ranking and a hardening plan with owners."
      />
    </>
  );
}
