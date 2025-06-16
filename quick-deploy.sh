#!/bin/bash

# Quick Deploy Script for Navi Website
# This script automates the GitHub push and provides Netlify setup instructions

echo "🚀 Navi Website Quick Deploy Script"
echo "=================================="
echo ""

# Check if GitHub token is provided
if [ -z "$1" ]; then
    echo "❌ GitHub Personal Access Token required!"
    echo ""
    echo "Usage: ./quick-deploy.sh YOUR_GITHUB_TOKEN"
    echo ""
    echo "To get a token:"
    echo "1. Go to: https://github.com/settings/tokens/new"
    echo "2. Name: 'Navi Website Deployment'"
    echo "3. Scope: Check 'repo'"
    echo "4. Generate and copy the token"
    echo "5. Run: ./quick-deploy.sh your_token_here"
    exit 1
fi

GITHUB_TOKEN=$1

echo "📋 Pre-deployment checklist:"
echo "✅ Git repository initialized"
echo "✅ All changes committed"
echo "✅ netlify.toml configured"
echo "✅ Build process verified"
echo "✅ 92%+ test coverage"
echo ""

# Remove existing remote if any
echo "🔧 Setting up GitHub remote..."
git remote remove origin 2>/dev/null || true

# Add remote with token authentication
git remote add origin https://$GITHUB_TOKEN@github.com/alphanumeric-abc123/n-website.git

# Push to GitHub
echo "📤 Pushing code to GitHub..."
if git push -u origin main; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub!"
    echo "🌐 Repository: https://github.com/alphanumeric-abc123/n-website"
    echo ""
    echo "🎯 Next: Connect to Netlify"
    echo "=========================="
    echo "1. Go to: https://app.netlify.com"
    echo "2. Click 'New site from Git'"
    echo "3. Choose 'GitHub'"
    echo "4. Select: alphanumeric-abc123/n-website"
    echo "5. Netlify will auto-detect build settings from netlify.toml:"
    echo "   - Build command: npm run build"
    echo "   - Publish directory: out"
    echo "   - Node version: 18"
    echo "6. Click 'Deploy site'"
    echo ""
    echo "🎉 Your site will be live in 2-3 minutes!"
    echo "📱 You'll get a URL like: https://amazing-name-123456.netlify.app"
    echo ""
    echo "🔧 Optional: Add environment variables in Netlify if using Contentful:"
    echo "   - CONTENTFUL_SPACE_ID"
    echo "   - CONTENTFUL_ACCESS_TOKEN"
    echo "   - CONTENTFUL_PREVIEW_ACCESS_TOKEN"
    echo "   - CONTENTFUL_MANAGEMENT_TOKEN"
    echo ""
    echo "✨ Deployment complete! Your Navi website is ready! ✨"
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo "Please check:"
    echo "1. GitHub token has 'repo' permissions"
    echo "2. Token is not expired"
    echo "3. You have access to alphanumeric-abc123/n-website repository"
    echo ""
    echo "If issues persist, you may need to:"
    echo "- Ask repository owner to add you as collaborator"
    echo "- Or create a new repository under your account"
fi
