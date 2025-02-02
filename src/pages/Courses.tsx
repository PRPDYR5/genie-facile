import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import { PDFViewer } from "@/components/PDFViewer";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";

const courses = {
  seconde: {
    math: {
      name: "Mathématiques",
      url: null
    },
    physics: {
      name: "Sciences Physiques",
      url: null
    },
    info: {
      name: "Informatique",
      url: null
    },
    technologie: {
      name: "Technologie",
      url: null
    },
    electrotechnique: {
      name: "Électrotechnique",
      url: null
    },
    mesure_essai: {
      name: "Mesure Essai",
      url: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier",
      url: null
    },
    cm: {
      name: "Construction Mécanique",
      url: null
    },
    automatisme: {
      name: "Automatisme",
      url: null
    },
    metallurgie: {
      name: "Métallurgie",
      url: null
    }
  },
  premiere: {
    math: {
      name: "Mathématiques",
      url: "https://drive.google.com/file/d/1e7pV0w9cUvz4sEzrVQuvQjpljLOEjvQE/view?usp=sharing"
    },
    physics: {
      name: "Sciences Physiques",
      url: "https://drive.google.com/file/d/1eAYwN6aok-KtenwNjrPh1Ys2NErswDC9/view?usp=sharing"
    },
    info: {
      name: "Informatique",
      url: "https://drive.google.com/file/d/1hZCyx3nuPEtc4LZAWFAnKyrAaYD2WVN7/view?usp=sharing"
    },
    technologie: {
      name: "Technologie",
      url: null
    },
    electrotechnique: {
      name: "Électrotechnique",
      url: null
    },
    mesure_essai: {
      name: "Mesure Essai",
      url: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier",
      url: null
    },
    cm: {
      name: "Construction Mécanique",
      url: null
    },
    automatisme: {
      name: "Automatisme",
      url: null
    },
    metallurgie: {
      name: "Métallurgie",
      url: null
    }
  },
  terminale: {
    math: {
      name: "Mathématiques",
      url: "https://drive.google.com/file/d/1rf1c14mTVBT0LiCjGEfMJ_lKsEIIO7J4/view?usp=sharing"
    },
    physics: {
      name: "Sciences Physiques",
      url: "https://drive.google.com/file/d/1wki9fTD9_ur9rhtuxgKUI3Xlwg78Wzeo/view?usp=sharing"
    },
    info: {
      name: "Informatique",
      url: "https://drive.google.com/file/d/1EN-VnNdOsOr_iDvjjd6eD-z_ZzerbpEU/view?usp=sharing"
    },
    technologie: {
      name: "Technologie",
      url: null
    },
    electrotechnique: {
      name: "Électrotechnique",
      url: null
    },
    mesure_essai: {
      name: "Mesure Essai",
      url: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier",
      url: null
    },
    cm: {
      name: "Construction Mécanique",
      url: null
    },
    automatisme: {
      name: "Automatisme",
      url: null
    },
    metallurgie: {
      name: "Métallurgie",
      url: null
    }
  }
};

export default function Courses() {
  const [searchParams] = useSearchParams();
  const initialLevel = searchParams.get("level") || "terminale";
  const initialSubject = searchParams.get("subject") || "";
  const pdfUrl = searchParams.get("pdf");

  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedPDF, setSelectedPDF] = useState(pdfUrl || "");
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Effect to handle URL parameters
  useEffect(() => {
    if (pdfUrl) {
      setSelectedPDF(decodeURIComponent(pdfUrl));
      
      // Find the corresponding subject if not provided
      if (!initialSubject && selectedLevel) {
        const level = courses[selectedLevel as keyof typeof courses];
        if (level) {
          Object.entries(level).forEach(([subject, data]) => {
            if (data.url === decodeURIComponent(pdfUrl)) {
              setSelectedSubject(subject);
            }
          });
        }
      }
    }
  }, [pdfUrl, initialSubject, selectedLevel]);

  const handleCourseSelection = (level: string, subject: string) => {
    try {
      console.log(`Chargement du cours de ${subject} pour le niveau ${level}...`);
      const course = courses[level as keyof typeof courses][subject as "math" | "physics" | "info"];
      
      if (!course.url) {
        toast({
          variant: "destructive",
          title: "Cours non disponible",
          description: "Ce cours n'est pas encore disponible.",
        });
        return;
      }

      setSelectedSubject(subject);
      setSelectedPDF(course.url);
      
      toast({
        title: "Cours chargé",
        description: `Le cours de ${course.name} est prêt à être consulté`,
      });
    } catch (error) {
      console.error("Erreur lors du chargement du cours:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger le cours",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#9b87f5]">
          Cours PDF
        </h1>
        
        <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'text-sm' : ''}`}>
            <TabsTrigger value="seconde">Seconde</TabsTrigger>
            <TabsTrigger value="premiere">Première</TabsTrigger>
            <TabsTrigger value="terminale">Terminale</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedLevel} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(courses[selectedLevel as keyof typeof courses]).map(([key, course]) => (
                <Card
                  key={key}
                  className={`glass transition-all duration-300 hover:shadow-lg cursor-pointer hover:scale-105 ${
                    selectedSubject === key ? 'border-2 border-[#9b87f5]' : ''
                  } ${!course.url ? 'opacity-50' : ''} ${isMobile ? 'p-2' : 'p-4'}`}
                  onClick={() => handleCourseSelection(selectedLevel, key)}
                >
                  <CardHeader className={isMobile ? 'p-2' : 'p-4'}>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-medium text-center">{course.name}</span>
                      {!course.url && <span className="text-sm text-gray-500">(Bientôt disponible)</span>}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {selectedPDF && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
                  Document pour {courses[selectedLevel as keyof typeof courses][selectedSubject as "math" | "physics" | "info"].name}
                </h2>
                <PDFViewer url={selectedPDF} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}