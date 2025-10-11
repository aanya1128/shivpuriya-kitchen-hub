import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroBackground from "@/assets/hero-background.jpg";
import logo from "@/assets/logo.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const carouselItems = [
    {
      image: heroBackground,
      title: t('companyName'),
      subtitle: t('heroSubheading'),
      badge: t('trustedSince')
    },
    {
      image: heroBackground,
      title: t('companyName'),
      subtitle: t('heroSubheading'),
      badge: t('trustedSince')
    },
    {
      image: heroBackground,
      title: t('companyName'),
      subtitle: t('heroSubheading'),
      badge: t('trustedSince')
    }
  ];
  
  return (
    <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-full absolute inset-0"
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt="Traditional utensils and kitchenware"
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
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
                        {item.badge}
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up">
                      <span className="text-white">{t('welcomeTo')}</span>
                      <span className="block text-white dark:text-white animate-bounce-gentle mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {item.title}
                      </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed animate-fade-in max-w-3xl mx-auto">
                      {item.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in mb-12">
                      <Button 
                        size="lg" 
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-2xl px-10 py-7 text-xl font-bold rounded-full border-2 border-white/20 hover:scale-105 transition-all duration-300"
                        onClick={() => navigate('/shop')}
                      >
                        <ShoppingBag className="mr-3 h-6 w-6" />
                        {t('shopNow')}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
        <CarouselNext className="right-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
      </Carousel>
    </section>
  );
};

export default Hero;
