
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { Resend } from "npm:resend@2.0.0"

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);
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
    console.log('Vérification des sessions à notifier...');
    
    // Récupérer les sessions qui doivent être notifiées
    const now = new Date();
    const { data: sessions, error: sessionsError } = await supabase
      .from('study_schedules')
      .select('*, users:user_id(email)')
      .eq('email_sent', false)
      .lte('start_time', now.toISOString());

    if (sessionsError) {
      throw sessionsError;
    }

    console.log(`${sessions?.length || 0} sessions trouvées à notifier`);

    if (!sessions || sessions.length === 0) {
      return new Response(JSON.stringify({ message: 'Aucune session à notifier' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Envoyer les emails pour chaque session
    const results = await Promise.all(
      sessions.map(async (session) => {
        try {
          if (!session.users?.email) {
            console.error('Email manquant pour la session:', session.id);
            return null;
          }

          const emailResponse = await resend.emails.send({
            from: 'Génie Facile <onboarding@resend.dev>',
            to: session.users.email,
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

          if (emailResponse.error) {
            throw emailResponse.error;
          }

          // Marquer l'email comme envoyé
          const { error: updateError } = await supabase
            .from('study_schedules')
            .update({ email_sent: true })
            .eq('id', session.id);

          if (updateError) {
            throw updateError;
          }

          console.log(`Email envoyé avec succès pour la session ${session.id}`);
          return { sessionId: session.id, status: 'success' };
        } catch (error) {
          console.error(`Erreur lors de l'envoi de l'email pour la session ${session.id}:`, error);
          return { sessionId: session.id, status: 'error', error };
        }
      })
    );

    console.log('Résultats des envois:', results);

    return new Response(
      JSON.stringify({ 
        message: 'Traitement des rappels terminé',
        results 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Erreur générale:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
