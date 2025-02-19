
import { useEffect } from 'react';

export function BotpressChat() {
  useEffect(() => {
    console.log("Initialisation du chat Botpress...");
    
    // Ajout du script Botpress
    const script = document.createElement('script');
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.head.appendChild(script);

    // Configuration du chatbot
    script.onload = () => {
      // @ts-ignore
      window.botpressWebChat.init({
        "botId": "5883d95d-ddb0-443c-a0e2-f366c0cac2c6",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "5883d95d-ddb0-443c-a0e2-f366c0cac2c6",
        "containerWidth": "100%",
        "layoutWidth": "100%",
        "hideWidget": true,
        "showPoweredBy": false
      });
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="h-[80vh] w-full">
      <div 
        id="webchat"
        className="h-full w-full rounded-xl overflow-hidden"
      />
    </div>
  );
}
