import { MessageCircle, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SocialLinks() {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://chat.whatsapp.com/KEGeUBRJdSP5Ia35Wy5fdu",
      color: "bg-[#25D366]",
      hoverColor: "hover:bg-[#128C7E]",
    },
    {
      name: "Telegram",
      icon: MessagesSquare,
      url: "https://t.me/geniefacile05",
      color: "bg-[#0088cc]",
      hoverColor: "hover:bg-[#0077b5]",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 gradient-text">
          Rejoignez notre communauté
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <Button
              key={link.name}
              onClick={() => window.open(link.url, "_blank")}
              className={`${link.color} ${link.hoverColor} text-white px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 animate-fade-in`}
            >
              <link.icon className="w-6 h-6 mr-2" />
              {link.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}