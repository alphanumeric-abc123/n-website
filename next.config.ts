import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disable static export for Vercel troubleshooting
  // output: 'export',
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
  // Remove distDir to use default for static export
  // Static export doesn't need custom distDir configuration
};

export default nextConfig;
