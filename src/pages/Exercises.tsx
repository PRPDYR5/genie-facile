import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

const Exercises = () => {
  const exercises = [
    {
      title: "Série d'exercices - Fonctions",
      description: "10 exercices sur les fonctions linéaires et affines",
      level: "Seconde",
      subject: "Mathématiques",
      difficulty: "Facile"
    },
    {
      title: "Série d'exercices - Forces",
      description: "8 exercices sur les forces et le mouvement",
      level: "Seconde",
      subject: "Physique",
      difficulty: "Moyen"
    },
    {
      title: "Série d'exercices - Algorithmes",
      description: "5 exercices sur les structures de contrôle",
      level: "Seconde",
      subject: "Informatique",
      difficulty: "Difficile"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Sujets d'exercices</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Des exercices adaptés pour mettre en pratique vos connaissances
          </p>
        </div>

        <div className="grid gap-6">
          {exercises.map((exercise, index) => (
            <Card key={index} className="p-6 glass card-hover">
              <div className="flex items-start gap-4">
                <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                  <ClipboardList className="h-6 w-6 text-[#9b87f5]" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-[#9b87f5]">{exercise.title}</h3>
                    <span className="text-sm px-3 py-1 rounded-full bg-[#9b87f5]/20 text-[#9b87f5]">
                      {exercise.difficulty}
                    </span>
                  </div>
                  <p className="text-[#9b87f5]/70">{exercise.description}</p>
                  <div className="flex gap-4 text-sm text-[#9b87f5]/60">
                    <span>{exercise.level}</span>
                    <span>•</span>
                    <span>{exercise.subject}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Exercises;