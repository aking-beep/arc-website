/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/academy/ai-readiness-workshop",
        destination: "/academy/digital-readiness-workshop",
        permanent: true,
      },
      {
        source: "/work/sample-transformation-diagnostic",
        destination: "/work/transformation-diagnostic",
        permanent: true,
      },
      {
        source: "/work/mcp-readiness-for-ops",
        destination: "/work",
        permanent: true,
      },
      // Studio became Advisory. The Agent Control Review became Agent
      // Readiness, so it moves out of the engagement list entirely.
      {
        source: "/studio/agent-control-review",
        destination: "/agent-readiness",
        permanent: true,
      },
      {
        source: "/studio",
        destination: "/advisory",
        permanent: true,
      },
      {
        source: "/studio/:slug",
        destination: "/advisory/:slug",
        permanent: true,
      },
      // The Playbook sells from its own route now.
      {
        source: "/playbooks/ark-ai-product-playbook",
        destination: "/playbook",
        permanent: true,
      },
      // --- 2026-10 restructure -------------------------------------------
      // The site now leads with agent governance. Everything below is a page
      // that moved, not a page that died, so every one of these is permanent.
      { source: "/platform", destination: "/agents", permanent: true },
      { source: "/ark-control", destination: "/agents/control", permanent: true },
      { source: "/agent-readiness", destination: "/assessment", permanent: true },
      // AI Fit was a product page in front of a Labs tool, and AI Fit Teams
      // was the AI Readiness Audit under a second name.
      { source: "/ai-fit", destination: "/labs/arc-stack-advisor", permanent: true },
      {
        source: "/ai-fit-teams",
        destination: "/advisory/ai-readiness-audit",
        permanent: true,
      },
      // /playbook sold PDFs and /playbooks held the free frameworks. One
      // character between two different businesses.
      { source: "/playbooks", destination: "/frameworks", permanent: true },
      {
        source: "/playbooks/:slug",
        destination: "/frameworks/:slug",
        permanent: true,
      },
      { source: "/services", destination: "/consulting", permanent: true },

      // The skills, architecture and workflow libraries ship inside Ship.
      {
        source: "/labs/arc-skills",
        destination: "/playbook/ship",
        permanent: true,
      },
      {
        source: "/labs/reference-architectures",
        destination: "/playbook/ship",
        permanent: true,
      },
      {
        source: "/labs/ai-workflow-templates",
        destination: "/playbook/ship",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
