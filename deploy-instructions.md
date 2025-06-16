# Deployment Instructions for Navi Website

## Step 1: GitHub Repository Setup

After creating your new GitHub repository, run these commands:

```bash
# Add your new GitHub repository as origin (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push your code to GitHub
git push -u origin main
```

## Step 2: Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign in with your GitHub account
3. Click "New site from Git"
4. Choose "GitHub" as your Git provider
5. Select your repository (`navi-website-redesign` or whatever you named it)
6. Netlify should auto-detect the build settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 18

## Step 3: Environment Variables (if needed)

If your site uses Contentful or other external services, add environment variables in Netlify:

1. Go to Site settings > Environment variables
2. Add the following variables from your `.env.example`:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
   - `CONTENTFUL_MANAGEMENT_TOKEN`

## Step 4: Deploy

1. Click "Deploy site"
2. Netlify will automatically build and deploy your site
3. You'll get a random URL like `https://amazing-name-123456.netlify.app`
4. You can customize this URL in Site settings > Domain management

## Current Project Status

✅ **Ready for Deployment:**
- Next.js 14.2.15 with static export configured
- Comprehensive component library with 92%+ test coverage
- Netlify configuration file (`netlify.toml`) properly configured
- Build process verified and working
- All dependencies installed and up to date

✅ **Build Configuration:**
- Static site generation enabled
- Optimized for performance (Lighthouse ≥90 target)
- Security headers configured
- Cache optimization for static assets
- Form handling support

## Troubleshooting

If you encounter any issues:

1. **Build fails**: Check the build logs in Netlify dashboard
2. **Missing environment variables**: Verify all required env vars are set
3. **404 errors**: Check that `netlify.toml` redirect rules are working
4. **Slow builds**: Node version should be 18 with `--legacy-peer-deps`

## Next Steps After Deployment

1. Test the deployed site thoroughly
2. Set up custom domain if needed
3. Configure analytics and monitoring
4. Set up branch deploys for staging/preview
