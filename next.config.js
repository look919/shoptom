/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tomshop.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
