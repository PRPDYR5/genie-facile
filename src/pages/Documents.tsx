
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Book, Search, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Document {
  title: string;
  level: string;
  subject: string;
  downloadUrl: string | null;
  isNew?: boolean;
}

const subjects = [
  { value: "info", label: "Informatique" },
  { value: "physics", label: "Sciences Physiques" },
  { value: "electrotechnique", label: "Électrotechnique" },
  { value: "mesure_essai", label: "Mesure Essai" },
  { value: "cm", label: "Construction Mécanique" },
  { value: "automatisme", label: "Automatisme" },
  { value: "tpa", label: "Travaux Pratiques Atelier" }
];

const levels = [
  { value: "seconde", label: "Seconde" },
  { value: "premiere", label: "Première" },
  { value: "terminale", label: "Terminale" }
];

const documents: Document[] = subjects.flatMap(subject =>
  levels.map(level => ({
    title: `Document ${subject.label} ${level.label} F3`,
    level: level.label,
    subject: subject.label,
    downloadUrl: null // "Bientôt disponible"
  }))
);

export default function Documents() {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documents.filter(doc => {
    const matchesLevel = !selectedLevel || doc.level.toLowerCase() === selectedLevel;
    const matchesSubject = !selectedSubject || doc.subject === subjects.find(s => s.value === selectedSubject)?.label;
    const matchesSearch = !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSubject && matchesSearch;
  });

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Annales et Documents</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Accédez à tous les documents pédagogiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir un niveau" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir une matière" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredDocuments.map((doc, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                  <Book className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{doc.title}</h3>
                    {doc.isNew && (
                      <Badge variant="secondary" className="bg-[#9b87f5]/20 text-[#9b87f5]">
                        Nouveau
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 text-sm text-[#9b87f5]/70 mb-3">
                    <span>{doc.level}</span>
                    <span>•</span>
                    <span>{doc.subject}</span>
                  </div>
                  <button
                    className={`text-sm flex items-center gap-1 ${
                      doc.downloadUrl
                        ? "text-[#9b87f5] hover:text-[#8b77e5] cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => doc.downloadUrl && window.open(doc.downloadUrl, '_blank')}
                    disabled={!doc.downloadUrl}
                  >
                    <Download className="h-4 w-4" />
                    {doc.downloadUrl ? "Télécharger" : "Bientôt disponible"}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
