import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type UserPreferences = {
  theme: string;
  font_size: string;
  language: 'fr' | 'en';
  focus_mode: boolean;
}

const STORAGE_KEY = 'user-preferences';

export function usePreferences() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fonction pour charger les préférences depuis le localStorage
  const loadLocalPreferences = (): UserPreferences | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Erreur lors du chargement des préférences locales:', error);
      return null;
    }
  };

  // Fonction pour sauvegarder les préférences dans le localStorage
  const saveLocalPreferences = (prefs: UserPreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      console.log("Préférences sauvegardées localement:", prefs);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences locales:', error);
    }
  };

  // Charger les préférences depuis Supabase
  const { data: preferences, isLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      console.log("Chargement des préférences depuis Supabase...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("Aucun utilisateur trouvé, utilisation des préférences par défaut");
        return null;
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Erreur lors du chargement des préférences:', error);
        throw error;
      }

      console.log("Préférences chargées:", data);
      return data;
    },
    meta: {
      onSuccess: (data) => {
        if (data) {
          console.log("Application des préférences chargées");
          saveLocalPreferences(data);
          applyPreferences(data);
        }
      },
      onError: (error) => {
        console.error("Erreur lors du chargement des préférences:", error);
        const localPrefs = loadLocalPreferences();
        if (localPrefs) {
          applyPreferences(localPrefs);
        }
      }
    }
  });

  // Mutation pour mettre à jour les préférences
  const { mutate: updatePreferences } = useMutation({
    mutationFn: async (newPrefs: UserPreferences) => {
      console.log("Mise à jour des préférences:", newPrefs);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Utilisateur non authentifié");
      }

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...newPrefs,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return newPrefs;
    },
    meta: {
      onSuccess: (newPrefs) => {
        console.log("Préférences mises à jour avec succès");
        queryClient.setQueryData(['preferences'], newPrefs);
        saveLocalPreferences(newPrefs);
        applyPreferences(newPrefs);
        toast({
          title: "Paramètres sauvegardés",
          description: "Vos préférences ont été mises à jour avec succès.",
        });
      },
      onError: (error) => {
        console.error('Erreur lors de la sauvegarde des préférences:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de sauvegarder les paramètres",
        });
      }
    }
  });

  // Appliquer les préférences
  const applyPreferences = (prefs: UserPreferences) => {
    console.log("Application des préférences:", prefs);
    
    // Appliquer le thème
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(prefs.theme);
    
    // Appliquer la taille de police
    document.documentElement.style.fontSize = getFontSize(prefs.font_size);
    
    // Appliquer la langue
    document.documentElement.lang = prefs.language;
    
    // Appliquer le mode focus
    if (prefs.focus_mode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  };

  // Charger les préférences au démarrage
  useEffect(() => {
    const localPrefs = loadLocalPreferences();
    if (localPrefs) {
      console.log("Application des préférences locales au démarrage");
      applyPreferences(localPrefs);
    }
  }, []);

  const getFontSize = (size: string): string => {
    switch (size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  };

  return {
    preferences,
    isLoading,
    updatePreferences,
    applyPreferences
  };
}