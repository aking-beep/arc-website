import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ArcNav } from "@/components/arc/nav";
import { ArcFooter } from "@/components/arc/footer";
import { arcSite } from "@/lib/arc/site";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * The redesign sets every page and section heading in a serif. Self-hosted
 * through next/font rather than the prototype's Google Fonts @import, so it
 * costs no extra connection and cannot shift layout on load.
 */
const serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(arcSite.domain),
  title: {
    default: "ARC Transformation Group · Make technology work for your business.",
    template: "%s · ARC Transformation Group",
  },
  description: arcSite.metaDescription,
  keywords: [
    "AI agent infrastructure",
    "agent authorization",
    "auditable agent execution",
    "AI agent governance",
    "MCP security",
    "MCP conformance",
    "agent observability",
    "AI readiness assessment",
    "enterprise workflow automation",
    "cloud infrastructure modernization",
    "AI governance and security",
    "digital transformation",
  ],
  openGraph: {
    type: "website",
    title: "ARC Transformation Group · Make technology work for your business.",
    description: arcSite.metaDescription,
    url: arcSite.domain,
    siteName: arcSite.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC Transformation Group",
    description: arcSite.metaDescription,
  },
  // No `alternates` here on purpose. Next inherits root metadata into every
  // route that does not override it, so a root-level `canonical: "/"` told
  // crawlers that /research/<slug>, /work/<slug> and every other page was a
  // duplicate of the homepage. Each route declares its own canonical; the
  // homepage declares "/" in app/page.tsx.
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: arcSite.name,
  url: arcSite.domain,
  email: arcSite.email,
  description: arcSite.positioning,
  sameAs: [arcSite.github, arcSite.linkedin, arcSite.calendly],
  // The two divisions, so the knowledge panel carries the structure the site
  // is organised around rather than only the company name.
  subOrganization: [
    {
      "@type": "Organization",
      name: "ARC Control",
      url: `${arcSite.domain}/control`,
      description:
        "Enterprise infrastructure for reliable AI agent execution: authorization, auditable execution, MCP conformance and agent observability.",
    },
    {
      "@type": "Organization",
      name: "ARC Labs",
      url: `${arcSite.domain}/labs`,
      description:
        "Applied research, open-source developer tools and emerging technology experimentation.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-3 z-[60] rounded-md bg-ink px-4 py-2 text-sm font-medium text-canvas"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* No MotionConfig here on purpose: putting framer-motion in the
              root layout would load it on every route. The animated sections
              are client components that set `reducedMotion` themselves, and
              app/globals.css zeroes out every animation and transition under
              prefers-reduced-motion as a backstop. */}
          <div className="flex min-h-screen flex-col bg-canvas text-ink">
            <ArcNav />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <ArcFooter />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
