import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import { PDFList } from "@/components/PDFList";
import { PDFViewer } from "@/components/PDFViewer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

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

  const handleMathSelection = async () => {
    try {
      if (selectedLevel === "terminale" && selectedSubject === "math") {
        console.log("Chargement du PDF de mathématiques Terminale F3...");
        const { data: { publicUrl } } = supabase.storage
          .from('terminale')
          .getPublicUrl('math/cours_math_terminale_f3.pdf');
        
        console.log("URL du PDF:", publicUrl);
        setSelectedPDF(publicUrl);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du PDF:", error);
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

          <div className="grid gap-4 mt-4">
            {Object.entries(subjects).map(([key, value]) => (
              <Card
                key={key}
                className={`glass transition-all duration-300 hover:shadow-lg cursor-pointer ${
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
          </div>

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