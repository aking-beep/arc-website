"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { maxScorePerQuestion, questions, readinessLevel } from "@/lib/arc/readiness";
import { solutions } from "@/lib/arc/solutions";
import { Container } from "@/components/arc/ui/container";
import { ArcButton } from "@/components/arc/ui/button";
import { ArcMotion } from "@/components/arc/ui/motion";

/**
 * Six-question readiness check. Ported from the prototype's
 * `services/ReadinessAssessment`.
 *
 * Scored entirely in the browser; nothing is stored or sent. It is
 * self-reported, which the copy says, so it is a starting point rather than
 * evidence — the 20-question agent scorecard is linked for the deeper version.
 */
export function ReadinessAssessment() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const done = step >= questions.length;

  const choose = (score: number) =>
    setAnswers((a) => a.map((v, i) => (i === step ? score : v)));

  const next = () => {
    setStep((s) => s + 1);
    window.setTimeout(() => headingRef.current?.focus(), 0);
  };

  const total = answers.reduce<number>((sum, v) => sum + (v ?? 0), 0);
  const pct = Math.round((total / (questions.length * maxScorePerQuestion)) * 100);
  const level = readinessLevel(pct);
  const weakest = questions
    .map((q, i) => ({ q, score: answers[i] ?? 0 }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  const q = questions[Math.min(step, questions.length - 1)];

  return (
    <ArcMotion>
    <section
      id="readiness"
      aria-labelledby="ready-title"
      className="scroll-mt-20 border-t border-line bg-paper py-20 sm:py-24"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <p className="font-mono text-[12.5px] font-medium text-brand">AI readiness check</p>
          <h2
            id="ready-title"
            className="mt-3 font-serif text-[32px] leading-tight tracking-[-0.015em] text-ink sm:text-[40px]"
          >
            Six questions. Two minutes. An honest read.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-ink-2">
            Answer for how things work today, not how they are meant to work. Scoring happens in
            your browser and nothing is stored. It’s self-reported, so treat it as a starting point
            rather than evidence.
          </p>
          <p className="mt-6 border-t border-line pt-5 text-[14.5px] leading-relaxed text-ink-3">
            Looking at agents specifically?{" "}
            <Link
              href="/playbooks/agent-readiness-scorecard"
              className="font-medium text-brand hover:underline"
            >
              The Agent Readiness Scorecard
            </Link>{" "}
            is twenty questions across interfaces, identity, permissions, observability, security
            and reliability. Also free, also scored in the browser.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-canvas p-6 sm:p-8">
          {!done ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[12px] text-ink-3">
                  {q.dimension} · {step + 1} of {questions.length}
                </span>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex min-h-[36px] items-center gap-1 text-[13px] font-medium text-ink-2 hover:text-ink"
                  >
                    <ArrowLeft size={14} aria-hidden="true" /> Back
                  </button>
                ) : null}
              </div>
              <div className="mt-3 h-1 rounded-full bg-line" aria-hidden="true">
                <motion.div
                  className="h-full rounded-full bg-brand"
                  animate={{ width: `${(step / questions.length) * 100}%` }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.fieldset
                  key={q.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-7"
                >
                  <legend>
                    <h3
                      ref={headingRef}
                      tabIndex={-1}
                      className="text-[20px] font-semibold leading-snug text-ink outline-none"
                    >
                      {q.text}
                    </h3>
                  </legend>
                  <div className="mt-5 space-y-2">
                    {q.options.map((option, i) => {
                      const on = answers[step] === i;
                      return (
                        <label
                          key={option}
                          className={cn(
                            "flex min-h-[52px] cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[15px] transition-colors duration-150",
                            "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2",
                            on
                              ? "border-brand bg-brand-subtle text-ink"
                              : "border-line text-ink-2 hover:border-line-strong",
                          )}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            checked={on}
                            onChange={() => choose(i)}
                            className="h-4 w-4 shrink-0 accent-[hsl(var(--brand))]"
                          />
                          {option}
                        </label>
                      );
                    })}
                  </div>
                </motion.fieldset>
              </AnimatePresence>

              <div className="mt-7 flex justify-end">
                <ArcButton onClick={next} disabled={answers[step] === null}>
                  {step === questions.length - 1 ? "See my results" : "Next question"}
                </ArcButton>
              </div>
            </>
          ) : (
            <div aria-live="polite">
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="text-[14px] font-medium text-ink-3 outline-none"
              >
                Your readiness
              </h3>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-4">
                <span className="font-serif text-[56px] leading-none tabular text-ink">{pct}</span>
                <span className="text-[20px] font-semibold text-ink">{level.label}</span>
              </div>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{level.text}</p>

              <ul className="mt-7 space-y-3">
                {questions.map((qq, i) => (
                  <li
                    key={qq.id}
                    className="grid grid-cols-[110px_1fr_28px] items-center gap-3 text-[13.5px]"
                  >
                    <span className="text-ink-2">{qq.dimension}</span>
                    <span className="h-2 rounded-full bg-line" aria-hidden="true">
                      <span
                        className="block h-full rounded-full bg-ink"
                        style={{ width: `${((answers[i] ?? 0) / maxScorePerQuestion) * 100}%` }}
                      />
                    </span>
                    <span className="text-right font-mono tabular text-ink">
                      {answers[i] ?? 0}
                      <span className="sr-only"> of {maxScorePerQuestion}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <h4 className="text-[14px] font-semibold text-ink">Where to start</h4>
                <ul className="mt-3 space-y-4">
                  {weakest.map(({ q: wq }) => {
                    const solution = solutions.find((s) => s.slug === wq.solution);
                    return (
                      <li key={wq.id} className="text-[15px] leading-relaxed">
                        <span className="text-ink">{wq.advice}</span>
                        {solution ? (
                          <Link
                            href={`/services?area=${solution.slug}#solutions`}
                            className="mt-0.5 block text-[13.5px] text-brand hover:underline"
                          >
                            Related solution: {solution.name}
                          </Link>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ArcButton href={`/contact?readiness=${pct}`} arrow>
                  Discuss these results
                </ArcButton>
                <ArcButton
                  variant="secondary"
                  onClick={() => {
                    setAnswers(Array(questions.length).fill(null));
                    setStep(0);
                  }}
                >
                  Start again
                </ArcButton>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
    </ArcMotion>
  );
}
