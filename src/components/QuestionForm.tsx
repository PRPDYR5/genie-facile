
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { Database } from "@/integrations/supabase/types"

interface QuestionFormProps {
  selectedLevel: string
  selectedSubject: string
  onQuestionSubmitted: () => void
}

type Level = Database['public']['Enums']['education_level']
type Subject = Database['public']['Enums']['subject_type']

export function QuestionForm({ selectedLevel, selectedSubject, onQuestionSubmitted }: QuestionFormProps) {
  const [userQuestion, setUserQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAskQuestion = async () => {
    if (!userQuestion.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez entrer une question"
      })
      return
    }

    if (!selectedLevel || !selectedSubject) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner un niveau et une matière"
      })
      return
    }

    setIsLoading(true)
    try {
      console.log("Envoi de la question à Deepseek:", userQuestion)
      
      // Call the Deepseek bot through Edge Function
      const { data: response, error: functionError } = await supabase.functions.invoke('process-deepseek-question', {
        body: {
          question: userQuestion,
          level: selectedLevel,
          subject: selectedSubject
        }
      })

      if (functionError) throw functionError

      const { answer } = response

      // Insert into qa_history table
      const { error: insertError } = await supabase
        .from('qa_history')
        .insert({
          question: userQuestion,
          answer,
          level: selectedLevel as Level,
          subject: selectedSubject as Subject,
          pdf_source: "deepseek-ai"
        })

      if (insertError) throw insertError

      toast({
        title: "Succès",
        description: "Votre question a été traitée avec succès"
      })

      setUserQuestion("")
      onQuestionSubmitted()
    } catch (error) {
      console.error("Erreur lors de l'envoi de la question:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de traiter votre question"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Posez votre question ici..."
        value={userQuestion}
        onChange={(e) => setUserQuestion(e.target.value)}
        className="min-h-[100px]"
      />
      <Button 
        onClick={handleAskQuestion}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          "Traitement en cours..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Poser la question
          </>
        )}
      </Button>
    </div>
  )
}
