import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const { toast } = useToast();

  const handleSave = () => {
    // Sauvegarder les paramètres
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour avec succès.",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
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