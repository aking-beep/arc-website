import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { site } from '../data/site';

export function ClosingCta({
  title,
  lead,
  primary = { label: 'Talk to ARC', to: '/contact' },
}: {
  title: string;
  lead: string;
  primary?: { label: string; to: string };
}) {
  return (
    <section aria-labelledby="cta-title" className="dark-surface bg-night py-20 text-mist sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 id="cta-title" className="font-serif text-[34px] leading-[1.1] tracking-[-0.015em] text-balance sm:text-[44px]">
            {title}
          </h2>
          <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-mist-2">{lead}</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <div className="flex flex-wrap gap-3">
            <Button to={primary.to} variant="onDark" arrow>
              {primary.label}
            </Button>
            <Button href={site.calendly} variant="onDarkOutline">
              Book 30 minutes
            </Button>
          </div>
          <p className="text-[14px] text-mist-2">
            Or email{' '}
            <a href={`mailto:${site.email}`} className="text-mist underline underline-offset-2 hover:text-white">
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
