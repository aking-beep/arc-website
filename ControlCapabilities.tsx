import { ArrowDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionIntro } from '../ui/SectionIntro';
import type { ConsoleTab } from '../console/ControlConsole';

const caps: { name: string; text: string; detail: string; tab: ConsoleTab; tabLabel: string }[] = [
  {
    name: 'Agent authorization and permissions',
    text: 'Every agent gets its own identity, scoped credentials and a record of who it acts for.',
    detail: 'Actions above a threshold route to a named human approver, with an expiry.',
    tab: 'inventory',
    tabLabel: 'Agent inventory',
  },
  {
    name: 'Auditable execution',
    text: 'Each run produces a record built to be read later by someone who wasn’t in the room.',
    detail: 'Actor, credential, policy decision, tool call, response, outcome source, verdict.',
    tab: 'audit',
    tabLabel: 'Audit evidence',
  },
  {
    name: 'MCP security and validation',
    text: 'Model Context Protocol servers are checked for conformance and unsafe tool descriptions before agents rely on them.',
    detail: 'Built on the open-source MCP Conformance Scanner from ARC Labs.',
    tab: 'findings',
    tabLabel: 'Security findings',
  },
  {
    name: 'Agent observability',
    text: 'See what agents attempted, how long each step took, and which outcomes were verified, failed or unknown.',
    detail: 'An unverifiable outcome is reported as unverifiable, never as success.',
    tab: 'activity',
    tabLabel: 'Execution activity',
  },
  {
    name: 'Policy management',
    text: 'Write policy once and apply it to agents, tools and arguments, with monitor mode before enforcement.',
    detail: 'Policy hits and blocks are counted, so you can tune before you enforce.',
    tab: 'policies',
    tabLabel: 'Permission policies',
  },
  {
    name: 'Enterprise agent governance',
    text: 'One inventory of every agent, including the ones vendors switched on inside software you already pay for.',
    detail: 'Coverage and verification rates by owner, for the people accountable for them.',
    tab: 'health',
    tabLabel: 'Operational health',
  },
];

export function ControlCapabilities({ onOpen }: { onOpen: (t: ConsoleTab) => void }) {
  return (
    <section aria-labelledby="ccap-title" className="border-t border-line bg-paper py-20 sm:py-24">
      <Container>
        <SectionIntro
          id="ccap-title"
          eyebrow="Capabilities"
          title="Six controls between an agent and your production systems."
          lead="Each one links to the matching view in the console preview below."
        />
        <ul className="mt-12 grid gap-x-14 md:grid-cols-2">
          {caps.map((c) => (
            <li key={c.name} className="flex flex-col border-t border-line-strong py-7">
              <h3 className="text-[18px] font-semibold text-ink">{c.name}</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink">{c.text}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{c.detail}</p>
              <button
                onClick={() => onOpen(c.tab)}
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 self-start text-[14px] font-medium text-brand hover:underline md:mt-auto md:pt-4"
              >
                See it in {c.tabLabel}
                <ArrowDown size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
