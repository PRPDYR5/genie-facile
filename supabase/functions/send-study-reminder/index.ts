
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from 'npm:resend@2.0.0';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { StudyReminderEmail } from './_templates/study-reminder.tsx';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sendStudyReminders() {
  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

  // Récupérer les sessions qui commencent dans les 5 prochaines minutes
  const { data: sessions, error } = await supabase
    .from('study_schedules')
    .select(`
      *,
      profiles:user_id (
        username,
        email
      )
    `)
    .eq('email_sent', false)
    .gte('start_time', now.toISOString())
    .lte('start_time', fiveMinutesFromNow.toISOString())
    .eq('notification_enabled', true);

  if (error) {
    console.error('Erreur lors de la récupération des sessions:', error);
    throw error;
  }

  console.log(`${sessions?.length || 0} rappels à envoyer`);

  for (const session of sessions || []) {
    try {
      const html = await renderAsync(StudyReminderEmail({
        username: session.profiles?.username || 'étudiant',
        sessionTitle: session.title,
        subject: session.subject,
        level: session.level
      }));

      await resend.emails.send({
        from: 'Génie Facile <onboarding@resend.dev>',
        to: [session.profiles?.email || ''],
        subject: `📚 Rappel d'étude – ${session.title}`,
        html: html,
      });

      // Marquer l'email comme envoyé
      const { error: updateError } = await supabase
        .from('study_schedules')
        .update({ email_sent: true })
        .eq('id', session.id);

      if (updateError) {
        console.error('Erreur lors de la mise à jour du statut de l\'email:', updateError);
      } else {
        console.log(`Rappel envoyé pour la session: ${session.title}`);
      }
    } catch (error) {
      console.error(`Erreur lors de l'envoi du rappel pour ${session.title}:`, error);
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    await sendStudyReminders();
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
