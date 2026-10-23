import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { research } from '../../data/research';

export function LatestResearch() {
  const [lead, ...rest] = research.slice(0, 4);

  return (
    <section aria-labelledby="res-title" className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[12.5px] font-medium text-brand">Research and insights</p>
            <h2 id="res-title" className="mt-3 font-serif text-[32px] leading-tight tracking-[-0.015em] text-ink sm:text-[40px]">
              What changed, with sources.
            </h2>
          </div>
          <Link to="/research" className="inline-flex items-center gap-1.5 text-[14.5px] font-medium text-brand hover:underline">
            All research <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-10 border-t border-ink pt-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <Link to="/research" className="group block">
            <p className="font-mono text-[12px] text-ink-3">
              {lead.kind} · {lead.topic} · {lead.date}
            </p>
            <h3 className="mt-3 font-serif text-[28px] leading-[1.18] text-ink transition-colors duration-150 group-hover:text-brand sm:text-[32px]">
              {lead.title}
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{lead.summary}</p>
            <p className="mt-4 text-[13.5px] text-ink-3">{lead.minutes} min read · {lead.sources} cited sources</p>
          </Link>

          <ul className="divide-y divide-line border-t border-line lg:border-t-0">
            {rest.map((r) => (
              <li key={r.slug}>
                <Link to="/research" className="group block py-5 first:pt-0">
                  <p className="font-mono text-[12px] text-ink-3">
                    {r.kind} · {r.date}
                  </p>
                  <h3 className="mt-1.5 text-[16px] font-semibold leading-snug text-ink transition-colors duration-150 group-hover:text-brand">
                    {r.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
