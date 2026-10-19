import { cn } from "@/lib/utils";
import {
  agentChain,
  chainCoverageLabel,
  type ChainCoverage,
  type ChainNode,
} from "@/lib/ark";

/**
 * The canonical spine. One diagram, used on the home page, the agents hub and
 * the assessment page.
 *
 * Coverage is the whole point. Drawing nine nodes at equal weight would
 * present research as shipped capability — the one thing the state badges
 * exist to prevent — so a node's border says what we actually do. Solid is
 * sold today, outline is partial, dashed is research.
 */
const node: Record<ChainCoverage, string> = {
  covered: "border-brand/50 bg-brand/10 text-foreground",
  partial: "border-border bg-card text-muted-foreground",
  research: "border-dashed border-border bg-transparent text-muted-foreground",
};

const marker: Record<ChainCoverage, string> = {
  covered: "bg-brand",
  partial: "border border-muted-foreground bg-transparent",
  // A dashed border on a 6px dot is noise. Opacity reads at that size; the
  // dashed border stays on the node box, where it is legible.
  research: "border border-muted-foreground bg-transparent opacity-50",
};

/**
 * Two hollow dots a few pixels apart are not a distinction anyone should have
 * to squint at, so the full chain names the state in text. The brief for this
 * diagram was that the states be impossible to confuse.
 */
const tag: Record<ChainCoverage, string> = {
  covered: "border-brand/40 bg-brand/10 text-brand",
  partial: "border-border bg-muted/50 text-muted-foreground",
  research: "border-dashed border-border bg-transparent text-muted-foreground",
};

const tagLabel: Record<ChainCoverage, string> = {
  covered: "Assessed",
  partial: "Partial",
  research: "Research",
};

function ChainLegend({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
        className,
      )}
    >
      {(Object.keys(chainCoverageLabel) as ChainCoverage[]).map((key) => (
        <li key={key} className="flex items-center gap-2">
          <span
            aria-hidden
            className={cn("h-2 w-2 flex-none rounded-full", marker[key])}
          />
          {chainCoverageLabel[key]}
        </li>
      ))}
    </ul>
  );
}

/**
 * The full chain with per-node explanation. Used where there is room to teach
 * the model — the agents hub and the assessment page.
 */
export function AgentChain({
  steps = agentChain,
  className,
}: {
  steps?: ChainNode[];
  className?: string;
}) {
  return (
    <div className={className}>
      <ol className="grid gap-0">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step.name} className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex flex-col items-center">
                <span
                  aria-hidden
                  className={cn(
                    "mt-1.5 h-2.5 w-2.5 flex-none rounded-full",
                    marker[step.coverage],
                  )}
                />
                {last ? null : (
                  <span aria-hidden className="w-px flex-1 rail-y" />
                )}
              </div>
              <div className={cn("pb-6", last && "pb-0")}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-mono text-xs uppercase tracking-[0.16em]">
                    {step.name}
                  </p>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                      tag[step.coverage],
                    )}
                  >
                    {tagLabel[step.coverage]}
                  </span>
                  <span className="sr-only">
                    {chainCoverageLabel[step.coverage]}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <ChainLegend className="mt-8 border-t border-border/60 pt-6" />
    </div>
  );
}

/**
 * The compact form: node names only, vertical at every width so it reads as a
 * sequence rather than a ragged grid on a phone. This is the hero diagram.
 */
export function AgentChainCompact({
  steps = agentChain,
  className,
}: {
  steps?: ChainNode[];
  className?: string;
}) {
  return (
    <div className={className}>
      <ol className="grid gap-1.5">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step.name} className="grid gap-1.5">
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-md border px-3 py-2 font-mono text-xs uppercase tracking-wider",
                  node[step.coverage],
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 w-1.5 flex-none rounded-full",
                    marker[step.coverage],
                  )}
                />
                {step.name}
                <span className="sr-only">
                  — {chainCoverageLabel[step.coverage]}
                </span>
              </div>
              {last ? null : (
                <span
                  aria-hidden
                  className="ml-[1.4rem] h-3 w-px flex-none rail-y"
                />
              )}
            </li>
          );
        })}
      </ol>
      <ChainLegend className="mt-6" />
    </div>
  );
}
