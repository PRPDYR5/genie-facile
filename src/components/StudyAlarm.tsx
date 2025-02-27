
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellOff } from "lucide-react";

interface StudyAlarmProps {
  sessions: Array<{
    id: string;
    title: string;
    start_time: string;
  }>;
}

export const StudyAlarm = ({ sessions }: StudyAlarmProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSession, setCurrentSession] = useState<{id: string; title: string} | null>(null);
  const [audio] = useState(() => {
    const audio = new Audio('/alarm.mp3');
    audio.loop = true; // Ensure the audio loops
    return audio;
  });
  const { toast } = useToast();

  // Cleanup effect pour l'audio
  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  // Effet pour vérifier les sessions
  useEffect(() => {
    const checkSessions = () => {
      const now = new Date();
      console.log("Vérification des sessions à:", now.toISOString());
      
      sessions.forEach(session => {
        const sessionTime = new Date(session.start_time);
        console.log("Session:", session.title, "heure de début:", sessionTime.toISOString());
        
        // Calcul de la différence de temps en millisecondes
        const timeDiff = sessionTime.getTime() - now.getTime();
        console.log("Différence de temps pour", session.title, ":", timeDiff, "ms");
        
        // Déclenchement si l'heure de la session est soit:
        // 1. Dans le passé mais moins de 5 minutes (300000 ms)
        // 2. Dans moins d'une minute dans le futur
        if ((timeDiff <= 0 && timeDiff > -300000) || (timeDiff > 0 && timeDiff < 60000)) {
          console.log("Condition de déclenchement remplie pour", session.title);
          
          if (!isPlaying) {
            console.log("Déclenchement de l'alarme pour", session.title);
            setIsPlaying(true);
            setCurrentSession(session);
            
            // Essayer de jouer l'audio avec gestion d'erreur
            try {
              audio.play().catch(error => {
                console.error('Erreur lors de la lecture de l\'audio:', error);
              });
            } catch (error) {
              console.error('Erreur lors de la lecture de l\'audio:', error);
            }
            
            toast({
              title: "C'est l'heure de votre session d'étude !",
              description: `Il est temps de commencer : ${session.title}`,
              duration: 0,
            });
          }
        }
      });
    };

    // Vérifier plus fréquemment (toutes les 10 secondes)
    const interval = setInterval(checkSessions, 10000);
    checkSessions(); // Vérification immédiate

    return () => {
      clearInterval(interval);
    };
  }, [sessions, audio, isPlaying, toast]);

  const stopAlarm = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentSession(null);
  };

  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-[#9b87f5] text-white p-4 rounded-lg shadow-lg flex items-center gap-4">
        <div className="flex-1">
          <p className="font-bold">Session en cours</p>
          <p className="text-sm">{currentSession?.title}</p>
        </div>
        <Button 
          variant="secondary"
          size="icon"
          onClick={stopAlarm}
          className="bg-white text-[#9b87f5] hover:bg-white/90"
        >
          {isPlaying ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};
