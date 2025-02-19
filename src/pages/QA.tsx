
import { Layout } from "@/components/Layout"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { QuestionForm } from "@/components/QuestionForm"
import { QuestionHistory } from "@/components/QuestionHistory"
import { BotpressChat } from "@/components/BotpressChat"

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
      <div className="h-full">
        <BotpressChat />
      </div>
    </Layout>
  )
}

export default QA