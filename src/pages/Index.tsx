import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { FileText, BookOpen, MessageSquare, ClipboardList, BrainCircuit, Atom, Code } from "lucide-react";

const features = [
  {
    title: "Cours PDF",
    description: "Accédez aux cours sous forme de documents PDF organisés par classe et matière",
    icon: FileText,
    color: "bg-purple-600",
    url: "/courses/pdf"
  },
  {
    title: "Résumés",
    description: "Consultez des résumés concis et faciles à comprendre pour chaque cours",
    icon: BookOpen,
    color: "bg-purple-500",
    url: "/courses/summaries"
  },
  {
    title: "Questions-réponses",
    description: "Posez vos questions et recevez des réponses claires et pédagogiques",
    icon: MessageSquare,
    color: "bg-purple-400",
    url: "/courses/qa"
  },
  {
    title: "Sujets d'exercices",
    description: "Accédez aux exercices proposés pour chaque chapitre ou thème",
    icon: ClipboardList,
    color: "bg-purple-300",
    url: "/courses/exercises"
  }
];

const subjects = [
  {
    title: "Mathématiques",
    icon: BrainCircuit,
    description: "Algèbre, géométrie, analyse et plus encore",
    color: "bg-purple-600",
    url: "/courses/math",
  },
  {
    title: "Sciences Physiques",
    icon: Atom,
    description: "Mécanique, électricité, optique et chimie",
    color: "bg-purple-500",
    url: "/courses/physics",
  },
  {
    title: "Informatique",
    icon: Code,
    description: "Programmation, algorithmes et structures de données",
    color: "bg-purple-400",
    url: "/courses/info",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-12 animate-fade-in">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Un apprentissage simplifié, pour un futur brillant
          </h1>
          <p className="text-xl text-muted-foreground">
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/signup"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Commencer maintenant gratuitement
            </a>
            <a
              href="/features"
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600/10 transition-colors"
            >
              Explorer les fonctionnalités
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.url}
              className="transform transition-all hover:scale-105"
            >
              <Card className="p-6 h-full bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{feature.title}</h2>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <a
              key={subject.title}
              href={subject.url}
              className="transform transition-all hover:scale-105"
            >
              <Card className="p-6 h-full bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className={`${subject.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <subject.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{subject.title}</h2>
                  <p className="text-gray-300">{subject.description}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;