import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { services, type Service } from '../../data/services';

export function ServiceExplorer() {
  const [slug, setSlug] = useState(services[0].slug);
  const active = services.find((s) => s.slug === slug)!;

  return (
    <section aria-labelledby="areas-title" className="py-16 sm:py-20">
      <Container>
        <h2 id="areas-title" className="font-serif text-[30px] leading-tight text-ink sm:text-[36px]">
          Service areas
        </h2>

        {/* Desktop: master–detail */}
        <div className="mt-10 hidden gap-12 lg:grid lg:grid-cols-[340px_1fr]">
          <ul role="tablist" aria-label="Service areas" aria-orientation="vertical" className="border-t border-ink">
            {services.map((s, i) => {
              const on = s.slug === slug;
              return (
                <li key={s.slug} role="presentation">
                  <button
                    id={`svc-${s.slug}`}
                    role="tab"
                    aria-selected={on}
                    aria-controls="svc-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setSlug(s.slug)}
                    onKeyDown={(e) => {
                      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
                      e.preventDefault();
                      const n = services[(i + (e.key === 'ArrowDown' ? 1 : -1) + services.length) % services.length];
                      setSlug(n.slug);
                      document.getElementById(`svc-${n.slug}`)?.focus();
                    }}
                    className={`relative flex w-full flex-col border-b border-line py-4 pl-4 pr-3 text-left transition-colors duration-150 ${
                      on ? 'bg-paper' : 'hover:bg-paper'
                    }`}
                  >
                    {on && <motion.span layoutId="svc-bar" className="absolute inset-y-0 left-0 w-[3px] bg-brand" transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }} />}
                    <span className={`text-[15.5px] font-semibold ${on ? 'text-ink' : 'text-ink-2'}`}>{s.name}</span>
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
                <ServiceDetail service={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile and tablet: accordion */}
        <ul className="mt-8 border-t border-ink lg:hidden">
          {services.map((s) => {
            const on = s.slug === slug;
            return (
              <li key={s.slug} className="border-b border-line">
                <button
                  aria-expanded={on}
                  aria-controls={`svc-m-${s.slug}`}
                  onClick={() => setSlug(on ? '' : s.slug)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span>
                    <span className="block text-[16.5px] font-semibold text-ink">{s.name}</span>
                    <span className="mt-1 block text-[14px] text-ink-2">{s.short}</span>
                  </span>
                  <ChevronDown size={18} aria-hidden="true" className={`mt-1 shrink-0 text-ink-2 transition-transform duration-150 ${on ? 'rotate-180' : ''}`} />
                </button>
                {on && (
                  <div id={`svc-m-${s.slug}`} className="pb-8">
                    <ServiceDetail service={s} compact />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function ServiceDetail({ service: s, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <article>
      {!compact && (
        <>
          <h3 className="font-serif text-[34px] leading-tight text-ink">{s.name}</h3>
          <p className="mt-2 text-[17px] text-ink-2">{s.short}</p>
        </>
      )}
      <div className={`grid gap-x-10 gap-y-8 md:grid-cols-2 ${compact ? '' : 'mt-9 border-t border-line pt-8'}`}>
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
                <span aria-hidden="true" className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-brand" />
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
          {s.process.map((p, i) => (
            <li key={p} className="flex gap-3 text-[14.5px] leading-snug text-ink">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong bg-canvas font-mono text-[11.5px] text-ink-2">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-7">
        <Button to={`/contact?service=${s.slug}`} arrow>
          Discuss this service
        </Button>
      </div>
    </article>
  );
}
