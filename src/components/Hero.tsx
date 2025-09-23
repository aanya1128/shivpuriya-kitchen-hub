import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Traditional utensils and kitchenware"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-white">
              Trusted Since 1985
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Welcome to
            <span className="block text-secondary animate-bounce-gentle">
              Shivpuriya Patra Bhandar
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed animate-fade-in">
            Discover authentic brass, copper, and steel utensils along with modern kitchen appliances. 
            Your one-stop destination for traditional cookware and contemporary home solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-warm px-8 py-6 text-lg font-semibold"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg"
            >
              Explore Categories
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 mt-12 text-white/80 animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="text-sm">Free Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="text-sm">Quality Assured</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="text-sm">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;