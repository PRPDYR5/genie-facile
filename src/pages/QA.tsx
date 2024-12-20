import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

const QA = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "Qu'est-ce qu'une fonction linéaire ?",
      answer: "Une fonction linéaire est une fonction de la forme f(x) = ax, où a est un nombre réel constant. Elle est représentée par une droite passant par l'origine du repère.",
      subject: "Mathématiques"
    },
    {
      question: "Quelle est la différence entre la vitesse et l'accélération ?",
      answer: "La vitesse est la variation de la position par rapport au temps, tandis que l'accélération est la variation de la vitesse par rapport au temps.",
      subject: "Physique"
    }
  ];

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setShowAnswer(false);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Questions-Réponses</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Testez vos connaissances et recevez des explications détaillées
          </p>
        </div>

        <Card className="p-8 glass">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <span className="text-sm text-[#9b87f5]/60">
                {questions[currentQuestion].subject}
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-[#9b87f5]">
              {questions[currentQuestion].question}
            </h2>

            {showAnswer ? (
              <p className="text-[#9b87f5]/80 bg-[#9b87f5]/10 p-4 rounded-lg">
                {questions[currentQuestion].answer}
              </p>
            ) : (
              <Button 
                onClick={() => setShowAnswer(true)}
                className="w-full"
              >
                Voir la réponse
              </Button>
            )}

            <Button 
              onClick={handleNextQuestion}
              variant="outline" 
              className="w-full mt-4"
            >
              Question suivante
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default QA;