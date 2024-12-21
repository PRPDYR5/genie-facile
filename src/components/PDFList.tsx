import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

interface PDFListProps {
  level: string;
  subject: string;
  onSelect: (url: string) => void;
}

export function PDFList({ level, subject, onSelect }: PDFListProps) {
  const [pdfs, setPdfs] = useState<{ name: string; url: string }[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
    <div className="space-y-2">
      {pdfs.length === 0 ? (
        <p className="text-center text-[#9b87f5]/70">
          Aucun cours disponible pour le moment
        </p>
      ) : (
        pdfs.map((pdf) => (
          <Button
            key={pdf.name}
            variant="outline"
            className={`w-full justify-start gap-2 glass ${
              isMobile ? 'text-sm py-2 px-3' : 'py-3 px-4'
            }`}
            onClick={() => handlePDFSelect(pdf)}
          >
            <FileText className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            <span className="truncate">{pdf.name}</span>
          </Button>
        ))
      )}
    </div>
  );
}