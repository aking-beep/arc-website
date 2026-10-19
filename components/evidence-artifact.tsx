import { cn } from "@/lib/utils";
import { accessRecordExample, type RecordRow } from "@/lib/ark";

/**
 * The deliverable, rendered.
 *
 * The site sells a document and used to show none of them. Every surface that
 * renders this says, in visible text rather than a tooltip, that the rows are
 * illustrative — the same rule that keeps invented numbers off the rest of
 * the site applies to a picture of a number.
 */
const tone: Record<RecordRow["state"], string> = {
  ok: "text-emerald-600 dark:text-emerald-400",
  warn: "text-amber-600 dark:text-amber-400",
  bad: "text-red-600 dark:text-red-400",
};

const toneLabel: Record<RecordRow["state"], string> = {
  ok: "Governed",
  warn: "Needs review",
  bad: "No approver",
};

export function EvidenceArtifact({ className }: { className?: string }) {
  const { title, caption, rows } = accessRecordExample;

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/40 px-5 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </p>
        <p className="rounded-full border border-dashed border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Example
        </p>
      </div>

      {/* Table on larger screens, stacked records on a phone. */}
      <div className="hidden sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="px-5 py-2.5 font-medium">Agent</th>
              <th scope="col" className="px-5 py-2.5 font-medium">Can change</th>
              <th scope="col" className="px-5 py-2.5 font-medium">Approver</th>
              <th scope="col" className="px-5 py-2.5 font-medium">Checked</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.agent} className="border-b border-border/60 last:border-0">
                <td className="px-5 py-3 font-mono text-[13px]">{row.agent}</td>
                <td className="px-5 py-3 text-muted-foreground">{row.canChange}</td>
                <td className={cn("px-5 py-3", row.approver ? "" : tone[row.state])}>
                  {row.approver ?? "None"}
                </td>
                <td className={cn("px-5 py-3 font-mono text-[13px]", tone[row.state])}>
                  {row.checked}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-border/60 sm:hidden">
        {rows.map((row) => (
          <li key={row.agent} className="px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[13px]">{row.agent}</p>
              <p className={cn("font-mono text-[11px] uppercase tracking-wider", tone[row.state])}>
                {toneLabel[row.state]}
              </p>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{row.canChange}</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              {row.approver ?? "No approver"} · checked {row.checked}
            </p>
          </li>
        ))}
      </ul>

      <figcaption className="border-t border-border/60 px-5 py-3 text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
