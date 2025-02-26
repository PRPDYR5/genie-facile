
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
  const [audio] = useState(new Audio('/alarm.mp3'));
  const { toast } = useToast();

  useEffect(() => {
    audio.loop = true;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    const checkSessions = () => {
      const now = new Date();
      
      sessions.forEach(session => {
        const sessionTime = new Date(session.start_time);
        const timeDiff = Math.abs(now.getTime() - sessionTime.getTime());
        
        // Si on est dans la fenêtre de 5 minutes après le début de la session
        if (timeDiff < 300000 && !isPlaying) {
          setIsPlaying(true);
          setCurrentSession(session);
          audio.play();
          
          toast({
            title: "C'est l'heure de votre session d'étude !",
            description: `Il est temps de commencer : ${session.title}`,
            duration: 0, // La notification reste jusqu'à ce qu'on la ferme
          });
        }
      });
    };

    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkSessions, 30000);
    checkSessions(); // Vérifier immédiatement au montage

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
