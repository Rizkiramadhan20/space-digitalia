import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import withPWA from "next-pwa";

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ik.imagekit.io",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
};

export default analyzer(withPWA(nextConfig));
