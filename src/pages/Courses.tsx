import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import { PDFViewer } from "@/components/PDFViewer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const subjects = {
  math: "Mathématiques",
};

export default function Courses() {
  const [selectedLevel, setSelectedLevel] = useState("terminale");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPDF, setSelectedPDF] = useState("");
  const isMobile = useIsMobile();
  const { toast } = useToast();

  console.log("Selected level:", selectedLevel);
  console.log("Selected subject:", selectedSubject);
  console.log("Selected PDF:", selectedPDF);

  const handleMathSelection = () => {
    try {
      console.log("Chargement du PDF de mathématiques...");
      const mathPDFUrl = 'https://drive.google.com/file/d/1rf1c14mTVBT0LiCjGEfMJ_lKsEIIO7J4/view?usp=sharing';
      
      setSelectedSubject("math");
      setSelectedPDF(mathPDFUrl);
      
      toast({
        title: "PDF chargé",
        description: "Le cours de mathématiques est prêt à être consulté",
      });
    } catch (error) {
      console.error("Erreur lors du chargement du PDF:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger le PDF de mathématiques",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#9b87f5]">
          Cours PDF
        </h1>
        
        <Tabs defaultValue="terminale" onValueChange={setSelectedLevel} className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'text-sm' : ''}`}>
            <TabsTrigger value="seconde">Seconde</TabsTrigger>
            <TabsTrigger value="premiere">Première</TabsTrigger>
            <TabsTrigger value="terminale">Terminale</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedLevel} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(subjects).map(([key, value]) => (
                <Card
                  key={key}
                  className={`glass transition-all duration-300 hover:shadow-lg cursor-pointer hover:scale-105 ${
                    selectedSubject === key ? 'border-2 border-[#9b87f5]' : ''
                  } ${isMobile ? 'p-2' : 'p-4'}`}
                  onClick={handleMathSelection}
                >
                  <CardHeader className={isMobile ? 'p-2' : 'p-4'}>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-medium text-center">{value}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {selectedSubject && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
                  Document pour {subjects[selectedSubject]}
                </h2>
                <div className="w-full">
                  <PDFViewer url={selectedPDF} />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}