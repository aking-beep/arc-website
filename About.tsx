import { ArrowUpRight } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionIntro } from '../components/ui/SectionIntro';
import { ClosingCta } from '../components/ClosingCta';
import { site } from '../data/site';

const principles = [
  { name: 'Human potential', text: 'Technology is worth building when it gives people back time, judgment or reach. If a system makes the people around it worse at their jobs, it has failed, however well it benchmarks.' },
  { name: 'Technology', text: 'We stay close to the engineering. The same people who advise also write the scanners, design the controls and read the protocol specs, so the advice holds up when it meets your stack.' },
  { name: 'Curiosity', text: 'ARC Labs exists because the useful questions don’t always come from client briefs. Building our own tools in public teaches us things that enterprise work later needs.' },
  { name: 'Practical innovation', text: 'New is not the test. We ship narrow first versions against live workflows, say plainly when ordinary automation beats AI, and label experiments as experiments.' },
];

const highlights = [
  'Twenty years of technology programme delivery in Fortune 100 and Fortune 500 environments',
  'Enterprise cybersecurity: 300+ features coordinated, 25% improvement in release value, sales-linked programme impact',
  'Customer-data architecture at tens of millions of profiles, including Ticketmaster-scale delivery',
  'Brand and consumer programmes for LEGO, the NFL and live entertainment',
];

const vision = [
  { year: 'Now', text: 'A senior-led practice with open-source tools in use and ARC Control in design-partner development.' },
  { year: 'Next', text: 'ARC Control proven with design partners on production systems, with verification as a standard rather than a feature.' },
  { year: '2030', text: 'The infrastructure enterprises rely on to let agents act on real systems, and a lab that keeps turning curiosity into products people use.' },
];

export function About() {
  return (
    <>
      <section aria-labelledby="about-title" className="border-b border-line">
        <Container className="py-16 sm:py-20 lg:py-24">
          <p className="font-mono text-[13px] text-brand">About ARC</p>
          <h1 id="about-title" className="mt-5 max-w-[900px] font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-ink text-balance sm:text-[60px]">
            Technology that works in real environments, not just in demos.
          </h1>
          <p className="mt-7 max-w-[640px] text-[18px] leading-relaxed text-ink-2">{site.positioning}</p>
        </Container>
      </section>

      <section aria-labelledby="phil-title" className="py-20 sm:py-24">
        <Container>
          <SectionIntro id="phil-title" eyebrow="Philosophy" title="Four ideas we hold ourselves to." />
          <dl className="mt-12 grid gap-x-16 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.name} className="border-t border-line-strong py-8">
                <dt className="font-serif text-[28px] leading-tight text-ink">{p.name}</dt>
                <dd className="mt-3 text-[16px] leading-relaxed text-ink-2">{p.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="lead-title" className="border-t border-line bg-paper py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <SectionIntro
            id="lead-title"
            eyebrow="Leadership"
            title="The person on your first call stays on the work."
            lead="ARC is senior-led by design. You get Fortune 100 and 500 experience without the forty-person bench, and without handoffs between the people who sell and the people who deliver."
          />
          <article className="rounded-xl border border-line bg-canvas p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-serif text-[20px] text-white">
                AK
              </span>
              <div>
                <h3 className="text-[18px] font-semibold text-ink">Founder and Principal</h3>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="mt-0.5 inline-flex items-center gap-1 text-[14px] font-medium text-brand hover:underline">
                  LinkedIn profile <ArrowUpRight size={13} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
            <ul className="mt-7 space-y-0 border-t border-line">
              {highlights.map((h) => (
                <li key={h} className="border-b border-line py-3.5 text-[15px] leading-relaxed text-ink">
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13.5px] text-ink-3">Client names appear only where we have permission. Other engagements are described by industry and scale.</p>
          </article>
        </Container>
      </section>

      <section aria-labelledby="vision-title" className="dark-surface bg-night py-20 text-mist sm:py-24">
        <Container>
          <SectionIntro
            id="vision-title"
            onDark
            eyebrow="Mission and vision"
            title="Make intelligent systems reliable, secure and useful."
            lead="That’s the mission. The vision is what it looks like by 2030. It’s an ambition, not a claim about where we are today."
          />
          <ol className="mt-14 grid gap-0 border-t border-night-line md:grid-cols-3">
            {vision.map((v, i) => (
              <li key={v.year} className={`py-8 md:pr-8 ${i > 0 ? 'md:border-l md:border-night-line md:pl-8' : ''}`}>
                <span className="font-mono text-[13px] text-brand-on-dark">{v.year}</span>
                <p className="mt-3 text-[17px] leading-relaxed text-mist">{v.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="org-title" className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionIntro id="org-title" eyebrow="How ARC is organised" title="One company you contract with." lead="The services, the products and the research carry the same name and are built by the same people." />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-t border-ink text-left">
              <caption className="sr-only">ARC divisions</caption>
              <tbody>
                {[
                  ['ARC Control', 'Enterprise AI agent infrastructure: governance, authorization, security, observability and reliable execution.'],
                  ['ARC Labs', 'Applied experiments: developer tools, scanners and emerging technology.'],
                  ['Enterprise Services', 'Strategy, readiness, modernization, governance and architecture delivery.'],
                  ['Research', 'Cited briefs, frameworks and case studies, published openly.'],
                ].map(([n, d]) => (
                  <tr key={n} className="border-b border-line align-top">
                    <th scope="row" className="w-[200px] py-5 pr-6 text-[16px] font-semibold text-ink">{n}</th>
                    <td className="py-5 text-[15px] leading-relaxed text-ink-2">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <ClosingCta title="Thirty minutes. No deck." lead="We’ll listen, ask the hard questions, and tell you whether ARC is the right next step, including when it isn’t." />
    </>
  );
}
