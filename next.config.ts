import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standard Next.js deployment for Vercel (not static export)
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable static optimization
  poweredByHeader: false,
  generateEtags: false,
  // SEO and performance optimizations
  compress: true,
  // Add more lenient TypeScript and ESLint settings for deployment
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
