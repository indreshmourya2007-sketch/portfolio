/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/satya-drishti",
        destination: "/satyadrishti",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
