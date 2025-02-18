
import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import { PDFViewer } from "@/components/PDFViewer";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";

interface PDFInfo {
  url: string;
  title: string;
}

interface CourseInfo {
  name: string;
  pdfs: PDFInfo[] | null;
}

const courses: Record<string, Record<string, CourseInfo>> = {
  seconde: {
    math: {
      name: "Mathématiques",
      pdfs: null
    },
    physics: {
      name: "Sciences Physiques",
      pdfs: null
    },
    info: {
      name: "Informatique",
      pdfs: null
    },
    technologie: {
      name: "Technologie",
      pdfs: null
    },
    electrotechnique: {
      name: "Électrotechnique",
      pdfs: null
    },
    mesure_essai: {
      name: "Mesure Essai",
      pdfs: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier",
      pdfs: null
    },
    cm: {
      name: "Construction Mécanique",
      pdfs: [
        { 
          url: "https://drive.google.com/file/d/10rNCZO7UZm-lCeChCn9sHPOx-6Nlse_c/view?usp=sharing",
          title: "Partie 1"
        },
        {
          url: "https://drive.google.com/file/d/10BsDdE-AmA6Pa1cHJ6AxZGaSUSn1ll6-/view?usp=sharing",
          title: "Partie 2"
        },
        {
          url: "https://drive.google.com/file/d/1E0WxTthKDPK-2NqlCA8o2W0St3KSIdo8/view?usp=sharing",
          title: "Partie 3"
        }
      ]
    },
    automatisme: {
      name: "Automatisme",
      pdfs: null
    },
    metallurgie: {
      name: "Métallurgie",
      pdfs: null
    }
  },
  premiere: {
    math: {
      name: "Mathématiques",
      pdfs: null
    },
    physics: {
      name: "Sciences Physiques",
      pdfs: null
    },
    info: {
      name: "Informatique",
      pdfs: null
    },
    technologie: {
      name: "Technologie",
      pdfs: null
    },
    electrotechnique: {
      name: "Électrotechnique",
      pdfs: null
    },
    mesure_essai: {
      name: "Mesure Essai",
      pdfs: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier",
      pdfs: null
    },
    cm: {
      name: "Construction Mécanique",
      pdfs: null
    },
    automatisme: {
      name: "Automatisme",
      pdfs: null
    },
    metallurgie: {
      name: "Métallurgie",
      pdfs: null
    }
  },
  terminale: {
    math: {
      name: "Mathématiques",
      pdfs: null
    },
    physics: {
      name: "Sciences Physiques",
      pdfs: [
        {
          url: "https://drive.google.com/file/d/1IjNN6ucmovo1hCUdNvQ2dE004B8oYbaS/view?usp=sharing",
          title: "Cours complet"
        }
      ]
    },
    info: {
      name: "Informatique",
      pdfs: null
    },
    technologie: {
      name: "Technologie",
      pdfs: [
        {
          url: "https://drive.google.com/file/d/1FDrYadg0eqKK09vpF0T0Jc7hjwrysYll/view?usp=sharing",
          title: "Cours complet"
        }
      ]
    },
    electrotechnique: {
      name: "Électrotechnique",
      pdfs: [
        {
          url: "https://drive.google.com/file/d/1bgTwZmhl_WodNnRDr6YmjDQCCrITs0oS/view?usp=sharing",
          title: "Partie 1"
        },
        {
          url: "https://drive.google.com/file/d/1LfKLO9j5XX20EsbETdt9e76OIa0wiUGM/view?usp=sharing",
          title: "Partie 2"
        },
        {
          url: "https://drive.google.com/file/d/1egoxMDNnT1RE_h5ShUQ-40NLyto9eN6Y/view?usp=sharing",
          title: "Partie 3"
        }
      ]
    },
    mesure_essai: {
      name: "Mesure Essai",
      pdfs: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier",
      pdfs: null
    },
    cm: {
      name: "Construction Mécanique",
      pdfs: null
    },
    automatisme: {
      name: "Automatisme",
      pdfs: [
        {
          url: "https://drive.google.com/file/d/1nO4OdXRSoyURxV11Je22wsTopMQxiV87/view?usp=sharing",
          title: "Partie 1"
        }
      ]
    },
    metallurgie: {
      name: "Métallurgie",
      pdfs: [
        {
          url: "https://drive.google.com/file/d/1_gW0Cwu5GJoAa75LrcEKWxnA1V0qNCCu/view?usp=sharing",
          title: "Cours complet"
        }
      ]
    }
  }
};

