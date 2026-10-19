import Link from "next/link";
import { Github } from "lucide-react";
import { Brand } from "@/components/brand";
import { ark, arkProducts } from "@/lib/ark";
import { site } from "@/lib/content";

/**
 * A server component.
 *
 * This was a client component solely so it could read the pathname and render
 * a short version on the ad pages. The ad pages now live in their own route
 * group with their own layout, which means the whole footer — and the content
 * it reads — stays out of the client bundle.
 */
const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Agents",
    links: [
      { label: "Agent governance", href: "/agents" },
      { label: "Agent Access Assessment", href: "/assessment" },
      { label: "Free scan", href: "/labs/arc-agent-governance" },
      ...arkProducts
        .filter((p) => p.state === "research")
        .map((p) => ({ label: `${p.name} (research)`, href: p.href })),
    ],
  },
  {
    heading: "Free",
    links: [
      { label: "Labs tools", href: "/labs" },
      { label: "Frameworks", href: "/frameworks" },
      { label: "Readiness scorecard", href: "/frameworks/agent-readiness-scorecard" },
      { label: "Research", href: "/research" },
      { label: "For developers", href: "/developers" },
    ],
  },
  {
    heading: "Consulting",
    links: [
      { label: "What we do", href: "/consulting" },
      { label: "How we engage", href: "/advisory" },
      { label: "Workshops", href: "/academy" },
      { label: "Work", href: "/work" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Playbooks", href: "/playbook" },
      { label: "GitHub", href: site.github },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            <p className="mt-4 border-l-2 border-brand pl-3 text-sm leading-relaxed text-muted-foreground">
              {ark.explainer}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => {
                  const external =
                    link.href.startsWith("http") || link.href.startsWith("mailto:");
                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-4">
            <span>{ark.principle}</span>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** The short footer the ad pages use. Kept here so both live in one file. */
export function OfferFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="container flex flex-col items-start justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/playbook" className="hover:text-foreground">
            Full playbook pages
          </Link>
        </div>
      </div>
    </footer>
  );
}
