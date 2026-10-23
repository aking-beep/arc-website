"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { arcNav, arcSite } from "@/lib/arc/site";
import { isOfferPath } from "@/lib/offer";
import { ArcBrand } from "@/components/arc/brand";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Ported from the prototype's `Nav`, with three things the production site
 * needs that the prototype did not have:
 *
 * - `next/navigation` instead of react-router, and an active check that also
 *   matches child routes (/labs/[slug] marks "ARC Labs" as current).
 * - The theme toggle, which 30+ routes that have not been redesigned rely on.
 * - The /offer chrome suppression the existing header has: an ad landing page
 *   shows no navigation, so the visit stays on the purchase.
 *
 * The prototype's accessibility work is kept as-is: focus moves into the
 * mobile panel, Tab cycles inside it, Escape closes it and returns focus to
 * the toggle, and the body scroll locks while it is open.
 *
 * Deliberately no framer-motion here. The two animations the prototype used
 * it for — the active-link underline and the mobile panel's slide — are a
 * static bar and a two-property transition in CSS. Keeping the library out of
 * the root layout keeps it off every route that does not animate: /about and
 * /privacy load the same JavaScript they did before the redesign.
 *
 * The panel stays mounted and toggles `invisible`, which also takes it out of
 * the tab order when closed, so the exit transition works without JS.
 */
function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ArcNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>("a,button");
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Ad landing pages carry no navigation, so the visit stays on the purchase.
  if (isOfferPath(pathname)) {
    return (
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-5 sm:px-8">
          <ArcBrand href="/offer" />
          <ThemeToggle />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-5 sm:px-8">
        <ArcBrand />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {arcNav.map((item) => {
            const active = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap rounded-md px-3 py-2 text-[14px] font-medium transition-colors duration-150",
                  active ? "text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-brand"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden h-10 items-center whitespace-nowrap rounded-md bg-ink px-4 text-[14px] font-medium text-canvas transition-colors duration-150 hover:bg-ink-2 sm:inline-flex"
          >
            Talk to ARC
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="arc-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink transition-colors duration-150 hover:bg-paper lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="arc-mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-canvas px-5 pb-10 pt-4 transition-[opacity,transform,visibility] duration-200 ease-out-strong sm:px-8 lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Site" className="flex flex-col">
          <Link
            href="/"
            className={cn(
              "border-b border-line py-4 text-lg font-medium",
              pathname === "/" ? "text-brand" : "text-ink",
            )}
          >
            Home
          </Link>
          {arcNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between border-b border-line py-4 text-lg font-medium",
                isCurrent(pathname, item.href) ? "text-brand" : "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/playbook"
            className={cn(
              "border-b border-line py-4 text-lg font-medium",
              isCurrent(pathname, "/playbook") ? "text-brand" : "text-ink",
            )}
          >
            Playbooks
          </Link>
        </nav>
        <Link
          href="/contact"
          className="mt-8 flex h-12 items-center justify-center rounded-md bg-ink text-base font-medium text-canvas"
        >
          Talk to ARC
        </Link>
        <p className="mt-6 text-sm text-ink-2">
          Prefer email?{" "}
          <a
            className="break-all font-medium text-brand underline underline-offset-2"
            href={`mailto:${arcSite.email}`}
          >
            {arcSite.email}
          </a>
        </p>
      </div>
    </header>
  );
}
