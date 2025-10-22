// Temporary stub for Supabase client to prevent import errors
// This will be replaced with the new API client during frontend migration

console.warn('⚠️ Using Supabase stub - migration to new API client is incomplete');

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signUp: async () => ({ data: null, error: new Error('Supabase auth is not configured. Please implement authentication using your own solution.') }),
    signInWithPassword: async () => ({ data: null, error: new Error('Supabase auth is not configured. Please implement authentication using your own solution.') }),
    signOut: async () => ({ error: null }),
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: new Error(`Database query not implemented: ${table}. Use the new API client from src/lib/api-client.ts`) }),
      }),
      order: () => ({ data: [], error: null }),
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: new Error(`Database insert not implemented: ${table}. Use the new API client from src/lib/api-client.ts`) }),
      }),
    }),
    update: () => ({
      eq: async () => ({ error: new Error(`Database update not implemented: ${table}. Use the new API client from src/lib/api-client.ts`) }),
    }),
    delete: () => ({
      eq: async () => ({ error: new Error(`Database delete not implemented: ${table}. Use the new API client from src/lib/api-client.ts`) }),
    }),
  }),
};
