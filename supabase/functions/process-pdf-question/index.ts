import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Check if API key is set
    if (!PERPLEXITY_API_KEY) {
      console.error('PERPLEXITY_API_KEY is not set')
      throw new Error('PERPLEXITY_API_KEY is not set')
    }

    const { question, level, subject } = await req.json()
    console.log(`Processing question for ${level} ${subject}:`, question)

    // Get PDF URL
    const pdfUrl = getPdfUrl(level, subject)
    console.log("URL du PDF:", pdfUrl)

    if (!pdfUrl) {
      console.error('No PDF URL found for', { level, subject })
      throw new Error(`No PDF available for ${level} ${subject}`)
    }

    // Build prompt for Perplexity
    const prompt = `En tant que professeur de ${subject} niveau ${level}, réponds à cette question: "${question}". 
    Utilise le contenu du cours disponible à ${pdfUrl} pour formuler ta réponse.
    Sois précis et pédagogique dans ta réponse.`

    console.log("Sending request to Perplexity API")
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Tu es un professeur expert qui aide les élèves à comprendre leurs cours.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1000
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Perplexity API error:', errorText)
      throw new Error(`Perplexity API error: ${response.status}`)
    }

    const data = await response.json()
    const answer = data.choices[0].message.content

    console.log("Generated answer:", answer)

    return new Response(
      JSON.stringify({ 
        answer,
        pdfSource: pdfUrl
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error("Error processing question:", error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred processing your question'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function getPdfUrl(level: string, subject: string): string {
  const pdfUrls = {
    premiere: {
      math: "https://drive.google.com/file/d/1e7pV0w9cUvz4sEzrVQuvQjpljLOEjvQE/view?usp=sharing",
      physics: "https://drive.google.com/file/d/1eAYwN6aok-KtenwNjrPh1Ys2NErswDC9/view?usp=sharing",
      info: "https://drive.google.com/file/d/1hZCyx3nuPEtc4LZAWFAnKyrAaYD2WVN7/view?usp=sharing"
    },
    terminale: {
      math: "https://drive.google.com/file/d/1rf1c14mTVBT0LiCjGEfMJ_lKsEIIO7J4/view?usp=sharing",
      physics: "https://drive.google.com/file/d/1wki9fTD9_ur9rhtuxgKUI3Xlwg78Wzeo/view?usp=sharing",
      info: "https://drive.google.com/file/d/1EN-VnNdOsOr_iDvjjd6eD-z_ZzerbpEU/view?usp=sharing"
    }
  }

  return pdfUrls[level as keyof typeof pdfUrls]?.[subject as 'math' | 'physics' | 'info'] || ''
}