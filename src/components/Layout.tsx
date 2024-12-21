import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();

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
            <div className="flex items-center gap-2 mb-4">
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
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}