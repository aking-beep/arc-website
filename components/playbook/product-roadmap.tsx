import { Section, SectionHeading } from "@/components/ui/section";
import { playbookRoadmap } from "@/lib/playbook";

/**
 * The sequence a buyer is purchasing. Numbered, because the order is the
 * product: each decision is cheaper than the one after it.
 */
export function ProductRoadmap() {
  return (
    <Section id="roadmap">
      <SectionHeading
        kicker="0 → shipped"
        title="Fifteen decisions, in the order that keeps the next one cheap."
        lead="Skip one and you pay for it later, usually as a rebuild. The Playbook is this sequence, with the output you should be holding at the end of each step."
      />
      <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {playbookRoadmap.map((step, index) => (
          <li
            key={step.name}
            className="flex h-full flex-col rounded-lg border border-border bg-card p-4"
          >
            <span className="font-mono text-[11px] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-base font-semibold tracking-tight">{step.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
