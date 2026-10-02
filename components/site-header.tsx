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

function isActive(pathname: string, item: NavItem) {
  const matches = (href: string) => {
    const path = href.split("#")[0];
    return pathname === path || pathname.startsWith(path + "/");
  };
  if (matches(item.href)) return true;
  return (item.children ?? []).some((child) => matches(child.href));
}

function Dropdown({ item, active }: { item: NavItem; active: boolean }) {
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
          "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </Link>
      {open ? (
        <div className="absolute left-0 top-full z-50 w-[24rem] pt-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
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

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Brand />

        <nav className="hidden flex-none items-center gap-0.5 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <Dropdown
                key={item.label}
                item={item}
                active={isActive(pathname, item)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(pathname, item)
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
          <ThemeToggle />
          <Button href="/contact" size="sm" className="whitespace-nowrap">
            Talk to us
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground"
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
