import Link from "next/link";
import { ArcBrand } from "@/components/arc/brand";
import { arcFooterColumns, arcLegalLinks, arcSite } from "@/lib/arc/site";

/**
 * Ported from the prototype's `Footer`, extended with the routes the
 * redesigned header no longer links. Everything the site publishes stays one
 * click from the bottom of every page, so the redesign does not orphan a page
 * that already ranks.
 */
export function ArcFooter() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <ArcBrand />
          <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-ink-2">
            {arcSite.positioning}
          </p>
        </div>

        {arcFooterColumns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="text-[13px] font-semibold text-ink">{column.heading}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-ink-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-[13px] font-semibold text-ink">Elsewhere</h2>
          <ul className="mt-4 space-y-3 text-[14px]">
            <li>
              <a
                href={`mailto:${arcSite.email}`}
                className="break-all text-ink-2 transition-colors hover:text-ink"
              >
                {arcSite.email}
              </a>
            </li>
            <li>
              <a
                href={arcSite.calendly}
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors hover:text-ink"
              >
                Book 30 minutes
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={arcSite.github}
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors hover:text-ink"
              >
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={arcSite.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors hover:text-ink"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-3 px-5 py-5 text-[13px] text-ink-3 sm:px-8">
          <p>© {new Date().getFullYear()} ARC Transformation Group</p>
          <p className="max-w-[420px]">
            Interactive product previews on this site use clearly labelled demonstration data.
          </p>
          <ul className="flex gap-4">
            {arcLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
