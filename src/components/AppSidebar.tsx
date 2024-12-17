import { Link } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Search, Settings, LogIn } from "lucide-react";

export function AppSidebar() {
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
          </div>
        </div>
      </div>
    </Sidebar>
  );
}