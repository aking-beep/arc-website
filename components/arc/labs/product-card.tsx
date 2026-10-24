import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { ArcMaturityBadge } from "@/components/arc/ui/maturity-badge";
import { LabPreview } from "@/components/arc/labs/lab-preview";
import { categoryLabel, type LabProduct } from "@/lib/arc/products";

/** Ported from the prototype's `labs/ProductCard`. */
export function LabCard({ product: p }: { product: LabProduct }) {
  return (
    <article
      aria-labelledby={`lab-${p.slug}`}
      className="flex w-full flex-col overflow-hidden rounded-xl border border-line bg-canvas"
    >
      <LabPreview product={p} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[12.5px] text-ink-3">{categoryLabel(p.category)}</span>
          <ArcMaturityBadge maturity={p.maturity} />
        </div>
        <h3 id={`lab-${p.slug}`} className="mt-3 text-[19px] font-semibold text-ink">
          <Link href={p.href} className="hover:text-brand">
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{p.description}</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-3">
          <span className="font-medium text-ink-2">For: </span>
          {p.audience}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-[13.5px] font-medium lg:mt-auto">
          {p.app ? (
            <a
              href={p.app}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[32px] items-center gap-1 text-brand hover:underline"
            >
              Open tool <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">{p.name}, opens in a new tab</span>
            </a>
          ) : null}
          <Link
            href={p.href}
            className="inline-flex min-h-[32px] items-center gap-1 text-ink-2 hover:text-ink"
          >
            Details <ArrowRight size={14} aria-hidden="true" />
            <span className="sr-only">about {p.name}</span>
          </Link>
          {p.docs ? (
            <a
              href={p.docs}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[32px] items-center gap-1.5 text-ink-2 hover:text-ink"
            >
              <BookOpen size={14} aria-hidden="true" /> Docs
              <span className="sr-only">for {p.name}, opens in a new tab</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
