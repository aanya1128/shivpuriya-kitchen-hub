import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_price: number;
  images: string[];
  category_id: string;
  stock_quantity: number;
  material: string;
  is_featured: boolean;
  sku: string;
  weight: number;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    toast({
      title: "Added to Cart",
      description: `${product.name} (x${quantity}) has been added to your cart`,
    });
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading product...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/shop')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = product.images?.length > 0 ? product.images : ["/placeholder.svg"];
  const discountPercentage = product.compare_price > product.price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.is_featured && (
                <Badge className="absolute top-4 left-4" variant="secondary">
                  Featured
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 right-4" variant="destructive">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
            
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.material && (
                <p className="text-muted-foreground mb-2">Material: {product.material}</p>
              )}
              {product.sku && (
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              {product.compare_price && product.compare_price > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.compare_price}
                </span>
              )}
            </div>

            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Stock: {product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock'}
                </p>
                {product.weight && (
                  <p className="text-sm text-muted-foreground">Weight: {product.weight}g</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded px-3 py-1"
                  disabled={product.stock_quantity === 0}
                >
                  {Array.from({ length: Math.min(product.stock_quantity, 10) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stock_quantity > 0 ? t('addToCart') : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Card */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.material && (
                <div>
                  <span className="font-medium">Material:</span>
                  <span className="ml-2 text-muted-foreground">{product.material}</span>
                </div>
              )}
              {product.weight && (
                <div>
                  <span className="font-medium">Weight:</span>
                  <span className="ml-2 text-muted-foreground">{product.weight}g</span>
                </div>
              )}
              {product.sku && (
                <div>
                  <span className="font-medium">SKU:</span>
                  <span className="ml-2 text-muted-foreground">{product.sku}</span>
                </div>
              )}
              <div>
                <span className="font-medium">Availability:</span>
                <span className="ml-2 text-muted-foreground">
                  {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;