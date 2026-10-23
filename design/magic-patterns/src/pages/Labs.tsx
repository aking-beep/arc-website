import { Container } from '../components/ui/Container';
import { ProductCard } from '../components/labs/ProductCard';
import { MoreTools } from '../components/labs/MoreTools';
import { ClosingCta } from '../components/ClosingCta';
import { products, moreTools } from '../data/products';

export function Labs() {
  return (
    <>
      <section aria-labelledby="labs-title" className="border-b border-line">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[13px] text-brand">ARC Labs</p>
            <h1 id="labs-title" className="mt-5 font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-ink text-balance sm:text-[56px]">
              Applied technology, tested in public.
            </h1>
            <p className="mt-6 max-w-[580px] text-[18px] leading-relaxed text-ink-2">
              Developer tools and scanners for teams building with AI.
              Each one shows its real status. Open-source tools link to their code.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-4 border-t border-line pt-5 text-[13.5px]">
            <div>
              <dt className="text-ink-3">Usable today</dt>
              <dd className="mt-1 font-serif text-[30px] text-ink">{products.filter((p) => p.status !== 'unreleased').length}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Open source</dt>
              <dd className="mt-1 font-serif text-[30px] text-ink">{products.filter((p) => p.status === 'open-source').length}</dd>
            </div>
            <div>
              <dt className="text-ink-3">In alpha or testing</dt>
              <dd className="mt-1 font-serif text-[30px] text-ink">{moreTools.length}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section aria-labelledby="gallery-title" className="py-14 sm:py-16">
        <Container>
          <h2 id="gallery-title" className="sr-only">Product gallery</h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {products.map((p) => (
              <li key={p.slug} className="flex">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <MoreTools />

      <ClosingCta
        title="Want one of these inside your stack?"
        lead="Lab tools become evidence in our readiness assessments and components of ARC Control. If a tool fits a problem you have at scale, we can run it with you."
      />
    </>
  );
}
