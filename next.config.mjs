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
        source: "/platform",
        destination: "/",
        permanent: false,
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
    ];
  },
};

export default nextConfig;
