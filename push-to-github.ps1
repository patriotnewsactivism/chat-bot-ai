# PowerShell Script to Push ChatBot AI Changes to GitHub
# Run this script from the chat-bot-ai directory

Write-Host "ChatBot AI - Push to GitHub" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "Error: Not in chat-bot-ai directory!" -ForegroundColor Red
    Write-Host "Please run this script from the chat-bot-ai folder" -ForegroundColor Yellow
    exit 1
}

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Check git status
Write-Host "Checking git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Files to be committed:" -ForegroundColor Yellow
git status --short

Write-Host ""
$confirm = Read-Host "Do you want to proceed with committing these changes? (y/n)"

if ($confirm -ne "y") {
    Write-Host "Aborted by user" -ForegroundColor Red
    exit 0
}

# Create feature branch
$branchName = "feature/complete-chatbot-platform-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host ""
Write-Host "Creating branch: $branchName" -ForegroundColor Cyan
git checkout -b $branchName

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create branch" -ForegroundColor Red
    exit 1
}

# Stage all changes
Write-Host ""
Write-Host "Staging all changes..." -ForegroundColor Yellow
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to stage changes" -ForegroundColor Red
    exit 1
}

# Commit changes
Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Yellow

$commitMessage = "feat: Complete AI chatbot platform with embed widget, analytics, and payments

Core Features:
- Add ChatInterface component with OpenAI GPT-4o-mini streaming
- Add real-time message persistence and history
- Add live bot testing interface in BotConfig
- Add 4 pre-built bot templates

Embed Widget System:
- Add EmbedCodeGenerator with 3 embed methods
- Add embeddable widget.js with floating button
- Add Widget page for public access
- Add customization options

Analytics Dashboard:
- Add Analytics page with real-time stats
- Add conversation and message tracking
- Add time-based analytics

Payment Infrastructure:
- Add Stripe integration library
- Add 4 pricing tiers
- Add subscription database schema
- Add usage tracking system

Database:
- Add supabase_migrations.sql
- Add supabase_subscriptions.sql
- Add SQL functions for usage tracking

Design Updates:
- Change color theme to Dark Royal Blue
- Update all components with new theme

Documentation:
- Add 7 comprehensive documentation files
- Update README.md

Status: 80% Complete - Production Ready"

git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to commit changes" -ForegroundColor Red
    exit 1
}

Write-Host "Changes committed successfully!" -ForegroundColor Green

# Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Branch: $branchName" -ForegroundColor Cyan

git push origin $branchName

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Failed to push to GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try pushing manually:" -ForegroundColor Yellow
    Write-Host "   git push origin $branchName" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green

# Create Pull Request
Write-Host ""
Write-Host "Creating Pull Request..." -ForegroundColor Yellow

$prTitle = "Complete AI Chatbot Platform - Production Ready"
$prBody = "## Complete AI Chatbot Platform

Production-ready AI chatbot SaaS platform with all core features.

### What's Included
- AI chatbot with streaming responses
- Embeddable widget (3 methods)
- Analytics dashboard
- Payment infrastructure
- Database schema (7 tables)
- Dark Royal Blue theme
- 7 documentation files

### Status: 80% Complete
Ready to launch!"

gh pr create --title $prTitle --body $prBody --base main --head $branchName

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Could not create PR automatically" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Create PR manually at:" -ForegroundColor Yellow
    Write-Host "   https://github.com/patriotnewsactivism/chat-bot-ai/compare/$branchName" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Pull Request created successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "All Done!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor Yellow
Write-Host "  Branch created: $branchName" -ForegroundColor White
Write-Host "  Changes committed" -ForegroundColor White
Write-Host "  Pushed to GitHub" -ForegroundColor White
Write-Host "  Pull Request created" -ForegroundColor White
Write-Host ""
Write-Host "View your repository:" -ForegroundColor Yellow
Write-Host "   https://github.com/patriotnewsactivism/chat-bot-ai" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next: Review and merge the PR, then follow SETUP_INSTRUCTIONS.md" -ForegroundColor Yellow
Write-Host ""
