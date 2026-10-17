import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dynamic-media.tacdn.com",
      },
      {
        protocol: "https",
        hostname: "hare-media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "iemgpccgdlwpsrsjuumo.supabase.co",
      },
    ],
  },
  async redirects() {
    return ["kauai", "oahu", "maui", "big-island"].map((island) => ({
      source: `/tours/:slug(${island}-[a-z0-9-]+)`,
      destination: `/${island}?flight=:slug`,
      permanent: true,
    }));
  },
};

export default nextConfig;
