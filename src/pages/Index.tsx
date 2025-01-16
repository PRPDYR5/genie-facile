import { Layout } from "@/components/Layout";
import { UserDashboard } from "@/components/UserDashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SocialLinks } from "@/components/SocialLinks";
import { StudyScheduler } from "@/components/StudyScheduler";
import { StudyScheduleList } from "@/components/StudyScheduleList";
import { SearchBar } from "@/components/SearchBar";
import { PoeChat } from "@/components/PoeChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Settings, Search, Dumbbell } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("Error checking auth status:", error);
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const quickAccessItems = [
    {
      title: "Résumés des cours",
      description: "Accédez à tous vos cours et documents",
      icon: BookOpen,
      route: "/courses/summaries"
    },
    {
      title: "Questions & Réponses",
      description: "Posez vos questions et obtenez des réponses",
      icon: MessageCircle,
      route: "/courses/qa"
    },
    {
      title: "Exercices",
      description: "Pratiquez avec des exercices adaptés",
      icon: Dumbbell,
      route: "/courses/exercises"
    },
    {
      title: "Recherche avancée",
      description: "Recherchez des contenus spécifiques",
      icon: Search,
      route: "/search"
    },
    {
      title: "Paramètres",
      description: "Personnalisez votre expérience",
      icon: Settings,
      route: "/settings"
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen space-y-12">
        <HeroSection user={user} />
        
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>

        {user ? (
          <div className="container mx-auto px-4 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {quickAccessItems.map((item) => (
                <Card 
                  key={item.title}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 glass hover:scale-105"
                  onClick={() => navigate(item.route)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold gradient-text">Planification des études</h2>
                <StudyScheduler />
                <StudyScheduleList />
              </div>
              
              <div className="space-y-8">
                <h2 className="text-2xl font-bold gradient-text">Assistant IA</h2>
                <PoeChat />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 glass p-8 rounded-2xl animate-fade-in container mx-auto">
            <h2 className="text-2xl font-bold gradient-text">
              Connectez-vous pour accéder à toutes les fonctionnalités
            </h2>
            <p className="text-muted-foreground mb-6">
              Créez un compte ou connectez-vous pour profiter de toutes les ressources disponibles.
            </p>
          </div>
        )}

        <SocialLinks />
        <Footer />
      </div>
    </Layout>
  );
}

export default Index;