import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calculator, 
  CircuitBoard, 
  Database,
  CheckCircle2,
  XCircle,
  RefreshCcw
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const mockExercises: Exercise[] = [
  {
    id: "1",
    question: "Quelle est la loi d'Ohm ?",
    options: [
      "U = R × I",
      "P = U × I",
      "E = m × c²",
      "F = m × a"
    ],
    correctAnswer: 0
  },
  {
    id: "2",
    question: "Dans un circuit série, comment se comporte l'intensité du courant ?",
    options: [
      "Elle varie selon les composants",
      "Elle est constante dans tout le circuit",
      "Elle diminue progressivement",
      "Elle augmente progressivement"
    ],
    correctAnswer: 1
  }
];

const Exercises = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const subjects = [
    {
      title: "Électricité",
      icon: CircuitBoard,
      description: "Lois fondamentales et circuits"
    },
    {
      title: "Électronique",
      icon: Database,
      description: "Composants et systèmes"
    },
    {
      title: "Mathématiques",
      icon: Calculator,
      description: "Calculs et formules"
    },
    {
      title: "Physique",
      icon: BookOpen,
      description: "Mécanique et énergétique"
    }
  ];

  const startExercise = () => {
    const randomExercise = mockExercises[Math.floor(Math.random() * mockExercises.length)];
    setCurrentExercise(randomExercise);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Attention",
        description: "Veuillez sélectionner une réponse",
        variant: "destructive",
      });
      return;
    }

    setShowResult(true);
    
    if (selectedAnswer === currentExercise?.correctAnswer) {
      toast({
        title: "Félicitations !",
        description: "C'est la bonne réponse !",
      });
    } else {
      toast({
        title: "Pas tout à fait...",
        description: "Essayez encore !",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Exercices</h1>

        {!currentExercise ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <Card 
                key={subject.title}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 glass"
                onClick={startExercise}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                      <subject.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{subject.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{subject.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-6">{currentExercise.question}</h2>
              
              <div className="space-y-4 mb-6">
                {currentExercise.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full justify-start text-left"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {showResult && index === currentExercise.correctAnswer && (
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentExercise.correctAnswer && (
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                    )}
                    {option}
                  </Button>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentExercise(null)}
                >
                  Retour
                </Button>
                {showResult ? (
                  <Button onClick={startExercise}>
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Suivant
                  </Button>
                ) : (
                  <Button onClick={checkAnswer}>
                    Vérifier
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Exercises;