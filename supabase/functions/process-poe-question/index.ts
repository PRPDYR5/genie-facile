import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  try {
    const { question, level, subject, botId } = await req.json()
    console.log(`Processing question for ${level} ${subject} using bot ${botId}:`, question)

    // Here we would normally integrate with the Poe API
    // For now, we'll return a mock response
    const answer = `Cette réponse est générée par le bot Poe (${botId}) pour une question de ${subject} niveau ${level}. La question était: ${question}`

    return new Response(
      JSON.stringify({
        answer,
        success: true
      }),
      {
        headers: CORS_HEADERS,
        status: 200
      }
    )
  } catch (error) {
    console.error('Error processing question:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to process question',
        details: error.message
      }),
      {
        headers: CORS_HEADERS,
        status: 500
      }
    )
  }
})