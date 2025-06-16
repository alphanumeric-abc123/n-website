# Netlify Deployment Guide for Navi.com

## Overview
This guide covers deploying the Navi.com corporate website to Netlify after migrating from Vercel due to routes-manifest.json errors.

## Configuration Files

### netlify.toml
- **Build Command**: `npm run build`
- **Publish Directory**: `out` (Next.js static export output)
- **Node Version**: 18
- **Install Flags**: `--legacy-peer-deps` for compatibility

### Key Features Configured:
- Static export optimization for Next.js
- Security headers (CSP, XSS protection, etc.)
- Cache optimization for static assets
- Form handling support
- Redirect rules for SPA routing

## Deployment Steps

### Option 1: Netlify CLI (Recommended for testing)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy to Netlify (draft)
netlify deploy --dir=out

# Deploy to production
netlify deploy --prod --dir=out
```

### Option 2: Git Integration (Recommended for production)
1. Push code to GitHub repository
2. Connect repository to Netlify:
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose GitHub and select repository
   - Build settings will be auto-detected from netlify.toml

### Build Settings (Auto-configured via netlify.toml)
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: 18

## Environment Variables
Set these in Netlify dashboard under Site Settings > Environment Variables:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
- `CONTENTFUL_ENVIRONMENT`

## Domain Configuration
1. In Netlify dashboard, go to Domain Settings
2. Add custom domain: `navi.com`
3. Configure DNS records as provided by Netlify
4. Enable HTTPS (automatic with Let's Encrypt)

## Performance Optimizations
- Static asset caching (1 year)
- CSS/JS minification enabled
- Image optimization via Next.js
- Gzip compression enabled

## Monitoring & Analytics
- Netlify Analytics available in dashboard
- GA4 integration configured in the application
- Performance monitoring via Lighthouse CI

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check Node version and npm flags
2. **Routing Issues**: Verify redirect rules in netlify.toml
3. **Environment Variables**: Ensure all Contentful variables are set

### Support:
- Netlify Support: https://docs.netlify.com
- Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

## Migration Benefits
- No routes-manifest.json errors
- Better Next.js 15.3.3 compatibility
- Excellent static site hosting
- Built-in form handling
- Comprehensive redirect/rewrite support
