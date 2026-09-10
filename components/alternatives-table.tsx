import { Section, SectionHeading } from "@/components/ui/section";
import { alternatives } from "@/lib/content";
import { cn } from "@/lib/utils";

const columns = [
  { key: "whoDoesTheWork", label: "Who does the work" },
  { key: "whatYouGet", label: "What you get" },
  { key: "afterward", label: "Afterward" },
] as const;

export function AlternativesTable({ className }: { className?: string }) {
  return (
    <Section className={className}>
      <SectionHeading
        kicker="How we compare"
        title="You are probably choosing between four things."
        lead="Agencies, integrators, and freelancers all solve real problems. Here is the honest version of where each one lands, so you can tell quickly whether we are the right shape for your problem."
      />

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Option</th>
              {columns.map((c) => (
                <th key={c.key} className="pb-3 pr-4 font-medium">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternatives.map((row) => (
              <tr
                key={row.option}
                className={cn(
                  "border-b border-border/60",
                  row.isArc && "bg-muted/50",
                )}
              >
                <td
                  className={cn(
                    "py-4 pr-4 align-top font-medium",
                    !row.isArc && "text-muted-foreground",
                  )}
                >
                  {row.option}
                </td>
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "py-4 pr-4 align-top",
                      row.isArc ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
