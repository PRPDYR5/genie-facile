import { Link } from "react-router-dom";
import { ExternalLink, Info, FileText, Users, Mail, Copyright } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="mt-auto py-8 px-4 bg-background border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Informations légales
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openExternalLink('https://politique-de-confidentia-kh6hqlv.gamma.site/')}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  Politique de confidentialité
                  <ExternalLink className="w-4 h-4" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => openExternalLink('https://conditions-generales-dut-uo89atv.gamma.site/')}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  Conditions générales d'utilisation
                  <ExternalLink className="w-4 h-4" />
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              À propos
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openExternalLink('https://a-propos-de-genie-facile-dr34tf1.gamma.site/')}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  À propos de nous
                  <ExternalLink className="w-4 h-4" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => openExternalLink('https://contactez-nous-une-equip-u8zsh28.gamma.site/')}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  Contactez-nous
                  <ExternalLink className="w-4 h-4" />
                </button>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Copyright className="w-5 h-5 text-primary" />
              Crédits
            </h3>
            <button
              onClick={() => openExternalLink('https://mention-de-droits-dauteu-jjlggll.gamma.site/')}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              © {currentYear} Génie Facile. Tous droits réservés.
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}