export default function Courses() {
  const [searchParams] = useSearchParams();
  const initialLevel = searchParams.get("level") || "terminale";
  const initialSubject = searchParams.get("subject") || "";
  const initialPdfIndex = parseInt(searchParams.get("pdfIndex") || "0");
  const initialPdfUrl = searchParams.get("pdf");

  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(initialPdfIndex);
  const [selectedPDF, setSelectedPDF] = useState(initialPdfUrl || "");
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    if (initialPdfUrl) {
      setSelectedPDF(decodeURIComponent(initialPdfUrl));
      
      if (!initialSubject && selectedLevel) {
        const level = courses[selectedLevel];
        if (level) {
          Object.entries(level).forEach(([subject, data]) => {
            const pdfFound = data.pdfs?.find(pdf => pdf.url === decodeURIComponent(initialPdfUrl));
            if (pdfFound) {
              setSelectedSubject(subject);
              setSelectedPdfIndex(data.pdfs?.indexOf(pdfFound) || 0);
            }
          });
        }
      }
    }
  }, [initialPdfUrl, initialSubject, selectedLevel]);

  const handleCourseSelection = (level: string, subject: string, pdfIndex: number = 0) => {
    try {
      console.log(`Chargement du cours de ${subject} pour le niveau ${level}, partie ${pdfIndex + 1}...`);
      const course = courses[level][subject];
      
      if (!course.pdfs || course.pdfs.length === 0) {
        toast({
          variant: "destructive",
          title: "Cours non disponible",
          description: "Ce cours n'est pas encore disponible.",
        });
        return;
      }

      if (pdfIndex >= (course.pdfs?.length || 0)) {
        toast({
          variant: "destructive",
          title: "Partie non disponible",
          description: "Cette partie du cours n'existe pas.",
        });
        return;
      }

      setSelectedSubject(subject);
      setSelectedPdfIndex(pdfIndex);
      setSelectedPDF(course.pdfs[pdfIndex].url);
      
      toast({
        title: "Cours chargé",
        description: `${course.name} - ${course.pdfs[pdfIndex].title}`,
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
              {Object.entries(courses[selectedLevel]).map(([key, course]) => (
                <Card
                  key={key}
                  className={`glass transition-all duration-300 hover:shadow-lg cursor-pointer hover:scale-105 ${
                    selectedSubject === key ? 'border-2 border-[#9b87f5]' : ''
                  } ${!course.pdfs ? 'opacity-50' : ''} ${isMobile ? 'p-2' : 'p-4'}`}
                >
                  <CardHeader className={isMobile ? 'p-2' : 'p-4'}>
                    <div className="flex flex-col items-center gap-3">
                      <span className="font-medium text-center">{course.name}</span>
                      {!course.pdfs && <span className="text-sm text-gray-500">(Bientôt disponible)</span>}
                      {course.pdfs && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {course.pdfs.map((pdf, index) => (
                            <button
                              key={index}
                              onClick={() => handleCourseSelection(selectedLevel, key, index)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                selectedSubject === key && selectedPdfIndex === index
                                  ? 'bg-[#9b87f5] text-white'
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                            >
                              {pdf.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {selectedPDF && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
                  {courses[selectedLevel][selectedSubject].name}
                  {courses[selectedLevel][selectedSubject].pdfs && (
                    <span className="ml-2 text-gray-500">
                      - {courses[selectedLevel][selectedSubject].pdfs![selectedPdfIndex].title}
                    </span>
                  )}
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
