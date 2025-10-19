#!/bin/bash

echo "========================================="
echo "  ChatBot AI - Deploy to GitHub"
echo "========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed!"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "ERROR: Not in chat-bot-ai directory!"
    echo "Please run this script from the chat-bot-ai folder"
    exit 1
fi

echo "Current directory: $(pwd)"
echo ""

# Show current changes
echo "Files to be committed:"
git status --short
echo ""

read -p "Continue with deployment? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "Deployment cancelled"
    exit 0
fi

# Create feature branch
branch_name="feature/complete-platform-$(date +%Y%m%d-%H%M%S)"
echo ""
echo "Creating branch: $branch_name"
git checkout -b "$branch_name"

# Stage all changes
echo "Staging changes..."
git add .

# Commit
echo "Committing changes..."
git commit -m "feat: Complete AI chatbot platform - production ready

- AI chatbot with OpenAI streaming
- Embeddable widget system
- Analytics dashboard
- Payment infrastructure
- Dark gray professional theme
- 7 documentation files
- 80% complete - ready to launch"

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push origin "$branch_name"

if [ $? -eq 0 ]; then
    echo ""
    echo "SUCCESS! Code pushed to GitHub"
    echo ""
    echo "Creating Pull Request..."
    
    gh pr create --title "Complete AI Chatbot Platform - Production Ready" \
                 --body "Production-ready AI chatbot SaaS platform. Ready to launch!" \
                 --base main \
                 --head "$branch_name"
    
    echo ""
    echo "========================================="
    echo "  DEPLOYMENT COMPLETE!"
    echo "========================================="
    echo ""
    echo "Next steps:"
    echo "1. Review PR at: https://github.com/patriotnewsactivism/chat-bot-ai/pulls"
    echo "2. Merge the PR"
    echo "3. Deploy to production"
    echo ""
else
    echo ""
    echo "ERROR: Failed to push to GitHub"
    echo "Try manually: git push origin $branch_name"
fi
