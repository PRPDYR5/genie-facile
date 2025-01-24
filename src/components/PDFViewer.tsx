import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { convertGoogleDriveUrl } from "@/utils/pdfUtils";

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const initPDFViewer = () => {
      try {
        if (!url) {
          setLoading(false);
          return;
        }

        console.log("URL d'origine:", url);
        const convertedUrl = convertGoogleDriveUrl(url);
        console.log("URL convertie:", convertedUrl);
        setEmbedUrl(convertedUrl);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de l'initialisation du viewer:", err);
        setError("Impossible de charger le PDF");
        setLoading(false);
      }
    };

    setLoading(true);
    initPDFViewer();
  }, [url]);

  if (!url) {
    return (
      <div className={`w-full ${isMobile ? 'h-[80vh]' : 'h-[85vh]'} bg-black/20 rounded-xl overflow-hidden flex items-center justify-center`}>
        <p className="text-[#9b87f5]">Veuillez sélectionner un cours</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${isMobile ? 'h-[80vh]' : 'h-[85vh]'} bg-black/20 rounded-xl overflow-hidden`}>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-[#9b87f5]">Chargement du PDF...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          className="w-full h-full"
          title="PDF Viewer"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}
    </div>
  );
}