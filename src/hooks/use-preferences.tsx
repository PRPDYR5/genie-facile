import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type UserPreferences = {
  theme: string;
  font_size: string;
  language: 'fr' | 'en';
  focus_mode: boolean;
}

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      console.log("Loading preferences from localStorage and Supabase...");
      
      // Charger d'abord depuis localStorage pour une application instantanée
      const theme = localStorage.getItem('theme') || 'light';
      const fontSize = localStorage.getItem('fontSize') || 'medium';
      const language = localStorage.getItem('language') || 'fr';
      const focusMode = localStorage.getItem('focusMode') === 'true';

      // Appliquer les préférences locales immédiatement
      applyPreferences({
        theme,
        font_size: fontSize,
        language: language as 'fr' | 'en',
        focus_mode: focusMode
      });

      // Ensuite, charger depuis Supabase pour la synchronisation
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error loading preferences from Supabase:', error);
          return;
        }

        if (data) {
          console.log("Preferences loaded from Supabase:", data);
          setPreferences(data);
          applyPreferences(data);
        }
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger vos préférences",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyPreferences = (prefs: UserPreferences) => {
    console.log("Applying preferences:", prefs);
    
    // Appliquer le thème
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(prefs.theme);
    localStorage.setItem('theme', prefs.theme);
    
    // Appliquer la taille de police
    const fontSize = getFontSize(prefs.font_size);
    document.documentElement.style.fontSize = fontSize;
    document.body.style.fontSize = fontSize;
    localStorage.setItem('fontSize', prefs.font_size);
    
    // Appliquer la langue
    document.documentElement.lang = prefs.language;
    localStorage.setItem('language', prefs.language);
    
    // Appliquer le mode focus
    if (prefs.focus_mode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    localStorage.setItem('focusMode', prefs.focus_mode.toString());
  };

  const getFontSize = (size: string): string => {
    switch (size) {
      case 'small':
        return '14px';
      case 'large':
        return '18px';
      default:
        return '16px';
    }
  };

  return {
    preferences,
    loading,
    loadPreferences,
    applyPreferences
  };
};