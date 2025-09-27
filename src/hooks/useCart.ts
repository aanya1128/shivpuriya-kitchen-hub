import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  stock_quantity: number;
}

export const useCart = () => {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to add items to cart",
        variant: "destructive",
      });
      return false;
    }

    if (quantity > product.stock_quantity) {
      toast({
        title: "Insufficient stock",
        description: `Only ${product.stock_quantity} items available`,
        variant: "destructive",
      });
      return false;
    }

    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from("carts")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      if (existingItem) {
        // Update existing item
        const newQuantity = existingItem.quantity + quantity;
        
        if (newQuantity > product.stock_quantity) {
          toast({
            title: "Insufficient stock",
            description: `Only ${product.stock_quantity} items available`,
            variant: "destructive",
          });
          return false;
        }

        const { error } = await supabase
          .from("carts")
          .update({ quantity: newQuantity })
          .eq("id", existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from("carts")
          .insert([{
            user_id: user.id,
            product_id: product.id,
            quantity
          }]);

        if (error) throw error;
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
      return false;
    }
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to add items to wishlist",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Check if item already exists in wishlist
      const { data: existingItem } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist`,
        });
        return false;
      }

      const { error } = await supabase
        .from("wishlists")
        .insert([{
          user_id: user.id,
          product_id: product.id
        }]);

      if (error) throw error;

      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    addToCart,
    addToWishlist,
    isLoggedIn: !!user
  };
};