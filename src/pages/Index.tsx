import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { FileText, BookOpen, MessageSquare, ClipboardList, BrainCircuit, Atom, Code } from "lucide-react";

const features = [
  {
    title: "Cours PDF",
    description: "Accédez aux cours sous forme de documents PDF organisés par classe et matière",
    icon: FileText,
    color: "bg-[#9b87f5]/20",
    url: "/courses/pdf"
  },
  {
    title: "Résumés",
    description: "Consultez des résumés concis et faciles à comprendre pour chaque cours",
    icon: BookOpen,
    color: "bg-[#7E69AB]/20",
    url: "/courses/summaries"
  },
  {
    title: "Questions-réponses",
    description: "Posez vos questions et recevez des réponses claires et pédagogiques",
    icon: MessageSquare,
    color: "bg-[#6E59A5]/20",
    url: "/courses/qa"
  },
  {
    title: "Sujets d'exercices",
    description: "Accédez aux exercices proposés pour chaque chapitre ou thème",
    icon: ClipboardList,
    color: "bg-[#9b87f5]/20",
    url: "/courses/exercises"
  }
];

const subjects = [
  {
    title: "Mathématiques",
    icon: BrainCircuit,
    description: "Algèbre, géométrie, analyse et plus encore",
    color: "bg-[#9b87f5]/20",
    url: "/courses/math",
  },
  {
    title: "Sciences Physiques",
    icon: Atom,
    description: "Mécanique, électricité, optique et chimie",
    color: "bg-[#7E69AB]/20",
    url: "/courses/physics",
  },
  {
    title: "Informatique",
    icon: Code,
    description: "Programmation, algorithmes et structures de données",
    color: "bg-[#6E59A5]/20",
    url: "/courses/info",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-16 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto py-16">
          <h1 className="text-6xl font-bold font-poppins gradient-text animate-float">
            Un apprentissage simplifié, pour un futur brillant
          </h1>
          <p className="text-2xl text-[#9b87f5]/80 font-roboto leading-relaxed">
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <a
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium text-lg shadow-lg shadow-[#9b87f5]/20"
            >
              Commencer maintenant gratuitement
            </a>
            <a
              href="/features"
              className="px-8 py-4 bg-[#9b87f5]/10 border border-[#9b87f5]/20 text-[#9b87f5] rounded-xl hover:scale-105 transition-all duration-300 font-medium text-lg backdrop-blur-sm"
            >
              Explorer les fonctionnalités
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.url}
              className="transform transition-all duration-300 hover:scale-[1.02] hover:rotate-1"
            >
              <Card className="p-8 h-full glass card-hover">
                <div className="space-y-6">
                  <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center transform transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                    <feature.icon className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h2 className="text-2xl font-semibold font-poppins text-[#9b87f5] group-hover:text-[#D6BCFA] transition-colors">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-[#9b87f5]/70 font-roboto leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* Subjects Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {subjects.map((subject) => (
            <a
              key={subject.title}
              href={subject.url}
              className="transform transition-all duration-300 hover:scale-[1.02] hover:rotate-1"
            >
              <Card className="p-8 h-full glass card-hover">
                <div className="space-y-6">
                  <div className={`${subject.color} w-16 h-16 rounded-xl flex items-center justify-center transform transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                    <subject.icon className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h2 className="text-2xl font-semibold font-poppins text-[#9b87f5] group-hover:text-[#D6BCFA] transition-colors">
                    {subject.title}
                  </h2>
                  <p className="text-lg text-[#9b87f5]/70 font-roboto leading-relaxed">
                    {subject.description}
                  </p>
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