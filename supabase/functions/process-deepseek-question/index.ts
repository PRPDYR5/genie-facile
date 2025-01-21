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
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const { question, level, subject } = await req.json();
    console.log(`Processing ${subject} question for ${level}:`, question);

    if (!DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY is not set');
      throw new Error('API key configuration error');
    }

    const payload = {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `En tant qu'élève de ${level} en série F3, pour le cours de ${subject}: ${question}` }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };

    console.log('Sending request to Deepseek API with payload:', JSON.stringify(payload));

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.text();
    console.log('Deepseek API raw response:', responseData);

    if (!response.ok) {
      console.error('Deepseek API error status:', response.status);
      console.error('Deepseek API error response:', responseData);
      throw new Error(`Deepseek API error: ${response.status}`);
    }

    let data;
    try {
      data = JSON.parse(responseData);
    } catch (error) {
      console.error('Failed to parse Deepseek API response:', error);
      throw new Error('Invalid API response format');
    }

    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response structure');
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
        error: 'Failed to process question',
        details: error.message,
        success: false
      }),
      {
        headers: CORS_HEADERS,
        status: 500
      }
    );
  }
});