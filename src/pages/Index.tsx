import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { FileText, BookOpen, MessageSquare, ClipboardList, BrainCircuit, Atom, Code } from "lucide-react";

const features = [
  {
    title: "Cours PDF",
    description: "Accédez aux cours sous forme de documents PDF organisés par classe et matière",
    icon: FileText,
    color: "bg-blue-500",
    url: "/courses/pdf"
  },
  {
    title: "Résumés",
    description: "Consultez des résumés concis et faciles à comprendre pour chaque cours",
    icon: BookOpen,
    color: "bg-blue-400",
    url: "/courses/summaries"
  },
  {
    title: "Questions-réponses",
    description: "Posez vos questions et recevez des réponses claires et pédagogiques",
    icon: MessageSquare,
    color: "bg-blue-300",
    url: "/courses/qa"
  },
  {
    title: "Sujets d'exercices",
    description: "Accédez aux exercices proposés pour chaque chapitre ou thème",
    icon: ClipboardList,
    color: "bg-blue-200",
    url: "/courses/exercises"
  }
];

const subjects = [
  {
    title: "Mathématiques",
    icon: BrainCircuit,
    description: "Algèbre, géométrie, analyse et plus encore",
    color: "bg-blue-500",
    url: "/courses/math",
  },
  {
    title: "Sciences Physiques",
    icon: Atom,
    description: "Mécanique, électricité, optique et chimie",
    color: "bg-blue-400",
    url: "/courses/physics",
  },
  {
    title: "Informatique",
    icon: Code,
    description: "Programmation, algorithmes et structures de données",
    color: "bg-blue-300",
    url: "/courses/info",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-12 animate-fade-in">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold font-poppins bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Un apprentissage simplifié, pour un futur brillant
          </h1>
          <p className="text-xl text-muted-foreground font-roboto">
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/signup"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 font-medium"
            >
              Commencer maintenant gratuitement
            </a>
            <a
              href="/features"
              className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/10 transition-all transform hover:scale-105 font-medium"
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
              className="transform transition-all hover:scale-105 hover:rotate-1"
            >
              <Card className="p-6 h-full bg-gradient-to-br from-white/10 to-white/5 border-blue-200/20 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20">
                <div className="space-y-4">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center transform transition-transform hover:rotate-6`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold font-poppins text-blue-50">{feature.title}</h2>
                  <p className="text-gray-300 font-roboto">{feature.description}</p>
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
              className="transform transition-all hover:scale-105 hover:rotate-1"
            >
              <Card className="p-6 h-full bg-gradient-to-br from-white/10 to-white/5 border-blue-200/20 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20">
                <div className="space-y-4">
                  <div className={`${subject.color} w-12 h-12 rounded-lg flex items-center justify-center transform transition-transform hover:rotate-6`}>
                    <subject.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold font-poppins text-blue-50">{subject.title}</h2>
                  <p className="text-gray-300 font-roboto">{subject.description}</p>
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