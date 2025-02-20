import { useEffect } from 'react';
export function BotpressChat() {
  useEffect(() => {
    console.log("Initialisation du chat Botpress...");

    // Ajout du script Botpress
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.head.appendChild(script1);

    // Ajout du script de configuration
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/01/30/21/20250130210003-RPD14KBI.js';
    script2.async = true;
    document.head.appendChild(script2);

    // Nettoyage au démontage
    return () => {
      console.log("Nettoyage des scripts Botpress...");
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
      if (document.head.contains(script2)) {
        document.head.removeChild(script2);
      }
    };
  }, []);
  return <div className="h-[600px] w-full glass dark:bg-gray-900/50">
      
    </div>;
}