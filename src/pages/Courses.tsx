import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Atom, Code } from "lucide-react";
import { PDFViewer } from "@/components/PDFViewer";
import { PDFList } from "@/components/PDFList";
import { useIsMobile } from "@/hooks/use-mobile";

const subjects = {
  math: {
    name: "Mathématiques",
    icon: BrainCircuit,
    color: "text-blue-500",
  },
  physics: {
    name: "Sciences Physiques",
    icon: Atom,
    color: "text-purple-500",
  },
  info: {
    name: "Informatique",
    icon: Code,
    color: "text-green-500",
  },
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
      const pdfUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/terminale/math/cours_math_terminale_f3.pdf`;
      setSelectedPDF(pdfUrl);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold gradient-text`}>
          Cours PDF
        </h1>
        
        <Tabs defaultValue="terminale" onValueChange={setSelectedLevel} className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'text-sm' : ''}`}>
            <TabsTrigger value="seconde">Seconde</TabsTrigger>
            <TabsTrigger value="premiere">Première</TabsTrigger>
            <TabsTrigger value="terminale">Terminale</TabsTrigger>
          </TabsList>

          {Object.entries(subjects).map(([key, subject]) => (
            <TabsContent key={key} value={selectedLevel}>
              <Card 
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
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-xl flex items-center justify-center bg-[#9b87f5]/20`}>
                      <subject.icon className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} ${subject.color}`} />
                    </div>
                    <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-[#9b87f5]`}>
                      {subject.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className={isMobile ? 'p-2' : 'p-4'}>
                  <div className="grid gap-3">
                    <PDFList 
                      level={selectedLevel} 
                      subject={key} 
                      onSelect={setSelectedPDF} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {selectedPDF && (
          <div className={`mt-6 ${isMobile ? 'rounded-lg overflow-hidden' : ''}`}>
            <PDFViewer url={selectedPDF} />
          </div>
        )}
      </div>
    </Layout>
  );
}