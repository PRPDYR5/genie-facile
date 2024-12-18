import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mounir01.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdW5pcjAxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MjI5NzAsImV4cCI6MjAyNTQ5ODk3MH0.4Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});