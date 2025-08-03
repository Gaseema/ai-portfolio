#!/bin/bash

# Local deployment script to push and deploy
# Usage: ./deploy.sh "commit message"

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if commit message is provided
if [ $# -eq 0 ]; then
    print_error "Please provide a commit message"
    echo "Usage: ./deploy.sh \"your commit message\""
    exit 1
fi

COMMIT_MESSAGE="$1"

print_status "Starting deployment process..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository"
    exit 1
fi

# Check if there are any changes to commit
if git diff --quiet && git diff --staged --quiet; then
    print_warning "No changes to commit"
else
    # Add all changes
    print_status "Adding changes..."
    git add .
    
    # Commit changes
    print_status "Committing changes..."
    git commit -m "$COMMIT_MESSAGE"
fi

# Push to main branch
print_status "Pushing to main branch..."
git push origin main

print_status "✅ Code pushed to main branch!"
print_status "🚀 GitHub Actions will now deploy to your Lightsail server"
print_status "Check the Actions tab in GitHub to monitor deployment progress"

# Optional: Open GitHub Actions page
if command -v open &> /dev/null; then
    print_status "Opening GitHub Actions page..."
    open "https://github.com/Gaseema/ai-portfolio/actions"
elif command -v xdg-open &> /dev/null; then
    print_status "Opening GitHub Actions page..."
    xdg-open "https://github.com/Gaseema/ai-portfolio/actions"
fi
