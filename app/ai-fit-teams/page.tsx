import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { ArkProductPage } from "@/components/ark-product-page";
import { FlowStack, Panel, PanelLabel, Takeaway } from "@/components/diagram";
import { getArkProduct } from "@/lib/ark";

const product = getArkProduct("ai-fit-teams");

const dimensions = [
  {
    name: "Capability",
    text: "What the organization can do today: the skills in the building, the systems people can reach, and the work that already runs without heroics.",
  },
  {
    name: "Intent",
    text: "What it is trying to achieve, stated as an outcome rather than a technology. If leadership and operators describe this differently, that is the finding.",
  },
  {
    name: "Teams",
    text: "Whether the people expected to run the result were asked, have the time, and own the workflow it changes.",
  },
  {
    name: "Habits",
    text: "How decisions get made and reversed here. Habits carry a change or quietly kill it, and they are the dimension nobody scores.",
  },
];

const weeks = [
  {
    name: "Week 1",
    text: "Workflow interviews, system and data-access review, and a shadow-AI sweep for the tools already in use.",
  },
  {
    name: "Week 2",
    text: "Capability and team assessment, with the scorecard drafted against evidence rather than opinion.",
  },
  {
    name: "Week 3",
    text: "Opportunity map and a classified backlog: ship now, fix the prerequisite first, or defer — with the prerequisite named.",
  },
  {
    name: "Week 4",
    text: "30/60/90 roadmap with named owners and human-review gates, then an executive readout.",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/ai-fit-teams" },
  title: "AI Fit Teams · Prepare the organization around the technology",
  description:
    "Understand AI readiness across teams, workflows, capabilities, governance and adoption. A three-to-four week assessment run by ARC.",
};

export default function AiFitTeamsPage() {
  if (!product) notFound();

  return (
    <ArkProductPage
      product={product}
      ctaTitle="Want to know whether your organization can carry this?"
      ctaLead="Thirty minutes is enough to tell you whether a team assessment is the right first step, and whether the answer might be to defer."
      ctaTopic="ai-fit-teams"
    >
      <Section>
        <SectionHeading
          kicker="Four dimensions"
          title="Technology readiness and organizational readiness fail differently."
          lead="A sound architecture still dies if nobody owns the workflow, the data access takes four months, or the people expected to run it were never asked."
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {dimensions.map((d) => (
            <div key={d.name} className="bg-card p-6 sm:p-8">
              <dt className="text-lg font-semibold tracking-tight">{d.name}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {d.text}
              </dd>
            </div>
          ))}
        </dl>
        <Takeaway className="mt-12 max-w-3xl">
          A plan nobody in the building can run is not a plan. It is a slide.
        </Takeaway>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="How it runs"
              title="Three to four weeks, against the work you do."
              lead="Your processes, access to your data, and the people who would have to run whatever gets built."
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The output is deliberately boring: a scored snapshot, a backlog
              you can argue with, and a sequence with owners attached. If the
              answer is that you should not do this yet, the assessment
              says so and tells you what would have to change first.
            </p>
          </div>
          <Panel className="p-6 sm:p-8">
            <PanelLabel>Engagement shape</PanelLabel>
            <FlowStack steps={weeks} className="mt-6" />
          </Panel>
        </div>
      </Section>
    </ArkProductPage>
  );
}
