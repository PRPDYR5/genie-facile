import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FocusModeSettingsProps {
  focusMode: boolean;
  onFocusModeChange: (checked: boolean) => void;
}

export function FocusModeSettings({ focusMode, onFocusModeChange }: FocusModeSettingsProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-[#9b87f5]">Mode Focus</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Switch
            checked={focusMode}
            onCheckedChange={onFocusModeChange}
          />
          <Label>Activer le mode focus</Label>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Le mode focus désactive les notifications pour vous aider à rester concentré.
        </p>
      </CardContent>
    </Card>
  );
}