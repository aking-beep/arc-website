"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, type NavItem } from "@/lib/content";
import { StateBadge } from "@/components/ui/badge";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

function matches(pathname: string, href: string) {
  const path = href.split("#")[0];
  return pathname === path || pathname.startsWith(path + "/");
}

function isActive(pathname: string, item: NavItem) {
  if (matches(pathname, item.href)) return true;
  return (item.children ?? []).some((c) => matches(pathname, c.href));
}

/**
 * A real menu button, not a link wearing aria-expanded.
 *
 * The previous version opened on hover from a <Link> that claimed
 * aria-expanded, had no Escape and no arrow keys. This one is a button with
 * aria-haspopup/controls, opens on click or ArrowDown, closes on Escape or
 * outside click, and moves focus with the arrow keys.
 *
 * Items carrying a `state` render it as a badge, so a menu entry can never
 * imply an availability it does not have.
 */
function NavMenu({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const id = React.useId();
  const children = item.children ?? [];

  const focusItem = React.useCallback((index: number) => {
    const links = wrapRef.current?.querySelectorAll<HTMLElement>("[data-menuitem]");
    if (!links || links.length === 0) return;
    const i = (index + links.length) % links.length;
    links[i].focus();
  }, []);

  React.useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const links = Array.from(
        wrapRef.current?.querySelectorAll<HTMLElement>("[data-menuitem]") ?? [],
      );
      const current = links.indexOf(document.activeElement as HTMLElement);
      if (current === -1) return;
      event.preventDefault();
      focusItem(current + (event.key === "ArrowDown" ? 1 : -1));
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, focusItem]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            window.setTimeout(() => focusItem(0), 0);
          }
        }}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        id={id}
        role="menu"
        hidden={!open}
        className="absolute left-0 top-full z-50 w-[26rem] pt-2"
      >
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              data-menuitem
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 px-4 py-3.5 transition-colors last:border-0 hover:bg-accent/60 focus-visible:bg-accent/60 focus-visible:outline-none"
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{child.label}</span>
                {child.state ? <StateBadge state={child.state} /> : null}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                {child.summary}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the mobile panel and puts focus back where it started, and
  // Tab is kept inside the panel while it is open.
  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === toggleRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Brand />

        <nav aria-label="Main" className="hidden flex-none items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item);
            if (item.children?.length) {
              return <NavMenu key={item.label} item={item} active={active} />;
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-none items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button
            href="/assessment"
            size="sm"
            className="whitespace-nowrap"
          >
            Assess Agent Readiness
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border/60 bg-background lg:hidden"
        >
          <nav aria-label="Main" className="container flex flex-col py-4">
            {nav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  aria-current={matches(pathname, item.href) ? "page" : undefined}
                  className="block rounded-md px-2 py-2.5 text-sm font-semibold hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <ul className="ml-2 border-l border-border/60 pl-3">
                    {item.children
                      .filter((c) => c.href !== item.href)
                      .map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="flex flex-wrap items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {child.label}
                            {child.state ? <StateBadge state={child.state} /> : null}
                          </Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <Button href="/assessment" className="mt-4">
              Assess Agent Readiness
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
