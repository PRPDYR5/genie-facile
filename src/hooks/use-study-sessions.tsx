import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStudySessions = () => {
  return useQuery({
    queryKey: ["study-sessions"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("Aucun utilisateur connecté");
        return [];
      }

      console.log("Récupération des sessions pour l'utilisateur:", user.id);
      const { data, error } = await supabase
        .from('study_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Erreur lors de la récupération des sessions:', error);
        throw error;
      }

      console.log("Sessions récupérées:", data);
      return data || [];
    },
    staleTime: 30000, // Cache valide pendant 30 secondes
    refetchOnWindowFocus: false, // Désactive le rechargement automatique lors du focus
  });
};