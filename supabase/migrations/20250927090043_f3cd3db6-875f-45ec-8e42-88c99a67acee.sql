-- Create required categories (will skip if they already exist)
DO $$
BEGIN
  -- Insert categories one by one to avoid conflicts
  INSERT INTO categories (name, description, is_active, sort_order) 
  SELECT 'Copperware', 'Traditional copper utensils and vessels', true, 1
  WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Copperware');
  
  INSERT INTO categories (name, description, is_active, sort_order) 
  SELECT 'Steelware', 'Durable stainless steel cookware and utensils', true, 2
  WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Steelware');
  
  INSERT INTO categories (name, description, is_active, sort_order) 
  SELECT 'Brassware', 'Authentic brass items and decorative pieces', true, 3
  WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Brassware');
  
  INSERT INTO categories (name, description, is_active, sort_order) 
  SELECT 'Pooja Essentials', 'Religious items and accessories for worship', true, 4
  WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Pooja Essentials');
  
  INSERT INTO categories (name, description, is_active, sort_order) 
  SELECT 'Cutlery', 'Kitchen knives, spoons, and eating utensils', true, 5
  WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Cutlery');
  
  INSERT INTO categories (name, description, is_active, sort_order) 
  SELECT 'Home Essentials', 'Home appliances and household items', true, 6
  WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Home Essentials');
  
  INSERT INTO categories (name, description, is_active, sort_order) 
  SELECT 'Kitchen Essentials', 'Modern kitchen appliances and tools', true, 7
  WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Kitchen Essentials');
  
  INSERT INTO categories (name, description, is_active, sort_order) 
  SELECT 'School Essentials', 'School and office supplies', true, 8
  WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'School Essentials');
END $$;