/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Netlify deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment configuration
  basePath: process.env.NODE_ENV === 'production' ? '/n-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/n-website/' : '',
  // Optimize for static hosting
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Basic optimizations
  poweredByHeader: false,
  compress: true,
  // Ensure TypeScript builds properly
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disable ESLint during builds
  },
};

module.exports = nextConfig;
