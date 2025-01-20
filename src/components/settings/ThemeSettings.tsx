import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ThemeSettingsProps {
  theme: string;
  onThemeChange: (value: string) => void;
}

export function ThemeSettings({ theme, onThemeChange }: ThemeSettingsProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-[#9b87f5]">Thème</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={theme} 
          onValueChange={onThemeChange}
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
  );
}