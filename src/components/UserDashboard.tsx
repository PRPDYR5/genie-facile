import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Settings } from "lucide-react";

export function UserDashboard() {
  const dashboardItems = [
    {
      title: "Accès aux cours",
      icon: FileText,
      description: "Accédez à tous vos cours et documents",
      link: "/courses"
    },
    {
      title: "Recherche avancée",
      icon: Search,
      description: "Recherchez des contenus spécifiques",
      link: "/search"
    },
    {
      title: "Paramètres",
      icon: Settings,
      description: "Personnalisez votre expérience",
      link: "/settings"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {dashboardItems.map((item) => (
        <a
          key={item.title}
          href={item.link}
          className="transform transition-all duration-300 hover:scale-[1.02]"
        >
          <Card className="h-full glass card-hover">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-[#9b87f5]/20 w-12 h-12 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#9b87f5]" />
                </div>
                <CardTitle className="text-xl text-[#9b87f5]">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[#9b87f5]/70">{item.description}</p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}