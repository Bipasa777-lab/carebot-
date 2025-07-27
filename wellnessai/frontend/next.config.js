/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    appDir: true,
  },

  images: {
    domains: ["localhost", "your-api-domain.com"],
  },

  async rewrites() {
    return [
      {
        source: "/api/node/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
      {
        source: "/api/ai/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
