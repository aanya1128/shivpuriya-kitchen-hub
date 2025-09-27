import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, User, Lock, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email address" });
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" });
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" });

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authType, setAuthType] = useState<"email" | "phone">("email");
  const [otpStep, setOtpStep] = useState(false);
  const [resetStep, setResetStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    fullName: "",
    resetEmail: ""
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user is admin
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

  const validateInput = (field: string, value: string) => {
    try {
      switch (field) {
        case "email":
          emailSchema.parse(value);
          return true;
        case "phone":
          phoneSchema.parse(value);
          return true;
        case "password":
          passwordSchema.parse(value);
          return true;
        default:
          return true;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: error.issues[0].message,
        });
      }
      return false;
    }
  };

  const handleSignUp = async () => {
    if (!validateInput("email", formData.email) || !validateInput("password", formData.password)) {
      return;
    }

    if (!formData.fullName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Full name is required",
      });
      return;
    }

    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!validateInput("email", formData.email) || !validateInput("password", formData.password)) {
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Check if user is admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async () => {
    if (!validateInput("phone", formData.phone)) {
      return;
    }

    setLoading(true);
    try {
      // Call edge function to send OTP
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phone: formData.phone }
      });

      if (error) throw error;

      setOtpStep(true);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    setLoading(true);
    try {
      // Call edge function to verify OTP
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { phone: formData.phone, otp }
      });

      if (error) throw error;

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

  const handlePasswordReset = async () => {
    if (!validateInput("email", formData.resetEmail)) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.resetEmail, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });

      if (error) throw error;

      toast({
        title: "Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
      setResetStep(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
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
            <CardTitle className="text-2xl">Verify OTP</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to {formData.phone}
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
              onClick={handleOtpVerification}
              className="w-full"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOtpStep(false)}
              className="w-full"
            >
              Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (resetStep) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              Enter your email to receive reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resetEmail">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.resetEmail}
                  onChange={(e) => setFormData({ ...formData, resetEmail: e.target.value })}
                  className="pl-9"
                />
              </div>
            </div>
            <Button
              onClick={handlePasswordReset}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setResetStep(false)}
              className="w-full"
            >
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
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
          <span>Back to Home</span>
        </Button>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Shivpuriya Patra Bhandar" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl text-primary">Shivpuriya Patra Bhandar</CardTitle>
          <CardDescription>Welcome! Please sign in to your account</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="signin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={authType === 'email' ? 'default' : 'outline'}
                    onClick={() => setAuthType('email')}
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={authType === 'phone' ? 'default' : 'outline'}
                    onClick={() => setAuthType('phone')}
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </Button>
                </div>
                
                {authType === 'email' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handleSignIn} className="w-full" disabled={loading}>
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone-signin">Phone Number</Label>
                      <Input
                        id="phone-signin"
                        name="phone"
                        type="tel"
                        placeholder="+91 9999999999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handlePhoneAuth}
                      disabled={loading}
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                  </>
                )}
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-signup">Phone Number</Label>
                  <Input
                    id="phone-signup"
                    name="phone"
                    type="tel"
                    placeholder="+91 9999999999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <div className="relative">
                    <Input
                      id="password-signup"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button onClick={handleSignUp} className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Admin credentials: admin@shivpuriya.com / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;