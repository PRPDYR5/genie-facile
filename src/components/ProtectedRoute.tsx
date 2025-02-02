import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("Utilisateur non authentifié, redirection vers la page de connexion");
          
          toast({
            title: "Accès restreint",
            description: "Pour accéder à cette fonctionnalité, veuillez vous connecter ou créer un compte.",
            action: (
              <div className="flex gap-2 mt-2">
                <Button 
                  onClick={() => navigate("/auth", { state: { from: location.pathname } })}
                  variant="default"
                  size="sm"
                >
                  Se connecter
                </Button>
                <Button
                  onClick={() => navigate("/auth?mode=signup", { state: { from: location.pathname } })}
                  variant="outline"
                  size="sm"
                >
                  Créer un compte
                </Button>
              </div>
            ),
          });

          // Store the attempted URL
          sessionStorage.setItem('redirectUrl', location.pathname);
          navigate("/auth", { state: { from: location.pathname } });
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
      }
    };

    checkAuth();
  }, [navigate, location, toast]);

  return <>{children}</>;
}