import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, MessageCircle } from "lucide-react"

export function PoeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const POE_CHAT_URL = "https://poe.com/chat/30lry84uvjiduoa6eti"

  const handleOpenChat = () => {
    window.open(POE_CHAT_URL, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  return (
    <div className="flex justify-end mb-4">
      <Card 
        className="w-64 h-64 cursor-pointer hover:shadow-lg transition-shadow duration-200 relative group"
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-end justify-center pb-4">
          <div className="flex items-center gap-2 text-white">
            <MessageCircle className="h-5 w-5" />
            <span>Ouvrir le chat</span>
          </div>
        </div>
        <img 
          src="/lovable-uploads/cd0f23ee-ff6e-4b14-ac2d-bb2c25f30827.png"
          alt="Chat avec Génie Facile"
          className="w-full h-full object-cover rounded-lg"
        />
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ouvrir le chat Poe</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <p className="text-center text-muted-foreground">
              Pour accéder au chat Poe, cliquez sur le bouton ci-dessous. Le chat s'ouvrira dans un nouvel onglet.
            </p>
            <Button 
              onClick={handleOpenChat}
              className="flex items-center gap-2 bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] hover:opacity-90"
            >
              Ouvrir le chat <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}