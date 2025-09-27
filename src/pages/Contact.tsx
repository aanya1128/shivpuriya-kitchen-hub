import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import logo from "@/assets/logo.png";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Main Market, Kalapipal\nMadhya Pradesh, India\nPincode: 465106"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 98765 43210\n+91 87654 32109"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@shivpuriya.com\nsupport@shivpuriya.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-16">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Shivpuriya Patra Bhandar" className="w-24 h-24 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('getInTouch')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or need assistance? We're here to help you find the perfect utensils for your home.
          </p>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{t('contactInformation')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">Coming Soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{t('sendMessage')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t('firstName')} *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          placeholder="Your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t('lastName')} *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          placeholder="Your last name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('email')} *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('phone')}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 99999 99999"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">{t('subject')} *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t('message')} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? t('sendingMessage') : t('sendMessage')}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">What is your return policy?</h4>
                      <p className="text-muted-foreground text-sm">
                        We offer a 30-day return policy for unused items in original packaging.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Do you provide bulk discounts?</h4>
                      <p className="text-muted-foreground text-sm">
                        Yes, we offer special pricing for bulk orders. Contact us for a custom quote.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">What are your delivery options?</h4>
                      <p className="text-muted-foreground text-sm">
                        We provide free delivery within 50km of Kalapipal and paid delivery across India.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Are your brass products authentic?</h4>
                      <p className="text-muted-foreground text-sm">
                        Absolutely! All our brass and copper items are certified authentic and food-grade safe.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;