import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 px-4 bg-background border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Conditions générales d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contactez-nous
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