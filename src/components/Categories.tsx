import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const categories = [
    {
      id: 1,
      key: "copperware",
      name: t("copperware"),
      description: "Traditional copper utensils and vessels",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=500&q=80",
      itemCount: "50+ items"
    },
    {
      id: 2,
      key: "steelware",
      name: t("steelware"), 
      description: "Durable stainless steel cookware",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80",
      itemCount: "150+ items"
    },
    {
      id: 3,
      key: "brassware",
      name: t("brassware"),
      description: "Authentic brass items and decorative pieces",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=500&q=80",
      itemCount: "80+ items"
    },
    {
      id: 4,
      key: "poojaessentials",
      name: t("poojaessentials"),
      description: "Religious items and accessories",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
      itemCount: "120+ items"
    },
    {
      id: 5,
      key: "cutlery",
      name: t("cutlery"),
      description: "Kitchen knives, spoons, and eating utensils",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80",
      itemCount: "40+ items"
    },
    {
      id: 6,
      key: "homeessentials",
      name: t("homeessentials"),
      description: "Home appliances and household items",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=500&q=80",
      itemCount: "60+ items"
    },
    {
      id: 7,
      key: "kitchensupplies",
      name: t("kitchensupplies"), 
      description: "Modern kitchen appliances and tools",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80",
      itemCount: "70+ items"
    },
    {
      id: 8,
      key: "schoolessentials",
      name: t("schoolessentials"),
      description: "School and office supplies",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=500&q=80",
      itemCount: "25+ items"
    },
    {
      id: 9,
      key: "giftsets",
      name: t("giftsets"),
      description: "Special gift packages",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=500&q=80",
      itemCount: "30+ items"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of traditional and modern products, carefully selected for quality and authenticity
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="group overflow-hidden border-0 shadow-subtle hover:shadow-warm transition-all duration-300 bg-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {category.itemCount}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                  onClick={() => navigate(`/shop?category=${category.key}`)}
                >
                  {t('explore')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3"
            onClick={() => navigate('/shop')}
          >
            {t('viewAllCategories')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;