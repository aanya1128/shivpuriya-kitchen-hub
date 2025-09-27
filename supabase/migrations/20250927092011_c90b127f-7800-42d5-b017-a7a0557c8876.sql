-- Add sample categories for the website using INSERT with WHERE NOT EXISTS
INSERT INTO public.categories (name, description, is_active, sort_order) 
SELECT 'Copperware', 'Traditional copper utensils and cookware', true, 1
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Copperware');

INSERT INTO public.categories (name, description, is_active, sort_order) 
SELECT 'Steelware', 'High-quality stainless steel products', true, 2
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Steelware');

INSERT INTO public.categories (name, description, is_active, sort_order) 
SELECT 'Brassware', 'Authentic brass items for kitchen and home', true, 3
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Brassware');

INSERT INTO public.categories (name, description, is_active, sort_order) 
SELECT 'Pooja Essentials', 'Religious ceremony items and accessories', true, 4
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Pooja Essentials');

INSERT INTO public.categories (name, description, is_active, sort_order) 
SELECT 'Cutlery', 'Knives, forks, spoons and cutting tools', true, 5
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Cutlery');

INSERT INTO public.categories (name, description, is_active, sort_order) 
SELECT 'Home Essentials', 'Daily use household items', true, 6
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Home Essentials');

INSERT INTO public.categories (name, description, is_active, sort_order) 
SELECT 'Kitchen Essentials', 'Essential kitchen tools and appliances', true, 7
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Kitchen Essentials');

INSERT INTO public.categories (name, description, is_active, sort_order) 
SELECT 'School Essentials', 'School and office supplies', true, 8
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'School Essentials');