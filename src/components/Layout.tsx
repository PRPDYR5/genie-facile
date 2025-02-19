import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { StudyNotifications } from "./StudyNotifications";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogIn, UserPlus, MessageSquare } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Footer } from "./Footer";
import { LanguageSelector } from "./LanguageSelector";

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
      <StudyNotifications />
      <div className="min-h-screen flex flex-col w-full bg-background">
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1">
            <div className="container max-w-full px-2 sm:px-4">
              <div className="flex items-center justify-between gap-2 mb-4 py-2">
                <div className="flex items-center gap-2 sm:gap-4">
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
                  
                  {/* Social Media Links */}
                  <div className="hidden sm:flex items-center gap-3">
                    <a
                      href="https://chat.whatsapp.com/KEGeUBRJdSP5Ia35Wy5fdu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] transition-colors"
                      title="Rejoindre le groupe WhatsApp"
                    >
                      <MessageSquare className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://t.me/geniefacile05"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0088cc] hover:bg-[#0077b5] transition-colors"
                      title="Rejoindre le groupe Telegram"
                    >
                      <MessageSquare className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Language Selector */}
                  <LanguageSelector />

                  {/* Auth Buttons */}
                  {!isAuthPage && (
                    <div className="flex items-center gap-2">
                      <Link to="/auth">
                        <Button
                          variant="ghost"
                          className="hover:bg-[#9b87f5]/10 text-[#9b87f5]"
                          size={isMobile ? "sm" : "default"}
                        >
                          <LogIn className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} mr-1 sm:mr-2`} />
                          <span className="hidden sm:inline">Se connecter</span>
                        </Button>
                      </Link>
                      <Link to="/auth?mode=signup">
                        <Button
                          className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
                          size={isMobile ? "sm" : "default"}
                        >
                          <UserPlus className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} mr-1 sm:mr-2`} />
                          <span className="hidden sm:inline">Créer un compte</span>
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
