import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  password: text('password'), // Hashed password
  name: text('name'),
  businessName: text('business_name'),
  industry: text('industry'),
  companySize: text('company_size'), // '1-10', '11-50', '51-200', '201-500', '500+'
  website: text('website'),
  useCase: text('use_case'), // 'customer-support', 'lead-generation', 'knowledge-base', 'sales'
  goals: text('goals'), // JSON string of user goals
  phone: text('phone'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  lastLoginAt: integer('last_login_at', { mode: 'timestamp' }),
  subscriptionStatus: text('subscription_status').default('free'), // 'free', 'trial', 'active', 'canceled', 'past_due'
  stripeCustomerId: text('stripe_customer_id'),
  referralCode: text('referral_code'),
  referredBy: text('referred_by'), // User ID of referrer
});

// Chatbots table
export const chatbots = sqliteTable('chatbots', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  template: text('template'), // 'ecommerce', 'support', 'sales', 'knowledge', 'custom'
  status: text('status').default('draft'), // 'draft', 'active', 'paused', 'archived'
  config: text('config'), // JSON string of bot configuration
  knowledgeBase: text('knowledge_base'), // JSON string of training data and documents
  widgetSettings: text('widget_settings'), // JSON string of widget appearance and behavior
  integrations: text('integrations'), // JSON string of connected services and APIs
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  lastUsedAt: integer('last_used_at', { mode: 'timestamp' }),
  totalConversations: integer('total_conversations').default(0),
  monthlyConversations: integer('monthly_conversations').default(0),
  satisfactionScore: real('satisfaction_score'), // Average rating
});

// Subscriptions table
export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  planId: text('plan_id').notNull(), // 'free', 'starter', 'pro', 'business'
  status: text('status').notNull(), // 'active', 'trialing', 'past_due', 'canceled', 'unpaid'
  currentPeriodStart: integer('current_period_start', { mode: 'timestamp' }).notNull(),
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }).notNull(),
  trialEnd: integer('trial_end', { mode: 'timestamp' }),
  canceledAt: integer('canceled_at', { mode: 'timestamp' }),
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripePriceId: text('stripe_price_id'),
  quantity: integer('quantity').default(1),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Usage tracking table
