import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "À propos",
      links: [
        { name: "Notre mission", href: "/about" },
        { name: "L'équipe", href: "/team" },
        { name: "Contactez-nous", href: "/contact" },
      ],
    },
    {
      title: "Légal",
      links: [
        { name: "Conditions d'utilisation", href: "/terms" },
        { name: "Politique de confidentialité", href: "/privacy" },
        { name: "Mentions légales", href: "/legal" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Aide", href: "/help" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4 text-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            © {currentYear} Génie Facile. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}