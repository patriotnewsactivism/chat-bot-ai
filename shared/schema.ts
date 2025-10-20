import { pgTable, text, timestamp, integer, boolean, jsonb, uuid, decimal } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  businessName: text('business_name'),
  industry: text('industry'),
  companySize: text('company_size'), // '1-10', '11-50', '51-200', '201-500', '500+'
  website: text('website'),
  useCase: text('use_case'), // 'customer-support', 'lead-generation', 'knowledge-base', 'sales'
  goals: text('goals'), // JSON string of user goals
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
  subscriptionStatus: text('subscription_status').default('free'), // 'free', 'trial', 'active', 'canceled', 'past_due'
  stripeCustomerId: text('stripe_customer_id'),
  referralCode: text('referral_code'),
  referredBy: text('referred_by'), // User ID of referrer
});

// Chatbots table
export const chatbots = pgTable('chatbots', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  template: text('template'), // 'ecommerce', 'support', 'sales', 'knowledge', 'custom'
  status: text('status').default('draft'), // 'draft', 'active', 'paused', 'archived'
  config: jsonb('config'), // Bot configuration including prompts, colors, etc.
  knowledgeBase: jsonb('knowledge_base'), // Training data and documents
  widgetSettings: jsonb('widget_settings'), // Widget appearance and behavior
  integrations: jsonb('integrations'), // Connected services and APIs
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  lastUsedAt: timestamp('last_used_at'),
  totalConversations: integer('total_conversations').default(0),
  monthlyConversations: integer('monthly_conversations').default(0),
  satisfactionScore: decimal('satisfaction_score', { precision: 3, scale: 2 }), // Average rating
});

