import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { ArkProductPage } from "@/components/ark-product-page";
import { FlowChain, Panel, PanelLabel, Takeaway } from "@/components/diagram";
import { getArkProduct } from "@/lib/ark";

const product = getArkProduct("ai-fit");

const decisions = [
  {
    question: "Workflow or agent?",
    text: "A deterministic workflow is cheaper, testable and easier to defend. An agent earns its complexity only when the path genuinely cannot be known in advance.",
  },
  {
    question: "Retrieval or a lookup?",
    text: "A surprising number of retrieval projects are a database query with a language interface on top. That is a good answer, not an embarrassing one.",
  },
  {
    question: "Where should this execute?",
    text: "Cloud, local or edge, decided from privacy, latency, policy and cost rather than from whichever vendor has a solutions architect on the call.",
  },
  {
    question: "What has to be true to afford it?",
    text: "The cost drivers that actually move the number, named — not a made-up price per user.",
  },
  {
    question: "Which duties already apply?",
    text: "Disclosure and content-marking obligations are in force now. That changes design, not just legal review.",
  },
];

export const metadata: Metadata = {
  title: "AI Fit · Determine where AI belongs before you build it",
  description:
    "Evaluate the problem, workload, economics, architecture and risks before committing engineering resources. Free, no account, nothing stored.",
};

export default function AiFitPage() {
  if (!product) notFound();

  return (
    <ArkProductPage
      product={product}
      ctaTitle="Got the architecture, unsure about the organization?"
      ctaLead="AI Fit answers the technical question. AI Fit Teams answers whether your teams, workflows and governance can carry it. Thirty minutes is enough to work out which one you need."
    >
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="The decisions it forces"
              title="Most AI mistakes are architecture mistakes made early."
              lead="Not model choice. The decision about what shape the system should be, taken before anyone had to defend it."
            />
            <Takeaway className="mt-10">
              The most expensive AI decision is the one nobody scored.
            </Takeaway>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border">
            {decisions.map((d) => (
              <div key={d.question} className="bg-card p-6">
                <dt className="text-base font-semibold">{d.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="How it works"
          title="Deterministic rules, not a model guessing."
          lead="You describe the use case in plain language. Published rules match that description to a catalogue of architecture shapes. Every finding quotes the sentence that triggered it, so the same input always produces the same output."
        />
        <Panel className="mt-12 p-6 sm:p-8">
          <PanelLabel>Decision path</PanelLabel>
          <FlowChain
            steps={[
              "Use case",
              "Constraints",
              "Rule match",
              "Shape",
              "Ruled out",
              "Board brief",
            ]}
            className="mt-6"
            highlightLast
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Nothing you type is stored. The recommendation is an architecture
            class rather than a vendor, because the vendor list changes every
            quarter and the shape of the problem does not.
          </p>
        </Panel>
        <p className="mt-8 text-sm text-muted-foreground">
          The tool is open on the web.{" "}
          <Link href="/labs/arc-stack-advisor" className="font-medium text-foreground underline underline-offset-4">
            See how the rules are published
          </Link>
          .
        </p>
      </Section>
    </ArkProductPage>
  );
}
