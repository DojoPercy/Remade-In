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
      {
        // YouTube auto-thumbnails for video cards
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        // Vimeo thumbnails
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
      },
    ],
  },
};

export default nextConfig;
