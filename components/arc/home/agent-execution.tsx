"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, CircleDashed, Pause, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { scenarios, type StepState } from "@/lib/arc/execution";
import { DemoLabel } from "@/components/arc/ui/demo-label";
import { ArcMotion } from "@/components/arc/ui/motion";

/**
 * Walks one simulated agent run through identity, policy, tool call and
 * independent evidence. Ported from the prototype's `AgentExecution`.
 *
 * The data is invented (lib/arc/execution.ts) and the panel says so. With
 * reduced motion the steps render complete immediately rather than animating.
 */
export function AgentExecution({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);
  const reduce = useReducedMotion();
  const scenario = scenarios[active];
  const total = scenario.steps.length;
  const done = shown >= total;

  useEffect(() => {
    if (reduce) {
      setShown(total);
      return;
    }
    setShown(0);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= total) window.clearInterval(timer);
    }, 420);
    return () => window.clearInterval(timer);
  }, [active, run, reduce, total]);

  return (
    <ArcMotion>
      <div className="dark-surface overflow-hidden rounded-xl border border-night-line bg-night text-mist shadow-[0_24px_60px_-30px_hsl(var(--night)/0.55)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-night-line px-5 py-3.5">
          <span className="font-mono text-[12.5px] text-mist-2">
            run_7f3a · refund workflow
          </span>
          <DemoLabel onDark />
        </div>

        <div
          role="tablist"
          aria-label="Execution scenario"
          className="flex gap-1 overflow-x-auto border-b border-night-line px-3 py-2"
        >
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === active}
              aria-controls="agent-execution-panel"
              onClick={() => setActive(i)}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150",
                i === active
                  ? "bg-night-3 text-mist"
                  : "text-mist-2 hover:text-mist",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div id="agent-execution-panel">
          <div className="px-5 pt-4">
            <p className="text-[13.5px] leading-relaxed text-mist-2">
              {scenario.summary}
            </p>
          </div>

          <ol
            aria-live="polite"
            className={cn(
              "relative px-5 py-4",
              compact ? "min-h-[300px]" : "min-h-[352px]",
            )}
          >
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[33px] top-6 w-px bg-night-line"
            />
            {scenario.steps.map((step, i) => {
              const visible = i < shown;
              return (
                <motion.li
                  key={`${scenario.id}-${run}-${i}`}
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0.28, y: visible ? 0 : 4 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="relative flex gap-4 py-2.5"
                >
                  <StateDot state={visible ? step.state : "pending"} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="text-[14px] font-medium text-mist">
                        <span className="mr-2 font-mono text-[11.5px] font-normal text-mist-2">
                          {step.stage}
                        </span>
                        {step.title}
                      </p>
                      <span className="font-mono text-[11.5px] tabular text-mist-2">
                        +{formatMs(step.ms)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-mist-2">
                      {step.detail}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-night-line bg-night-2 px-5 py-3.5">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key={`verdict-${scenario.id}-${run}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className={cn(
                  "text-[13.5px] font-medium",
                  verdictColor[scenario.verdict.state],
                )}
              >
                {scenario.verdict.text}
              </motion.p>
            ) : (
              <motion.p
                key="running"
                exit={{ opacity: 0 }}
                className="font-mono text-[12.5px] text-mist-2"
              >
                Evaluating step {Math.min(shown + 1, total)} of {total}…
              </motion.p>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-night-line px-3 text-[13px] font-medium text-mist transition-colors duration-150 hover:bg-night-3"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Replay
          </button>
        </div>
      </div>
    </ArcMotion>
  );
}

function StateDot({ state }: { state: StepState | "pending" }) {
  const base =
    "relative z-10 mt-0.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border";
  if (state === "pass") {
    return (
      <span
        className={cn(base, "border-ok-on-dark/40 bg-night text-ok-on-dark")}
      >
        <Check size={14} aria-label="Passed" />
      </span>
    );
  }
  if (state === "fail") {
    return (
      <span
        className={cn(
          base,
          "border-danger-on-dark/50 bg-night text-danger-on-dark",
        )}
      >
        <X size={14} aria-label="Failed" />
      </span>
    );
  }
  if (state === "hold") {
    return (
      <span
        className={cn(
          base,
          "border-warn-on-dark/50 bg-night text-warn-on-dark",
        )}
      >
        <Pause size={13} aria-label="Held" />
      </span>
    );
  }
  if (state === "unknown") {
    return (
      <span className={cn(base, "border-night-line bg-night text-mist-2")}>
        <CircleDashed size={14} aria-label="Not run" />
      </span>
    );
  }
  // role="img" so the label is permitted and actually announced: ARIA
  // prohibits aria-label on a <span> with no role.
  return (
    <span
      className={cn(base, "border-night-line bg-night")}
      role="img"
      aria-label="Pending"
    />
  );
}

const verdictColor: Record<StepState, string> = {
  pass: "text-ok-on-dark",
  fail: "text-danger-on-dark",
  hold: "text-warn-on-dark",
  unknown: "text-mist-2",
};

function formatMs(ms: number) {
  if (ms >= 1000) return `${(ms / 1000).toFixed(ms >= 10000 ? 0 : 1)} s`;
  return `${ms} ms`;
}
