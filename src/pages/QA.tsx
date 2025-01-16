import { Layout } from "@/components/Layout";
import { QuestionForm } from "@/components/QuestionForm";
import { QuestionHistory } from "@/components/QuestionHistory";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface QAEntry {
  id: string;
  question: string;
  answer: string;
  pdf_source: string;
  subject: 'math' | 'physics' | 'info';
  level: 'seconde' | 'premiere' | 'terminale';
  created_at: string;
}

export default function QA() {
  const [qaHistory, setQaHistory] = useState<QAEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('terminale');
  const [selectedSubject, setSelectedSubject] = useState<string>('math');

  useEffect(() => {
    fetchQAHistory();
  }, []);

  const fetchQAHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('qa_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQaHistory(data || []);
    } catch (error) {
      console.error('Error fetching QA history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Questions & Réponses</h1>
        <QuestionForm 
          selectedLevel={selectedLevel}
          selectedSubject={selectedSubject}
          onQuestionSubmitted={fetchQAHistory}
        />
        <QuestionHistory qaHistory={qaHistory} />
      </div>
    </Layout>
  );
}