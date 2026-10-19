import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { PanelLabel } from "@/components/diagram";
import { assuranceExamples, verificationModel } from "@/lib/ark";
import { cn } from "@/lib/utils";

/**
 * Two worked examples of the same gap: the agent's claim, what the execution
 * record proves, and what nobody has actually checked.
 *
 * None of this is a screenshot of a product. It is an argument, on a page
 * that says in its first screen that the product does not exist yet.
 */
export function AssuranceExamples({ className }: { className?: string }) {
  return (
    <Section className={className}>
      <SectionHeading
        kicker="Worked examples"
        title="The same sentence, twice, meaning nothing."
        lead="In both of these the run is green, the tool call succeeded, and nobody has looked at the system that was supposed to change."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {assuranceExamples.map((example) => (
          <Card key={example.claim} className="flex h-full flex-col p-6 sm:p-8">
            <PanelLabel>The agent says</PanelLabel>
            <p className="mt-3 border-l-2 border-border pl-4 text-lg font-medium leading-snug">
              &ldquo;{example.claim}&rdquo;
            </p>

            <div className="mt-7 border-t border-border/60 pt-5">
              <PanelLabel>Execution evidence</PanelLabel>
              <ul className="mt-3 grid gap-2">
                {example.executionEvidence.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-border"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex-1 border-t border-border/60 pt-5">
              <PanelLabel>What assurance asks</PanelLabel>
              <ul className="mt-3 grid gap-2">
                {example.assuranceAsks.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const resultTone: Record<string, string> = {
  Verified: "border-emerald-500/40 text-emerald-700 dark:text-emerald-400",
  Failed: "border-red-500/40 text-red-600 dark:text-red-400",
  Unknown: "border-dashed border-border text-muted-foreground",
};

/**
 * What a verification would be assembled from, and the three answers it can
 * return. The third one is the point: an unknown is never a pass.
 */
export function VerificationModel({ className }: { className?: string }) {
  return (
    <Section className={className}>
      <SectionHeading
        kicker="The model"
        title="Four records, one answer."
        lead="None of the four is sufficient on its own, and the fourth is the one almost nobody collects."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {verificationModel.inputs.map((input, i) => (
          <li key={input.name} className="bg-card p-6">
            <span className="font-mono text-[11px] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-sm font-semibold">{input.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {input.text}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        = Verification result
      </p>

      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {verificationModel.results.map((result) => (
          <li
            key={result.name}
            className={cn("rounded-lg border bg-card p-5", resultTone[result.name])}
          >
            <p className="font-mono text-xs uppercase tracking-wider">
              {result.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {result.text}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 border-l-2 border-brand pl-5 text-lg font-medium leading-relaxed">
        {verificationModel.rule}
      </p>
    </Section>
  );
}
