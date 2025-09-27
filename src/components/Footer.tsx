import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube,
  Send
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Store Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/favicon.png" 
                  alt="Shivpuriya Patra Bhandar Logo" 
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold">Shivpuriya</h3>
                  <p className="text-sm text-primary-foreground/80">Patra Bhandar</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Your trusted partner for authentic utensils and modern kitchen solutions. 
                Serving quality products since 1985 with traditional values and modern convenience.
              </p>
              
              {/* Newsletter */}
              <div className="pt-4">
                <h4 className="font-semibold mb-3">Stay Updated</h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 flex-1"
                  />
                  <Button size="icon" className="bg-secondary hover:bg-secondary-hover text-secondary-foreground">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-primary-foreground/90">
                      Main Market, Shujalpur
                    </p>
                    <p className="text-sm text-primary-foreground/90">
                      Madhya Pradesh, 465333
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-primary-foreground/90">+91-1234567890</p>
                    <p className="text-sm text-primary-foreground/90">+91-9876543210</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                  <p className="text-sm text-primary-foreground/90">
                    support@shivpuriyapatrabhandar.com
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  About Us
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Shipping Info
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Return Policy
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Track Order
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Size Guide
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Bulk Orders
                </Button>
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Service</h3>
              <div className="flex flex-col space-y-2">
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Help Center
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Contact Support
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Privacy Policy
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Terms & Conditions
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  FAQs
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-secondary justify-start"
                >
                  Warranty
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/80">
            © {currentYear} Shivpuriya Patra Bhandar. All rights reserved.
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-primary-foreground/80">Follow us:</span>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" }
              ].map(({ icon: Icon, href }, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-secondary hover:text-secondary-foreground"
                  asChild
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;