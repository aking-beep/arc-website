import Link from "next/link";
import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";

/** Ported from the prototype's `home/Expertise`. */
const domains = [
  {
    name: "AI systems and agents",
    items: "Agent architecture, MCP and tool protocols, evaluation, retrieval, prompt security",
  },
  {
    name: "Identity and governance",
    items:
      "Workload identity, least-privilege scopes, approval paths, audit evidence, NIST AI RMF",
  },
  {
    name: "Cloud infrastructure",
    items: "Well-architected review, cloud-native platforms, FinOps, resilience and cost attribution",
  },
  {
    name: "Security",
    items: "Zero trust, NIST CSF 2.0, OWASP LLM Top 10, connectivity and transport hygiene",
  },
  {
    name: "Data platforms",
    items: "Customer-data architecture, integration, data quality and trust in reported numbers",
  },
  {
    name: "Product delivery",
    items: "Discovery, release coordination, programme sequencing and outcome ownership",
  },
];

/**
 * The three figures are the repository's own cited claims (`site.team` in
 * lib/content.ts), not new numbers, and each links to the case study that
 * carries the evidence. No client is named without permission.
 */
const proof = [
  {
    value: "300+",
    label: "Features coordinated across enterprise cybersecurity releases",
    href: "/work/enterprise-cybersecurity-release-value",
  },
  {
    value: "25%",
    label: "Improvement in release value on the same programme",
    href: "/work/enterprise-cybersecurity-release-value",
  },
  {
    value: "10M+",
    label: "Customer profiles at customer-data-platform scale",
    href: "/work/consumer-cdp-tens-of-millions",
  },
];

export function Expertise() {
  return (
    <section
      aria-labelledby="exp-title"
      className="border-t border-line bg-paper py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.45fr] lg:gap-16">
          <div>
            <SectionIntro
              id="exp-title"
              eyebrow="Technical expertise"
              title="Twenty years of enterprise delivery, applied to new problems."
              lead="Fortune 100 and Fortune 500 programme work in cybersecurity, live entertainment, consumer brands and customer data. Client names appear only where we’re allowed to name them."
            />
            <dl className="mt-10 space-y-6 border-t border-line pt-8">
              {proof.map((p) => (
                <div key={p.label} className="grid grid-cols-[96px_1fr] items-baseline gap-4">
                  <dt className="font-serif text-[30px] leading-none tabular text-ink">
                    {p.value}
                  </dt>
                  <dd className="text-[14.5px] leading-snug text-ink-2">
                    <Link href={p.href} className="hover:text-ink hover:underline">
                      {p.label}
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid content-start gap-x-10 sm:grid-cols-2">
            {domains.map((d) => (
              <div key={d.name} className="border-t border-line py-6">
                <h3 className="text-[16px] font-semibold text-ink">{d.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{d.items}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
