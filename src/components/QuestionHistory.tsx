import { Card } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

interface QuestionHistoryProps {
  qaHistory: Array<{
    id: string
    question: string
    answer: string
    level: string
    subject: string
  }>
}

export function QuestionHistory({ qaHistory }: QuestionHistoryProps) {
  if (qaHistory.length === 0) {
    return (
      <Card className="p-6 glass text-center">
        <p className="text-[#9b87f5]">
          Aucune question disponible pour les critères sélectionnés
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {qaHistory.map((qa) => (
        <Card key={qa.id} className="p-6 glass space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-[#9b87f5]" />
            </div>
            <div className="flex gap-4 text-sm text-[#9b87f5]/60">
              <span>{qa.level}</span>
              <span>•</span>
              <span>{qa.subject}</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#9b87f5] mb-2">
              {qa.question}
            </h3>
            <p className="text-[#9b87f5]/80 bg-[#9b87f5]/10 p-4 rounded-lg">
              {qa.answer}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}