import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock_quantity: number;
  };
}

interface WishlistSheetProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const WishlistSheet = ({ isOpen, onOpenChange }: WishlistSheetProps) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchWishlistItems();
    }
  }, [user]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const fetchWishlistItems = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select(`
          id,
          product:products (
            id,
            name,
            price,
            images,
            stock_quantity
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load wishlist items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistItemId: string) => {
    try {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", wishlistItemId);

      if (error) throw error;

      setWishlistItems(items => items.filter(item => item.id !== wishlistItemId));
      
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const moveToCart = async (item: WishlistItem) => {
    const success = await addToCart(item.product);
    if (success) {
      removeFromWishlist(item.id);
    }
  };

  if (!user) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              0
            </Badge>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Wishlist</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg font-medium">Please sign in to view your wishlist</p>
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {wishlistItems.length > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {wishlistItems.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Wishlist ({wishlistItems.length} items)</SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg">Loading wishlist...</div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg font-medium">Your wishlist is empty</p>
            <Button onClick={() => {navigate("/shop"); onOpenChange?.(false)}}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Heart className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">₹{item.product.price}</p>
                      {item.product.stock_quantity === 0 && (
                        <p className="text-xs text-destructive">Out of stock</p>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        onClick={() => moveToCart(item)}
                        disabled={item.product.stock_quantity === 0}
                        className="flex items-center space-x-1"
                      >
                        <ShoppingCart className="h-3 w-3" />
                        <span className="text-xs">Add to Cart</span>
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex items-center space-x-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="text-xs">Remove</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4">
              <Button 
                variant="outline" 
                onClick={() => {navigate("/shop"); onOpenChange?.(false)}} 
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSheet;