"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { lifecycleControlled, lifecycleSteps } from "@/lib/arc/control";
import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";

/**
 * The nine lifecycle points from `agentLifecycle` (lib/ark.ts). ARC Control
 * addresses four; saying so is more credible than implying it covers all nine.
 */
export function Lifecycle() {
  const [active, setActive] = useState(3);
  const step = lifecycleSteps[active];
  const controlled = lifecycleControlled.includes(step.name);

  return (
    <section
      aria-labelledby="life-title"
      className="border-t border-line bg-paper py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          id="life-title"
          eyebrow="Architecture"
          title="Nine points where agents need infrastructure, not just a model."
          lead="ARC Control focuses on the four highlighted points. The others are where our solutions work and the ARC Labs scanners usually come in."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Agent lifecycle">
            {lifecycleSteps.map((s, i) => {
              const on = i === active;
              const ctl = lifecycleControlled.includes(s.name);
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={cn(
                      "flex h-full min-h-[64px] w-full flex-col justify-between rounded-md border px-3 py-2.5 text-left transition-colors duration-150",
                      on
                        ? "border-ink bg-ink text-canvas"
                        : ctl
                          ? "border-brand/40 bg-brand-subtle text-ink hover:border-brand"
                          : "border-line bg-canvas text-ink-2 hover:border-line-strong",
                    )}
                  >
                    <span className={cn("font-mono text-[11px]", on ? "text-mist-2" : "text-ink-3")}>
                      {i + 1}
                    </span>
                    <span className="text-[13.5px] font-medium">{s.name}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div aria-live="polite" className="border-t border-ink pt-5">
            <p className="font-mono text-[12px] text-ink-3">
              Step {active + 1} of {lifecycleSteps.length}
              {controlled ? <span className="text-brand"> · ARC Control</span> : null}
            </p>
            <h3 className="mt-2 font-serif text-[28px] text-ink">{step.name}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{step.text}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
