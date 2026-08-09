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
    ];
  },
};

export default nextConfig;
