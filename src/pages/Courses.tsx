import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Atom, Code } from "lucide-react";
import { PDFViewer } from "@/components/PDFViewer";
import { PDFList } from "@/components/PDFList";

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
  const [selectedLevel, setSelectedLevel] = useState("seconde");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPDF, setSelectedPDF] = useState("");

  console.log("Selected level:", selectedLevel);
  console.log("Selected subject:", selectedSubject);
  console.log("Selected PDF:", selectedPDF);

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Cours PDF</h1>
        
        <Tabs defaultValue="seconde" onValueChange={setSelectedLevel}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="seconde">Seconde</TabsTrigger>
            <TabsTrigger value="premiere">Première</TabsTrigger>
            <TabsTrigger value="terminale">Terminale</TabsTrigger>
          </TabsList>

          {Object.entries(subjects).map(([key, subject]) => (
            <TabsContent key={key} value={selectedLevel}>
              <Card className="glass" onClick={() => setSelectedSubject(key)}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[#9b87f5]/20`}>
                      <subject.icon className={`w-6 h-6 ${subject.color}`} />
                    </div>
                    <CardTitle className="text-xl text-[#9b87f5]">
                      {subject.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
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
          <PDFViewer url={selectedPDF} />
        )}
      </div>
    </Layout>
  );
}