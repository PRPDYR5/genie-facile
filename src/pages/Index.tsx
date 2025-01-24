import { Layout } from "@/components/Layout";
import { UserDashboard } from "@/components/UserDashboard";
import { StudyScheduler } from "@/components/StudyScheduler";
import { StudyScheduleList } from "@/components/StudyScheduleList";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  console.log("Rendering Index page");
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="space-y-4 sm:space-y-16 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-8 max-w-4xl mx-auto py-4 sm:py-16 px-3 sm:px-6">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-6xl'} font-bold font-poppins gradient-text animate-float leading-tight`}>
            Un apprentissage simplifié, pour un futur brillant
          </h1>
          <p className={`${isMobile ? 'text-base px-1' : 'text-lg sm:text-2xl px-4'} text-[#9b87f5]/80 font-roboto leading-relaxed max-w-2xl mx-auto`}>
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 sm:pt-8">
            <a
              href="/courses/summaries"
              className={`${isMobile ? 'text-base px-4 py-3' : 'px-6 py-3 sm:px-8 sm:py-4'} bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium shadow-lg shadow-[#9b87f5]/20`}
            >
              Voir les résumés
            </a>
            <a
              href="/courses/qa"
              className={`${isMobile ? 'text-base px-4 py-3' : 'px-6 py-3 sm:px-8 sm:py-4'} bg-[#9b87f5]/10 border border-[#9b87f5]/20 text-[#9b87f5] rounded-xl hover:scale-105 transition-all duration-300 font-medium backdrop-blur-sm`}
            >
              Questions-réponses
            </a>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className={`space-y-6 ${isMobile ? 'px-2' : 'px-4'}`}>
          <UserDashboard />
          <StudyScheduler />
          <StudyScheduleList />
        </div>
      </div>
    </Layout>
  );
};

export default Index;