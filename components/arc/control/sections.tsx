import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";
import { ArcButton } from "@/components/arc/ui/button";
import { ArcMaturityBadge } from "@/components/arc/ui/maturity-badge";
import { cn } from "@/lib/utils";
import { control, controlCtas, gap } from "@/lib/arc/control";

/** The dark page header. Says what the product is and what it is not, at once. */
export function ControlHero() {
  return (
    <section
      aria-labelledby="control-title"
      className="dark-surface border-b border-night-line bg-night text-mist"
    >
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:py-24">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[13px] text-brand-on-dark">ARC Control</span>
            <ArcMaturityBadge maturity={control.maturity} onDark />
          </div>
          <h1
            id="control-title"
            className="mt-6 font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-balance sm:text-[56px] lg:text-[62px]"
          >
            {control.tagline}
          </h1>
          <p className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-mist-2">
            {control.lead}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ArcButton href={controlCtas.primary.href} variant="onDark" arrow>
              {controlCtas.primary.label}
            </ArcButton>
            <ArcButton href={controlCtas.secondary.href} variant="onDarkOutline">
              {controlCtas.secondary.label}
            </ArcButton>
            <ArcButton href="#console" variant="onDarkOutline">
              Explore the console preview
            </ArcButton>
          </div>
        </div>

        <aside
          aria-label="Current status"
          className="rounded-xl border border-night-line bg-night-2 p-6"
        >
          <h2 className="text-[14px] font-semibold text-mist">{control.todayLabel}</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mist-2">{control.today}</p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mist-2">{control.previewNote}</p>
        </aside>
      </Container>
    </section>
  );
}

/** The problem, and the diagram of where tracing stops. */
export function ExecutionGap() {
  return (
    <section aria-labelledby="gap-title" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionIntro
            id="gap-title"
            eyebrow="The problem"
            title={gap.headline}
            lead="A successful model response isn’t the same as a successful business outcome. Tracing tells you what the agent attempted. It doesn’t tell you what changed."
          />
          <ul className="border-t border-line">
            {gap.failures.map((f) => (
              <li key={f} className="border-b border-line py-4 text-[16px] leading-relaxed text-ink">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <figure className="mt-16">
          <div
            className="overflow-x-auto pb-2"
            tabIndex={0}
            role="region"
            aria-label="Agent execution chain, scrollable"
          >
            <ol className="grid min-w-[760px] grid-cols-6 gap-2" aria-label="Agent execution chain">
              {gap.chain.map((c, i) => (
                <li key={c.name}>
                  <div
                    className={cn(
                      "flex h-[72px] items-center rounded-md border px-4 text-[14.5px] font-medium",
                      c.covered === "control"
                        ? "border-brand bg-brand-subtle text-ink"
                        : "border-line bg-paper text-ink-2",
                    )}
                  >
                    <span className="mr-2 font-mono text-[12px] text-ink-3">{i + 1}</span>
                    {c.name}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-3 grid min-w-[760px] grid-cols-6 gap-2 text-[13px]">
              <div className="col-span-3 border-t-2 border-line-strong pt-2 text-ink-2">
                What logs and traces typically capture
              </div>
              <div className="col-span-3 border-t-2 border-brand pt-2 font-medium text-brand">
                What ARC Control is built to verify
              </div>
            </div>
          </div>
          <figcaption className="mt-6 max-w-[640px] text-[14.5px] leading-relaxed text-ink-2">
            {gap.takeaway} ARC Control connects execution evidence — the trace, the tool call, the
            identity, the policy decision — with evidence collected from the system that was
            supposed to change.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

/** What the product does not do. Non-negotiable on this page. */
export function ControlLimits() {
  return (
    <section aria-labelledby="limits-title" className="py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <h2
            id="limits-title"
            className="font-serif text-[32px] leading-tight tracking-[-0.015em] text-ink sm:text-[40px]"
          >
            What ARC Control is not.
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
            Security and platform teams have heard every claim. Here is what we don’t claim.
          </p>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {control.limits.map((limit) => (
            <li key={limit} className="border-t border-line py-5">
              <p className="text-[15.5px] leading-relaxed text-ink">{limit}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
