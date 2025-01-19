import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

const SYSTEM_PROMPT = `Tu es un assistant spécialisé dans l'enseignement des sciences, des mathématiques et de la technologie pour les élèves de la série F3. 
Tu dois:
- Répondre uniquement aux questions liées aux mathématiques, à la physique, à l'informatique et aux matières techniques
- Donner des explications claires et adaptées au niveau scolaire
- Utiliser des exemples concrets quand c'est possible
- Décomposer les problèmes complexes en étapes simples
- Ne pas répondre aux questions hors sujet
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    if (!DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY is not set');
      throw new Error('Configuration de la clé API manquante');
    }

    const { question, level, subject } = await req.json();
    
    if (!question || !level || !subject) {
      throw new Error('Paramètres manquants (question, niveau ou matière)');
    }

    console.log(`Processing ${subject} question for ${level}:`, question);

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `En tant qu'élève de ${level} en série F3, pour le cours de ${subject}: ${question}` }
    ];

    console.log('Sending request to Deepseek API with messages:', JSON.stringify(messages));

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Deepseek API error:', response.status, errorText);
      throw new Error(`Erreur de l'API Deepseek: ${response.status}`);
    }

    const data = await response.json();
    console.log('Deepseek API response:', JSON.stringify(data));

    if (!data.choices?.[0]?.message?.content) {
      console.error('Format de réponse invalide:', data);
      throw new Error('Format de réponse invalide de l\'API');
    }

    const answer = data.choices[0].message.content;
    console.log('Generated answer:', answer);

    return new Response(
      JSON.stringify({ answer, success: true }),
      { headers: CORS_HEADERS }
    );

  } catch (error) {
    console.error('Error processing question:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Impossible de traiter la question',
        details: error.message,
        success: false
      }),
      {
        headers: CORS_HEADERS,
        status: 400
      }
    );
  }
});