"use client";

import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { controlCapabilities, type ConsoleTab } from "@/lib/arc/control";
import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";
import { ArcMaturityBadge } from "@/components/arc/ui/maturity-badge";

/**
 * The six capabilities, each wired to the console view that demonstrates it.
 *
 * Added to the prototype: a maturity badge per capability. The brief asks for
 * accurate status labels and warns against claiming every capability is
 * already implemented, and this page covers a product in design-partner
 * development — so each row says where it actually is.
 */
export function ControlCapabilities({ onOpen }: { onOpen: (t: ConsoleTab) => void }) {
  return (
    <section
      aria-labelledby="ccap-title"
      className="border-t border-line bg-paper py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          id="ccap-title"
          eyebrow="Capabilities"
          title="Six controls between an agent and your production systems."
          lead="Each one carries its real status and links to the matching view in the console preview below. Nothing here is shipping to general availability yet."
        />
        <ul className="mt-12 grid gap-x-14 md:grid-cols-2">
          {controlCapabilities.map((c) => (
            <li key={c.name} className="flex flex-col border-t border-line-strong py-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-[18px] font-semibold text-ink">{c.name}</h3>
                <ArcMaturityBadge maturity={c.state} />
              </div>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink">{c.text}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{c.detail}</p>
              <button
                type="button"
                onClick={() => onOpen(c.tab)}
                className={cn(
                  "mt-4 inline-flex min-h-[44px] items-center gap-1.5 self-start text-[14px] font-medium text-brand hover:underline",
                  "md:mt-auto md:pt-4",
                )}
              >
                See it in {c.tabLabel}
                <ArrowDown size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
