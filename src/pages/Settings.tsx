
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type UserPreferences = {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  language: 'fr' | 'en';
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  fontSize: 'medium',
  language: 'fr'
};

export default function Settings() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const { toast } = useToast();

  // Charger les préférences au montage du composant
  useEffect(() => {
    const savedPrefs = localStorage.getItem('user_preferences');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
      applyPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  // Appliquer les préférences à l'interface
  const applyPreferences = (prefs: UserPreferences) => {
    // Appliquer le thème
    if (prefs.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    // Appliquer la taille de police
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    document.documentElement.style.fontSize = fontSizes[prefs.fontSize];

    // Appliquer la langue
    document.documentElement.lang = prefs.language;
  };

  // Gestionnaire de changement de préférences
  const handlePreferenceChange = (key: keyof UserPreferences, value: string) => {
    const newPrefs = {
      ...preferences,
      [key]: value
    } as UserPreferences;
    setPreferences(newPrefs);
  };

  // Sauvegarder les préférences
  const handleSave = () => {
    try {
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
      applyPreferences(preferences);
      toast({
        title: "Succès",
        description: "Vos préférences ont été sauvegardées",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les préférences",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-8 max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold gradient-text">Paramètres</h1>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-[#9b87f5]">Thème</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={preferences.theme}
              onValueChange={(value) => handlePreferenceChange('theme', value)}
              className="space-y-2"
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
              value={preferences.fontSize}
              onValueChange={(value) => handlePreferenceChange('fontSize', value)}
              className="space-y-2"
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
              onValueChange={(value) => handlePreferenceChange('language', value)}
              className="space-y-2"
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

        <Button 
          onClick={handleSave}
          className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
        >
          Sauvegarder les préférences
        </Button>
      </div>
    </Layout>
  );
}
