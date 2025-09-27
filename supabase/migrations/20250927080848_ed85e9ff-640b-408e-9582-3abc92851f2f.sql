-- Create refunds table for order refund management
CREATE TABLE IF NOT EXISTS public.refunds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  razorpay_refund_id TEXT,
  processed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activity_logs table for admin audit trail
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table for admin configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create otp_verifications table for phone/email OTP
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'phone', 'password_reset')),
  verified BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Drop and recreate cart/wishlist policies to avoid conflicts
DROP POLICY IF EXISTS "Users manage own cart" ON public.carts;
DROP POLICY IF EXISTS "Users manage own wishlist" ON public.wishlists;

CREATE POLICY "Users manage own cart" ON public.carts
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own wishlist" ON public.wishlists
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for refunds (admin only)
CREATE POLICY "Only admins can view refunds" ON public.refunds
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can manage refunds" ON public.refunds
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can update refunds" ON public.refunds
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies for activity_logs (admin only) 
CREATE POLICY "Only admins can view activity logs" ON public.activity_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can create activity logs" ON public.activity_logs
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies for site_settings (admin only)
CREATE POLICY "Only admins can manage site settings" ON public.site_settings
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies for otp_verifications
CREATE POLICY "System can manage OTP records" ON public.otp_verifications
FOR ALL USING (true);

-- Add triggers for updated_at columns (correct syntax)
DROP TRIGGER IF EXISTS update_refunds_updated_at ON public.refunds;
CREATE TRIGGER update_refunds_updated_at
BEFORE UPDATE ON public.refunds
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('company_name', '"Shivpuriya Patra Bhandar"'),
('contact_email', '"contact@shivpuriyapatra.com"'),
('contact_phone', '"+91-9876543210"'),
('company_address', '"123 Main Street, Traditional Market, Delhi, India"')
ON CONFLICT (key) DO NOTHING;