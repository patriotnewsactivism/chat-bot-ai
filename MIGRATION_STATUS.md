# Supabase to Neon Postgres Migration Status

## ✅ Completed Tasks

### 1. Database Migration
- ✅ PostgreSQL database provisioned via Replit (Neon-backed)
- ✅ Database schema defined in `shared/schema.ts` using Drizzle ORM
- ✅ Schema pushed to database using `npm run db:push`
- ✅ Database connection configured in `server/db.ts`

### 2. Backend API Implementation
- ✅ Express server created in `server/index.ts`
- ✅ API routes implemented:
  - `GET /api/chatbots` - List chatbots for a user
  - `GET /api/chatbots/:id` - Get single chatbot
  - `POST /api/chatbots` - Create new chatbot
  - `PUT /api/chatbots/:id` - Update chatbot
  - `DELETE /api/chatbots/:id` - Delete chatbot
  - `GET /api/conversations/:chatbotId` - Get conversations
  - `GET /api/messages/:conversationId` - Get messages
  - `POST /api/chat` - Send chat message and get AI response

### 3. AI Integration
- ✅ OpenAI integration configured (using OpenAI API key from secrets)
- ✅ Chat functionality ported from Supabase Edge Function
- ✅ Conversation and message history management

### 4. Development Environment
- ✅ Concurrent development setup (frontend + backend)
- ✅ Vite proxy configuration for API requests
- ✅ Hot reload enabled for both client and server
- ✅ Development workflow configured

### 5. Dependencies
- ✅ Drizzle ORM and Drizzle Kit installed
- ✅ Express and CORS configured
- ✅ Supabase package removed
- ✅ Required packages installed (tsx, concurrently, etc.)

## ⚠️ Pending Tasks - Frontend Migration

### Critical: Replace Supabase Client Calls
The backend migration is complete, but **frontend pages still reference the old Supabase client**. A temporary stub has been created to prevent errors, but full functionality requires migrating each page.

### Files Requiring Migration

1. **src/pages/Dashboard.tsx**
   - Replace `supabase.auth.getSession()` with custom auth solution
   - Replace `supabase.from('chatbots')` calls with `apiClient.getChatbots(userId)`
   - Replace `supabase.from('chatbots').insert()` with `apiClient.createChatbot()`
   - Replace `supabase.from('chatbots').delete()` with `apiClient.deleteChatbot(id)`

2. **src/pages/BotConfig.tsx**
   - Replace auth checks
   - Replace `supabase.from('chatbots').select()` with `apiClient.getChatbot(id)`
   - Replace `supabase.from('chatbots').update()` with `apiClient.updateChatbot(id, data)`

3. **src/pages/Widget.tsx**
   - Replace `supabase.from('chatbots').select()` with `apiClient.getChatbot(botId)`

4. **src/pages/Analytics.tsx**
   - Migrate analytics queries to new API

5. **src/pages/Auth.tsx** & **src/pages/EnhancedAuth.tsx**
   - Implement custom authentication (Supabase Auth is removed)
   - Options: Implement JWT-based auth, use Replit Auth, or another auth provider

6. **src/components/ChatInterface.tsx**
   - Replace Supabase calls with `apiClient.sendChatMessage()`

### API Client Usage Example

The new API client is available at `src/lib/api-client.ts`. Example usage:

\`\`\`typescript
import { apiClient } from '@/lib/api-client';

// Get chatbots
const chatbots = await apiClient.getChatbots(userId);

// Create chatbot
const newBot = await apiClient.createChatbot({
  userId,
  name: 'My Bot',
  description: 'A helpful assistant',
  config: { systemPrompt: 'You are helpful' },
});

// Update chatbot
await apiClient.updateChatbot(botId, {
  name: 'Updated Name',
});

// Delete chatbot
await apiClient.deleteChatbot(botId);

// Send chat message
const response = await apiClient.sendChatMessage({
  chatbotId: 'bot-id',
  message: 'Hello!',
  visitorId: 'visitor-123',
});
\`\`\`

## 🔧 Environment Variables

### Required
- ✅ `DATABASE_URL` - Neon Postgres connection string (auto-configured)
- ✅ `OPENAI_API_KEY` - OpenAI API key for chat functionality

### Optional
- ⚠️ `STRIPE_SECRET_KEY` - For payment processing (currently optional)
- ⚠️ `STRIPE_WEBHOOK_SECRET` - For Stripe webhooks

## 🚀 Running the Application

\`\`\`bash
npm run dev
\`\`\`

This starts:
- Frontend (Vite) on port 5000
- Backend (Express) on port 3000

## 📝 Next Steps

1. **Implement Authentication**
   - Choose an auth strategy (JWT, Replit Auth, etc.)
   - Create login/signup endpoints
   - Add auth middleware to protected routes
   - Update frontend to use new auth

2. **Complete Frontend Migration**
   - Replace Supabase calls in all pages (listed above)
   - Test each page individually
   - Remove the Supabase stub once migration is complete

3. **Add Missing Features**
   - User registration and authentication
   - Analytics endpoints
   - Real-time updates (if needed)

4. **Testing**
   - Test chatbot CRUD operations
   - Test chat functionality end-to-end
   - Test with actual users

## 🐛 Known Issues

1. **Authentication**: Supabase auth has been removed. You'll need to implement your own auth solution.
2. **Frontend Stub**: A temporary Supabase stub prevents errors but doesn't provide functionality.
3. **Stripe API Version**: Currently using '2023-10-16'. Update if needed for new features.

## 📚 Project Structure

\`\`\`
├── server/
│   ├── index.ts          # Main API server
│   ├── db.ts             # Database connection
│   └── routes/
│       └── stripe.ts     # Stripe integration
├── shared/
│   └── schema.ts         # Database schema (Drizzle)
├── src/
│   ├── lib/
│   │   └── api-client.ts # Frontend API client
│   └── pages/            # React pages (need migration)
└── drizzle.config.ts     # Drizzle configuration
\`\`\`
