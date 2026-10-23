import { ArrowUpRight, BookOpen } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { StatusBadge } from '../ui/StatusBadge';
import { LabPreview } from './LabPreview';
import { categories, type Product } from '../../data/products';

export function ProductCard({ product: p }: { product: Product }) {
  const category = categories.find((c) => c.id === p.category)!.label;

  return (
    <article aria-labelledby={`p-${p.slug}`} className="flex w-full flex-col overflow-hidden rounded-xl border border-line bg-canvas">
      <LabPreview product={p} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[12.5px] text-ink-3">{category}</span>
          <StatusBadge status={p.status} />
        </div>
        <h3 id={`p-${p.slug}`} className="mt-3 text-[19px] font-semibold text-ink">
          {p.name}
        </h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{p.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-[13.5px] font-medium lg:mt-auto">
          {p.app && (
            <a href={p.app} target="_blank" rel="noreferrer" className="inline-flex min-h-[32px] items-center gap-1 text-brand hover:underline">
              Open tool <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">{p.name}, opens in a new tab</span>
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex min-h-[32px] items-center gap-1.5 text-ink-2 hover:text-ink">
              <GitHubLogoIcon width={14} height={14} aria-hidden="true" /> GitHub
              <span className="sr-only">repository for {p.name}, opens in a new tab</span>
            </a>
          )}
          {p.docs && (
            <a href={p.docs} target="_blank" rel="noreferrer" className="inline-flex min-h-[32px] items-center gap-1.5 text-ink-2 hover:text-ink">
              <BookOpen size={14} aria-hidden="true" /> Docs
              <span className="sr-only">for {p.name}, opens in a new tab</span>
            </a>
          )}
          {!p.app && !p.github && !p.docs && (
            <span className="inline-flex min-h-[32px] items-center font-normal text-ink-3">No public build, code or docs yet</span>
          )}
        </div>
      </div>
    </article>
  );
}
