import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LanguageSettingsProps {
  language: 'fr' | 'en';
  onLanguageChange: (value: 'fr' | 'en') => void;
}

export function LanguageSettings({ language, onLanguageChange }: LanguageSettingsProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-[#9b87f5]">Langue</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={language} 
          onValueChange={onLanguageChange}
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
  );
}