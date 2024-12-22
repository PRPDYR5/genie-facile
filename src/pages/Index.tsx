import { Layout } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";
import { UserDashboard } from "@/components/UserDashboard";
import { Card } from "@/components/ui/card";
import { BookOpen, MessageSquare, ClipboardList, BrainCircuit, Atom, Code } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    title: "Résumés",
    description: "Chaque cours dispose d'un résumé concis et facile à comprendre",
    icon: BookOpen,
    color: "bg-[#9b87f5]/20",
    url: "/courses/summaries"
  },
  {
    title: "Questions-réponses",
    description: "Testez vos connaissances avec des questions interactives",
    icon: MessageSquare,
    color: "bg-[#7E69AB]/20",
    url: "/courses/qa"
  },
  {
    title: "Sujets d'exercices",
    description: "Pratiquez avec des exercices adaptés pour chaque chapitre",
    icon: ClipboardList,
    color: "bg-[#6E59A5]/20",
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
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="space-y-8 sm:space-y-16 animate-fade-in px-2 sm:px-0">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-8 max-w-4xl mx-auto py-8 sm:py-16">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold font-poppins gradient-text animate-float`}>
            Un apprentissage simplifié, pour un futur brillant
          </h1>
          <p className={`${isMobile ? 'text-lg px-4' : 'text-2xl'} text-[#9b87f5]/80 font-roboto leading-relaxed`}>
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sm:pt-8 px-4">
            <a
              href="/courses/summaries"
              className={`px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium ${isMobile ? 'text-base' : 'text-lg'} shadow-lg shadow-[#9b87f5]/20`}
            >
              Voir les résumés
            </a>
            <a
              href="/courses/qa"
              className={`px-6 py-3 sm:px-8 sm:py-4 bg-[#9b87f5]/10 border border-[#9b87f5]/20 text-[#9b87f5] rounded-xl hover:scale-105 transition-all duration-300 font-medium ${isMobile ? 'text-base' : 'text-lg'} backdrop-blur-sm`}
            >
              Questions-réponses
            </a>
          </div>
        </div>

        {/* Search and Dashboard Section */}
        <div className="space-y-6 sm:space-y-8 px-2">
          <SearchBar />
          <UserDashboard />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-2">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.url}
              className="transform transition-all duration-300 hover:scale-[1.02] hover:rotate-1"
            >
              <Card className={`p-4 sm:p-8 h-full glass card-hover ${isMobile ? 'text-sm' : ''}`}>
                <div className="space-y-4 sm:space-y-6">
                  <div className={`${feature.color} w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transform transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                    <feature.icon className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-[#9b87f5]`} />
                  </div>
                  <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold font-poppins text-[#9b87f5] group-hover:text-[#D6BCFA] transition-colors`}>
                    {feature.title}
                  </h2>
                  <p className={`${isMobile ? 'text-base' : 'text-lg'} text-[#9b87f5]/70 font-roboto leading-relaxed`}>
                    {feature.description}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* Levels and Subjects Section */}
        <div className="space-y-8 sm:space-y-12 px-2">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold font-poppins gradient-text text-center`}>
            Parcourez nos cours par niveau
          </h2>
          <div className="grid gap-6 sm:gap-8">
            {levels.map((level) => (
              <div key={level.title} className="space-y-4 sm:space-y-6">
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-semibold font-poppins text-[#9b87f5]`}>
                  {level.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {level.subjects.map((subject) => (
                    <a
                      key={subject.name}
                      href={subject.url}
                      className="transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Card className={`p-4 sm:p-6 glass card-hover ${isMobile ? 'text-sm' : ''}`}>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="bg-[#9b87f5]/20 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
                            <subject.icon className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-[#9b87f5]`} />
                          </div>
                          <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-[#9b87f5]`}>
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