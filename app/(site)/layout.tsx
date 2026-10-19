import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * The site chrome. Everything except the ad landing pages renders inside it.
 *
 * Splitting this out of the root layout is what lets the footer be a server
 * component: it no longer has to read the pathname to decide whether to
 * render itself.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
