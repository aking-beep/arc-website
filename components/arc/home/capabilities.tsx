import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";

/**
 * The capability table. Each row starts from a question a buyer is already
 * being asked, and the right-hand column says where on the site it is
 * answered. Ported from the prototype's `home/Capabilities`, with the
 * destinations pointed at the six solution areas.
 */
const rows = [
  {
    name: "Agent authorization and governance",
    question: "What can each agent reach, under whose authority, and who approved it?",
    where: "ARC Control",
    href: "/control",
  },
  {
    name: "Outcome verification and audit",
    question: "The agent said it finished. Did the system it was meant to change actually change?",
    where: "ARC Control",
    href: "/control",
  },
  {
    name: "AI readiness and fit",
    question:
      "Where does AI belong in this business, and where is ordinary automation the better answer?",
    where: "Solutions · AI Strategy",
    href: "/services?area=ai-strategy#solutions",
  },
  {
    name: "Cloud and infrastructure modernization",
    question:
      "Which parts of the estate are slowing every release, and in what order can we afford to fix them?",
    where: "Solutions · Modernization",
    href: "/services?area=cloud-modernization#solutions",
  },
  {
    name: "Protocol and security validation",
    question:
      "Do our MCP servers, prompts and endpoints behave the way the spec and our policy say they should?",
    where: "ARC Labs",
    href: "/labs",
  },
  {
    name: "Product and emerging-technology delivery",
    question:
      "How do we go from a working prototype to something customers rely on, without overbuilding?",
    where: "Solutions · Prototyping",
    href: "/services?area=emerging-technology#solutions",
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
              <span className="w-[170px] text-right">Where it lives</span>
            </div>
            <ul>
              {rows.map((row) => (
                <li key={row.name}>
                  <Link
                    href={row.href}
                    className="group grid gap-1.5 border-b border-line py-5 transition-colors duration-150 hover:bg-paper md:grid-cols-[1.1fr_1.6fr_auto] md:gap-6 md:px-2"
                  >
                    <span className="text-[15.5px] font-semibold text-ink">{row.name}</span>
                    <span className="text-[15px] leading-relaxed text-ink-2">{row.question}</span>
                    <span className="flex items-center gap-1.5 text-[13.5px] font-medium text-brand md:w-[170px] md:justify-end">
                      {row.where}
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5"
                      />
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
