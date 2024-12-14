import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { FileText, BookOpen, MessageSquare, ClipboardList } from "lucide-react";

const features = [
  {
    title: "Cours PDF",
    description: "Accédez aux cours sous forme de documents PDF organisés par classe et matière",
    icon: FileText,
    color: "bg-blue-500",
    url: "/courses/pdf"
  },
  {
    title: "Résumés",
    description: "Consultez des résumés concis et faciles à comprendre pour chaque cours",
    icon: BookOpen,
    color: "bg-green-500",
    url: "/courses/summaries"
  },
  {
    title: "Questions-réponses",
    description: "Posez vos questions et recevez des réponses claires et pédagogiques",
    icon: MessageSquare,
    color: "bg-purple-500",
    url: "/courses/qa"
  },
  {
    title: "Sujets d'exercices",
    description: "Accédez aux exercices proposés pour chaque chapitre ou thème",
    icon: ClipboardList,
    color: "bg-orange-500",
    url: "/courses/exercises"
  }
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Bienvenue sur Génie Facile</h1>
          <p className="text-xl text-muted-foreground">
            Votre compagnon d'études pour la série F3
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.url}
              className="transform transition-all hover:scale-105"
            >
              <Card className="p-6 h-full">
                <div className="space-y-4">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold">{feature.title}</h2>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <a
              key={subject.title}
              href={subject.url}
              className="transform transition-all hover:scale-105"
            >
              <Card className="p-6 h-full">
                <div className="space-y-4">
                  <div className={`${subject.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <subject.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold">{subject.title}</h2>
                  <p className="text-muted-foreground">{subject.description}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;