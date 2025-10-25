import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Tag, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_price: number;
  images: string[];
  is_featured: boolean;
}

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .eq('is_featured', true)
        .limit(5);
      
      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const calculateDiscount = (price: number, comparePrice: number) => {
    if (!comparePrice || comparePrice <= price) return 0;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };
  
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] bg-gradient-to-br from-background via-primary/5 to-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-secondary/30">
            <Sparkles className="h-5 w-5 text-secondary animate-pulse" />
            <span className="text-lg font-semibold text-secondary-foreground">
              {t('topOffers') || 'Top Offers & Deals'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
            <span className="text-foreground">{t('featuredProducts') || 'Featured Products'}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('heroOfferSubtitle') || 'Discover amazing deals on our best-selling products'}
          </p>
        </div>

        {/* Carousel */}
        {featuredProducts.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product) => {
                const discount = calculateDiscount(product.price, product.compare_price);
                return (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div 
                      className="group cursor-pointer h-full"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                        {/* Image Container */}
                        <div className="relative overflow-hidden bg-muted">
                          <img
                            src={product.images?.[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-64 object-cover transition-transform group-hover:scale-110 duration-500"
                          />
                          
                          {/* Discount Badge */}
                          {discount > 0 && (
                            <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-lg px-4 py-2 font-bold shadow-lg">
                              {discount}% OFF
                            </Badge>
                          )}
                          
                          {/* Featured Badge */}
                          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 shadow-lg">
                            <Tag className="h-4 w-4 mr-1" />
                            {t('productFeatured') || 'Featured'}
                          </Badge>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          
                          {product.description && (
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          
                          {/* Pricing */}
                          <div className="mt-auto">
                            <div className="flex items-baseline gap-3 mb-4">
                              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                              {product.compare_price && product.compare_price > product.price && (
                                <span className="text-lg text-muted-foreground line-through">
                                  ₹{product.compare_price}
                                </span>
                              )}
                            </div>
                            
                            {/* CTA Button */}
                            <Button 
                              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 rounded-xl group-hover:shadow-lg transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/product/${product.id}`);
                              }}
                            >
                              <ShoppingBag className="mr-2 h-5 w-5" />
                              {t('shopNow') || 'Shop Now'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
            <CarouselNext className="right-0 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('loadingProducts') || 'Loading featured products...'}</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in">
          <Button 
            size="lg" 
            variant="outline"
            className="px-12 py-6 text-lg font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => navigate('/shop')}
          >
            {t('viewAllProducts') || 'View All Products'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
