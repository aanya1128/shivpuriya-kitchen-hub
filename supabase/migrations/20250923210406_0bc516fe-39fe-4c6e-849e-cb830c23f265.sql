-- Create enums for better data integrity
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE public.coupon_type AS ENUM ('percentage', 'fixed_amount');
CREATE TYPE public.product_status AS ENUM ('active', 'inactive', 'out_of_stock');

-- Create profiles table for extended user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  category_id UUID NOT NULL REFERENCES public.categories(id),
  images TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  weight DECIMAL(8,2),
  material TEXT,
  status product_status DEFAULT 'active',
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create carts table
CREATE TABLE public.carts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id),
  UNIQUE(user_id, product_id)
);

-- Create wishlists table
CREATE TABLE public.wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id),
  UNIQUE(user_id, product_id)
);

-- Create coupons table
CREATE TABLE public.coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  type coupon_type NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  minimum_order_amount DECIMAL(10,2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  order_number TEXT NOT NULL UNIQUE,
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  coupon_id UUID REFERENCES public.coupons(id),
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create order_items table for order details
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Categories are viewable by everyone" ON public.categories
  FOR SELECT USING (true);
CREATE POLICY "Only admins can modify categories" ON public.categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);
CREATE POLICY "Only admins can modify products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for carts (user-specific)
CREATE POLICY "Users can manage their own cart" ON public.carts
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for wishlists (user-specific)
CREATE POLICY "Users can manage their own wishlist" ON public.wishlists
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for coupons (public read, admin write)
CREATE POLICY "Coupons are viewable by everyone" ON public.coupons
  FOR SELECT USING (is_active = true);
CREATE POLICY "Only admins can modify coupons" ON public.coupons
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for orders (user can see own, admin can see all)
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Only admins can update orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for order_items (same as orders)
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE id = order_id AND (
        user_id = auth.uid() OR 
        EXISTS (
          SELECT 1 FROM public.profiles 
          WHERE id = auth.uid() AND role = 'admin'
        )
      )
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_featured ON public.products(is_featured);
CREATE INDEX idx_carts_user_id ON public.carts(user_id);
CREATE INDEX idx_wishlists_user_id ON public.wishlists(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON public.carts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'SPB' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policies for product images
CREATE POLICY "Product images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Only admins can upload product images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can update product images" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can delete product images" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Enable realtime for carts and wishlists
ALTER TABLE public.carts REPLICA IDENTITY FULL;
ALTER TABLE public.wishlists REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.carts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.wishlists;

-- Insert sample categories
INSERT INTO public.categories (name, description, sort_order) VALUES
('Utensils', 'Steel, Copper, and Brass utensils for daily use', 1),
('Pooja Essentials', 'Traditional items for worship and rituals', 2),
('Home Appliances', 'Iron, Chimney and other home appliances', 3),
('Kitchen Appliances', 'Gas stoves, Induction, Mixer grinders', 4),
('Gift Sets', 'Curated gift sets for special occasions', 5),
('Lunch Boxes', 'Durable lunch boxes for office and school', 6),
('Water Bottles', 'Premium water bottles for hydration', 7);

-- Insert sample products
INSERT INTO public.products (name, description, price, compare_price, category_id, stock_quantity, sku, material, is_featured) 
SELECT 
  'Steel Plate Set',
  'Premium quality stainless steel plates - Set of 6',
  499.00,
  599.00,
  c.id,
  25,
  'SPB-SPS-001',
  'Stainless Steel',
  true
FROM public.categories c WHERE c.name = 'Utensils';

INSERT INTO public.products (name, description, price, category_id, stock_quantity, sku, material, is_featured)
SELECT 
  'Brass Diya Set',
  'Traditional brass diyas for festivals and daily worship',
  299.00,
  c.id,
  15,
  'SPB-BDS-001',
  'Brass',
  true
FROM public.categories c WHERE c.name = 'Pooja Essentials';

INSERT INTO public.products (name, description, price, category_id, stock_quantity, sku, material, is_featured)
SELECT 
  'Premium Tiffin Box',
  '4-compartment stainless steel lunch box with secure locking',
  599.00,
  c.id,
  20,
  'SPB-PTB-001',
  'Stainless Steel',
  true
FROM public.categories c WHERE c.name = 'Lunch Boxes';

-- Insert sample coupon
INSERT INTO public.coupons (code, type, value, minimum_order_amount, usage_limit, expires_at) VALUES
('WELCOME10', 'percentage', 10.00, 500.00, 100, NOW() + INTERVAL '30 days');