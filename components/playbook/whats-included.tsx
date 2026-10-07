import { Check } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { playbookIncludes } from "@/lib/playbook";

export function WhatsIncluded() {
  return (
    <Section id="included" className="bg-muted/30 scroll-mt-20">
      <SectionHeading kicker="What you get" title="One download. The book, and the files." />
      <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
        {playbookIncludes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base leading-relaxed">
            <Check className="mt-1 h-4 w-4 flex-none text-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
