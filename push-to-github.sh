#!/bin/bash

# GitHub Push Script for Navi Website
# This script helps push code to the existing GitHub repository with proper authentication

echo "🚀 Pushing Navi Website to GitHub..."
echo "Repository: https://github.com/alphanumeric-abc123/n-website"
echo ""

# Check if we have a GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  GitHub Personal Access Token not found in environment."
    echo ""
    echo "To set up authentication:"
    echo "1. Go to GitHub.com → Settings → Developer settings → Personal access tokens"
    echo "2. Generate a new token with 'repo' scope"
    echo "3. Run: export GITHUB_TOKEN=your_token_here"
    echo "4. Then run this script again"
    echo ""
    echo "Alternatively, you can run:"
    echo "git remote add origin https://YOUR_TOKEN@github.com/alphanumeric-abc123/n-website.git"
    echo "git push -u origin main"
    exit 1
fi

# Add remote with token authentication
echo "📡 Setting up GitHub remote with authentication..."
git remote add origin https://$GITHUB_TOKEN@github.com/alphanumeric-abc123/n-website.git

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Repository: https://github.com/alphanumeric-abc123/n-website"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://app.netlify.com"
    echo "2. Click 'New site from Git'"
    echo "3. Select your GitHub repository"
    echo "4. Netlify will auto-detect build settings from netlify.toml"
    echo "5. Deploy your site!"
else
    echo "❌ Failed to push to GitHub"
    echo "Please check your GitHub token and try again"
fi
