import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PDFList } from "@/components/PDFList";
import type { Summary } from "@/types/summaries";

export default function Summaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const { data: coursesData } = await supabase
          .from('summaries')
          .select('*')
          .order('created_at', { ascending: false });

        if (coursesData) {
          setSummaries(coursesData as Summary[]);
        }
      } catch (error) {
        console.error('Error fetching summaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Résumés des cours</h1>
        <PDFList pdfs={summaries} loading={loading} />
      </div>
    </Layout>
  );
}