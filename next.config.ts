/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";
import TerserPlugin from "terser-webpack-plugin";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ik.imagekit.io",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com"
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'date-fns',
      'lodash',
      '@mui/material',
      '@mui/icons-material',
      'framer-motion'
    ],
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['https://spacedigitalia.my.id', 'localhost:3000']
    },
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        }
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
  ],
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = true;
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              dead_code: true
            },
            mangle: true,
            output: {
              comments: false,
            },
          },
        })
      );
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
