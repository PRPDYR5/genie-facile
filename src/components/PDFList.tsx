import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface PDFListProps {
  level: string;
  subject: string;
  onSelect: (url: string) => void;
}

export function PDFList({ level, subject, onSelect }: PDFListProps) {
  const [pdfs, setPdfs] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    // Ici, nous simulerons une liste de PDFs
    // Dans une vraie application, cela viendrait d'une base de données
    const mockPDFs = [
      {
        name: "Chapitre 1 - Introduction",
        url: `/pdfs/${level}/${subject}/chapitre1.pdf`
      },
      {
        name: "Chapitre 2 - Concepts de base",
        url: `/pdfs/${level}/${subject}/chapitre2.pdf`
      },
    ];
    
    setPdfs(mockPDFs);
    console.log("Loading PDFs for:", level, subject);
  }, [level, subject]);

  return (
    <div className="space-y-4">
      {pdfs.map((pdf) => (
        <Button
          key={pdf.name}
          variant="outline"
          className="w-full justify-start gap-2 glass"
          onClick={() => onSelect(pdf.url)}
        >
          <FileText className="w-4 h-4" />
          {pdf.name}
        </Button>
      ))}
    </div>
  );
}