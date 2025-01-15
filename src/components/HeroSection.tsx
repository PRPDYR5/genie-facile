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
    <div className="relative bg-gradient-to-b from-background to-primary/5 section-padding">
      <div className="container mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text animate-fade-in">
          Un apprentissage simplifié, pour un futur brillant
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          Génie Facile est votre professeur virtuel, prêt à vous accompagner dans vos études techniques de la série F3
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in">
          {!user && <AuthButtons />}
        </div>

        <div className="mt-12 glass p-8 rounded-2xl max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 gradient-text">
            Rejoignez notre communauté d'apprentissage
          </h2>
          <p className="text-muted-foreground mb-8">
            Accédez à des ressources exclusives, participez à des discussions enrichissantes et progressez avec d'autres étudiants.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"></div>
      </div>
    </div>
  );
}