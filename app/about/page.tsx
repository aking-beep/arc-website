import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";
import { ClosingCta } from "@/components/arc/closing-cta";
import { arcSite } from "@/lib/arc/site";
import { site } from "@/lib/content";

const title = "About ARC Transformation Group";
const description =
  "A senior-led technology practice: ARC Control for agent infrastructure, ARC Labs for applied research and developer tools, and enterprise delivery across AI, cloud, data and security. Twenty years of Fortune 100 and Fortune 500 programme work.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about", type: "website" },
  twitter: { title, description },
};

/** Ported from the prototype's `pages/About`. */
const principles = [
  {
    name: "Human potential",
    text: "Technology is worth building when it gives people back time, judgment or reach. If a system makes the people around it worse at their jobs, it has failed, however well it benchmarks.",
  },
  {
    name: "Technology",
    text: "We stay close to the engineering. The same people who advise also write the scanners, design the controls and read the protocol specs, so the advice holds up when it meets your stack.",
  },
  {
    name: "Curiosity",
    text: "ARC Labs exists because the useful questions don’t always come from client briefs. Building our own tools in public teaches us things that enterprise work later needs.",
  },
  {
    name: "Practical innovation",
    text: "New is not the test. We ship narrow first versions against live workflows, say plainly when ordinary automation beats AI, and label experiments as experiments.",
  },
];

/** `site.team.highlights` (lib/content.ts), unchanged. */
const highlights = site.team.highlights;

const vision = [
  {
    year: "Now",
    text: "A senior-led practice with open-source tools in use and ARC Control in design-partner development.",
  },
  {
    year: "Next",
    text: "ARC Control proven with design partners on production systems, with verification treated as a standard rather than a feature.",
  },
  {
    year: "2030",
    text: "The infrastructure enterprises rely on to let agents act on real systems, and a lab that keeps turning curiosity into products people use.",
  },
];

const organisation: { name: string; text: string; href: string }[] = [
  {
    name: "ARC Control",
    text: "Enterprise AI agent infrastructure: authorization, auditable execution, MCP conformance, observability and governance.",
    href: "/control",
  },
  {
    name: "ARC Labs",
    text: "Applied experiments: developer tools, scanners and emerging technology, published with their real maturity.",
    href: "/labs",
  },
  {
    name: "Solutions",
    text: "Strategy, readiness, modernization, automation, governance and delivery, run by the people who built the products.",
    href: "/services",
  },
  {
    name: "Research",
    text: "Cited briefs, frameworks and case studies, published openly and dated by the change rather than the publication.",
    href: "/research",
  },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="border-b border-line">
        <Container className="py-16 sm:py-20 lg:py-24">
          <p className="font-mono text-[13px] text-brand">About ARC</p>
          <h1
            id="about-title"
            className="mt-5 max-w-[900px] font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-balance text-ink sm:text-[60px]"
          >
            Technology that works in real environments, not just in demos.
          </h1>
          <p className="mt-7 max-w-[640px] text-[18px] leading-relaxed text-pretty text-ink-2">
            {arcSite.positioning}
          </p>
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

      <section
        aria-labelledby="lead-title"
        className="border-t border-line bg-paper py-20 sm:py-24"
      >
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <SectionIntro
            id="lead-title"
            eyebrow="Leadership"
            title="The person on your first call stays on the work."
            lead={site.team.lead}
          />
          <article className="rounded-xl border border-line bg-canvas p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-serif text-[20px] text-canvas"
              >
                AK
              </span>
              <div>
                <h3 className="text-[18px] font-semibold text-ink">Founder and Principal</h3>
                <p className="mt-0.5 text-[14px] text-ink-2">{site.name}</p>
              </div>
            </div>
            <ul className="mt-7 border-t border-line">
              {highlights.map((h) => (
                <li key={h} className="border-b border-line py-3.5 text-[15px] leading-relaxed text-ink">
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13.5px] text-ink-3">
              Client names appear only where we have permission. Other engagements are described by
              industry and scale —{" "}
              <Link href="/work" className="font-medium text-brand hover:underline">
                see the selected work
              </Link>
              .
            </p>
          </article>
        </Container>
      </section>

      <section
        aria-labelledby="vision-title"
        className="dark-surface bg-night py-20 text-mist sm:py-24"
      >
        <Container>
          <SectionIntro
            id="vision-title"
            onDark
            eyebrow="Mission and vision"
            title="Make intelligent systems reliable, secure and useful."
            lead="That’s the mission. The vision is what it looks like by 2030. It’s an ambition, not a claim about where we are today."
          />
          <ol className="mt-14 grid border-t border-night-line md:grid-cols-3">
            {vision.map((v, i) => (
              <li
                key={v.year}
                className={`py-8 md:pr-8 ${i > 0 ? "md:border-l md:border-night-line md:pl-8" : ""}`}
              >
                <span className="font-mono text-[13px] text-brand-on-dark">{v.year}</span>
                <p className="mt-3 text-[17px] leading-relaxed text-mist">{v.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="org-title" className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionIntro
            id="org-title"
            eyebrow="How ARC is organised"
            title="One company you contract with."
            lead="The services, the products and the research carry the same name and are built by the same people."
          />
          <div
            className="overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="How ARC is organised"
          >
            <table className="w-full min-w-[520px] border-t border-ink text-left">
              <caption className="sr-only">ARC divisions</caption>
              <tbody>
                {organisation.map((row) => (
                  <tr key={row.name} className="border-b border-line align-top">
                    <th scope="row" className="w-[200px] py-5 pr-6 text-[16px] font-semibold text-ink">
                      <Link href={row.href} className="hover:text-brand">
                        {row.name}
                      </Link>
                    </th>
                    <td className="py-5 text-[15px] leading-relaxed text-ink-2">{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <ClosingCta
        id="about-cta"
        title="Thirty minutes. No deck."
        lead="We’ll listen, ask the hard questions, and tell you whether ARC is the right next step, including when it isn’t."
      />
    </>
  );
}
