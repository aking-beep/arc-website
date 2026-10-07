import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { playbookBuildLine, playbookBundle } from "@/lib/playbook";

/**
 * The three libraries are the things a buyer builds with. The worksheets sit
 * underneath them, because they are how the libraries get used on a real product.
 */
export function Toolkit() {
  const [libraries, worksheets] = [
    playbookBundle.slice(0, 3),
    playbookBundle.slice(3),
  ];

  return (
    <Section className="bg-muted/30">
      <SectionHeading
        kicker="The toolkit"
        title={playbookBuildLine.title}
        lead={playbookBuildLine.lead}
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {libraries.map((item) => (
          <Card key={item.id} className="flex h-full flex-col p-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {item.count}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {item.text}
            </p>
          </Card>
        ))}
      </div>

      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {worksheets.map((item) => (
          <li key={item.id} className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
