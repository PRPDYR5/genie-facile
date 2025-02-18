
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type StudySession = Database['public']['Tables']['study_schedules']['Row'];

export const StudyScheduleList = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchSessions = async () => {
    try {
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("Aucun utilisateur connecté");
        setIsLoading(false);
        return;
      }

      // Vérifier d'abord que nous avons bien une session active
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Session expirée");
      }

      console.log("Récupération des sessions pour l'utilisateur:", user.id);
      const { data, error } = await supabase
        .from('study_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Erreur Supabase:', error);
        throw error;
      }

      console.log("Sessions récupérées:", data);
      setSessions(data || []);
      
    } catch (error: any) {
      console.error('Erreur lors de la récupération des sessions:', error);
      setError(error.message || "Une erreur est survenue");
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les sessions d'étude",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
    } catch (error: any) {
      console.error('Erreur lors de la suppression de la session:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer la session",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (isLoading) {
    return (
      <Card className="mt-6 glass">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Chargement des sessions...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6 glass">
        <CardContent className="pt-6">
          <p className="text-center text-red-500">
            {error}
          </p>
          <Button 
            onClick={fetchSessions}
            className="mt-4 mx-auto block"
          >
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

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
