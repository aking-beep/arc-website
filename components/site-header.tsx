"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, type NavItem } from "@/lib/content";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

/**
 * True while the page opens on a photograph and we are still scrolled over it.
 * The header then sits on the image with no background of its own, which is the
 * difference between a page that was designed and a page with a header on it.
 */
function useOverlayHeader() {
  const pathname = usePathname();
  const [overlay, setOverlay] = React.useState(false);

  React.useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-photo-hero]");
    if (!hero) {
      setOverlay(false);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      // Switch once the header would otherwise overhang the end of the image.
      const threshold = hero.offsetHeight - 72;
      setOverlay(window.scrollY < Math.max(threshold, 0));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return overlay;
}

function isActive(pathname: string, item: NavItem) {
  const matches = (href: string) => {
    const path = href.split("#")[0];
    return pathname === path || pathname.startsWith(path + "/");
  };
  if (matches(item.href)) return true;
  return (item.children ?? []).some((child) => matches(child.href));
}

function Dropdown({
  item,
  active,
  overlay,
}: {
  item: NavItem;
  active: boolean;
  overlay: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <Link
        href={item.href}
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
          overlay
            ? active
              ? "text-on-image"
              : "text-on-image/70 hover:text-on-image"
            : active
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </Link>
      {open ? (
        <div className="absolute left-0 top-full z-50 w-[24rem] pt-3">
          <div className="overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 px-4 py-3.5 transition-colors last:border-0 hover:bg-accent/60"
              >
                <span className="block text-sm font-semibold">{child.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {child.summary}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const overlayScroll = useOverlayHeader();
  /* An open mobile sheet needs a real background even over a photograph. */
  const overlay = overlayScroll && !open;

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        overlay
          ? "bg-transparent text-on-image"
          : "border-b border-border/60 bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Brand onImage={overlay} />

        <nav className="hidden flex-none items-center gap-0.5 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <Dropdown
                key={item.label}
                item={item}
                active={isActive(pathname, item)}
                overlay={overlay}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  overlay
                    ? isActive(pathname, item)
                      ? "text-on-image"
                      : "text-on-image/70 hover:text-on-image"
                    : isActive(pathname, item)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden flex-none items-center gap-2 lg:flex">
          <ThemeToggle onImage={overlay} />
          <Button
            href="/contact"
            size="sm"
            variant={overlay ? "light" : "primary"}
            className="whitespace-nowrap"
          >
            Talk to us
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle onImage={overlay} />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              overlay
                ? "glass text-on-image"
                : "ring-1 ring-border text-muted-foreground",
            )}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border/60 bg-background lg:hidden">
          <nav className="container flex flex-col py-4">
            {nav.map((item) => (
              <div key={item.label} className="py-1">
                <Link
                  href={item.href}
                  className="block rounded-md px-2 py-2.5 text-sm font-semibold hover:bg-accent/60"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="ml-2 border-l border-border/60 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Button href="/contact" className="mt-4">
              Talk to us
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
