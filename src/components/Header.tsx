import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu,
  ChevronDown 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

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

  const categories = [
    "Utensils",
    "Pooja Essentials", 
    "Home Appliances",
    "Kitchen Appliances",
    "Gift Sets",
    "Lunch Boxes",
    "Water Bottles"
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Shivpuriya Patra Bhandar" className="w-10 h-10 object-contain" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Shivpuriya</h1>
              <p className="text-xs text-muted-foreground">Patra Bhandar</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => navigate('/')}>
              Home
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-popover border shadow-elegant">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} className="cursor-pointer hover:bg-muted">
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => navigate('/about')}>
              About Us
            </Button>
            
            <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-10 bg-muted/50 border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border shadow-elegant">
                {user ? (
                  <>
                    <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-muted" onClick={() => navigate('/admin')}>
                      Admin Panel
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-muted" onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="cursor-pointer hover:bg-muted" onClick={() => navigate('/auth')}>
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-muted" onClick={() => navigate('/auth')}>
                      Create Account
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
                <div className="flex flex-col space-y-4 mt-8">
                  <Button variant="ghost" className="justify-start" onClick={() => navigate('/')}>
                    Home
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => navigate('/about')}>
                    About Us
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => navigate('/contact')}>
                    Contact Us
                  </Button>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Categories</p>
                    {categories.map((category) => (
                      <Button key={category} variant="ghost" className="justify-start pl-4 text-sm">
                        {category}
                      </Button>
                    ))}
                  </div>
                  {user ? (
                    <div className="space-y-2 pt-4 border-t">
                      <Button variant="ghost" className="justify-start" onClick={() => navigate('/admin')}>
                        Admin Panel
                      </Button>
                      <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-4 border-t">
                      <Button variant="ghost" className="justify-start" onClick={() => navigate('/auth')}>
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-10 bg-muted/50 border-border focus:border-primary"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;