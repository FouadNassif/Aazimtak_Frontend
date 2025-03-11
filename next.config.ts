import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "yourdomain.com"], // Add localhost here
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
