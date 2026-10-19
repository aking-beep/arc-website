import { Section, SectionHeading } from "@/components/ui/section";
import { retainers } from "@/lib/content";

/**
 * The retainers, rendered once.
 *
 * /advisory and /consulting both show this. They used to carry two copies of
 * the same markup and the same two sentences, which is how the copy drifts.
 *
 * Cards below `lg`, table above. The table alone forced a 640px horizontal
 * scroll on a phone.
 */
const retainerCopy = {
  title: "When a review turns into standing work.",
  lead: "Three-month minimum, then month to month with 30 days' notice.",
};

export function RetainerTable({ className }: { className?: string }) {
  return (
    <Section className={className}>
      <SectionHeading
        kicker="Ongoing"
        title={retainerCopy.title}
        lead={retainerCopy.lead}
      />

      <ul className="mt-12 grid gap-4 lg:hidden">
        {retainers.map((r) => (
          <li key={r.slug} className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-base font-semibold">{r.name}</h3>
            <dl className="mt-3 grid gap-3">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Best fit
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {r.bestFit}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Typical commitment
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {r.commitment}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="mt-12 hidden overflow-x-auto lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="pb-3 pr-4 font-medium">Engagement</th>
              <th scope="col" className="pb-3 pr-4 font-medium">Best fit</th>
              <th scope="col" className="pb-3 font-medium">Typical commitment</th>
            </tr>
          </thead>
          <tbody>
            {retainers.map((r) => (
              <tr key={r.slug} className="border-b border-border/60">
                <td className="py-4 pr-4 align-top font-medium">{r.name}</td>
                <td className="py-4 pr-4 align-top text-muted-foreground">
                  {r.bestFit}
                </td>
                <td className="py-4 align-top text-muted-foreground">
                  {r.commitment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
