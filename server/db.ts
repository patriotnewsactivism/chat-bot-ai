import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "../shared/schema.js";

// Use SQLite for local development
const sqlite = new Database('./buildmybot.db');
export const db = drizzle(sqlite, { schema });
