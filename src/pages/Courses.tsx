import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, MessageCircle, Dumbbell } from "lucide-react";

const Courses = () => {
  const navigate = useNavigate();

  const courseOptions = [
    {
      title: "Résumés de cours",
      description: "Accédez aux résumés des cours par matière",
      icon: BookOpen,
      route: "/courses/summaries"
    },
    {
      title: "Questions & Réponses",
      description: "Posez vos questions et obtenez des réponses",
      icon: MessageCircle,
      route: "/courses/qa"
    },
    {
      title: "Exercices",
      description: "Pratiquez avec des exercices adaptés",
      icon: Dumbbell,
      route: "/courses/exercises"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Ressources pédagogiques</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseOptions.map((option) => (
            <Card 
              key={option.title}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 glass"
              onClick={() => navigate(option.route)}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;