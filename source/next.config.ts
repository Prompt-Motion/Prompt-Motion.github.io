import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.prompt-motion.com" },
    ],
  },
};

export default nextConfig;
