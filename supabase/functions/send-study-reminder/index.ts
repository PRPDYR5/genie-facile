
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session, user } = await req.json();

    const emailResponse = await resend.emails.send({
      from: 'Génie Facile <onboarding@resend.dev>',
      to: user.email,
      subject: `📚 Rappel d'étude – ${session.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Rappel de session d'étude</h2>
          <p>Salut,</p>
          <p>Il est temps de commencer ta session d'étude : <strong>${session.title}</strong></p>
          <p>Bon apprentissage avec Génie Facile !</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
            <p style="margin: 0;"><strong>Détails de la session :</strong></p>
            <p style="margin: 5px 0;">Matière : ${session.subject}</p>
            <p style="margin: 5px 0;">Niveau : ${session.level}</p>
          </div>
        </div>
      `,
    });

    console.log('Email sent:', emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
