import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { AgentExecution } from '../AgentExecution';

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:py-24">
        <div>
          <h1
            id="hero-title"
            className="font-serif text-[44px] leading-[1.04] tracking-[-0.025em] text-ink text-balance sm:text-[60px] lg:text-[68px]"
          >
            Make technology work for your business.
          </h1>
          <p className="mt-7 max-w-[540px] text-[18px] leading-relaxed text-ink-2 text-pretty">
            ARC builds the controls that let AI agents act on production systems safely, modernizes the
            infrastructure they depend on, and turns emerging technology into products people actually use.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button to="/control" arrow>
              Explore ARC Control
            </Button>
            <Button to="/labs" variant="secondary">
              Explore ARC Labs
            </Button>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center px-2 text-[14.5px] font-medium text-brand underline-offset-4 hover:underline"
            >
              Talk to ARC
            </Link>
          </div>

          <dl className="mt-12 grid max-w-[540px] grid-cols-2 gap-x-8 border-t border-line pt-6">
            <div>
              <dt className="text-[13px] text-ink-3">ARC Control</dt>
              <dd className="mt-1 text-[14.5px] leading-snug text-ink">Authorization, audit and verification for AI agents</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-3">ARC Labs</dt>
              <dd className="mt-1 text-[14.5px] leading-snug text-ink">Open-source scanners and applied product experiments</dd>
            </div>
          </dl>
        </div>

        <AgentExecution />
      </Container>
    </section>
  );
}
