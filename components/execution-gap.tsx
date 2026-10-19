import { Section, SectionHeading } from "@/components/ui/section";
import { SplitClaim, Takeaway } from "@/components/diagram";
import { executionGap } from "@/lib/ark";
import { assuranceChecklist } from "@/lib/learn";

/**
 * The core argument: a finished run is not a finished job.
 *
 * The home page and the agents hub both make it, and both used to carry their
 * own copy of the reported-run figures. One set of numbers, one place.
 */
const reported = [
  { label: "Status", value: "completed" },
  { label: "Steps", value: "7 / 7" },
  { label: "Tool calls", value: "12 ok, 0 failed" },
  { label: "Latency", value: "4.2s" },
];

export function ExecutionGap({
  className,
  kicker = "Why it is hard",
  extraRows = [],
}: {
  className?: string;
  kicker?: string;
  /** Agent Control's page shows token spend too; nothing else needs it. */
  extraRows?: { label: string; value: string }[];
}) {
  return (
    <Section className={className}>
      <SectionHeading
        kicker={kicker}
        title={executionGap.headline}
        lead={executionGap.lead}
      />
      <SplitClaim
        className="mt-12"
        leftLabel="What the run reported"
        rightLabel="What the record asks"
        left={[...reported, ...extraRows]}
        right={assuranceChecklist.map((step) => step.question)}
      />
      <Takeaway className="mt-12">{executionGap.takeaway}</Takeaway>
    </Section>
  );
}
