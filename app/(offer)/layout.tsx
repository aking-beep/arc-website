import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { OfferFooter } from "@/components/site-footer";

/**
 * Ad landing chrome: the brand, a theme toggle, and nothing else.
 *
 * The site navigation is deliberately absent so a paid visit stays on the
 * purchase instead of wandering into the consulting pages.
 */
export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Brand href="/offer" />
          <ThemeToggle />
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <OfferFooter />
    </>
  );
}
