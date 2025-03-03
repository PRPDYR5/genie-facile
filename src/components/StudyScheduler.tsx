import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { StudyAlarm } from "./StudyAlarm";

export const StudyScheduler = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [emailNotification, setEmailNotification] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const { toast } = useToast();

  const subjects = [
    { value: "math", label: "Mathématiques" },
    { value: "physics", label: "Sciences Physiques" },
    { value: "info", label: "Informatique" }
  ];

  const levels = [
    { value: "seconde", label: "Seconde" },
    { value: "premiere", label: "Première" },
    { value: "terminale", label: "Terminale" }
  ];

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('study_schedules')
        .select('*')
        .eq('user_id', user.id)
        .gte('start_time', new Date().toISOString());

      if (error) throw error;
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour planifier des cours",
          variant: "destructive",
        });
        return;
      }

      if (!selectedDate || !startTime || !endTime) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs",
          variant: "destructive",
        });
        return;
      }

      const startDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(startTime.split(":")[0]),
        parseInt(startTime.split(":")[1])
      );

      const endDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(endTime.split(":")[0]),
        parseInt(endTime.split(":")[1])
      );

      const { data: sessionData, error: sessionError } = await supabase
        .from('study_schedules')
        .insert({
          user_id: user.id,
          title,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          subject,
          level,
          notification_enabled: emailNotification,
          email_sent: false
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      toast({
        title: "Succès",
        description: `Session planifiée avec ${emailNotification ? 'notification email' : 'sans notification'}`,
      });

      // Reset form
      setTitle("");
      setSubject("");
      setLevel("");
      setStartTime("");
      setEndTime("");
      setSelectedDate(new Date());
      
      // Rafraîchir la liste des sessions
      fetchSessions();
      
    } catch (error) {
      console.error('Error scheduling study session:', error);
      toast({
        title: "Erreur",
        description: "Impossible de planifier la session d'étude",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="w-full glass">
        <CardHeader>
          <CardTitle className="text-[#9b87f5]">Planifier une session d'étude</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Révision des fonctions"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Matière</Label>
                <Select value={subject} onValueChange={setSubject} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Niveau</Label>
                <Select value={level} onValueChange={setLevel} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={fr}
                className="rounded-md border"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Heure de début</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Heure de fin</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="email-notifications"
                checked={emailNotification}
                onCheckedChange={setEmailNotification}
              />
              <Label htmlFor="email-notifications">Activer les rappels par email</Label>
            </div>

            <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]">
              Planifier la session
            </Button>
          </form>
        </CardContent>
      </Card>
      <StudyAlarm sessions={sessions} />
    </>
  );
};
