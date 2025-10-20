# BuildMyBot - AI Chatbot Platform

## Project Overview
BuildMyBot is a platform for creating and deploying AI-powered chatbots. Users can create custom chatbots with their own knowledge bases, configure them for different use cases, and deploy them to their websites.

## Architecture

### Backend
- **Framework**: Express.js
- **Database**: Neon Postgres (via Replit)
- **ORM**: Drizzle ORM
- **AI**: OpenAI API (gpt-3.5-turbo)
- **Payments**: Stripe (optional)

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI + Tailwind CSS
- **Routing**: React Router

### Development Setup
- Frontend runs on port 5000 (Vite dev server)
- Backend runs on port 3000 (Express API server)
- API requests are proxied from frontend to backend

## Database Schema
Comprehensive schema in `shared/schema.ts` including:
- Users and subscriptions
- Chatbots and configurations
- Conversations and messages
- Analytics and usage tracking
- Referrals and commissions
- Knowledge base documents
- Integrations

## Recent Changes (Migration from Supabase)

### Completed
1. ✅ Database migrated from Supabase to Neon Postgres
2. ✅ Backend API fully implemented with Express
3. ✅ Drizzle ORM configured and schema pushed
4. ✅ OpenAI chat integration working
5. ✅ Stripe integration (with graceful handling of missing keys)
6. ✅ Development environment configured

### In Progress
- ⚠️ Frontend migration from Supabase client to new API client
- ⚠️ Authentication implementation (Supabase Auth removed)

**See MIGRATION_STATUS.md for detailed migration status and next steps.**

## Environment Variables
- `DATABASE_URL` - Postgres connection (auto-configured)
- `OPENAI_API_KEY` - For AI chat functionality
- `STRIPE_SECRET_KEY` - For payment processing (optional)
- `STRIPE_WEBHOOK_SECRET` - For Stripe webhooks (optional)

## Running the Project
\`\`\`bash
npm run dev
\`\`\`

## Database Management
- Push schema changes: `npm run db:push`
- View database: `npm run db:studio`

## User Preferences
- Migration in progress from Supabase to Neon
- Focus on completing frontend migration next
- Maintain existing functionality during migration
