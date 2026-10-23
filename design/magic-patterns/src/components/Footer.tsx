import { Link } from 'react-router-dom';
import { Brand } from './Brand';
import { site } from '../data/site';

const columns = [
  {
    heading: 'Divisions',
    links: [
      { label: 'ARC Control', to: '/control' },
      { label: 'ARC Labs', to: '/labs' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Enterprise Services', to: '/services' },
      { label: 'Research and Insights', to: '/research' },
      { label: 'About ARC', to: '/about' },
      { label: 'Talk to ARC', to: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-ink-2">{site.positioning}</p>
        </div>
        {columns.map((c) => (
          <nav key={c.heading} aria-label={c.heading}>
            <h2 className="text-[13px] font-semibold text-ink">{c.heading}</h2>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[14px] text-ink-2 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="text-[13px] font-semibold text-ink">Elsewhere</h2>
          <ul className="mt-4 space-y-3 text-[14px]">
            <li>
              <a href={`mailto:${site.email}`} className="break-all text-ink-2 hover:text-ink">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-[13px] text-ink-3 sm:px-8">
          <p>© 2026 ARC Transformation Group</p>
          <p>Interactive product previews on this site use clearly labelled demonstration data.</p>
        </div>
      </div>
    </footer>
  );
}
