import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';

export function ControlHero() {
  return (
    <section aria-labelledby="control-title" className="dark-surface border-b border-night-line bg-night text-mist">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:py-24">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[13px] text-brand-on-dark">ARC Control</span>
            <StatusBadge status="design-partners" onDark />
          </div>
          <h1
            id="control-title"
            className="mt-6 font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-balance sm:text-[56px] lg:text-[62px]"
          >
            Infrastructure for agents that act on real systems.
          </h1>
          <p className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-mist-2">
            Authorization, auditable execution, MCP validation and observability for AI agents, so you can
            prove what an agent did, under whose authority, and whether the outcome actually happened.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/contact?type=control" variant="onDark" arrow>
              Apply to be a design partner
            </Button>
            <Button
              variant="onDarkOutline"
              onClick={() => document.getElementById('console')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Explore the console preview
            </Button>
          </div>
        </div>

        <aside aria-label="Current status" className="rounded-xl border border-night-line bg-night-2 p-6">
          <h2 className="text-[14px] font-semibold text-mist">Where this is today</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mist-2">
            ARC Control is in design-partner development. You can’t buy it or sign up for it yet, and there’s
            no pricing page because there’s nothing to price.
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mist-2">
            The console on this page is an interactive preview with fictional data. It shows the direction of
            the product, not a shipping feature set.
          </p>
        </aside>
      </Container>
    </section>
  );
}
