
import { useEffect } from 'react';

export function BotpressChat() {
  useEffect(() => {
    // Nettoyage des anciens scripts s'ils existent
    const existingScripts = document.querySelectorAll('script[data-botpress]');
    existingScripts.forEach(script => script.remove());
    
    // Ajout du script Botpress principal
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    script1.setAttribute('data-botpress', 'true');
    document.head.appendChild(script1);

    // Ajout du script de configuration
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/01/30/21/20250130210003-RPD14KBI.js';
    script2.async = true;
    script2.setAttribute('data-botpress', 'true');
    document.head.appendChild(script2);

    // Nettoyage au démontage du composant
    return () => {
      const scripts = document.querySelectorAll('script[data-botpress]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 w-[400px] h-[600px] glass dark:bg-gray-900/50 rounded-xl shadow-lg overflow-hidden">
      <div 
        id="bp-web-widget-container" 
        className="h-full w-full"
      />
    </div>
  );
}
