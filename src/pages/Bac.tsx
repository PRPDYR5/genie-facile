import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BookOpen, Calendar, Download, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Bac = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("bac1");

  const examData = {
    bac1: [
      {
        year: "2023",
        subjects: [
          {
            name: "Mathématiques",
            downloadUrl: "#",
            isNew: true
          },
          {
            name: "Sciences Physiques",
            downloadUrl: "#",
            isNew: true
          },
          {
            name: "Informatique",
            downloadUrl: "#",
            isNew: true
          }
        ]
      },
      {
        year: "2022",
        subjects: [
          {
            name: "Mathématiques",
            downloadUrl: "#"
          },
          {
            name: "Sciences Physiques",
            downloadUrl: "#"
          }
        ]
      }
    ],
    bac2: [
      {
        year: "2023",
        subjects: [
          {
            name: "Mathématiques",
            downloadUrl: "#",
            isNew: true
          },
          {
            name: "Sciences Physiques",
            downloadUrl: "#",
            isNew: true
          }
        ]
      }
    ]
  };

  const filteredExams = examData[selectedModule as keyof typeof examData].filter(exam => {
    const matchesSearch = exam.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subjects.some(subject => subject.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Examens du BAC</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Accédez aux examens des années précédentes
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher par année ou matière..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedModule} onValueChange={setSelectedModule}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bac1">BAC I</TabsTrigger>
            <TabsTrigger value="bac2">BAC II</TabsTrigger>
          </TabsList>

          {["bac1", "bac2"].map((module) => (
            <TabsContent key={module} value={module} className="space-y-6">
              {filteredExams.map((exam) => (
                <Card key={exam.year} className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#9b87f5]" />
                      <h3 className="text-xl font-semibold">
                        Session {exam.year}
                      </h3>
                    </div>
                  </CardHeader>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {exam.subjects.map((subject) => (
                      <div
                        key={subject.name}
                        className="flex items-start gap-3 p-4 rounded-lg border border-[#9b87f5]/20 hover:bg-[#9b87f5]/5 transition-colors"
                      >
                        <BookOpen className="h-5 w-5 text-[#9b87f5] mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{subject.name}</span>
                            {subject.isNew && (
                              <Badge variant="secondary" className="bg-[#9b87f5]/20 text-[#9b87f5]">
                                Nouveau
                              </Badge>
                            )}
                          </div>
                          <button
                            className="mt-2 text-sm text-[#9b87f5] hover:text-[#8b77e5] flex items-center gap-1"
                            onClick={() => window.open(subject.downloadUrl, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                            Télécharger
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Bac;