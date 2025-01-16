import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PDFList } from "@/components/PDFList";

interface Summary {
  id: string;
  title: string;
  subject: string;
  level: string;
  file_url: string;
  created_at: string;
}

export default function Summaries() {
  const [level, setLevel] = useState('terminale');
  const [subject, setSubject] = useState('math');
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');

  const handlePdfSelect = (url: string) => {
    setSelectedPdfUrl(url);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Résumés des cours</h1>
        <PDFList 
          level={level}
          subject={subject}
          onSelect={handlePdfSelect}
        />
      </div>
    </Layout>
  );
}