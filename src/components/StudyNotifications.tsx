
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function StudyNotifications() {
  const { toast } = useToast();

  useEffect(() => {
    const checkUpcomingSessions = async () => {
      const now = new Date();
      const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

      const { data: sessions, error } = await supabase
        .from('study_schedules')
        .select('*')
        .gte('start_time', now.toISOString())
        .lte('start_time', fiveMinutesFromNow.toISOString())
        .eq('notification_enabled', true)
        .eq('email_sent', false);

      if (error) {
        console.error('Erreur lors de la vérification des sessions:', error);
        return;
      }

      for (const session of sessions || []) {
        // Demander la permission pour les notifications du navigateur
        if (Notification.permission === 'granted') {
          new Notification('Rappel de session d'étude', {
            body: `Votre session "${session.title}" commence dans 5 minutes !`,
            icon: '/favicon.ico'
          });
        }

        // Afficher aussi une notification dans l'interface
        toast({
          title: "Session d'étude à venir",
          description: `Votre session "${session.title}" commence dans 5 minutes !`,
          duration: 10000,
        });

        // Marquer la notification comme envoyée
        await supabase
          .from('study_schedules')
          .update({ email_sent: true })
          .eq('id', session.id);
      }
    };

    // Vérifier toutes les minutes
    const interval = setInterval(checkUpcomingSessions, 60000);
    checkUpcomingSessions(); // Vérifier immédiatement au montage

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Demander la permission pour les notifications du navigateur
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return null;
}
