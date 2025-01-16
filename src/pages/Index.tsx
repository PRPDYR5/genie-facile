import { Layout } from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SocialLinks } from "@/components/SocialLinks";
import { StudyScheduler } from "@/components/StudyScheduler";
import { StudyScheduleList } from "@/components/StudyScheduleList";
import { SearchBar } from "@/components/SearchBar";
import { PoeChat } from "@/components/PoeChat";

const Index = () => {
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#9b87f5]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen space-y-12 bg-[#0f0f1a]">
        <HeroSection user={user} />
        
        {user && (
          <div className="container mx-auto px-4 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-[#9b87f5]">Planification des études</h2>
                <StudyScheduler />
                <StudyScheduleList />
              </div>
              
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-[#9b87f5]">Assistant IA</h2>
                <PoeChat />
              </div>
            </div>
          </div>
        )}

        <SocialLinks />
        <Footer />
      </div>
    </Layout>
  );
}

export default Index;