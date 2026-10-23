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
      // Agent Control became ARC Control and moved to /control in the
      // Magic Patterns redesign. /ark-control is indexed, so it redirects.
      {
        source: "/ark-control",
        destination: "/control",
        permanent: true,
      },
      // The Playbook sells from its own route now.
      {
        source: "/playbooks/ark-ai-product-playbook",
        destination: "/playbook",
        permanent: true,
      },
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
