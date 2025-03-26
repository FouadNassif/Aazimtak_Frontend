import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  typescript: {
    // Disable TypeScript checking during the build process
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint checking during the build process
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
