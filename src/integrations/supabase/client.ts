import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://libyrenaizrhzbxiigjv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpYnlyZW5haXpyaHpieGlpZ2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NzE5MDIsImV4cCI6MjA1MDA0NzkwMn0.NrXGp74-CJakLtg7yLWAUENr1PrgzGomPa_wn0iNdCA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});