import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  user: User | null;
}

export function HeroSection({ user }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b from-background to-primary/5 section-padding">
      <div className="container mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text animate-fade-in">
          Un apprentissage simplifié, pour un futur brillant
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in">
          {!user && (
            <>
              <Button
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                Commencer maintenant
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/auth")}
                className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
              >
                En savoir plus
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}