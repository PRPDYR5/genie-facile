
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
      
      sessions.forEach(session => {
        const sessionTime = new Date(session.start_time);
        const timeDiff = Math.abs(now.getTime() - sessionTime.getTime());
        
        if (timeDiff < 300000 && !isPlaying) { // 5 minutes
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
      });
    };

    const interval = setInterval(checkSessions, 30000); // Vérifier toutes les 30 secondes
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
