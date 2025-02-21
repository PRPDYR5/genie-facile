
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
    console.log('Démarrage de la vérification des sessions...');
    
    // Récupérer les sessions à notifier
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);
    
    console.log(`Recherche des sessions entre ${fiveMinutesAgo.toISOString()} et ${fiveMinutesFromNow.toISOString()}`);

    const { data: sessions, error: sessionsError } = await supabase
      .from('study_schedules')
      .select(`
        *,
        profiles:user_id (
          username,
          email
        )
      `)
      .eq('email_sent', false)
      .gte('start_time', fiveMinutesAgo.toISOString())
      .lte('start_time', fiveMinutesFromNow.toISOString());

    if (sessionsError) {
      console.error('Erreur lors de la récupération des sessions:', sessionsError);
      throw sessionsError;
    }

    console.log(`${sessions?.length || 0} sessions trouvées à notifier`);

    if (!sessions || sessions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Aucune session à notifier' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Envoyer les emails
    const results = await Promise.all(
      sessions.map(async (session) => {
        try {
          console.log('Traitement de la session:', session);
          
          if (!session.profiles?.email) {
            console.error('Email manquant pour la session:', session.id);
            return { sessionId: session.id, status: 'error', error: 'Email manquant' };
          }

          const username = session.profiles.username || 'étudiant';
          
          const emailResponse = await resend.emails.send({
            from: 'Génie Facile <onboarding@resend.dev>',
            to: session.profiles.email,
            subject: `📚 C'est l'heure de votre session : ${session.title}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #6366f1;">C'est l'heure d'étudier !</h2>
                <p>Salut ${username},</p>
                <p>Il est temps de commencer votre session : <strong>${session.title}</strong></p>
                <p>Bonne étude avec Génie Facile !</p>
                <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
                  <p style="margin: 0;"><strong>Détails de la session :</strong></p>
                  <p style="margin: 5px 0;">Matière : ${session.subject}</p>
                  <p style="margin: 5px 0;">Niveau : ${session.level}</p>
                </div>
              </div>
            `,
          });

          console.log('Réponse de Resend:', emailResponse);

          // Marquer l'email comme envoyé
          const { error: updateError } = await supabase
            .from('study_schedules')
            .update({ email_sent: true })
            .eq('id', session.id);

          if (updateError) {
            console.error('Erreur lors de la mise à jour du statut:', updateError);
            throw updateError;
          }

          console.log(`Email envoyé avec succès pour la session ${session.id}`);
          return { sessionId: session.id, status: 'success' };
        } catch (error) {
          console.error(`Erreur pour la session ${session.id}:`, error);
          return { sessionId: session.id, status: 'error', error };
        }
      })
    );

    return new Response(
      JSON.stringify({ message: 'Traitement terminé', results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur générale:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
