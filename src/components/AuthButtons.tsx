import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function AuthButtons() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la déconnexion",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        onClick={() => navigate("/auth")}
        className="bg-primary hover:bg-primary/90 text-[#1a1a2e] px-8 py-6 glass"
      >
        Se connecter
      </Button>
      <Button
        variant="outline"
        onClick={() => navigate("/auth")}
        className="border-primary text-primary hover:bg-primary/10 px-8 py-6 glass"
      >
        Créer un compte
      </Button>
    </div>
  );
}