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
      // Studio became Advisory. The Agent Control Review became ARK Agent
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
    ];
  },
};

export default nextConfig;
