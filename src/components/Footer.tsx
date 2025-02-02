import { Link } from "react-router-dom";
import { Shield, FileText, Info, Mail, Rss } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 px-4 bg-background border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#9b87f5]" />
              Informations légales
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Conditions générales d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-[#9b87f5]" />
              À propos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  À propos de nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#9b87f5]" />
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Rss className="h-5 w-5 text-[#9b87f5]" />
              Blog
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Rss className="h-4 w-4" />
                  Articles et actualités
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Crédits</h3>
            <p className="text-muted-foreground">
              © {currentYear} Génie Facile. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}