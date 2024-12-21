import { useEffect, useState } from "react";

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPDFAvailability = async () => {
      try {
        console.log("Vérification de la disponibilité du PDF:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Le cours n'est pas encore disponible");
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement du PDF:", err);
        setError("Le cours n'est pas encore disponible");
        setLoading(false);
      }
    };

    if (url) {
      checkPDFAvailability();
    }
  }, [url]);

  if (!url) {
    return (
      <div className="w-full aspect-[16/9] bg-black/20 rounded-xl overflow-hidden flex items-center justify-center">
        <p className="text-[#9b87f5]">Veuillez sélectionner un cours</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[16/9] bg-black/20 rounded-xl overflow-hidden">
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
          src={url}
          className="w-full h-full"
          title="PDF Viewer"
        />
      )}
    </div>
  );
}