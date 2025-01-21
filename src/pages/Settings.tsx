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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  // Fetch user preferences
  const { data: userPreferences, isLoading } = useQuery({
    queryKey: ['userPreferences'],
    queryFn: async () => {
      console.log("Fetching user preferences...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching preferences:', error);
        throw error;
      }

      return data;
    },
    retry: false,
    onSuccess: (data) => {
      if (data) {
        console.log("Preferences loaded:", data);
        setPreferences(data);
        applyPreferences(data);
      }
    },
    onError: (error) => {
      console.error('Error loading preferences:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger vos préférences",
      });
    }
  });

  // Update user preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: async (newPreferences: UserPreferences) => {
      console.log("Saving preferences:", newPreferences);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...newPreferences,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      console.log("Preferences saved successfully");
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] });
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos préférences ont été mises à jour avec succès.",
      });
    },
    onError: (error) => {
      console.error('Error saving preferences:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
      });
    }
  });

  // Create default preferences if none exist
  const createDefaultPreferences = async () => {
    const defaultPreferences = {
      theme: 'light',
      font_size: 'medium',
      language: 'fr' as const,
      focus_mode: false
    };
    await updatePreferencesMutation.mutateAsync(defaultPreferences);
  };

  // Initialize preferences
  useEffect(() => {
    if (!isLoading && !userPreferences) {
      createDefaultPreferences();
    }
  }, [isLoading, userPreferences]);

  const applyPreferences = (prefs: UserPreferences) => {
    console.log("Applying preferences:", prefs);
    
    // Appliquer le thème
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(prefs.theme);
    
    // Appliquer la taille de police
    const fontSize = getFontSize(prefs.font_size);
    document.documentElement.style.fontSize = fontSize;
    document.body.style.fontSize = fontSize;
    
    // Appliquer la langue
    document.documentElement.lang = prefs.language;
    
    // Appliquer le mode focus
    if (prefs.focus_mode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
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

  const handleSave = async () => {
    await updatePreferencesMutation.mutateAsync(preferences);
  };

  if (isLoading) {
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
          onClick={handleSave}
          disabled={updatePreferencesMutation.isPending}
          className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
        >
          {updatePreferencesMutation.isPending ? (
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
}