import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function AuthButtons() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        onClick={() => navigate("/auth")}
        className="bg-primary hover:bg-primary/90 text-white px-8 py-6 glass"
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