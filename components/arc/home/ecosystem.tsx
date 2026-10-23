"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ecoNodes } from "@/lib/arc/ecosystem";
import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";
import { ArcButton } from "@/components/arc/ui/button";
import { ArcMaturityBadge } from "@/components/arc/ui/maturity-badge";
import { ArcMotion } from "@/components/arc/ui/motion";

/**
 * Interactive map of how the four parts of ARC fit together. Click or arrow
 * through them. Ported from the prototype's `home/Ecosystem`.
 */
export function Ecosystem() {
  const [activeId, setActiveId] = useState(ecoNodes[0].id);
  const active = ecoNodes.find((n) => n.id === activeId) ?? ecoNodes[0];

  const onKey = (e: KeyboardEvent, i: number) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    const next = ecoNodes[(i + dir + ecoNodes.length) % ecoNodes.length];
    setActiveId(next.id);
    document.getElementById(`eco-${next.id}`)?.focus();
  };

  return (
    <ArcMotion>
    <section
      aria-labelledby="eco-title"
      className="dark-surface bg-night py-20 text-mist sm:py-24"
    >
      <Container>
        <SectionIntro
          id="eco-title"
          onDark
          eyebrow="How ARC fits together"
          title="Two divisions, one delivery practice, and the research behind them."
          lead="ARC Control and ARC Labs are built by the same people who do the client work. Select a part to see what it does and how it feeds the others."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <div
            role="tablist"
            aria-label="ARC ecosystem"
            aria-orientation="horizontal"
            className="blueprint relative hidden h-[420px] overflow-hidden rounded-xl border border-night-line bg-night-2 md:block"
          >
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              {ecoNodes.map((n) => {
                const on = n.id === activeId;
                return (
                  <line
                    key={n.id}
                    x1="50%"
                    y1="52%"
                    x2={`${n.x}%`}
                    y2={`${n.y}%`}
                    stroke={on ? "hsl(var(--brand-on-dark))" : "hsl(var(--night-line))"}
                    strokeWidth={on ? 1.5 : 1}
                    strokeDasharray={on ? "0" : "4 5"}
                    style={{ transition: "stroke 200ms ease-out" }}
                  />
                );
              })}
              <line x1="18%" y1="26%" x2="18%" y2="78%" stroke="hsl(var(--night-line))" strokeWidth="1" />
              <line x1="82%" y1="26%" x2="82%" y2="78%" stroke="hsl(var(--night-line))" strokeWidth="1" />
            </svg>

            <div
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-mist-2/40 bg-night px-5 py-3.5 text-center"
              style={{ left: "50%", top: "52%" }}
            >
              <span className="text-[14px] font-semibold text-mist">ARC Transformation Group</span>
              <span className="mt-0.5 font-mono text-[11.5px] text-mist-2">
                one company · one contract
              </span>
            </div>

            {ecoNodes.map((n, i) => {
              const on = n.id === activeId;
              return (
                <button
                  key={n.id}
                  id={`eco-${n.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="eco-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActiveId(n.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "absolute w-[176px] -translate-x-1/2 -translate-y-1/2 rounded-lg border px-4 py-3 text-left transition-colors duration-200",
                    on
                      ? "border-brand-on-dark bg-night-3"
                      : "border-night-line bg-night hover:border-mist-2/50",
                  )}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <span className="block text-[14.5px] font-semibold text-mist">{n.name}</span>
                  <span className="mt-0.5 block font-mono text-[11.5px] text-mist-2">{n.role}</span>
                </button>
              );
            })}
          </div>

          {/* Small screens get the same choices as a plain list. */}
          <div role="tablist" aria-label="ARC ecosystem" className="grid grid-cols-2 gap-2 md:hidden">
            {ecoNodes.map((n) => (
              <button
                key={n.id}
                type="button"
                role="tab"
                aria-selected={n.id === activeId}
                aria-controls="eco-panel"
                onClick={() => setActiveId(n.id)}
                className={cn(
                  "min-h-[64px] rounded-lg border px-3 py-3 text-left",
                  n.id === activeId
                    ? "border-brand-on-dark bg-night-3"
                    : "border-night-line bg-night-2",
                )}
              >
                <span className="block text-[14px] font-semibold text-mist">{n.name}</span>
                <span className="block font-mono text-[11px] text-mist-2">{n.role}</span>
              </button>
            ))}
          </div>

          <div id="eco-panel" role="tabpanel" aria-live="polite" className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="flex h-full flex-col"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-[30px] leading-tight text-mist">{active.name}</h3>
                  {active.maturity ? (
                    <ArcMaturityBadge maturity={active.maturity} onDark />
                  ) : null}
                </div>
                <p className="mt-4 text-[16.5px] leading-relaxed text-mist">{active.what}</p>
                <dl className="mt-7 space-y-5 border-t border-night-line pt-6">
                  <div>
                    <dt className="text-[13px] text-mist-2">Who it is for</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-mist">{active.forWho}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-mist-2">How it connects</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-mist">
                      {active.connects}
                    </dd>
                  </div>
                </dl>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <ArcButton href={active.to} variant="onDark" arrow>
                    {active.cta}
                  </ArcButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
    </ArcMotion>
  );
}
