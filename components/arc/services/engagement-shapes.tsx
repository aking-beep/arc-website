import { Container } from "@/components/arc/ui/container";
import { SectionIntro } from "@/components/arc/ui/section-intro";
import { engagementShapes } from "@/lib/arc/solutions";

/** Ported from the prototype's `services/EngagementShapes`. */
export function EngagementShapes() {
  return (
    <section aria-labelledby="shape-title" className="py-20 sm:py-24">
      <Container>
        <SectionIntro
          id="shape-title"
          eyebrow="How engagements are shaped"
          title="Sized to the problem, not to a bench."
          lead="Pricing is scoped after the first conversation. We don’t publish rate cards because the right size depends on what you already have."
        />
        <div
          className="mt-12 overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Engagement shapes"
        >
          <table className="w-full min-w-[640px] border-t border-ink text-left">
            <caption className="sr-only">Engagement shapes</caption>
            <thead>
              <tr className="border-b border-line font-mono text-[12px] text-ink-3">
                <th scope="col" className="py-3 pr-6 font-normal">Shape</th>
                <th scope="col" className="py-3 pr-6 font-normal">Typical length</th>
                <th scope="col" className="py-3 font-normal">What it is</th>
              </tr>
            </thead>
            <tbody>
              {engagementShapes.map((e) => (
                <tr key={e.name} className="border-b border-line align-top">
                  <th scope="row" className="py-5 pr-6 text-[16px] font-semibold text-ink">
                    {e.name}
                  </th>
                  <td className="whitespace-nowrap py-5 pr-6 font-mono text-[13.5px] text-ink-2">
                    {e.length}
                  </td>
                  <td className="py-5 text-[15px] leading-relaxed text-ink-2">{e.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
