
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
      'X-Client-Info': 'supabase-js-web',
    }
  }
});

// Vérifier l'état de la session au démarrage
supabase.auth.getSession().then(({ data: { session }}) => {
  if (session) {
    console.log('Session active détectée:', session.user.id);
  } else {
    console.log('Aucune session active');
  }
});

// Configurer un écouteur pour les changements d'état de session
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('Auth state changed:', event);
  
  if (event === 'SIGNED_OUT') {
    console.log('Déconnexion - nettoyage du stockage local');
    localStorage.clear();
  } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    if (session) {
      console.log('Nouvelle session ou token rafraîchi pour:', session.user.id);
      // Mettre à jour le token dans le stockage
      try {
        localStorage.setItem('supabase-auth-token', session.access_token);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du token:', error);
      }
    }
  }
});

