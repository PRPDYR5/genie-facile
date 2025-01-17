import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Summaries = () => {
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

  const summaries = [
    {
      title: "Mathématiques - Chapitre 1",
      description: "Les fonctions et leurs propriétés",
      level: "Seconde",
      subject: "Mathématiques"
    },
    {
      title: "Physique - Chapitre 1",
      description: "Les forces et le mouvement",
      level: "Seconde",
      subject: "Sciences Physiques"
    },
    {
      title: "Informatique - Chapitre 1",
      description: "Introduction à l'algorithmique",
      level: "Seconde",
      subject: "Informatique"
    }
  ];

  const filteredSummaries = summaries.filter(summary => {
    if (selectedLevel && summary.level.toLowerCase() !== selectedLevel) return false;
    if (selectedSubject && summary.subject !== subjects.find(s => s.value === selectedSubject)?.label) return false;
    return true;
  });

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Résumés des cours</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Des résumés concis pour mieux comprendre chaque chapitre
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

        <div className="grid gap-6">
          {filteredSummaries.map((summary, index) => (
            <Card key={index} className="p-6 glass card-hover">
              <div className="flex items-start gap-4">
                <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-[#9b87f5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#9b87f5]">{summary.title}</h3>
                  <p className="text-[#9b87f5]/70">{summary.description}</p>
                  <div className="flex gap-4 text-sm text-[#9b87f5]/60">
                    <span>{summary.level}</span>
                    <span>•</span>
                    <span>{summary.subject}</span>
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

export default Summaries;