import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AuthButtons } from "./AuthButtons";
import { SearchBar } from "./SearchBar";
import { UserDashboard } from "./UserDashboard";

interface HeroSectionProps {
  user: User | null;
}

export function HeroSection({ user }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0f0f1a] section-padding overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/80 via-transparent to-[#0f0f1a]/80"></div>
        </div>
      </div>

      <div className="container mx-auto space-y-12">
        {/* Hero Content */}
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#6E59A5]">
            Un apprentissage simplifié,
            <br />
            pour un futur brillant
          </h1>
          
          <p className="text-lg md:text-xl text-[#9b87f5]/70 max-w-2xl mx-auto">
            Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/courses/summaries")}
              className="bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] hover:opacity-90 text-[#1a1a2e] px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Voir les résumés
            </Button>
            <Button 
              onClick={() => navigate("/courses/qa")}
              variant="outline"
              className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Questions-réponses
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto pt-8 animate-fade-in delay-200">
            <SearchBar />
          </div>
        </div>

        {/* Quick Access Dashboard */}
        <div className="pt-12 animate-fade-in delay-300">
          <UserDashboard />
        </div>

        {/* Auth Buttons for non-authenticated users */}
        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in delay-400">
            <AuthButtons />
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[#9b87f5]/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-[#6E59A5]/10 rounded-full filter blur-3xl animate-pulse"></div>
    </div>
  );
}