export const usage = sqliteTable('usage', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  chatbotId: text('chatbot_id').notNull().references(() => chatbots.id, { onDelete: 'cascade' }),
  metric: text('metric').notNull(), // 'conversations', 'messages', 'storage', 'api_calls'
  value: integer('value').notNull().default(1),
  period: text('period').notNull(), // 'daily', 'monthly', 'yearly'
  periodStart: integer('period_start', { mode: 'timestamp' }).notNull(),
  periodEnd: integer('period_end', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Conversations table
export const conversations = sqliteTable('conversations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  chatbotId: text('chatbot_id').notNull().references(() => chatbots.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').notNull(),
  visitorId: text('visitor_id'),
  visitorInfo: text('visitor_info'), // JSON string of IP, user agent, location, etc.
  status: text('status').default('active'), // 'active', 'resolved', 'escalated', 'abandoned'
  startTime: integer('start_time', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  endTime: integer('end_time', { mode: 'timestamp' }),
  duration: integer('duration'), // Conversation duration in seconds
  messageCount: integer('message_count').default(0),
  satisfactionRating: integer('satisfaction_rating'), // 1-5 rating
  feedback: text('feedback'),
  escalatedToHuman: integer('escalated_to_human', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Messages table
export const messages = sqliteTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  conversationId: text('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  role: text('role').notNull(), // 'user', 'assistant', 'system'
  content: text('content').notNull(),
  messageType: text('message_type').default('text'), // 'text', 'image', 'file', 'button_click'
  metadata: text('metadata'), // JSON string of additional message data
  confidence: real('confidence'), // AI confidence score
  responseTime: integer('response_time'), // Response time in milliseconds
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Analytics events table
export const analytics = sqliteTable('analytics', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  chatbotId: text('chatbot_id').references(() => chatbots.id, { onDelete: 'cascade' }),
  sessionId: text('session_id'),
  eventType: text('event_type').notNull(), // 'page_view', 'bot_created', 'conversation_started', 'upgrade_clicked', etc.
  eventName: text('event_name').notNull(),
  properties: text('properties'), // JSON string of event properties and metadata
  value: real('value'), // Numeric value for the event
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Referrals table
export const referrals = sqliteTable('referrals', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  referrerId: text('referrer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  referredUserId: text('referred_user_id').references(() => users.id, { onDelete: 'cascade' }),
  referralCode: text('referral_code').notNull(),
  status: text('status').default('pending'), // 'pending', 'confirmed', 'completed', 'expired'
  rewardType: text('reward_type'), // 'free_month', 'commission', 'credit'
  rewardValue: real('reward_value'),
  commissionRate: real('commission_rate'), // Commission percentage
  confirmedAt: integer('confirmed_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Commissions table
export const commissions = sqliteTable('commissions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  referralId: text('referral_id').notNull().references(() => referrals.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // 'direct', 'tiered'
  amount: real('amount').notNull(),
  percentage: real('percentage'),
  status: text('status').default('pending'), // 'pending', 'approved', 'paid', 'rejected'
  period: text('period').notNull(), // 'monthly', 'one-time'
  periodStart: integer('period_start', { mode: 'timestamp' }).notNull(),
  periodEnd: integer('period_end', { mode: 'timestamp' }).notNull(),
  paidAt: integer('paid_at', { mode: 'timestamp' }),
  stripeTransferId: text('stripe_transfer_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Knowledge base documents table
export const knowledgeDocuments = sqliteTable('knowledge_documents', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  chatbotId: text('chatbot_id').notNull().references(() => chatbots.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content'),
  documentType: text('document_type').notNull(), // 'text', 'pdf', 'website', 'faq', 'api'
  sourceUrl: text('source_url'),
  sourceType: text('source_type'), // 'upload', 'url', 'scrape', 'api'
  fileSize: integer('file_size'),
  mimeType: text('mime_type'),
  status: text('status').default('processing'), // 'processing', 'indexed', 'failed', 'archived'
  embedding: text('embedding'), // JSON string of vector embedding for semantic search
  tags: text('tags'), // Comma-separated tags
  lastIndexedAt: integer('last_indexed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Integrations table
export const integrations = sqliteTable('integrations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  chatbotId: text('chatbot_id').notNull().references(() => chatbots.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // 'slack', 'discord', 'whatsapp', 'crm', 'helpdesk', 'ecommerce'
  provider: text('provider').notNull(), // 'slack', 'discord', 'twilio', 'salesforce', 'zendesk', 'shopify'
  config: text('config').notNull(), // JSON string of integration configuration
  credentials: text('credentials'), // JSON string of encrypted credentials
  status: text('status').default('active'), // 'active', 'inactive', 'error'
  lastSyncAt: integer('last_sync_at', { mode: 'timestamp' }),
  syncFrequency: integer('sync_frequency'), // Sync frequency in minutes
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Templates table
export const templates = sqliteTable('templates', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(), // 'industry', 'use-case', 'feature'
  industry: text('industry'), // 'healthcare', 'real-estate', 'restaurant', etc.
  useCase: text('use_case'), // 'customer-support', 'lead-generation', etc.
  systemPrompt: text('system_prompt').notNull(),
  knowledgeBase: text('knowledge_base'),
  config: text('config'), // JSON string of default configuration
  widgetSettings: text('widget_settings'), // JSON string of widget settings
  tags: text('tags'),
  isPublic: integer('is_public', { mode: 'boolean' }).default(true),
  usageCount: integer('usage_count').default(0),
  rating: real('rating'),
  createdBy: text('created_by').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Settings table
export const settings = sqliteTable('settings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  key: text('key').notNull(),
  value: text('value').notNull(), // JSON string
  type: text('type').notNull(), // 'string', 'number', 'boolean', 'json'
  category: text('category'), // 'ui', 'notifications', 'billing', 'security'
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
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