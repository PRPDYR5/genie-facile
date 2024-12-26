import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("fontSize") || "medium");
  const { toast } = useToast();

  useEffect(() => {
    // Appliquer le thème au chargement
    document.documentElement.classList.toggle("dark", theme === "dark");
    
    // Appliquer la taille de police au chargement
    document.documentElement.style.fontSize = getFontSize(fontSize);
  }, []);

  const getFontSize = (size: string) => {
    switch (size) {
      case "small":
        return "14px";
      case "large":
        return "18px";
      default:
        return "16px";
    }
  };

  const handleSave = () => {
    try {
      // Sauvegarder les paramètres
      localStorage.setItem("theme", theme);
      localStorage.setItem("fontSize", fontSize);
      
      // Appliquer le thème
      document.documentElement.classList.toggle("dark", theme === "dark");
      
      // Appliquer la taille de police
      document.documentElement.style.fontSize = getFontSize(fontSize);
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos préférences ont été mises à jour avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des paramètres:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <h1 className="text-4xl font-bold gradient-text">Paramètres</h1>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-[#9b87f5]">Thème</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Clair</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Sombre</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-[#9b87f5]">Taille du texte</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={fontSize} onValueChange={setFontSize} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Petit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Moyen</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Grand</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Button 
          onClick={handleSave}
          className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
        >
          Sauvegarder les paramètres
        </Button>
      </div>
    </Layout>
  );
}