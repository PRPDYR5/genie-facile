import { motion } from "framer-motion";
import { Shield, User, Lock, FileKey, UserCog } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Privacy() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const sections = [
    {
      title: "Données collectées",
      icon: <User className="w-8 h-8 text-primary" />,
      content: [
        "Email et informations de profil",
        "Préférences de thème et paramètres",
        "Historique des questions et réponses",
        "Plannings d'études personnalisés"
      ],
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
    },
    {
      title: "Protection des données",
      icon: <Shield className="w-8 h-8 text-primary" />,
      content: [
        "Cryptage de bout en bout",
        "Stockage sécurisé sur des serveurs protégés",
        "Pas de partage avec des tiers sans consentement",
        "Mises à jour régulières des protocoles de sécurité"
      ],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    },
    {
      title: "Droits des utilisateurs",
      icon: <UserCog className="w-8 h-8 text-primary" />,
      content: [
        "Accès complet à vos données personnelles",
        "Option de suppression de compte",
        "Modification des informations à tout moment",
        "Contrôle des préférences de confidentialité"
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous nous engageons à protéger vos données personnelles et à assurer une transparence totale sur leur utilisation.
          </p>
        </motion.div>

        <div className="grid gap-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      {section.icon}
                      <h2 className="text-2xl font-semibold">{section.title}</h2>
                    </div>
                    <ul className="space-y-4">
                      {section.content.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-3 text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                        >
                          <Lock className="w-4 h-4 text-primary" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-[300px] md:h-auto">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 glass text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <FileKey className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">
            Vos données, votre contrôle
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pour toute question concernant vos données personnelles ou pour exercer vos droits,
            n'hésitez pas à nous contacter via notre formulaire de contact.
          </p>
        </motion.div>
      </div>
    </div>
  );
}