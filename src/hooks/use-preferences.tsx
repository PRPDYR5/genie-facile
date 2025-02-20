
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
      localStorage.setItem('theme', prefs.theme);
      applyPreferences(prefs);
      console.log("Préférences sauvegardées avec succès");
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  };

  const applyPreferences = (prefs: UserPreferences) => {
    console.log("Application des préférences:", prefs);
    
    // Application du thème
    if (prefs.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
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
    
    // Mode focus
    if (prefs.focus_mode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    
    console.log("Préférences appliquées avec succès");
  };

  const { data: preferences, isLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      console.log("Chargement des préférences depuis Supabase...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        const localPrefs = loadLocalPreferences();
        console.log("Aucun utilisateur connecté, utilisation des préférences locales:", localPrefs);
        return localPrefs;
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Erreur lors du chargement des préférences:', error);
        return loadLocalPreferences();
      }

      if (data) {
        console.log("Préférences chargées depuis Supabase:", data);
        saveLocalPreferences(data);
        return data;
      }

      const localPrefs = loadLocalPreferences();
      if (user) {
        const { error: insertError } = await supabase
          .from('user_preferences')
          .insert([{ 
            user_id: user.id,
            ...localPrefs
          }]);

        if (insertError) {
          console.error('Erreur lors de la création des préférences:', insertError);
        }
      }
      
      return localPrefs;
    },
  });

  const { mutate: updatePreferences } = useMutation({
    mutationFn: async (newPrefs: Partial<UserPreferences>) => {
      console.log("Mise à jour des préférences:", newPrefs);
      const { data: { user } } = await supabase.auth.getUser();
      
      const updatedPrefs = { ...preferences, ...newPrefs };
      saveLocalPreferences(updatedPrefs);

      if (!user) {
        return updatedPrefs;
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .update(newPrefs)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la mise à jour des préférences:', error);
        throw error;
      }

      return data || updatedPrefs;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['preferences'], data);
      applyPreferences(data);
      toast({
        title: "Succès",
        description: "Vos préférences ont été mises à jour",
      });
    },
    onError: (error) => {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les préférences",
      });
    }
  });

  // Appliquer les préférences au chargement initial
  useEffect(() => {
    if (preferences) {
      console.log("Nouvelles préférences reçues, application...");
      applyPreferences(preferences);
    }
  }, [preferences]);

  return {
    preferences,
    isLoading,
    updatePreferences,
  };
};
