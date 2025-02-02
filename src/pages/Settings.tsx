import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { usePreferences } from "@/hooks/use-preferences";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { preferences, isLoading, updatePreferences } = usePreferences();
  const { toast } = useToast();

  const handlePreferenceUpdate = async (updates: any) => {
    try {
      await updatePreferences(updates);
      toast({
        title: "Paramètres mis à jour",
        description: "Vos préférences ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des préférences:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres.",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text">Paramètres</h1>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-[#9b87f5]">Thème</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={preferences?.theme || 'light'} 
              onValueChange={(value) => handlePreferenceUpdate({ theme: value })}
              className="space-y-4"
            >
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
            <RadioGroup 
              defaultValue={preferences?.font_size || 'medium'} 
              onValueChange={(value) => handlePreferenceUpdate({ font_size: value })}
              className="space-y-4"
            >
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

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-[#9b87f5]">Langue</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={preferences?.language || 'fr'} 
              onValueChange={(value: 'fr' | 'en') => handlePreferenceUpdate({ language: value })}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fr" id="fr" />
                <Label htmlFor="fr">Français</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="en" />
                <Label htmlFor="en">English</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-[#9b87f5]">Mode Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Switch
                checked={preferences?.focus_mode || false}
                onCheckedChange={(checked) => handlePreferenceUpdate({ focus_mode: checked })}
              />
              <Label>Activer le mode focus</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Le mode focus désactive les notifications pour vous aider à rester concentré.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}