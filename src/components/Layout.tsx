import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();
  const isAuthPage = location.pathname === "/auth";

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error("Navigation error:", error);
      navigate("/");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className={`flex-1 ${isMobile ? 'p-3' : 'p-6'}`}>
          <div className="container max-w-full">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                {!isHomePage && (
                  <Button 
                    variant="ghost" 
                    onClick={handleBack}
                    className="hover:bg-[#9b87f5]/10"
                    size={isMobile ? "sm" : "default"}
                  >
                    <ArrowLeft className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-[#9b87f5]`} />
                  </Button>
                )}
                <SidebarTrigger />
              </div>

              {/* Auth Buttons */}
              {!isAuthPage && (
                <div className="flex items-center gap-2">
                  <Link to="/auth">
                    <Button
                      variant="ghost"
                      className="hover:bg-[#9b87f5]/10 text-[#9b87f5]"
                      size={isMobile ? "sm" : "default"}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Se connecter
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button
                      className="bg-[#9b87f5] hover:bg-[#8b77e5] text-[#1A1F2C]"
                      size={isMobile ? "sm" : "default"}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Créer un compte
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}