import { Container } from '../ui/Container';
import { StatusBadge } from '../ui/StatusBadge';
import { moreTools } from '../../data/products';

export function MoreTools() {
  return (
    <section aria-labelledby="more-title" className="border-t border-line bg-paper py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 id="more-title" className="font-serif text-[28px] leading-tight text-ink sm:text-[32px]">
            Also in the lab
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
            Earlier-stage tools. Free to use, no account, nothing stored, and labelled as alpha or experiment
            because that’s what they are.
          </p>
        </div>
        <ul className="border-t border-ink">
          {moreTools.map((t) => (
            <li key={t.name} className="grid gap-2 border-b border-line py-4 sm:grid-cols-[220px_1fr_auto] sm:items-baseline sm:gap-6">
              <span className="text-[15px] font-semibold text-ink">{t.name}</span>
              <span className="text-[14.5px] leading-relaxed text-ink-2">{t.text}</span>
              <span>
                <StatusBadge status={t.status} />
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
