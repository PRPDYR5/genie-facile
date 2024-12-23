import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import { PDFList } from "@/components/PDFList";
import { PDFViewer } from "@/components/PDFViewer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const subjects = {
  math: "Mathématiques",
  physics: "Physique",
  chemistry: "Chimie",
  biology: "Biologie",
  french: "Français",
  english: "Anglais"
};

export default function Courses() {
  const [selectedLevel, setSelectedLevel] = useState("terminale");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPDF, setSelectedPDF] = useState("");
  const isMobile = useIsMobile();

  console.log("Selected level:", selectedLevel);
  console.log("Selected subject:", selectedSubject);
  console.log("Selected PDF:", selectedPDF);

  // Fonction pour gérer la sélection du module de mathématiques en Terminale
  const handleMathSelection = () => {
    if (selectedLevel === "terminale" && selectedSubject === "math") {
      // Construction correcte de l'URL sans le ":" superflu
      const pdfUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/terminale/math/cours_math_terminale_f3.pdf`;
      console.log("PDF URL constructed:", pdfUrl);
      setSelectedPDF(pdfUrl);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Cours PDF
        </h1>
        
        <Tabs defaultValue="terminale" onValueChange={setSelectedLevel} className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'text-sm' : ''}`}>
            <TabsTrigger value="seconde">Seconde</TabsTrigger>
            <TabsTrigger value="premiere">Première</TabsTrigger>
            <TabsTrigger value="terminale">Terminale</TabsTrigger>
          </TabsList>

          {Object.entries(subjects).map(([key, value]) => (
            <Card
              key={key}
              className={`glass transition-all duration-300 hover:shadow-lg ${
                isMobile ? 'p-2' : 'p-4'
              }`} 
              onClick={() => {
                setSelectedSubject(key);
                if (key === 'math' && selectedLevel === 'terminale') {
                  handleMathSelection();
                }
              }}
            >
              <CardHeader className={isMobile ? 'p-2' : 'p-4'}>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{value}</span>
                </div>
              </CardHeader>
            </Card>
          ))}

          {selectedSubject && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">
                Documents disponibles pour {subjects[selectedSubject]}
              </h2>
              {selectedPDF ? (
                <PDFViewer url={selectedPDF} />
              ) : (
                <PDFList
                  level={selectedLevel}
                  subject={selectedSubject}
                  onSelect={setSelectedPDF}
                />
              )}
            </div>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}