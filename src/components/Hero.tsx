import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Traditional utensils and kitchenware"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <img 
              src={logo} 
              alt="Shivpuriya Patra Bhandar" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 animate-fade-in border border-white/30">
            <Sparkles className="h-5 w-5 text-secondary animate-pulse" />
            <span className="text-lg font-semibold text-white">
              Trusted Since 1985 • Kalapipal, Madhya Pradesh
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-slide-up">
            Welcome to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-yellow-300 to-orange-300 animate-bounce-gentle mt-2">
              Shivpuriya Patra Bhandar
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed animate-fade-in max-w-3xl mx-auto">
            Discover authentic brass, copper, and steel utensils crafted with tradition. 
            Your trusted destination for premium cookware and modern kitchen solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in mb-12">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-2xl px-10 py-7 text-xl font-bold rounded-full border-2 border-white/20 hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/shop')}
            >
              <ShoppingBag className="mr-3 h-6 w-6" />
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/40 text-white hover:bg-white/20 backdrop-blur-md px-10 py-7 text-xl font-semibold rounded-full hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 text-white/90 animate-fade-in">
            <div className="flex items-center space-x-3 bg-white/10 rounded-full px-6 py-3 backdrop-blur-md">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
              <span className="text-lg font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-full px-6 py-3 backdrop-blur-md">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
              <span className="text-lg font-medium">Quality Assured</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-full px-6 py-3 backdrop-blur-md">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
              <span className="text-lg font-medium">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
    </section>
  );
};

export default Hero;