import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../shared/schema.js';

const sqlite = new Database('./buildmybot.db');
const db = drizzle(sqlite, { schema });

// This will create the tables
async function runMigrations() {
  try {
    console.log('Running migrations...');
    
    // Create tables manually since we're not using the migration files
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        name TEXT,
        business_name TEXT,
        industry TEXT,
        company_size TEXT,
        website TEXT,
        use_case TEXT,
        goals TEXT,
        phone TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER DEFAULT (strftime('%s', 'now')),
        last_login_at INTEGER,
        subscription_status TEXT DEFAULT 'free',
        stripe_customer_id TEXT,
        referral_code TEXT,
        referred_by TEXT
      );

      CREATE TABLE IF NOT EXISTS chatbots (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        template TEXT,
        status TEXT DEFAULT 'draft',
        config TEXT,
        knowledge_base TEXT,
        widget_settings TEXT,
        integrations TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER DEFAULT (strftime('%s', 'now')),
        last_used_at INTEGER,
        total_conversations INTEGER DEFAULT 0,
        monthly_conversations INTEGER DEFAULT 0,
        satisfaction_score REAL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        chatbot_id TEXT NOT NULL,
        session_id TEXT NOT NULL,
        visitor_id TEXT,
        visitor_info TEXT,
        status TEXT DEFAULT 'active',
        start_time INTEGER DEFAULT (strftime('%s', 'now')),
        end_time INTEGER,
        duration INTEGER,
        message_count INTEGER DEFAULT 0,
        satisfaction_rating INTEGER,
        feedback TEXT,
        escalated_to_human INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY (chatbot_id) REFERENCES chatbots (id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        message_type TEXT DEFAULT 'text',
        metadata TEXT,
        confidence REAL,
        response_time INTEGER,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY (conversation_id) REFERENCES conversations (id) ON DELETE CASCADE
      );
    `);
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

runMigrations();