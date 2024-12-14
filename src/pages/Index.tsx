import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { BrainCircuit, Atom, Code } from "lucide-react";

const subjects = [
  {
    title: "Mathématiques",
    icon: BrainCircuit,
    description: "Algèbre, géométrie, analyse et plus encore",
    color: "bg-blue-500",
    url: "/courses/math",
  },
  {
    title: "Sciences Physiques",
    icon: Atom,
    description: "Mécanique, électricité, optique et chimie",
    color: "bg-purple-500",
    url: "/courses/physics",
  },
  {
    title: "Informatique",
    icon: Code,
    description: "Programmation, algorithmes et structures de données",
    color: "bg-green-500",
    url: "/courses/info",
  },
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