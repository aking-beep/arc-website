"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PanelLabel } from "@/components/diagram";
import { cn } from "@/lib/utils";
import {
  scorecardBands,
  scorecardDimensions,
  scorecardQuestions,
} from "@/lib/learn";

type Answers = Record<string, number>;

function bandFor(score: number) {
  return (
    scorecardBands.find((b) => score >= b.min && score <= b.max) ??
    scorecardBands[0]
  );
}

/**
 * Scored entirely in the browser. Nothing is submitted anywhere, which is the
 * only reason it can be offered without an email gate.
 */
export function Scorecard() {
  const [answers, setAnswers] = React.useState<Answers>({});
  const resultRef = React.useRef<HTMLDivElement>(null);

  const answered = Object.keys(answers).length;
  const total = scorecardQuestions.length;
  const complete = answered === total;

  const max = total * 2;
  const raw = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const score = Math.round((raw / max) * 100);
  const band = bandFor(score);

  const byDimension = scorecardDimensions.map((dimension) => {
    const questions = scorecardQuestions.filter((q) => q.dimension === dimension);
    const scored = questions.filter((q) => q.id in answers);
    const got = scored.reduce((sum, q) => sum + answers[q.id], 0);
    const possible = scored.length * 2;
    return {
      dimension,
      answered: scored.length,
      of: questions.length,
      percent: possible === 0 ? null : Math.round((got / possible) * 100),
    };
  });

  // Only name a dimension if it is dragging the score down. A full
  // marks run should not be handed a list of things to fix.
  const weakest = byDimension
    .filter((d) => d.percent !== null && d.percent < 100)
    .sort((a, b) => (a.percent ?? 0) - (b.percent ?? 0))
    .slice(0, 3);

  React.useEffect(() => {
    if (complete) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [complete]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <ol className="grid gap-5">
        {scorecardQuestions.map((q, i) => (
          <li key={q.id}>
            <Card className="p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
                <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {q.dimension}
                </span>
              </div>
              <fieldset className="mt-4">
                <legend className="text-base font-medium leading-relaxed">
                  {q.question}
                </legend>
                <div className="mt-4 grid gap-2">
                  {q.answers.map((a) => {
                    const selected = answers[q.id] === a.score;
                    return (
                      <label
                        key={a.label}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-sm leading-relaxed transition-colors",
                          selected
                            ? "border-brand bg-brand/10 text-foreground"
                            : "border-border text-muted-foreground hover:bg-accent/60",
                        )}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          className="mt-1 h-3.5 w-3.5 flex-none accent-[hsl(var(--brand))]"
                          checked={selected}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: a.score }))
                          }
                        />
                        {a.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </Card>
          </li>
        ))}
      </ol>

      <div className="lg:sticky lg:top-24" ref={resultRef}>
        <Card className="p-6 sm:p-8">
          <PanelLabel>Your result</PanelLabel>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-5xl font-semibold tracking-tight">
              {complete ? score : answered === 0 ? "—" : score}
            </span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>

          <div className="mt-4" aria-hidden>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand transition-all"
                style={{ width: `${(answered / total) * 100}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {answered} of {total} answered
            </p>
          </div>

          {answered === 0 ? (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Answer the questions and the band appears here. The score is
              computed in your browser — nothing is sent anywhere, so there is
              no report to email you and nothing for us to store.
            </p>
          ) : (
            <>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">
                {complete ? band.label : `Tracking: ${band.label}`}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {complete
                  ? band.text
                  : "Partial score, based only on what you have answered so far."}
              </p>

              <div className="mt-6 border-t border-border/60 pt-5">
                <PanelLabel>By dimension</PanelLabel>
                <dl className="mt-4 grid gap-2.5">
                  {byDimension.map((d) => (
                    <div key={d.dimension} className="flex items-center gap-3">
                      <dt className="w-28 flex-none font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {d.dimension}
                      </dt>
                      <dd className="flex flex-1 items-center gap-2">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <span
                            className="block h-full rounded-full bg-foreground/40"
                            style={{ width: `${d.percent ?? 0}%` }}
                          />
                        </span>
                        <span className="w-10 flex-none text-right font-mono text-[11px] text-muted-foreground">
                          {d.percent === null ? "—" : `${d.percent}%`}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 border-t border-border/60 pt-5">
                <PanelLabel>Fix these first</PanelLabel>
                {weakest.length > 0 ? (
                  <ol className="mt-3 grid gap-1.5">
                    {weakest.map((d) => (
                      <li
                        key={d.dimension}
                        className="flex items-baseline justify-between gap-3 text-sm text-muted-foreground"
                      >
                        {d.dimension}
                        <span className="font-mono text-[11px]">{d.percent}%</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Nothing is dragging the score down. The useful work from here
                    is narrowing authority further, not adding capability.
                  </p>
                )}
              </div>

              <div className="mt-7 grid gap-3">
                <Button href="/assessment">
                  See the full assessment
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  type="button"
                  onClick={() => setAnswers({})}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Start again
                </button>
              </div>
            </>
          )}

          <p className="mt-6 border-t border-border/60 pt-5 text-xs leading-relaxed text-muted-foreground">
            This is self-reported, so treat it as a starting point rather than
            evidence. The{" "}
            <Link
              href="/assessment"
              className="font-medium text-foreground underline underline-offset-4"
            >
              full assessment
            </Link>{" "}
            runs against your actual systems.
          </p>
        </Card>
      </div>
    </div>
  );
}
