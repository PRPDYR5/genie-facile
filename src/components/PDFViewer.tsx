import { useEffect, useState } from "react";

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Loading PDF:", url);
    setLoading(false);
  }, [url]);

  return (
    <div className="w-full aspect-[16/9] bg-black/20 rounded-xl overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-[#9b87f5]">Chargement du PDF...</p>
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