
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Settings, GraduationCap, BookMarked, Book, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function UserDashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const dashboardItems = [
    {
      title: "Accès aux cours",
      icon: FileText,
      description: "Accédez à tous vos cours et documents",
      onClick: () => navigate("/courses")
    },
    {
      title: "Exercices",
      icon: GraduationCap,
      description: "Pratiquez avec des exercices adaptés",
      onClick: () => navigate("/courses/exercises")
    },
    {
      title: "BAC",
      icon: BookMarked,
      description: "Accédez aux examens du BAC",
      onClick: () => navigate("/bac")
    },
    {
      title: "Documents",
      icon: Book,
      description: "Consultez les annales et documents",
      onClick: () => navigate("/documents")
    },
    {
      title: "GENIE BOT",
      icon: Bot,
      description: "Chattez avec notre assistant intelligent",
      onClick: () => navigate("/courses/qa")
    },
    {
      title: "Recherche avancée",
      icon: Search,
      description: "Recherchez des contenus spécifiques",
      onClick: () => navigate("/search")
    },
    {
      title: "Paramètres",
      icon: Settings,
      description: "Personnalisez votre expérience",
      onClick: () => navigate("/settings")
    }
  ];

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4 px-2' : 'sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'} w-full max-w-7xl mx-auto`}>
      {dashboardItems.map((item) => (
        <div
          key={item.title}
          onClick={item.onClick}
          className="transform transition-all duration-300 hover:scale-[1.02] cursor-pointer w-full"
        >
          <Card className="h-full glass card-hover border-[#9b87f5]/20">
            <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
              <div className="flex items-center gap-3">
                <div className="bg-[#9b87f5]/10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center">
                  <item.icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-[#9b87f5]`} />
                </div>
                <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-[#9b87f5] font-medium`}>
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={`${isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}`}>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-[#9b87f5]/70`}>
                {item.description}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
