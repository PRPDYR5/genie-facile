
import { useEffect } from 'react';

export function BotpressChat() {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/01/30/21/20250130210003-RPD14KBI.js';
    script2.async = true;
    document.head.appendChild(script2);

    return () => {
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
      if (document.head.contains(script2)) {
        document.head.removeChild(script2);
      }
    };
  }, []);

  return null;
}
