import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { ServiceExplorer } from '../components/services/ServiceExplorer';
import { ReadinessAssessment } from '../components/services/ReadinessAssessment';
import { CloudExplorer } from '../components/services/CloudExplorer';
import { EngagementShapes } from '../components/services/EngagementShapes';
import { ClosingCta } from '../components/ClosingCta';

export function Services() {
  return (
    <>
      <section aria-labelledby="svc-title" className="border-b border-line">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[13px] text-brand">Enterprise Services</p>
            <h1 id="svc-title" className="mt-5 font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-ink text-balance sm:text-[56px]">
              Senior people on the work, from the first call to production.
            </h1>
            <p className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-ink-2">
              Eight service areas, each starting from the business problem. The person on your first call stays on
              the work, and every phase can end in a decision to stop.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button
              variant="secondary"
              onClick={() => document.getElementById('readiness')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Take the readiness check
            </Button>
            <Button to="/contact" arrow>
              Talk to ARC
            </Button>
          </div>
        </Container>
      </section>

      <ServiceExplorer />
      <ReadinessAssessment />
      <CloudExplorer />
      <EngagementShapes />
      <ClosingCta
        title="Tell us the problem, not the discipline."
        lead="Working out which service you need is our job. Describe what’s happening and we’ll come back with a recommended first step and a rough shape — or tell you we’re not the right fit."
      />
    </>
  );
}
