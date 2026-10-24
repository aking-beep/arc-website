import { ArrowRight } from "lucide-react";
import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";
import { ArcButton } from "@/components/arc/ui/button";
import { consoleShowcase } from "@/lib/arc/control";

/**
 * The real operator console, captured page by page from a running server and
 * published as static HTML under `public/ark-control/console/`.
 *
 * This section came from the `/ark-control` page that landed on `main` in
 * "Put the Agent Control console on the site". That page and `/control` were
 * two product pages for one product, so the product content merged into
 * `/control` and this — the part that is genuinely new, and the strongest
 * evidence on the page — came with it.
 *
 * It sits directly after the interactive preview on purpose. The preview shows
 * the direction with invented data and says so; this shows the thing that
 * actually runs. Reading them in that order is the difference between a claim
 * and evidence for it.
 */
export function ConsoleShowcase() {
  return (
    <section
      aria-labelledby="showcase-title"
      className="border-t border-line bg-paper py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          id="showcase-title"
          eyebrow="See it"
          title="The operator console, as it actually renders."
          lead="Ten sections against a running control plane: what needs a human, what every agent attempted, which policy decided and why, and whether the record still verifies. This is the console's own output, captured page by page from the running server — not a mock-up."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="rounded-xl border border-line bg-canvas p-6 sm:p-8">
            <p className="font-mono text-[12px] text-ink-3">What you are looking at</p>
            <dl className="mt-6 grid gap-5 text-[14.5px] leading-relaxed">
              {consoleShowcase.provenance.map((item) => (
                <div key={item.term}>
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-3">
                    {item.term}
                  </dt>
                  <dd className="mt-1.5 text-ink-2">{item.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-line pt-5 font-mono text-[12px] text-ink-3">
              Captured from revision {consoleShowcase.revision} ·{" "}
              {consoleShowcase.pageCount} pages
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {consoleShowcase.sections.map(([name, text]) => (
              <li key={name} className="rounded-lg border border-line bg-canvas px-4 py-3">
                <span className="text-[14px] font-semibold text-ink">{name}</span>
                <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-2">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            {/* A static file in public/, so this is a plain anchor rather than
                a client-side navigation. */}
            <ArcButton href={consoleShowcase.entry}>
              Open the console
              <ArrowRight size={16} aria-hidden="true" />
            </ArcButton>
          </div>
          <p className="max-w-md text-[12.5px] leading-relaxed text-ink-3">
            {consoleShowcase.caveat}
          </p>
        </div>
      </Container>
    </section>
  );
}
