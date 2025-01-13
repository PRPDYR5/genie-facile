import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

export function PoeChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex justify-end mb-4">
      <Card 
        className="w-64 h-64 cursor-pointer hover:shadow-lg transition-shadow duration-200"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src="/lovable-uploads/cd0f23ee-ff6e-4b14-ac2d-bb2c25f30827.png"
          alt="Chat avec Génie Facile"
          className="w-full h-full object-cover rounded-lg"
        />
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <iframe
            src="https://poe.com/chat/30lry84uvjiduoa6eti"
            className="w-full h-full border-none"
            title="Poe Chat"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}