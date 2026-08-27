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
        hostname: "iemgpccgdlwpsrsjuumo.supabase.co",
      },
    ],
  },
};

export default nextConfig;
