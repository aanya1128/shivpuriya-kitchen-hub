import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTranslation } from 'react-i18next';
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        
        if (profile?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    // Initialize reCAPTCHA
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved successfully');
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
            window.recaptchaVerifier = null;
          }
        });
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
        toast({
          variant: "destructive",
          title: "Configuration Error",
          description: "Failed to initialize phone authentication. Please contact support.",
        });
      }
    }
  }, [toast]);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid phone number",
      });
      return;
    }

    if (isSignup && !fullName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your full name",
      });
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      
      if (!window.recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized. Please refresh the page.');
      }
      
      const appVerifier = window.recaptchaVerifier;
      
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setOtpStep(true);
      
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      });
    } catch (error: any) {
      console.error('Phone auth error:', error);
      
      let errorMessage = error.message || "Failed to send OTP";
      
      // Provide specific error messages for common issues
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = "Phone authentication is not properly configured. Please ensure:\n1. Phone Sign-in is enabled in Firebase Console\n2. This domain is authorized in Firebase settings\n3. reCAPTCHA is properly configured";
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Invalid phone number format. Please use format: +91XXXXXXXXXX";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = "SMS quota exceeded. Please contact support.";
      }
      
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: errorMessage,
      });
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    if (!confirmationResult) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please request OTP first",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      
      // Get Firebase ID token
      const idToken = await user.getIdToken();
      
      // Create/update user in Supabase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', phoneNumber)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (!profile) {
        // Create new profile for signup
        if (isSignup) {
          const tempUserId = crypto.randomUUID();
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: tempUserId,
              phone: phoneNumber,
              full_name: fullName,
              role: 'customer'
            }]);
          
          if (insertError) throw insertError;
        } else {
          // User trying to login but not registered
          toast({
            variant: "destructive",
            title: "Error",
            description: "User not found. Please sign up first.",
          });
          setLoading(false);
          return;
        }
      }

      toast({
        title: "Success!",
        description: "Phone number verified successfully.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Invalid OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  if (otpStep) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('verifyOtp')}</CardTitle>
            <CardDescription>
              {t('enterCode')} {phoneNumber}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              onClick={handleVerifyOTP}
              className="w-full"
              disabled={loading || otp.length !== 6}
            >
              {loading ? t('verifying') : t('verifyOtpButton')}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOtpStep(false)}
              className="w-full"
            >
              {t('back')}
            </Button>
          </CardContent>
        </Card>
        <div id="recaptcha-container"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('backToHome')}</span>
        </Button>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Shivpuriya Patra Bhandar" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl text-primary">{t('companyName')}</CardTitle>
          <CardDescription>{t('welcomeMessage')}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" onValueChange={(value) => setIsSignup(value === "signup")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-login">{t('phone') || 'Phone Number'}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone-login"
                      type="tel"
                      placeholder="+91 9999999999"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSendOTP}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-signup">Full Name</Label>
                  <Input
                    id="name-signup"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-signup">{t('phone') || 'Phone Number'}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone-signup"
                      type="tel"
                      placeholder="+91 9999999999"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSendOTP}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Sign Up with OTP"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Auth;