// Subscriptions table
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  planId: text('plan_id').notNull(), // 'free', 'starter', 'pro', 'business'
  status: text('status').notNull(), // 'active', 'trialing', 'past_due', 'canceled', 'unpaid'
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  trialEnd: timestamp('trial_end'),
  canceledAt: timestamp('canceled_at'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripePriceId: text('stripe_price_id'),
  quantity: integer('quantity').default(1),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Usage tracking table
export const usage = pgTable('usage', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  chatbotId: uuid('chatbot_id').notNull().references(() => chatbots.id, { onDelete: 'cascade' }),
  metric: text('metric').notNull(), // 'conversations', 'messages', 'storage', 'api_calls'
  value: integer('value').notNull().default(1),
  period: text('period').notNull(), // 'daily', 'monthly', 'yearly'
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Conversations table
export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  chatbotId: uuid('chatbot_id').notNull().references(() => chatbots.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').notNull(),
  visitorId: text('visitor_id'),
  visitorInfo: jsonb('visitor_info'), // IP, user agent, location, etc.
  status: text('status').default('active'), // 'active', 'resolved', 'escalated', 'abandoned'
  startTime: timestamp('start_time').defaultNow(),
  endTime: timestamp('end_time'),
  duration: integer('duration'), // Conversation duration in seconds
  messageCount: integer('message_count').default(0),
  satisfactionRating: integer('satisfaction_rating'), // 1-5 rating
  feedback: text('feedback'),
  escalatedToHuman: boolean('escalated_to_human').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  role: text('role').notNull(), // 'user', 'assistant', 'system'
  content: text('content').notNull(),
  messageType: text('message_type').default('text'), // 'text', 'image', 'file', 'button_click'
  metadata: jsonb('metadata'), // Additional message data
  confidence: decimal('confidence', { precision: 3, scale: 2 }), // AI confidence score
  responseTime: integer('response_time'), // Response time in milliseconds
  createdAt: timestamp('created_at').defaultNow(),
});

// Analytics events table
export const analytics = pgTable('analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  chatbotId: uuid('chatbot_id').references(() => chatbots.id, { onDelete: 'cascade' }),
  sessionId: text('session_id'),
  eventType: text('event_type').notNull(), // 'page_view', 'bot_created', 'conversation_started', 'upgrade_clicked', etc.
  eventName: text('event_name').notNull(),
  properties: jsonb('properties'), // Event properties and metadata
  value: decimal('value', { precision: 10, scale: 2 }), // Numeric value for the event
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Referrals table
export const referrals = pgTable('referrals', {
  id: uuid('id').primaryKey().defaultRandom(),
  referrerId: uuid('referrer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  referredUserId: uuid('referred_user_id').references(() => users.id, { onDelete: 'cascade' }),
  referralCode: text('referral_code').notNull(),
  status: text('status').default('pending'), // 'pending', 'confirmed', 'completed', 'expired'
  rewardType: text('reward_type'), // 'free_month', 'commission', 'credit'
  rewardValue: decimal('reward_value', { precision: 10, scale: 2 }),
  commissionRate: decimal('commission_rate', { precision: 5, scale: 4 }), // Commission percentage
  confirmedAt: timestamp('confirmed_at'),
  completedAt: timestamp('completed_at'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Commissions table
export const commissions = pgTable('commissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  referralId: uuid('referral_id').notNull().references(() => referrals.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // 'direct', 'tiered'
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  percentage: decimal('percentage', { precision: 5, scale: 4 }),
  status: text('status').default('pending'), // 'pending', 'approved', 'paid', 'rejected'
  period: text('period').notNull(), // 'monthly', 'one-time'
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  paidAt: timestamp('paid_at'),
  stripeTransferId: text('stripe_transfer_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Knowledge base documents table
export const knowledgeDocuments = pgTable('knowledge_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  chatbotId: uuid('chatbot_id').notNull().references(() => chatbots.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content'),
  documentType: text('document_type').notNull(), // 'text', 'pdf', 'website', 'faq', 'api'
  sourceUrl: text('source_url'),
  sourceType: text('source_type'), // 'upload', 'url', 'scrape', 'api'
  fileSize: integer('file_size'),
  mimeType: text('mime_type'),
  status: text('status').default('processing'), // 'processing', 'indexed', 'failed', 'archived'
  embedding: jsonb('embedding'), // Vector embedding for semantic search
  tags: text('tags'), // Comma-separated tags
  lastIndexedAt: timestamp('last_indexed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Integrations table
export const integrations = pgTable('integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  chatbotId: uuid('chatbot_id').notNull().references(() => chatbots.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // 'slack', 'discord', 'whatsapp', 'crm', 'helpdesk', 'ecommerce'
  provider: text('provider').notNull(), // 'slack', 'discord', 'twilio', 'salesforce', 'zendesk', 'shopify'
  config: jsonb('config').notNull(), // Integration configuration
  credentials: jsonb('credentials'), // Encrypted credentials
  status: text('status').default('active'), // 'active', 'inactive', 'error'
  lastSyncAt: timestamp('last_sync_at'),
  syncFrequency: integer('sync_frequency'), // Sync frequency in minutes
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Templates table
export const templates = pgTable('templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(), // 'industry', 'use-case', 'feature'
  industry: text('industry'), // 'healthcare', 'real-estate', 'restaurant', etc.
  useCase: text('use_case'), // 'customer-support', 'lead-generation', etc.
  systemPrompt: text('system_prompt').notNull(),
  knowledgeBase: text('knowledge_base'),
  config: jsonb('config'), // Default configuration
  widgetSettings: jsonb('widget_settings'),
  tags: text('tags'),
  isPublic: boolean('is_public').default(true),
  usageCount: integer('usage_count').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Settings table
export const settings = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  key: text('key').notNull(),
  value: jsonb('value').notNull(),
  type: text('type').notNull(), // 'string', 'number', 'boolean', 'json'
  category: text('category'), // 'ui', 'notifications', 'billing', 'security'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Export types for use in application
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Chatbot = typeof chatbots.$inferSelect;
export type NewChatbot = typeof chatbots.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type Usage = typeof usage.$inferSelect;
export type NewUsage = typeof usage.$inferInsert;
export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Analytics = typeof analytics.$inferSelect;
export type NewAnalytics = typeof analytics.$inferInsert;
export type Referral = typeof referrals.$inferSelect;
export type NewReferral = typeof referrals.$inferInsert;
export type Commission = typeof commissions.$inferSelect;
export type NewCommission = typeof commissions.$inferInsert;
export type KnowledgeDocument = typeof knowledgeDocuments.$inferSelect;
export type NewKnowledgeDocument = typeof knowledgeDocuments.$inferInsert;
export type Integration = typeof integrations.$inferSelect;
export type NewIntegration = typeof integrations.$inferInsert;
export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;
export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;