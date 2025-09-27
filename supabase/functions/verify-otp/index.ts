import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyOTPRequest {
  phone: string;
  otp: string;
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

    const { phone, otp }: VerifyOTPRequest = await req.json();

    if (!phone || !otp) {
      return new Response(
        JSON.stringify({ error: 'Phone number and OTP are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify OTP from database
    const { data: otpRecord, error: fetchError } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('identifier', phone)
      .eq('otp_code', otp)
      .eq('type', 'phone')
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpRecord) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired OTP' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from('otp_verifications')
      .update({ verified: true })
      .eq('id', otpRecord.id);

    if (updateError) {
      console.error('Error updating OTP:', updateError);
      throw new Error('Failed to verify OTP');
    }

    // Check if user exists with this phone number
    let { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('phone', phone)
      .single();

    if (!existingProfile) {
      // Create a temporary profile for phone-only users
      // In a real app, you might want to collect additional info
      const tempEmail = `temp_${phone.replace(/\D/g, '')}@temp.com`;
      
      // Create auth user
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        phone: phone,
        email: tempEmail,
        phone_confirm: true,
        email_confirm: true,
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw new Error('Failed to create user');
      }

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authUser.user.id,
          phone: phone,
          email: tempEmail,
          full_name: `User ${phone}`,
          role: 'customer'
        });

      if (profileError) {
        console.error('Profile error:', profileError);
        throw new Error('Failed to create profile');
      }

      existingProfile = {
        id: authUser.user.id,
        phone: phone,
        email: tempEmail,
        full_name: `User ${phone}`,
        role: 'customer'
      };
    }

    // Generate session token (simplified for demo)
    const sessionToken = `temp_session_${existingProfile.id}_${Date.now()}`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP verified successfully',
        user: existingProfile,
        session_token: sessionToken
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in verify-otp function:', error);
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