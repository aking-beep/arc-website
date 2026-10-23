import { ArrowRight } from 'lucide-react';
import type { ResearchItem } from '../../data/research';

export function ResearchRow({ item: r, query, onOpen }: { item: ResearchItem; query: string; onOpen: () => void }) {
  return (
    <li className="border-b border-line">
      <button
        onClick={onOpen}
        className="group grid w-full gap-2 py-6 text-left transition-colors duration-150 hover:bg-paper md:grid-cols-[180px_1fr_auto] md:gap-8 md:px-2"
      >
        <span className="flex flex-row gap-3 font-mono text-[12px] text-ink-3 md:flex-col md:gap-1">
          <span className="text-ink-2">{r.kind}</span>
          <span>{r.date}</span>
        </span>
        <span>
          <span className="block text-[17.5px] font-semibold leading-snug text-ink group-hover:text-brand">
            <Highlight text={r.title} query={query} />
          </span>
          <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ink-2">
            <Highlight text={r.summary} query={query} />
          </span>
          <span className="mt-2 block text-[13px] text-ink-3">
            {r.topic} · {r.minutes} min{r.sources > 0 ? ` · ${r.sources} sources` : ''}
          </span>
        </span>
        <ArrowRight size={16} aria-hidden="true" className="mt-1 hidden text-ink-3 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:text-brand md:block" />
      </button>
    </li>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-brand-subtle px-0.5 text-ink">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}
