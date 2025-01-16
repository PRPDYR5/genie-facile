import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Settings, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Accès aux cours",
      icon: FileText,
      description: "Accédez à tous vos cours et documents",
      onClick: () => navigate("/courses"),
      gradient: "from-[#9b87f5] to-[#6E59A5]"
    },
    {
      title: "Exercices",
      icon: GraduationCap,
      description: "Pratiquez avec des exercices adaptés",
      onClick: () => navigate("/courses/exercises"),
      gradient: "from-[#8B5CF6] to-[#7E69AB]"
    },
    {
      title: "Recherche avancée",
      icon: Search,
      description: "Recherchez des contenus spécifiques",
      onClick: () => navigate("/search"),
      gradient: "from-[#7E69AB] to-[#6E59A5]"
    },
    {
      title: "Paramètres",
      icon: Settings,
      description: "Personnalisez votre expérience",
      onClick: () => navigate("/settings"),
      gradient: "from-[#6E59A5] to-[#9b87f5]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardItems.map((item) => (
        <div
          key={item.title}
          onClick={item.onClick}
          className="transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        >
          <Card className="h-full bg-[#1A1F2C]/40 border-[#9b87f5]/20 backdrop-blur-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-br ${item.gradient} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[#9b87f5]/70">{item.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}