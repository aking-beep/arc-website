import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { ArcMaturityBadge } from "@/components/arc/ui/maturity-badge";
import { LabPreview } from "@/components/arc/labs/lab-preview";
import { categoryLabel, type LabProduct } from "@/lib/arc/products";

/**
 * The GitHub glyph. The prototype imported `@radix-ui/react-icons` for this
 * one mark; inlining it avoids a dependency for a single path.
 */
function GitHubMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.07-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.15 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

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
          {p.github ? (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[32px] items-center gap-1.5 text-ink-2 hover:text-ink"
            >
              <GitHubMark /> GitHub
              <span className="sr-only">repository for {p.name}, opens in a new tab</span>
            </a>
          ) : null}
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
