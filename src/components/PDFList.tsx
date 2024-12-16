import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PDFListProps {
  level: string;
  subject: string;
  onSelect: (url: string) => void;
}

export function PDFList({ level, subject, onSelect }: PDFListProps) {
  const [pdfs, setPdfs] = useState<{ name: string; url: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulation de chargement des PDFs
    const mockPDFs = [
      {
        name: "Chapitre 1 - Introduction",
        url: `/pdfs/${level}/${subject}/chapitre1.pdf`
      },
      {
        name: "Chapitre 2 - Concepts de base",
        url: `/pdfs/${level}/${subject}/chapitre2.pdf`
      },
      {
        name: "Chapitre 3 - Applications",
        url: `/pdfs/${level}/${subject}/chapitre3.pdf`
      }
    ];
    
    setPdfs(mockPDFs);
    console.log("Chargement des PDFs pour:", level, subject);
  }, [level, subject]);

  const handlePDFSelect = (pdf: { name: string; url: string }) => {
    console.log("PDF sélectionné:", pdf.name);
    onSelect(pdf.url);
    toast({
      title: "PDF chargé",
      description: `Le document "${pdf.name}" a été chargé avec succès.`,
    });
  };

  return (
    <div className="space-y-4">
      {pdfs.map((pdf) => (
        <Button
          key={pdf.name}
          variant="outline"
          className="w-full justify-start gap-2 glass"
          onClick={() => handlePDFSelect(pdf)}
        >
          <FileText className="w-4 h-4" />
          {pdf.name}
        </Button>
      ))}
    </div>
  );
}