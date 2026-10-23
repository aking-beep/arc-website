"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { solutions, type Solution } from "@/lib/arc/solutions";
import { Container } from "@/components/arc/ui/container";
import { ArcButton } from "@/components/arc/ui/button";
import { ArcMotion } from "@/components/arc/ui/motion";

/**
 * Master–detail on desktop, accordion below. Ported from the prototype's
 * `services/ServiceExplorer`, with the engagement links the prototype did not
 * have: each area names the scoped engagements under /advisory that deliver
 * it, so a visitor can get to a page with a real length and scope on it.
 */
export function ServiceExplorer() {
  const params = useSearchParams();
  // Deep links from elsewhere on the site (/services?area=ai-governance) open
  // on that area. An id anchor would not work here: on desktop the accordion
  // that would carry it is display:none.
  const requested = params.get("area");
  const initial = solutions.some((s) => s.slug === requested) ? requested! : solutions[0].slug;
  const [slug, setSlug] = useState(initial);
  const active = solutions.find((s) => s.slug === slug) ?? solutions[0];

  return (
    <ArcMotion>
    <section id="solutions" aria-labelledby="areas-title" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <h2
          id="areas-title"
          className="font-serif text-[30px] leading-tight text-ink sm:text-[36px]"
        >
          Six solution areas
        </h2>
        <p className="mt-3 max-w-[640px] text-[16.5px] leading-relaxed text-ink-2">
          Each one starts from the business problem rather than the discipline name. The person on
          your first call stays on the work.
        </p>

        {/* Desktop: master–detail */}
        <div className="mt-10 hidden gap-12 lg:grid lg:grid-cols-[340px_1fr]">
          <ul
            role="tablist"
            aria-label="Solution areas"
            aria-orientation="vertical"
            className="border-t border-ink"
          >
            {solutions.map((s, i) => {
              const on = s.slug === slug;
              return (
                <li key={s.slug} role="presentation">
                  <button
                    id={`svc-${s.slug}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="svc-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setSlug(s.slug)}
                    onKeyDown={(e) => {
                      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                      e.preventDefault();
                      const next =
                        solutions[
                          (i + (e.key === "ArrowDown" ? 1 : -1) + solutions.length) %
                            solutions.length
                        ];
                      setSlug(next.slug);
                      document.getElementById(`svc-${next.slug}`)?.focus();
                    }}
                    className={cn(
                      "relative flex w-full flex-col border-b border-line py-4 pl-4 pr-3 text-left transition-colors duration-150",
                      on ? "bg-paper" : "hover:bg-paper",
                    )}
                  >
                    {on ? (
                      <motion.span
                        layoutId="svc-bar"
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-[3px] bg-brand"
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      />
                    ) : null}
                    <span
                      className={cn(
                        "text-[15.5px] font-semibold",
                        on ? "text-ink" : "text-ink-2",
                      )}
                    >
                      {s.name}
                    </span>
                    <span className="mt-0.5 text-[13.5px] leading-snug text-ink-3">{s.short}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-${slug}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              >
                <ServiceDetail solution={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile and tablet: accordion. */}
        <ul className="mt-8 border-t border-ink lg:hidden">
          {solutions.map((s) => {
            const on = s.slug === slug;
            return (
              <li key={s.slug} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`svc-m-${s.slug}`}
                  onClick={() => setSlug(on ? "" : s.slug)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span>
                    <span className="block text-[16.5px] font-semibold text-ink">{s.name}</span>
                    <span className="mt-1 block text-[14px] text-ink-2">{s.short}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={cn(
                      "mt-1 shrink-0 text-ink-2 transition-transform duration-150",
                      on && "rotate-180",
                    )}
                  />
                </button>
                {on ? (
                  <div id={`svc-m-${s.slug}`} className="pb-8">
                    <ServiceDetail solution={s} compact />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
    </ArcMotion>
  );
}

function ServiceDetail({
  solution: s,
  compact = false,
}: {
  solution: Solution;
  compact?: boolean;
}) {
  return (
    <article>
      {!compact ? (
        <>
          <h3 className="font-serif text-[34px] leading-tight text-ink">{s.name}</h3>
          <p className="mt-2 text-[17px] text-ink-2">{s.short}</p>
        </>
      ) : null}

      <div
        className={cn(
          "grid gap-x-10 gap-y-8 md:grid-cols-2",
          !compact && "mt-9 border-t border-line pt-8",
        )}
      >
        <div>
          <h4 className="text-[13px] font-semibold text-ink-3">The business problem</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-ink">{s.problem}</p>
        </div>
        <div>
          <h4 className="text-[13px] font-semibold text-ink-3">Technical approach</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-ink">{s.approach}</p>
        </div>
        <div>
          <h4 className="text-[13px] font-semibold text-ink-3">Expected outcomes</h4>
          <ul className="mt-2 space-y-2">
            {s.outcomes.map((o) => (
              <li key={o} className="flex gap-2.5 text-[15px] leading-relaxed text-ink">
                <span
                  aria-hidden="true"
                  className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-brand"
                />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[13px] font-semibold text-ink-3">Ideal customer</h4>
          <p className="mt-2 text-[15.5px] leading-relaxed text-ink">{s.ideal}</p>
        </div>
      </div>

      <div className="mt-9 rounded-lg bg-paper p-5 sm:p-6">
        <h4 className="text-[13px] font-semibold text-ink-3">Engagement process</h4>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          {s.process.map((step, i) => (
            <li key={step} className="flex gap-3 text-[14.5px] leading-snug text-ink">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong bg-canvas font-mono text-[11.5px] text-ink-2">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="text-[13px] font-semibold text-ink-3">Scoped engagements</h4>
          <ul className="mt-2 space-y-1.5">
            {s.engagements.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/advisory/${e.slug}`}
                  className="group inline-flex items-center gap-1.5 text-[14.5px] font-medium text-brand hover:underline"
                >
                  {e.name}
                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {s.related && s.related.length > 0 ? (
          <div>
            <h4 className="text-[13px] font-semibold text-ink-3">Related</h4>
            <ul className="mt-2 space-y-1.5">
              {s.related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-[14.5px] text-ink-2 underline-offset-4 hover:text-ink hover:underline"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-8">
        <ArcButton href={`/contact?service=${s.slug}`} arrow>
          Discuss this solution
        </ArcButton>
      </div>
    </article>
  );
}
