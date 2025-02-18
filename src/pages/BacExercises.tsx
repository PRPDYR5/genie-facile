
import { Layout } from "@/components/Layout";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { PDFViewer } from "@/components/PDFViewer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";

interface ExamPDF {
  url: string | null;
  year: string;
}

interface ExamData {
  [subject: string]: {
    name: string;
    levels: {
      [level: string]: ExamPDF[];
    };
  };
}

const examData: ExamData = {
  math: {
    name: "Mathématiques",
    levels: {
      seconde: [{ url: null, year: "2024" }],
      premiere: [{ url: null, year: "2024" }],
      terminale: [{ url: null, year: "2024" }]
    }
  },
  physics: {
    name: "Sciences Physiques",
    levels: {
      seconde: [{ url: null, year: "2024" }],
      premiere: [{ url: null, year: "2024" }],
      terminale: [{ url: null, year: "2024" }]
    }
  },
  // ... Ajout des autres matières avec la même structure
};

export default function BacExercises() {
  const { bacType } = useParams();
  const isMobile = useIsMobile();
  const [selectedLevel, setSelectedLevel] = useState("terminale");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  const filteredSubjects = Object.entries(examData).filter(([_, subject]) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-[#9b87f5]">
            {bacType?.toUpperCase()} - Exercices d'examen
          </h1>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Rechercher une matière..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'text-sm' : ''}`}>
            <TabsTrigger value="seconde">Seconde</TabsTrigger>
            <TabsTrigger value="premiere">Première</TabsTrigger>
            <TabsTrigger value="terminale">Terminale</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedLevel} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map(([key, subject]) => (
                <Card
                  key={key}
                  className="glass transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
                    <div className="space-y-4">
                      <h3 className="font-medium text-center">{subject.name}</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {subject.levels[selectedLevel].map((exam, index) => (
                          <button
                            key={index}
                            onClick={() => exam.url && setSelectedPDF(exam.url)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              !exam.url 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            disabled={!exam.url}
                          >
                            {exam.year}
                            {!exam.url && " (Bientôt disponible)"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {selectedPDF && (
              <div className="mt-6">
                <PDFViewer url={selectedPDF} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
