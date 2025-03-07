import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ik.imagekit.io",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  webpack: (config) => {
    // Handle module fallbacks
    config.resolve.fallback = {
      ...config.resolve.fallback,
      punycode: false,
    };

    // Handle image imports
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
