import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Sanity CDN — all project assets
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        // Sanity file assets (PDFs served as images in some contexts)
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/files/**',
      },
    ],
  },
};

export default nextConfig;
