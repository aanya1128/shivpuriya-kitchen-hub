import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OTPRequest {
  phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { phone }: OTPRequest = await req.json();

    if (!phone) {
      return new Response(
        JSON.stringify({ error: 'Phone number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Store OTP in database
    const { error: dbError } = await supabase
      .from('otp_verifications')
      .insert({
        identifier: phone,
        otp_code: otpCode,
        type: 'phone',
        expires_at: expiresAt.toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store OTP');
    }

    // In a real implementation, you would send SMS via Twilio/MSG91
    // For now, we'll log the OTP (DO NOT DO THIS IN PRODUCTION)
    console.log(`OTP for ${phone}: ${otpCode}`);

    // TODO: Implement SMS sending
    // Example with Twilio:
    // const twilioResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: new URLSearchParams({
    //     From: twilioPhoneNumber,
    //     To: phone,
    //     Body: `Your Shivpuriya Patra Bhandar verification code is: ${otpCode}. Valid for 10 minutes.`
    //   })
    // });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP sent successfully',
        // Include OTP in response for demo purposes (REMOVE IN PRODUCTION)
        debug_otp: otpCode 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in send-otp function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);