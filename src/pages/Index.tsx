import { Layout } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";
import { UserDashboard } from "@/components/UserDashboard";
import { Card } from "@/components/ui/card";
import { FileText, BookOpen, MessageSquare, ClipboardList, BrainCircuit, Atom, Code } from "lucide-react";

const features = [
  {
    title: "Cours PDF",
    description: "Accédez aux cours complets par niveau et matière",
    icon: FileText,
    color: "bg-[#9b87f5]/20",
    url: "/courses/pdf"
  },
  {
    title: "Résumés",
    description: "Consultez les résumés organisés par niveau et matière",
    icon: BookOpen,
    color: "bg-[#7E69AB]/20",
    url: "/courses/summaries"
  },
  {
    title: "Questions-réponses",
    description: "Posez vos questions et recevez des réponses claires",
    icon: MessageSquare,
    color: "bg-[#6E59A5]/20",
    url: "/courses/qa"
  },
  {
    title: "Exercices",
    description: "Pratiquez avec des exercices adaptés à votre niveau",
    icon: ClipboardList,
    color: "bg-[#9b87f5]/20",
    url: "/courses/exercises"
  }
];

const levels = [
  {
    title: "Seconde",
    subjects: [
      { name: "Mathématiques", icon: BrainCircuit, url: "/courses/pdf/seconde/math" },
      { name: "Sciences Physiques", icon: Atom, url: "/courses/pdf/seconde/physics" },
      { name: "Informatique", icon: Code, url: "/courses/pdf/seconde/info" }
    ]
  },
  {
    title: "Première",
    subjects: [
      { name: "Mathématiques", icon: BrainCircuit, url: "/courses/pdf/premiere/math" },
      { name: "Sciences Physiques", icon: Atom, url: "/courses/pdf/premiere/physics" },
      { name: "Informatique", icon: Code, url: "/courses/pdf/premiere/info" }
    ]
  },
  {
    title: "Terminale",
    subjects: [
      { name: "Mathématiques", icon: BrainCircuit, url: "/courses/pdf/terminale/math" },
      { name: "Sciences Physiques", icon: Atom, url: "/courses/pdf/terminale/physics" },
      { name: "Informatique", icon: Code, url: "/courses/pdf/terminale/info" }
    ]
  }
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
              href="/courses/pdf"
              className="px-8 py-4 bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium text-lg shadow-lg shadow-[#9b87f5]/20"
            >
              Accéder aux cours
            </a>
            <a
              href="/courses/summaries"
              className="px-8 py-4 bg-[#9b87f5]/10 border border-[#9b87f5]/20 text-[#9b87f5] rounded-xl hover:scale-105 transition-all duration-300 font-medium text-lg backdrop-blur-sm"
            >
              Voir les résumés
            </a>
          </div>
        </div>

        {/* Search and Dashboard Section */}
        <div className="space-y-8">
          <SearchBar />
          <UserDashboard />
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

        {/* Levels and Subjects Section */}
        <div className="space-y-12">
          <h2 className="text-4xl font-bold font-poppins gradient-text text-center">
            Parcourez nos cours par niveau
          </h2>
          <div className="grid gap-8">
            {levels.map((level) => (
              <div key={level.title} className="space-y-6">
                <h3 className="text-3xl font-semibold font-poppins text-[#9b87f5]">
                  {level.title}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {level.subjects.map((subject) => (
                    <a
                      key={subject.name}
                      href={subject.url}
                      className="transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Card className="p-6 glass card-hover">
                        <div className="flex items-center gap-4">
                          <div className="bg-[#9b87f5]/20 w-12 h-12 rounded-lg flex items-center justify-center">
                            <subject.icon className="h-6 w-6 text-[#9b87f5]" />
                          </div>
                          <span className="text-lg font-medium text-[#9b87f5]">
                            {subject.name}
                          </span>
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
