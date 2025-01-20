import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FontSizeSettingsProps {
  fontSize: string;
  onFontSizeChange: (value: string) => void;
}

export function FontSizeSettings({ fontSize, onFontSizeChange }: FontSizeSettingsProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-[#9b87f5]">Taille du texte</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={fontSize} 
          onValueChange={onFontSizeChange}
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
  );
}