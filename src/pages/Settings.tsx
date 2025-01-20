import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log("Settings component mounted, loading user preferences...");
    loadUserPreferences();
  }, []);

  // Appliquer les préférences dès qu'elles changent
  useEffect(() => {
    console.log("Applying preferences:", preferences);
    applyPreferences(preferences);
  }, [preferences]);

  const loadUserPreferences = async () => {
    try {
      console.log("Loading user preferences...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("No user found");
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Vous devez être connecté pour accéder aux paramètres",
        });
        return;
      }

      console.log("User found, fetching preferences...");
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading preferences:', error);
        return;
      }

      if (data) {
        console.log("Preferences loaded:", data);
        setPreferences(data);
        applyPreferences(data);
      } else {
        // Si aucune préférence n'existe, créer des préférences par défaut
        const defaultPreferences = {
          theme: 'light',
          font_size: 'medium',
          language: 'fr' as const,
          focus_mode: false
        };
        await handleSave(defaultPreferences);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger vos préférences",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyPreferences = (prefs: UserPreferences) => {
    console.log("Applying preferences:", prefs);
    
    // Appliquer le thème
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(prefs.theme);
    localStorage.setItem('theme', prefs.theme);
    
    // Appliquer la taille de police
    const fontSize = getFontSize(prefs.font_size);
    document.documentElement.style.fontSize = fontSize;
    document.body.style.fontSize = fontSize;
    localStorage.setItem('fontSize', prefs.font_size);
    
    // Appliquer la langue
    document.documentElement.lang = prefs.language;
    localStorage.setItem('language', prefs.language);
    
    // Appliquer le mode focus
    if (prefs.focus_mode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    localStorage.setItem('focusMode', prefs.focus_mode.toString());
  };

  const getFontSize = (size: string): string => {
    switch (size) {
      case 'small':
        return '14px';
      case 'large':
        return '18px';
      default:
        return '16px';
    }
  };

  const handleSave = async (prefsToSave = preferences) => {
    try {
      setSaving(true);
      console.log("Saving preferences:", prefsToSave);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user found during save");
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Vous devez être connecté pour sauvegarder les paramètres",
        });
        return;
      }

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...prefsToSave,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving preferences:', error);
        throw error;
      }

      console.log("Preferences saved successfully");
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
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
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
          onClick={() => handleSave()}
          disabled={saving}
          className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sauvegarde en cours...
            </>
          ) : (
            'Sauvegarder les paramètres'
          )}
        </Button>
      </div>
    </Layout>
  );
};
