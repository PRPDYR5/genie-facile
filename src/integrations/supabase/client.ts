
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://libyrenaizrhzbxiigjv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpYnlyZW5haXpyaHpieGlpZ2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NzE5MDIsImV4cCI6MjA1MDA0NzkwMn0.NrXGp74-CJakLtg7yLWAUENr1PrgzGomPa_wn0iNdCA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: {
      getItem: (key) => {
        try {
          const item = localStorage.getItem(key);
          if (!item) return null;
          return JSON.parse(item);
        } catch (error) {
          console.error('Error reading from localStorage:', error);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error('Error writing to localStorage:', error);
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error('Error removing from localStorage:', error);
        }
      }
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});

// Configurer un écouteur pour les changements d'état de session
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event);
  if (event === 'SIGNED_OUT') {
    // Nettoyer le stockage local
    localStorage.clear();
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed successfully');
  }
});

