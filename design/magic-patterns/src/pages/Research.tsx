import { Fragment, useCallback, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { ResearchRow } from '../components/research/ResearchRow';
import { ResearchDrawer } from '../components/research/ResearchDrawer';
import { research, researchKinds, type ResearchItem, type ResearchKind } from '../data/research';

export function Research() {
  const [q, setQ] = useState('');
  const [kind, setKind] = useState<ResearchKind | 'all'>('all');
  const [topic, setTopic] = useState('all');
  const [open, setOpen] = useState<ResearchItem | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const topics = useMemo(() => Array.from(new Set(research.map((r) => r.topic))).sort(), []);
  const featured = research.find((r) => r.featured)!;

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return research.filter(
      (r) =>
        (kind === 'all' || r.kind === kind) &&
        (topic === 'all' || r.topic === topic) &&
        (!term || `${r.title} ${r.summary} ${r.topic}`.toLowerCase().includes(term)),
    );
  }, [q, kind, topic]);

  const filtered = q || kind !== 'all' || topic !== 'all';
  const reset = () => {
    setQ('');
    setKind('all');
    setTopic('all');
  };

  return (
    <>
      <section aria-labelledby="research-title" className="border-b border-line">
        <Container className="py-16 sm:py-20">
          <p className="font-mono text-[13px] text-brand">Research and Insights</p>
          <h1 id="research-title" className="mt-5 max-w-[820px] font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-ink text-balance sm:text-[56px]">
            The reasoning and the sources, not a summary of a summary.
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-ink-2">
            Technical papers, frameworks, architecture guides and case studies. Dated, cited, and updated when the
            facts change.
          </p>
        </Container>
      </section>

      <section aria-labelledby="featured-title" className="border-b border-line bg-paper">
        <Container className="grid gap-8 py-12 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <h2 id="featured-title" className="font-mono text-[12px] text-ink-3">
              Featured · {featured.kind}
            </h2>
            <button onClick={() => setOpen(featured)} className="group mt-3 block text-left">
              <span className="block font-serif text-[30px] leading-[1.15] text-ink transition-colors duration-150 group-hover:text-brand sm:text-[36px]">
                {featured.title}
              </span>
              <span className="mt-4 block text-[16.5px] leading-relaxed text-ink-2">{featured.summary}</span>
              <span className="mt-4 block text-[13.5px] text-ink-3">
                {featured.date} · {featured.minutes} min read · {featured.sources} cited sources
              </span>
            </button>
          </div>
          <div className="border-t border-line-strong pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="text-[14px] font-semibold text-ink">Free frameworks</h3>
            <ul className="mt-3 divide-y divide-line">
              {research
                .filter((r) => r.kind === 'Framework')
                .map((r) => (
                  <li key={r.slug}>
                    <button onClick={() => setOpen(r)} className="group block w-full py-3 text-left">
                      <span className="block text-[15.5px] font-semibold text-ink group-hover:text-brand">{r.title}</span>
                      <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-2">{r.summary}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="library-title" className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="library-title" className="font-serif text-[28px] text-ink sm:text-[32px]">
              Library
            </h2>
            <p className="text-[14px] text-ink-3" aria-live="polite">
              {list.length} of {research.length} items
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative block">
              <span className="sr-only">Search research</span>
              <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles, topics and summaries"
                className="h-12 w-full rounded-md border border-line-strong bg-canvas pl-10 pr-10 text-[15px] text-ink placeholder:text-ink-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              {q && (
                <button onClick={() => setQ('')} aria-label="Clear search" className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-ink-3 hover:text-ink">
                  <X size={16} />
                </button>
              )}
            </label>
            <label className="block">
              <span className="sr-only">Filter by topic</span>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="h-12 w-full rounded-md border border-line-strong bg-canvas px-3 text-[15px] text-ink focus:border-brand focus:outline-none"
              >
                <option value="all">All topics</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div role="group" aria-label="Filter by type" className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {(['all', ...researchKinds] as const).map((k) => {
              const on = k === kind;
              const count = k === 'all' ? research.length : research.filter((r) => r.kind === k).length;
              return (
                <button
                  key={k}
                  aria-pressed={on}
                  onClick={() => setKind(k)}
                  className={`min-h-[40px] whitespace-nowrap rounded-full border px-4 text-[13.5px] font-medium transition-colors duration-150 ${
                    on ? 'border-ink bg-ink text-white' : 'border-line-strong text-ink-2 hover:border-ink hover:text-ink'
                  }`}
                >
                  {k === 'all' ? 'All types' : k} <span className={`font-mono text-[11.5px] ${on ? 'text-mist-2' : 'text-ink-3'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <ul className="mt-8 border-t border-ink">
            {list.map((r) => (
              <Fragment key={r.slug}>
                <ResearchRow item={r} query={q} onOpen={() => setOpen(r)} />
              </Fragment>
            ))}
          </ul>

          {list.length === 0 && (
            <div className="border-b border-line py-14 text-center">
              <p className="text-[16px] text-ink">Nothing matches those filters.</p>
              <button onClick={reset} className="mt-3 min-h-[44px] text-[14.5px] font-medium text-brand hover:underline">
                Clear all filters
              </button>
            </div>
          )}
          {filtered && list.length > 0 && (
            <button onClick={reset} className="mt-6 min-h-[44px] text-[14px] font-medium text-brand hover:underline">
              Clear filters
            </button>
          )}
        </Container>
      </section>

      <ResearchDrawer item={open} onClose={close} />
    </>
  );
}
