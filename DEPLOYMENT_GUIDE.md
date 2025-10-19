# 🚀 Deployment Guide - Launch Your ChatBot Platform

## Overview

This guide will help you deploy your ChatBot AI platform to production. We'll cover hosting options, environment setup, and best practices.

---

## 🎯 Pre-Deployment Checklist

### Required Services
- ✅ Supabase account (already set up)
- ✅ OpenAI API key (already configured)
- ⏳ Stripe account (for payments - optional for MVP)
- ⏳ Domain name (optional but recommended)
- ⏳ Hosting platform account

### Database Setup
- ✅ Run `supabase_migrations.sql` in Supabase
- ✅ Run `supabase_subscriptions.sql` in Supabase
- ✅ Verify all tables are created
- ✅ Check RLS policies are enabled

---

## 🌐 Hosting Options

### Option 1: Vercel (Recommended - Free Tier Available)

**Pros:**
- Free tier with generous limits
- Automatic deployments from Git
- Built-in SSL certificates
- Global CDN
- Zero configuration for Vite/React

**Steps:**

1. **Push to GitHub**
```bash
cd chat-bot-ai
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/chatbot-ai.git
git push -u origin main
```

2. **Deploy to Vercel**
- Go to https://vercel.com
- Click "Import Project"
- Connect your GitHub repository
- Configure environment variables (see below)
- Click "Deploy"

3. **Environment Variables in Vercel**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_OPENAI_API_KEY=your_openai_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key (optional)
```

4. **Custom Domain (Optional)**
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

**Cost:** Free for hobby projects, $20/month for Pro

---

### Option 2: Netlify (Alternative - Free Tier)

**Pros:**
- Free tier available
- Easy deployment
- Built-in forms and functions
- Good for static sites

**Steps:**

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Go to https://netlify.com
- Drag and drop the `dist` folder
- Or connect GitHub for automatic deployments

3. **Configure Environment Variables**
- Go to Site Settings → Environment Variables
- Add all required variables

**Cost:** Free for personal projects, $19/month for Pro

---

### Option 3: Railway (Backend-Friendly)

**Pros:**
- Great for full-stack apps
- Database hosting included
- Easy environment management
- $5 free credit monthly

**Steps:**

1. **Connect GitHub**
- Go to https://railway.app
- Connect your GitHub repository
- Select the chat-bot-ai project

2. **Configure Build**
- Build Command: `npm run build`
- Start Command: `npm run preview`

3. **Add Environment Variables**
- Add all required variables in Railway dashboard

**Cost:** $5/month free credit, pay-as-you-go after

---

## 🔐 Environment Variables

### Required Variables
```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=your-project-id

# OpenAI
VITE_OPENAI_API_KEY=sk-...

# Stripe (Optional - for payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### Security Best Practices
1. **Never commit `.env` to Git**
2. **Use different keys for development and production**
3. **Rotate API keys regularly**
4. **Use environment-specific Supabase projects**

---

## 📊 Production Configuration

### 1. Update Supabase Settings

**Enable Email Confirmations:**
- Go to Authentication → Settings
- Enable "Confirm email"
- Configure email templates

**Set Site URL:**
- Go to Authentication → URL Configuration
- Set Site URL to your production domain
- Add redirect URLs

**Enable RLS:**
- Verify all tables have RLS enabled
- Test policies with production data

### 2. OpenAI Configuration

**Set Usage Limits:**
- Go to OpenAI dashboard
- Set monthly spending limits
- Enable usage alerts
- Monitor API usage

**Optimize Costs:**
- Use `gpt-4o-mini` for most conversations
- Implement caching for common responses
- Add rate limiting per user

### 3. Stripe Configuration (When Ready)

**Create Products:**
- Starter: $29/month
- Professional: $99/month
- Business: $299/month

**Set Up Webhooks:**
- Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
- Subscribe to events:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

**Test Mode:**
- Use test mode for initial deployment
- Switch to live mode when ready to accept payments

---

