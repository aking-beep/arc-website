import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { CTA } from "@/components/cta";
import { academy, academyOutcomes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Academy — Courses, certifications & workshops",
  description:
    "ARC Academy turns ARC's operating principles into skills your team keeps after we leave: courses, certifications, and hands-on workshops.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        kicker="ARC Academy"
        title="Make it stick after we leave."
        lead="The best engagement is one you don't need to repeat. ARC Academy turns our operating principles — name the stage, land on four axes, ship the boring thing — into skills your team keeps."
      />

      <Section>
        <SectionHeading
          kicker="Formats"
          title="How we'll teach it."
          lead="Three formats, one method. We're shaping the first cohort now — tell us what your team needs to learn."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {academy.map((a) => (
            <Card key={a.name} className="flex flex-col p-6 transition-all hover:border-foreground/20">
              <StatusBadge status={a.status} />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {a.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {a.text}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {a.detail}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            kicker="Outcomes"
            title="What a trained team can do."
          />
          <ul className="space-y-4">
            {academyOutcomes.map((o) => (
              <li key={o} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                <span className="text-base leading-relaxed text-muted-foreground">
                  {o}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTA
        title="Want early access to Academy?"
        lead="We're shaping the first cohort now. Tell us what your team needs to learn and we'll factor it in."
      />
    </>
  );
}
