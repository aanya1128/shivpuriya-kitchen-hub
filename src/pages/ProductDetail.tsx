import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
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
  weight: number;
  sku: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { addToCart, addToWishlist } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .single();

      if (productError) throw productError;
      if (!productData) {
        toast({
          title: "Product not found",
          description: "The product you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate('/shop');
        return;
      }

      setProduct(productData);

      // Fetch category
      if (productData.category_id) {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('*')
          .eq('id', productData.category_id)
          .single();
        
        setCategory(categoryData);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Failed to load product details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product, quantity);
    }
  };

  const handleAddToWishlist = async () => {
    if (product) {
      await addToWishlist(product);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["/placeholder.svg"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/shop')}
            className="p-0 h-auto"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Shop
          </Button>
          {category && (
            <>
              <span>/</span>
              <span>{category.name}</span>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                      selectedImageIndex === index ? 'border-primary' : 'border-muted'
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
              <div className="flex items-center gap-2 mb-2">
                {product.is_featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
                {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                  <Badge variant="destructive">Only {product.stock_quantity} left</Badge>
                )}
                {product.stock_quantity === 0 && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              
              {product.material && (
                <p className="text-muted-foreground">{product.material}</p>
              )}
              
              {product.sku && (
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                {product.compare_price && product.compare_price > product.price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.compare_price}
                    </span>
                    <Badge variant="outline" className="text-green-600">
                      {Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock_quantity} available
                </span>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t('addToCart')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Truck className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-muted-foreground">On orders above ₹500</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Quality Assured</p>
                    <p className="text-sm text-muted-foreground">Authentic products</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <RotateCcw className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-muted-foreground">7-day return policy</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="font-semibold mb-3">Product Details</h3>
              <div className="space-y-2 text-sm">
                {product.weight && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span>{product.weight}g</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>{product.material}</span>
                  </div>
                )}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tags:</span>
                    <span>{product.tags.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;