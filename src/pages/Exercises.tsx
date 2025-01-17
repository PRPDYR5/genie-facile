import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ClipboardList, BookOpen, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Exercises = () => {
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

  const exercises = [
    {
      title: "Série d'exercices - Fonctions",
      description: "10 exercices sur les fonctions linéaires et affines",
      level: "Seconde",
      subject: "Mathématiques",
      difficulty: "Facile",
      type: "Exercices",
      isNew: true
    },
    {
      title: "Annales 2023 - Mathématiques",
      description: "Sujet complet avec corrigé détaillé",
      level: "Terminale",
      subject: "Mathématiques",
      difficulty: "Moyen",
      type: "Annales",
      isNew: true
    },
    {
      title: "Série d'exercices - Forces",
      description: "8 exercices sur les forces et le mouvement",
      level: "Seconde",
      subject: "Physique",
      difficulty: "Moyen",
      type: "Exercices"
    },
    {
      title: "Annales 2023 - Physique",
      description: "Sujet complet avec corrigé détaillé",
      level: "Terminale",
      subject: "Physique",
      difficulty: "Difficile",
      type: "Annales",
      isNew: true
    },
    {
      title: "Série d'exercices - Algorithmes",
      description: "5 exercices sur les structures de contrôle",
      level: "Seconde",
      subject: "Informatique",
      difficulty: "Difficile",
      type: "Exercices"
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    if (selectedLevel && exercise.level.toLowerCase() !== selectedLevel) return false;
    if (selectedSubject && exercise.subject !== subjects.find(s => s.value === selectedSubject)?.label) return false;
    return true;
  });

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Exercices & Annales</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Des exercices et annales pour vous entraîner et progresser
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

        <div className="grid gap-6">
          {filteredExercises.map((exercise, index) => (
            <Card key={index} className="p-6 glass card-hover">
              <div className="flex items-start gap-4">
                <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                  {exercise.type === "Annales" ? (
                    <BookOpen className="h-6 w-6 text-[#9b87f5]" />
                  ) : (
                    <ClipboardList className="h-6 w-6 text-[#9b87f5]" />
                  )}
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-[#9b87f5]">
                        {exercise.title}
                      </h3>
                      {exercise.isNew && (
                        <Badge variant="secondary" className="bg-[#9b87f5]/20 text-[#9b87f5]">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-[#9b87f5]/20 text-[#9b87f5]">
                        {exercise.type}
                      </Badge>
                      <Badge 
                        className={`
                          ${exercise.difficulty === 'Facile' ? 'bg-green-500/20 text-green-500' : 
                            exercise.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-500' : 
                            'bg-red-500/20 text-red-500'}
                        `}
                      >
                        {exercise.difficulty}
                      </Badge>
                    </div>
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