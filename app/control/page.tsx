import type { Metadata } from "next";
import { ControlHero, ControlLimits, ExecutionGap } from "@/components/arc/control/sections";
import { ControlInteractive } from "@/components/arc/control/control-page";
import { ConsoleShowcase } from "@/components/arc/control/console-showcase";
import { Lifecycle } from "@/components/arc/control/lifecycle";
import { ClosingCta } from "@/components/arc/closing-cta";
import { arcSite } from "@/lib/arc/site";
import { control, controlCapabilities } from "@/lib/arc/control";
import { maturityStyle } from "@/lib/arc/status";
import { jsonLdScript } from "@/lib/arc/json-ld";

const title = "ARC Control · Infrastructure for agents that act";
const description =
  "Authorization, auditable execution, MCP conformance and observability for AI agents. Prove what an agent did and whether the outcome happened.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/control" },
  openGraph: { title, description, url: "/control", type: "website" },
  twitter: { title, description },
};

/**
 * Product structured data. `SoftwareApplication` without an `offers` block,
 * because there is nothing to price — the product is in design-partner
 * development and the page says so above the fold.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ARC Control",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${arcSite.domain}/control`,
  description,
  releaseNotes: control.today,
  publisher: { "@type": "Organization", name: arcSite.name, url: arcSite.domain },
  featureList: controlCapabilities.map((c) => `${c.name} (${maturityStyle(c.state).label})`),
};

export default function ControlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <ControlHero />
      <ExecutionGap />
      <ControlInteractive />
      <ConsoleShowcase />
      <Lifecycle />
      <ControlLimits />
      <ClosingCta
        id="control-cta"
        title="Running agents against production systems?"
        lead="We are working through the verification model with a small number of teams. If your agents touch payments, records, infrastructure or customers, we would like to hear what breaks."
        primary={{ label: "Apply to be a design partner", href: "/contact?type=control" }}
      />
    </>
  );
}
