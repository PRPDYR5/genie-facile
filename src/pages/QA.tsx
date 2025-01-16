import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface QAItem {
  id: string;
  question: string;
  answer: string;
  created_at: string;
}

const QA = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [qaHistory, setQaHistory] = useState<QAItem[]>([]);
  const { toast } = useToast();

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      setLoading(true);
      
      // Ici, nous simulerons une réponse pour l'exemple
      // Dans une vraie application, vous appelleriez une API ou un service d'IA
      const answer = "Voici une réponse simulée à votre question. Dans une vraie application, cette réponse serait générée par une IA ou fournie par un enseignant.";
      
      const { data, error } = await supabase
        .from('qa_history')
        .insert([
          {
            question: question.trim(),
            answer,
            subject: 'general',
            level: 'all'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setQaHistory([data, ...qaHistory]);
      setQuestion("");
      
      toast({
        title: "Question envoyée",
        description: "Votre question a été traitée avec succès",
      });
    } catch (error) {
      console.error('Error submitting question:', error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter votre question",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Questions & Réponses</h1>
        
        <Card className="mb-8 glass">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmitQuestion} className="flex gap-4">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !question.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Envoyer
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {qaHistory.length === 0 ? (
            <Card className="glass">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageCircle className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Aucune question pour le moment
                </p>
              </CardContent>
            </Card>
          ) : (
            qaHistory.map((item) => (
              <Card key={item.id} className="glass">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Q: {item.question}</h3>
                    <p className="text-muted-foreground">R: {item.answer}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QA;