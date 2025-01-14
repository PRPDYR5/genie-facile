import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudySession {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  subject: string;
  level: string;
}

export const StudyScheduleList = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const { toast } = useToast();
  
  const fetchSessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('study_schedules')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      setSessions(data || []);
      
    } catch (error) {
      console.error('Error fetching study sessions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les sessions d'étude",
        variant: "destructive",
      });
    }
  };

  const deleteSession = async (id: string) => {
    try {
      const { error } = await supabase
        .from('study_schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Session supprimée avec succès",
      });

      fetchSessions();
    } catch (error) {
      console.error('Error deleting study session:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la session",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSessions();
    
    // Mise en place des notifications
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // Vérification des sessions toutes les minutes
    const interval = setInterval(() => {
      const now = new Date();
      sessions.forEach(session => {
        const startTime = new Date(session.start_time);
        const timeDiff = startTime.getTime() - now.getTime();
        
        // Notification 15 minutes avant
        if (timeDiff > 0 && timeDiff <= 15 * 60 * 1000) {
          if (Notification.permission === "granted") {
            new Notification("Rappel de session d'étude", {
              body: `Votre session "${session.title}" commence dans ${Math.round(timeDiff / 60000)} minutes`,
            });
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [sessions]);

  if (sessions.length === 0) {
    return (
      <Card className="mt-6 glass">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Aucune session d'étude planifiée
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 glass">
      <CardHeader>
        <CardTitle className="text-[#9b87f5]">Sessions planifiées</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id} className="p-4 glass">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-[#9b87f5]">{session.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(session.start_time), "d MMMM yyyy", { locale: fr })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(session.start_time), "HH:mm")} - {format(new Date(session.end_time), "HH:mm")}
                </p>
                <p className="text-sm mt-1">
                  {session.subject} - {session.level}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteSession(session.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};