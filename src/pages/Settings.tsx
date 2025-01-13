import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type UserPreferences = {
  theme: string;
  font_size: string;
  language: 'fr' | 'en';
  focus_mode: boolean;
}

export default function Settings() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    font_size: 'medium',
    language: 'fr',
    focus_mode: false
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Vous devez être connecté pour accéder aux paramètres",
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .single();

      if (error) {
        console.error('Error loading preferences:', error);
        return;
      }

      if (data) {
        setPreferences(data);
        applyPreferences(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyPreferences = (prefs: UserPreferences) => {
    // Appliquer le thème
    document.documentElement.classList.toggle('dark', prefs.theme === 'dark');
    
    // Appliquer la taille de police
    document.documentElement.style.fontSize = getFontSize(prefs.font_size);
    
    // Appliquer le mode focus
    if (prefs.focus_mode) {
      // Désactiver les notifications
      console.log('Focus mode enabled - notifications disabled');
    }
  };

  const getFontSize = (size: string) => {
    switch (size) {
      case 'small':
        return '14px';
      case 'large':
        return '18px';
      default:
        return '16px';
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...preferences
        });

      if (error) throw error;

      applyPreferences(preferences);
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos préférences ont été mises à jour avec succès.",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div>Chargement...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <h1 className="text-4xl font-bold gradient-text">Paramètres</h1>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-[#9b87f5]">Thème</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={preferences.theme} 
              onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}
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
              value={preferences.font_size} 
              onValueChange={(value) => setPreferences(prev => ({ ...prev, font_size: value }))}
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
              value={preferences.language} 
              onValueChange={(value: 'fr' | 'en') => setPreferences(prev => ({ ...prev, language: value }))}
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
                checked={preferences.focus_mode}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, focus_mode: checked }))}
              />
              <Label>Activer le mode focus</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Le mode focus désactive les notifications pour vous aider à rester concentré.
            </p>
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