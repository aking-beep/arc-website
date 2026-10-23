import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionIntro } from '../ui/SectionIntro';

const rows = [
  {
    name: 'Agent governance and authorization',
    question: 'What can each agent reach, under whose authority, and who approved it?',
    where: 'ARC Control',
    to: '/control',
  },
  {
    name: 'Outcome verification and audit',
    question: 'The agent said it finished. Did the system it was meant to change actually change?',
    where: 'ARC Control',
    to: '/control',
  },
  {
    name: 'AI readiness and fit',
    question: 'Where does AI belong in this business, and where is ordinary automation the better answer?',
    where: 'Services · AI Fit',
    to: '/services',
  },
  {
    name: 'Cloud and infrastructure modernization',
    question: 'Which parts of the estate are slowing every release, and in what order can we afford to fix them?',
    where: 'Services',
    to: '/services',
  },
  {
    name: 'Protocol and security validation',
    question: 'Do our MCP servers, prompts and endpoints behave the way the spec and our policy say they should?',
    where: 'ARC Labs',
    to: '/labs',
  },
  {
    name: 'Product and emerging-technology delivery',
    question: 'How do we go from a working prototype to something customers rely on, without overbuilding?',
    where: 'Services · ARC Labs',
    to: '/services',
  },
];

export function Capabilities() {
  return (
    <section aria-labelledby="cap-title" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionIntro
            id="cap-title"
            eyebrow="Enterprise capabilities"
            title="Start from the question you’re being asked."
            lead="Each capability is something we build, run or deliver today. The right-hand column says where it lives, so you can go straight there."
          />

          <div className="border-t border-ink">
            <div className="hidden grid-cols-[1.1fr_1.6fr_auto] gap-6 border-b border-line py-3 font-mono text-[12px] text-ink-3 md:grid">
              <span>Capability</span>
              <span>The question it answers</span>
              <span className="w-[150px] text-right">Where it lives</span>
            </div>
            <ul>
              {rows.map((r) => (
                <li key={r.name}>
                  <Link
                    to={r.to}
                    className="group grid gap-1.5 border-b border-line py-5 transition-colors duration-150 hover:bg-paper md:grid-cols-[1.1fr_1.6fr_auto] md:gap-6 md:px-2"
                  >
                    <span className="text-[15.5px] font-semibold text-ink">{r.name}</span>
                    <span className="text-[15px] leading-relaxed text-ink-2">{r.question}</span>
                    <span className="flex items-center gap-1.5 text-[13.5px] font-medium text-brand md:w-[150px] md:justify-end">
                      {r.where}
                      <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
