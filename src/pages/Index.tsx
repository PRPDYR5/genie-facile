import { Layout } from "@/components/Layout";
import { UserDashboard } from "@/components/UserDashboard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Telegram, WhatsApp } from "lucide-react";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SocialLinks } from "@/components/SocialLinks";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session and subscribe to auth changes
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

  const handleProtectedAction = () => {
    if (!user) {
      toast({
        title: "Accès restreint",
        description: "Pour accéder à cette fonctionnalité, veuillez vous connecter ou créer un compte.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
  };

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
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection user={user} />

        {/* Social Links Section */}
        <SocialLinks />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 space-y-12">
          {user ? (
            <UserDashboard />
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-primary">
                Connectez-vous pour accéder à toutes les fonctionnalités
              </h2>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90">
                  Se connecter
                </Button>
                <Button 
                  onClick={() => navigate("/auth")} 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Créer un compte
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
};

export default Index;