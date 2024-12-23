import { Layout } from "@/components/Layout";
import { UserDashboard } from "@/components/UserDashboard";

const Index = () => {
  console.log("Rendering Index page");
  
  return (
    <Layout>
      <div className="space-y-8 sm:space-y-16 animate-fade-in px-2 sm:px-0">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-8 max-w-4xl mx-auto py-8 sm:py-16">
          <h1 className="text-3xl sm:text-6xl font-bold font-poppins gradient-text animate-float">
            Un apprentissage simplifié, pour un futur brillant
          </h1>
          <p className="text-lg sm:text-2xl text-[#9b87f5]/80 font-roboto leading-relaxed px-4">
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sm:pt-8 px-4">
            <a
              href="/courses/summaries"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium text-base sm:text-lg shadow-lg shadow-[#9b87f5]/20"
            >
              Voir les résumés
            </a>
            <a
              href="/courses/qa"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-[#9b87f5]/10 border border-[#9b87f5]/20 text-[#9b87f5] rounded-xl hover:scale-105 transition-all duration-300 font-medium text-base sm:text-lg backdrop-blur-sm"
            >
              Questions-réponses
            </a>
          </div>
        </div>

        {/* Search and Dashboard Section */}
        <div className="space-y-6 sm:space-y-8 px-2">
          <UserDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default Index;