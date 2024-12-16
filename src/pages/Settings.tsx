import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Paramètres</h1>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-[#9b87f5]">Personnalisation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#9b87f5]/70">
              Les paramètres de personnalisation seront bientôt disponibles.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}