import { Section, SectionHeading } from "@/components/ui/section";
import { SplitClaim, Takeaway } from "@/components/diagram";
import { executionGap } from "@/lib/ark";

/**
 * The core argument: a finished run is not a finished job.
 *
 * The home page and the agents hub both make it, and both used to carry their
 * own copy of the reported-run figures. One set of numbers, one place.
 */
const reported = [
  { label: "Status", value: "completed" },
  { label: "Tool calls", value: "successful" },
  { label: "Errors", value: "0" },
];

const assuranceAsks = [
  "Was the intended system changed?",
  "Was the agent authorized?",
  "Was approval required?",
  "Can the result be independently verified?",
  "What evidence exists?",
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
        leftLabel="Agent run"
        rightLabel="Outcome assurance"
        left={[...reported, ...extraRows]}
        right={assuranceAsks}
      />
      <Takeaway className="mt-12">{executionGap.takeaway}</Takeaway>
    </Section>
  );
}