## 🔧 Build Optimization

### 1. Optimize Bundle Size
```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer

# Remove unused dependencies
npm prune
```

### 2. Enable Compression
Add to `vite.config.ts`:
```typescript
import compression from 'vite-plugin-compression';

export default {
  plugins: [
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress' })
  ]
}
```

### 3. Add Caching Headers
Configure in your hosting platform:
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

---

## 📈 Monitoring & Analytics

### 1. Error Tracking (Sentry)
```bash
npm install @sentry/react
```

Add to `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

### 2. Analytics (PostHog or Google Analytics)
```bash
npm install posthog-js
```

### 3. Uptime Monitoring
- Use UptimeRobot (free)
- Monitor main pages
- Set up alerts

---

## 🚨 Pre-Launch Testing

### 1. Functionality Tests
- [ ] User registration works
- [ ] Login/logout works
- [ ] Create chatbot works
- [ ] Chat interface works
- [ ] Message persistence works
- [ ] Embed widget works
- [ ] Analytics display correctly

### 2. Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Chat response time < 2 seconds
- [ ] Mobile responsive
- [ ] Works on all major browsers

### 3. Security Tests
- [ ] RLS policies working
- [ ] API keys not exposed
- [ ] HTTPS enabled
- [ ] CORS configured correctly

---

## 🎉 Launch Checklist

### Day Before Launch
- [ ] Final testing on staging
- [ ] Backup database
- [ ] Prepare support email
- [ ] Write launch announcement
- [ ] Prepare social media posts

### Launch Day
- [ ] Deploy to production
- [ ] Verify all features work
- [ ] Monitor error logs
- [ ] Post on Product Hunt
- [ ] Share on social media
- [ ] Email your list

### Week After Launch
- [ ] Monitor usage and errors
- [ ] Respond to feedback
- [ ] Fix critical bugs
- [ ] Collect testimonials
- [ ] Plan next features

---

## 💰 Cost Estimates

### Monthly Operating Costs

**Minimum (Free Tier):**
- Vercel: $0
- Supabase: $0 (up to 500MB database)
- OpenAI: ~$10-50 (depends on usage)
- **Total: $10-50/month**

**Growing (Paid Tiers):**
- Vercel Pro: $20
- Supabase Pro: $25
- OpenAI: ~$100-500
- Stripe: 3.5% of revenue
- **Total: $145-545/month + Stripe fees**

**Scale (High Volume):**
- Vercel Enterprise: $150+
- Supabase Pro: $25-100
- OpenAI: $500-2000
- Monitoring: $50-100
- **Total: $725-2250/month**

---

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
      # Deploy step depends on your hosting platform
```

---

## 📞 Support & Maintenance

### Regular Tasks
- **Daily:** Monitor error logs
- **Weekly:** Check usage metrics
- **Monthly:** Review costs and optimize
- **Quarterly:** Update dependencies

### Backup Strategy
- **Database:** Daily automated backups (Supabase)
- **Code:** Git repository
- **Environment:** Document all configurations

---

## 🎯 Post-Launch Optimization

### Week 1-2
- Fix critical bugs
- Improve onboarding
- Add missing features

### Month 1-3
- Optimize performance
- Add integrations
- Improve analytics

### Month 3-6
- Scale infrastructure
- Add enterprise features
- Expand marketing

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [Stripe Integration Guide](https://stripe.com/docs/payments/checkout)

---

## 🆘 Troubleshooting

### Common Issues

**Build Fails:**
- Check Node version (18+)
- Clear node_modules and reinstall
- Check for TypeScript errors

**Environment Variables Not Working:**
- Prefix with `VITE_` for client-side
- Restart dev server after changes
- Check hosting platform configuration

**Database Connection Issues:**
- Verify Supabase URL and key
- Check RLS policies
- Ensure tables exist

**OpenAI API Errors:**
- Check API key is valid
- Verify you have credits
- Check rate limits

---

**Ready to deploy? Start with Vercel for the easiest experience!** 🚀