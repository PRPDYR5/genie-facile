import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AuthButtons } from "./AuthButtons";

interface HeroSectionProps {
  user: User | null;
}

export function HeroSection({ user }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#0f0f1a] min-h-screen section-padding">
      <div className="container mx-auto text-center space-y-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[#9b87f5] animate-fade-in">
          Un apprentissage simplifié,
          <br />
          pour un futur brillant
        </h1>
        
        <p className="text-lg md:text-xl text-[#9b87f5]/70 max-w-2xl mx-auto animate-fade-in">
          Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            onClick={() => navigate("/courses/summaries")}
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
          >
            Voir les résumés
          </Button>
          <Button 
            onClick={() => navigate("/courses/qa")}
            variant="outline"
            className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
          >
            Questions-réponses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div 
            onClick={() => navigate("/courses")}
            className="glass p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 animate-fade-in"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-[#9b87f5]/20 p-4 rounded-xl">
                <svg className="w-8 h-8 text-[#9b87f5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#9b87f5]">Accès aux cours</h3>
              <p className="text-[#9b87f5]/70 text-sm">
                Accédez à tous vos cours et documents
              </p>
            </div>
          </div>

          <div 
            onClick={() => navigate("/search")}
            className="glass p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 animate-fade-in"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-[#9b87f5]/20 p-4 rounded-xl">
                <svg className="w-8 h-8 text-[#9b87f5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#9b87f5]">Recherche avancée</h3>
              <p className="text-[#9b87f5]/70 text-sm">
                Recherchez des contenus spécifiques
              </p>
            </div>
          </div>

          <div 
            onClick={() => navigate("/settings")}
            className="glass p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 animate-fade-in"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-[#9b87f5]/20 p-4 rounded-xl">
                <svg className="w-8 h-8 text-[#9b87f5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#9b87f5]">Paramètres</h3>
              <p className="text-[#9b87f5]/70 text-sm">
                Personnalisez votre expérience
              </p>
            </div>
          </div>
        </div>

        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in">
            <AuthButtons />
          </div>
        )}
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"></div>
      </div>
    </div>
  );
}