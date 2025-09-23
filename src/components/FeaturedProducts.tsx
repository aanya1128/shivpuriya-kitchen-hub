import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Heart, 
  Star,
  IndianRupee 
} from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Traditional Steel Plate Set",
      price: 499,
      originalPrice: 599,
      rating: 4.5,
      reviews: 126,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
      badge: "Bestseller",
      material: "Stainless Steel"
    },
    {
      id: 2,
      name: "Copper Water Bottle",
      price: 799,
      originalPrice: 999,
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80",
      badge: "Premium",
      material: "Pure Copper"
    },
    {
      id: 3,
      name: "Brass Pooja Thali",
      price: 1299,
      originalPrice: 1599,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      badge: "Traditional",
      material: "Brass"
    },
    {
      id: 4,
      name: "Non-Stick Cookware Set",
      price: 2499,
      originalPrice: 3199,
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80",
      badge: "New",
      material: "Aluminum"
    },
    {
      id: 5,
      name: "Steel Lunch Box",
      price: 399,
      originalPrice: 499,
      rating: 4.4,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
      badge: "Eco-Friendly",
      material: "Food Grade Steel"
    },
    {
      id: 6,
      name: "Copper Kadhai",
      price: 1899,
      originalPrice: 2299,
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
      badge: "Chef's Choice",
      material: "Heavy Copper"
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Bestseller": return "default";
      case "Premium": return "secondary";
      case "New": return "destructive";
      default: return "outline";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked products that combine traditional craftsmanship with modern functionality
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-0 shadow-subtle hover:shadow-elegant transition-all duration-300 bg-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square relative overflow-hidden bg-muted/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Product Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant={getBadgeVariant(product.badge)} className="text-xs">
                    {product.badge}
                  </Badge>
                </div>

                {/* Wishlist Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                    Quick Add
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? "text-accent fill-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                {/* Material */}
                <p className="text-xs text-muted-foreground mb-3">
                  {product.material}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4 text-foreground" />
                    <span className="text-lg font-bold text-foreground">
                      {product.price}
                    </span>
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="flex items-center">
                      <IndianRupee className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;