import { Section, SectionHeading } from "@/components/ui/section";
import { StateBadge } from "@/components/ui/badge";
import { architectureModel } from "@/lib/ark";

/**
 * Five layers rather than a sequence.
 *
 * A2A sits inside Execution next to tool calls, APIs and MCP — it is one
 * surface an action can leave through, not a separate product, and it carries
 * a research badge because nothing here implements it. Every item is tagged,
 * so the honest half of this diagram is as visible as the shipping half.
 */
export function ArchitectureModel({ className }: { className?: string }) {
  return (
    <Section className={className}>
      <SectionHeading
        kicker="The model"
        title="Identity, authority, execution, evidence, assurance."
        lead="An agent-to-agent call is one more way an action leaves the building. It does not need its own product; it needs the same identity, the same authority and the same evidence as every other surface."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
        {architectureModel.map((layer) => (
          <div
            key={layer.layer}
            className="grid gap-4 bg-card p-6 sm:p-7 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-10"
          >
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em]">
                {layer.layer}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {layer.text}
              </p>
            </div>
            <ul className="flex flex-wrap content-start gap-2">
              {layer.items.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1.5"
                >
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {item.name}
                  </span>
                  {item.state === "research" ? (
                    <StateBadge state="research" />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Anything tagged research has no implementation behind it. We are not
        claiming protocol support we do not have, and agent-to-agent work stays
        a note until somebody we work with is actually running it.
      </p>
    </Section>
  );
}
