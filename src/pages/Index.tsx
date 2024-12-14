import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { FileText, BookOpen, MessageSquare, ClipboardList, BrainCircuit, Atom, Code } from "lucide-react";

const features = [
  {
    title: "Cours PDF",
    description: "Accédez aux cours sous forme de documents PDF organisés par classe et matière",
    icon: FileText,
    color: "bg-blue-500/80",
    url: "/courses/pdf"
  },
  {
    title: "Résumés",
    description: "Consultez des résumés concis et faciles à comprendre pour chaque cours",
    icon: BookOpen,
    color: "bg-blue-400/80",
    url: "/courses/summaries"
  },
  {
    title: "Questions-réponses",
    description: "Posez vos questions et recevez des réponses claires et pédagogiques",
    icon: MessageSquare,
    color: "bg-blue-300/80",
    url: "/courses/qa"
  },
  {
    title: "Sujets d'exercices",
    description: "Accédez aux exercices proposés pour chaque chapitre ou thème",
    icon: ClipboardList,
    color: "bg-blue-200/80",
    url: "/courses/exercises"
  }
];

const subjects = [
  {
    title: "Mathématiques",
    icon: BrainCircuit,
    description: "Algèbre, géométrie, analyse et plus encore",
    color: "bg-blue-500/80",
    url: "/courses/math",
  },
  {
    title: "Sciences Physiques",
    icon: Atom,
    description: "Mécanique, électricité, optique et chimie",
    color: "bg-blue-400/80",
    url: "/courses/physics",
  },
  {
    title: "Informatique",
    icon: Code,
    description: "Programmation, algorithmes et structures de données",
    color: "bg-blue-300/80",
    url: "/courses/info",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-16 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto py-16">
          <h1 className="text-6xl font-bold font-poppins bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-float">
            Un apprentissage simplifié, pour un futur brillant
          </h1>
          <p className="text-2xl text-muted-foreground font-roboto leading-relaxed">
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
          </p>
          <div className="flex gap-6 justify-center pt-8">
            <a
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium text-lg shadow-lg shadow-orange-500/20"
            >
              Commencer maintenant gratuitement
            </a>
            <a
              href="/features"
              className="px-8 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-500 rounded-xl hover:scale-105 transition-all duration-300 font-medium text-lg backdrop-blur-sm"
            >
              Explorer les fonctionnalités
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <a
              key={feature.title}
              href={feature.url}
              className="transform transition-all duration-300 hover:scale-[1.02] hover:rotate-1"
            >
              <Card className={`p-8 h-full bg-gradient-to-br from-white/10 to-white/5 border-blue-200/20 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 group`}>
                <div className="space-y-6">
                  <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center transform transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold font-poppins text-blue-50 group-hover:text-blue-200 transition-colors">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-300/90 font-roboto leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* Subjects Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {subjects.map((subject, index) => (
            <a
              key={subject.title}
              href={subject.url}
              className="transform transition-all duration-300 hover:scale-[1.02] hover:rotate-1"
            >
              <Card className={`p-8 h-full bg-gradient-to-br from-white/10 to-white/5 border-blue-200/20 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 group`}>
                <div className="space-y-6">
                  <div className={`${subject.color} w-16 h-16 rounded-xl flex items-center justify-center transform transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                    <subject.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold font-poppins text-blue-50 group-hover:text-blue-200 transition-colors">
                    {subject.title}
                  </h2>
                  <p className="text-lg text-gray-300/90 font-roboto leading-relaxed">
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