import { Layout } from "@/components/Layout"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { QuestionForm } from "@/components/QuestionForm"
import { QuestionHistory } from "@/components/QuestionHistory"
import { PoeChat } from "@/components/PoeChat"

type Level = "seconde" | "premiere" | "terminale"
type Subject = "math" | "physics" | "info"

const QA = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level | "">("")
  const [selectedSubject, setSelectedSubject] = useState<Subject | "">("")
  const [qaHistory, setQaHistory] = useState<any[]>([])

  const levels = [
    { value: "seconde" as Level, label: "Seconde" },
    { value: "premiere" as Level, label: "Première" },
    { value: "terminale" as Level, label: "Terminale" }
  ]

  const subjects = [
    { value: "math" as Subject, label: "Mathématiques" },
    { value: "physics" as Subject, label: "Sciences Physiques" },
    { value: "info" as Subject, label: "Informatique" }
  ]

  const loadQAHistory = async () => {
    try {
      console.log("Chargement de l'historique Q&A...")
      let query = supabase.from('qa_history').select('*')
      
      if (selectedLevel) {
        query = query.eq('level', selectedLevel)
      }
      if (selectedSubject) {
        query = query.eq('subject', selectedSubject)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      console.log("Historique Q&A chargé:", data)
      setQaHistory(data || [])
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique:", error)
    }
  }

  useEffect(() => {
    loadQAHistory()
  }, [selectedLevel, selectedSubject])

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Questions-Réponses</h1>
          <p className="text-lg text-[#9b87f5]/80">
            Posez vos questions sur les cours et obtenez des réponses personnalisées
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#9b87f5]">Niveau</label>
            <Select value={selectedLevel} onValueChange={(value: Level) => setSelectedLevel(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un niveau" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#9b87f5]">Matière</label>
            <Select value={selectedSubject} onValueChange={(value: Subject) => setSelectedSubject(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une matière" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-6 glass">
              <QuestionForm
                selectedLevel={selectedLevel}
                selectedSubject={selectedSubject}
                onQuestionSubmitted={loadQAHistory}
              />
            </Card>
          </div>
          <div className="md:col-span-1">
            <PoeChat />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#9b87f5]">
            Historique des questions
          </h2>
          <QuestionHistory qaHistory={qaHistory} />
        </div>
      </div>
    </Layout>
  )
}

export default QA