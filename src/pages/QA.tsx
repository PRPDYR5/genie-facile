import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const QA = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

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

  const questions = [
    {
      question: "Qu'est-ce qu'une fonction linéaire ?",
      answer: "Une fonction linéaire est une fonction de la forme f(x) = ax, où a est un nombre réel constant. Elle est représentée par une droite passant par l'origine du repère.",
      subject: "Mathématiques",
      level: "Seconde"
    },
    {
      question: "Quelle est la différence entre la vitesse et l'accélération ?",
      answer: "La vitesse est la variation de la position par rapport au temps, tandis que l'accélération est la variation de la vitesse par rapport au temps.",
      subject: "Sciences Physiques",
      level: "Seconde"
    }
  ];

  const filteredQuestions = questions.filter(q => {
    if (selectedLevel && q.level.toLowerCase() !== selectedLevel) return false;
    if (selectedSubject && q.subject !== subjects.find(s => s.value === selectedSubject)?.label) return false;
    return true;
  });

  const handleNextQuestion = () => {
    if (filteredQuestions.length > 0) {
      setCurrentQuestion((prev) => (prev + 1) % filteredQuestions.length);
      setShowAnswer(false);
    }
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

        <div className="grid grid-cols-2 gap-4">
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

        {filteredQuestions.length > 0 ? (
          <Card className="p-8 glass">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-[#9b87f5]" />
                </div>
                <div className="flex gap-4 text-sm text-[#9b87f5]/60">
                  <span>{filteredQuestions[currentQuestion].level}</span>
                  <span>•</span>
                  <span>{filteredQuestions[currentQuestion].subject}</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-[#9b87f5]">
                {filteredQuestions[currentQuestion].question}
              </h2>

              {showAnswer ? (
                <p className="text-[#9b87f5]/80 bg-[#9b87f5]/10 p-4 rounded-lg">
                  {filteredQuestions[currentQuestion].answer}
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
        ) : (
          <Card className="p-8 glass text-center">
            <p className="text-[#9b87f5]">
              Aucune question disponible pour les critères sélectionnés
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default QA;