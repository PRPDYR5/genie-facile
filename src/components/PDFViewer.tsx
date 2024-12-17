import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        console.log("Chargement du PDF:", url);
        // Télécharger le PDF depuis Supabase Storage
        const { data, error } = await supabase.storage
          .from('pdfs')
          .download(url);
        
        if (error) {
          console.error("Erreur lors du chargement du PDF:", error);
          throw error;
        }

        // Créer une URL pour le blob
        const pdfBlob = new Blob([data], { type: 'application/pdf' });
        const pdfObjectUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfObjectUrl);
        setLoading(false);
      } catch (error) {
        console.error("Erreur:", error);
        setLoading(false);
      }
    };

    loadPDF();

    // Nettoyer l'URL de l'objet lors du démontage
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [url]);

  return (
    <div className="w-full aspect-[16/9] bg-black/20 rounded-xl overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-[#9b87f5]">Chargement du PDF...</p>
        </div>
      ) : pdfUrl ? (
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          title="PDF Viewer"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Erreur lors du chargement du PDF</p>
        </div>
      )}
    </div>
  );
}