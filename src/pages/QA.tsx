import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const QA = () => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [qaHistory, setQaHistory] = useState<any[]>([]);
  const { toast } = useToast();

  const levels = [
    { value: "seconde", label: "Seconde" },
    { value: "premiere", label: "Première" },
    { value: "terminale", label: "Terminale" }
  ];

  const subjects = [
    { value: "math", label: "Mathématiques" },
    { value: "physics", label: "Sciences Physiques" },
    { value: "info", label: "Informatique" }
  ];

  // Charger l'historique des questions-réponses
  const loadQAHistory = async () => {
    try {
      console.log("Chargement de l'historique Q&A...");
      let query = supabase.from('qa_history').select('*');
      
      if (selectedLevel) {
        query = query.eq('level', selectedLevel);
      }
      if (selectedSubject) {
        query = query.eq('subject', selectedSubject);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log("Historique Q&A chargé:", data);
      setQaHistory(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger l'historique des questions"
      });
    }
  };

  useEffect(() => {
    loadQAHistory();
  }, [selectedLevel, selectedSubject]);

  const handleAskQuestion = async () => {
    if (!userQuestion.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez entrer une question"
      });
      return;
    }

    if (!selectedLevel || !selectedSubject) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner un niveau et une matière"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Envoi de la question:", userQuestion);
      
      // Simuler une réponse pour l'instant (à remplacer par l'appel à l'API Perplexity)
      const answer = "Cette fonctionnalité sera bientôt disponible avec l'intégration de Perplexity AI.";
      
      // Sauvegarder dans l'historique
      const { error } = await supabase.from('qa_history').insert({
        question: userQuestion,
        answer: answer,
        level: selectedLevel,
        subject: selectedSubject,
        pdf_source: "À implémenter" // À remplacer par la vraie source
      });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Votre question a été enregistrée"
      });

      setUserQuestion("");
      loadQAHistory();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la question:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer votre question"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Questions-Réponses</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Posez vos questions et obtenez des réponses personnalisées
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#9b87f5]">Niveau</label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
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

          <div className="space-y-2">
            <label className="text-sm text-[#9b87f5]">Matière</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
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
        </div>

        <Card className="p-6 glass">
          <div className="space-y-4">
            <Textarea
              placeholder="Posez votre question ici..."
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleAskQuestion}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer la question
                </>
              )}
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#9b87f5]">
            Historique des questions
          </h2>
          
          {qaHistory.length > 0 ? (
            qaHistory.map((qa) => (
              <Card key={qa.id} className="p-6 glass space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div className="flex gap-4 text-sm text-[#9b87f5]/60">
                    <span>{qa.level}</span>
                    <span>•</span>
                    <span>{qa.subject}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#9b87f5] mb-2">
                    {qa.question}
                  </h3>
                  <p className="text-[#9b87f5]/80 bg-[#9b87f5]/10 p-4 rounded-lg">
                    {qa.answer}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6 glass text-center">
              <p className="text-[#9b87f5]">
                {selectedLevel && selectedSubject
                  ? "Aucune question disponible pour les critères sélectionnés"
                  : "Sélectionnez un niveau et une matière pour voir l'historique des questions"}
              </p>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QA;