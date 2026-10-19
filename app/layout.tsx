import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/content";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default:
      "ARC Transformation Group · Infrastructure for reliable agent action",
    template: "%s · ARC Transformation Group",
  },
  description: site.description,
  // Kept to the wedge. A keyword list spanning six categories is a
  // machine-readable version of the positioning problem.
  // Kept to the wedge: agent readiness and agent outcome assurance. A list
  // spanning six categories is a machine-readable version of the positioning
  // problem, so this one stays short.
  keywords: [
    "agent infrastructure",
    "AI agent readiness",
    "agent governance",
    "agent assurance",
    "AI agent permissions",
    "MCP conformance",
    "agent outcome verification",
    "enterprise AI agents",
  ],
  openGraph: {
    type: "website",
    title: "ARC Transformation Group · Infrastructure for reliable agent action",
    description: site.description,
    url: site.domain,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC Transformation Group",
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

/** Browser chrome follows the theme instead of staying white in dark mode. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e17" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.domain,
  email: site.email,
  description: site.description,
  sameAs: [site.github, site.linkedin, site.calendly],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
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
          <div className="flex min-h-screen flex-col">{children}</div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
