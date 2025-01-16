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
            <UserDashboard />
            
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