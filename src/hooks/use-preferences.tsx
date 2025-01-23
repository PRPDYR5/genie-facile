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

  const loadLocalPreferences = (): UserPreferences | null => {
    try {
      console.log("Chargement des préférences locales...");
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const prefs = JSON.parse(stored);
        console.log("Préférences locales trouvées:", prefs);
        return prefs;
      }
      console.log("Aucune préférence locale trouvée");
      return null;
    } catch (error) {
      console.error('Erreur lors du chargement des préférences locales:', error);
      return null;
    }
  };

  const saveLocalPreferences = (prefs: UserPreferences) => {
    try {
      console.log("Sauvegarde des préférences locales:", prefs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      console.log("Préférences sauvegardées avec succès dans le localStorage");
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences locales:', error);
    }
  };

  const applyPreferences = (prefs: UserPreferences) => {
    console.log("Application des préférences:", prefs);
    
    // Thème
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(prefs.theme);
    
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
        console.log("Aucun utilisateur trouvé, utilisation des préférences par défaut");
        return defaultPreferences;
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Erreur lors du chargement des préférences:', error);
        throw error;
      }

      if (data) {
        console.log("Préférences chargées depuis Supabase:", data);
        return data;
      }

      console.log("Création des préférences par défaut pour l'utilisateur");
      const { data: newPrefs, error: insertError } = await supabase
        .from('user_preferences')
        .insert([{ 
          user_id: user.id,
          ...defaultPreferences
        }])
        .select()
        .maybeSingle();

      if (insertError) {
        console.error('Erreur lors de la création des préférences par défaut:', insertError);
        throw insertError;
      }

      console.log("Préférences par défaut créées:", newPrefs);
      return newPrefs || defaultPreferences;
    },
    initialData: () => {
      const localPrefs = loadLocalPreferences();
      return localPrefs || defaultPreferences;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { mutate: updatePreferences } = useMutation({
    mutationFn: async (newPrefs: Partial<UserPreferences>) => {
      console.log("Mise à jour des préférences:", newPrefs);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Utilisateur non authentifié");
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .update({
          ...newPrefs,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .maybeSingle();

      if (error) {
        console.error('Erreur lors de la mise à jour des préférences:', error);
        throw error;
      }

      console.log("Préférences mises à jour dans Supabase:", data);
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        console.log("Mise à jour réussie, application des nouvelles préférences");
        queryClient.setQueryData(['preferences'], data);
        saveLocalPreferences(data);
        applyPreferences(data);
        toast({
          title: "Succès",
          description: "Vos préférences ont été mises à jour",
        });
      }
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

  // Appliquer les préférences au chargement
  useEffect(() => {
    const localPrefs = loadLocalPreferences();
    if (localPrefs) {
      console.log("Application des préférences locales au démarrage");
      applyPreferences(localPrefs);
    }
  }, []);

  // Appliquer les préférences quand elles sont chargées depuis Supabase
  useEffect(() => {
    if (preferences) {
      console.log("Nouvelles préférences reçues, application...");
      applyPreferences(preferences);
      saveLocalPreferences(preferences);
    }
  }, [preferences]);

  return {
    preferences,
    isLoading,
    updatePreferences,
  };
};