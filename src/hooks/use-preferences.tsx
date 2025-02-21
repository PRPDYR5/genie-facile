
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = 'user_preferences';

export type UserPreferences = {
  theme: string;
  font_size: string;
  language: 'fr' | 'en';
  focus_mode: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  font_size: 'medium',
  language: 'fr',
  focus_mode: false,
};

export const usePreferences = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loadLocalPreferences = (): UserPreferences => {
    try {
      console.log("Chargement des préférences locales...");
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const prefs = JSON.parse(stored);
        console.log("Préférences locales trouvées:", prefs);
        return prefs;
      }
      console.log("Aucune préférence locale trouvée, utilisation des valeurs par défaut");
      return defaultPreferences;
    } catch (error) {
      console.error('Erreur lors du chargement des préférences locales:', error);
      return defaultPreferences;
    }
  };

  const saveLocalPreferences = (prefs: UserPreferences) => {
    try {
      console.log("Sauvegarde des préférences locales:", prefs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      document.documentElement.setAttribute('data-theme', prefs.theme);
      applyPreferences(prefs);
      console.log("Préférences sauvegardées avec succès");
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  };

  const applyPreferences = (prefs: UserPreferences) => {
    console.log("Application des préférences:", prefs);
    
    // Application du thème avec attribut data-theme
    document.documentElement.setAttribute('data-theme', prefs.theme);
    if (prefs.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    
    // Taille de police
    const fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px'
    }[prefs.font_size] || '16px';
    document.documentElement.style.fontSize = fontSize;
    
    // Langue
    document.documentElement.lang = prefs.language;
    
    console.log("Préférences appliquées avec succès");
  };

  // Appliquer les préférences au chargement initial
  useEffect(() => {
    const savedPrefs = loadLocalPreferences();
    applyPreferences(savedPrefs);
  }, []);

  return {
    loadLocalPreferences,
    saveLocalPreferences,
    applyPreferences,
  };
};
