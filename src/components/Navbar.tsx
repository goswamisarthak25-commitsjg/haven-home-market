import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  cartItems?: number;
  user?: any;
}

const Navbar = ({ cartItems = 0, user }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleAuthClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg"></div>
            <span className="font-playfair text-xl font-bold text-foreground">
              Furnish
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search furniture..." 
                className="pl-10 bg-muted/50 border-border"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCartClick}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItems}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAuthClick}
            >
              <User className="w-5 h-5" />
              <span className="ml-2">{user ? "Profile" : "Sign In"}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search furniture..." 
                  className="pl-10 bg-muted/50 border-border"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
              
              {/* Mobile Navigation Links */}
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleCartClick();
                    setIsMenuOpen(false);
                  }}
                  className="relative"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart
                  {cartItems > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="ml-2"
                    >
                      {cartItems}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleAuthClick();
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="w-5 h-5 mr-2" />
                  {user ? "Profile" : "Sign In"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;