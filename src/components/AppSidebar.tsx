
import { Link } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BookOpen, 
  Search, 
  Settings, 
  LogIn, 
  LogOut, 
  GraduationCap,
  BookMarked,
  FileText,
  Book,
  Bot
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function AppSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      console.log("Tentative de déconnexion...");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log("Déconnexion réussie");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/auth");
    } catch (error: any) {
      console.error("Erreur de déconnexion:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
      });
    }
  };

  return (
    <Sidebar>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
          <div className="space-y-1">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Cours
              </Button>
            </Link>
            <Link to="/courses/exercises">
              <Button variant="ghost" className="w-full justify-start">
                <GraduationCap className="mr-2 h-4 w-4" />
                Exercices
              </Button>
            </Link>
            <Link to="/bac">
              <Button variant="ghost" className="w-full justify-start">
                <BookMarked className="mr-2 h-4 w-4" />
                BAC
              </Button>
            </Link>
            <Link to="/documents">
              <Button variant="ghost" className="w-full justify-start">
                <Book className="mr-2 h-4 w-4" />
                Annales et Documents
              </Button>
            </Link>
            <Link to="/courses/qa">
              <Button variant="ghost" className="w-full justify-start">
                <Bot className="mr-2 h-4 w-4" />
                GENIE BOT
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" className="w-full justify-start">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
