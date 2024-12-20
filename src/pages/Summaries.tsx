import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Summaries = () => {
  const summaries = [
    {
      title: "Mathématiques - Chapitre 1",
      description: "Les fonctions et leurs propriétés",
      level: "Seconde"
    },
    {
      title: "Physique - Chapitre 1",
      description: "Les forces et le mouvement",
      level: "Seconde"
    },
    {
      title: "Informatique - Chapitre 1",
      description: "Introduction à l'algorithmique",
      level: "Seconde"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Résumés des cours</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Des résumés concis pour mieux comprendre chaque chapitre
          </p>
        </div>

        <div className="grid gap-6">
          {summaries.map((summary, index) => (
            <Card key={index} className="p-6 glass card-hover">
              <div className="flex items-start gap-4">
                <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-[#9b87f5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#9b87f5]">{summary.title}</h3>
                  <p className="text-[#9b87f5]/70">{summary.description}</p>
                  <span className="text-sm text-[#9b87f5]/60">{summary.level}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Summaries;