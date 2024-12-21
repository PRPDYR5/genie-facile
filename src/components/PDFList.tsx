import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PDFListProps {
  level: string;
  subject: string;
  onSelect: (url: string) => void;
}

export function PDFList({ level, subject, onSelect }: PDFListProps) {
  const [pdfs, setPdfs] = useState<{ name: string; url: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadPDFs = async () => {
      try {
        console.log("Chargement des PDFs pour:", level, subject);
        const path = `${level}/${subject}`;
        const { data, error } = await supabase.storage
          .from('pdfs')
          .list(path);

        if (error) {
          throw error;
        }

        const pdfFiles = await Promise.all(
          data
            .filter(file => file.name.endsWith('.pdf'))
            .map(async file => {
              const { data: { publicUrl } } = supabase.storage
                .from('pdfs')
                .getPublicUrl(`${path}/${file.name}`);

              return {
                name: file.name.replace('.pdf', ''),
                url: publicUrl
              };
            })
        );

        setPdfs(pdfFiles);
      } catch (error) {
        console.error("Erreur lors du chargement des PDFs:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger la liste des PDFs",
        });
      }
    };

    loadPDFs();
  }, [level, subject, toast]);

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
      {pdfs.length === 0 ? (
        <p className="text-center text-[#9b87f5]/70">
          Aucun cours disponible pour le moment
        </p>
      ) : (
        pdfs.map((pdf) => (
          <Button
            key={pdf.name}
            variant="outline"
            className="w-full justify-start gap-2 glass"
            onClick={() => handlePDFSelect(pdf)}
          >
            <FileText className="w-4 h-4" />
            {pdf.name}
          </Button>
        ))
      )}
    </div>
  );
}