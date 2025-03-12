/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    domains: ["ik.imagekit.io", "lh3.googleusercontent.com"],
  },
};

export default withBundleAnalyzer(nextConfig);
