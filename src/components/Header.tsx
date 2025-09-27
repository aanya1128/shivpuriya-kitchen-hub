import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
import { 
  Menu, 
  Search, 
  Heart, 
  ShoppingCart, 
  User,
  Home,
  Info,
  Phone,
  ChevronDown,
  Sun,
  Moon,
  Globe
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import logoImage from "@/assets/logo.png";
import CartSheet from "@/components/CartSheet";
import WishlistSheet from "@/components/WishlistSheet";

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // Define categories for the navigation
  const categories = [
    { key: "copperware", name: t("copperware") },
    { key: "steelware", name: t("steelware") },
    { key: "brassware", name: t("brassware") },
    { key: "poojaEssentials", name: t("poojaEssentials") },
    { key: "cutlery", name: t("cutlery") },
    { key: "homeAppliances", name: t("homeAppliances") },
    { key: "kitchenAppliances", name: t("kitchenAppliances") },
    { key: "schoolEssentials", name: t("schoolEssentials") }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="Shivpuriya Patra Bhandar Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-foreground">{t('companyName')}</h1>
              <p className="text-sm text-muted-foreground">Authentic Utensils & Modern Appliances</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>{t('home')}</span>
            </Link>
            
            {/* Shop Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>{t('shop')}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => navigate('/shop')}>
                  <span>All Products</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.key} 
                    onClick={() => navigate(`/shop?category=${category.key}`)}
                  >
                    <span>{category.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/about" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Info className="h-4 w-4" />
              <span>{t('about')}</span>
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{t('contact')}</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Input - Hidden on mobile */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('searchProducts')}
                className="pl-10 w-64"
              />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs">{i18n.language.toUpperCase()}</span>
            </Button>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <WishlistSheet />

            {/* Shopping Cart */}
            <CartSheet />

            {/* User Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      {t('myProfile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      {t('myOrders')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      {t('adminPanel')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      {t('logout')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/auth')}>
                      {t('login')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/auth')}>
                      {t('signup')}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="space-y-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/')}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    {t('home')}
                  </Button>
                  
                  <div>
                    <h3 className="font-semibold mb-2 px-3">{t('shop')}</h3>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-6"
                        onClick={() => navigate('/shop')}
                      >
                        All Products
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category.key}
                          variant="ghost"
                          className="w-full justify-start px-6"
                          onClick={() => navigate(`/shop?category=${category.key}`)}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/about')}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    {t('about')}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/contact')}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {t('contact')}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 py-3 border-t bg-background">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('searchProducts')}
                className="pl-10 w-full"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;