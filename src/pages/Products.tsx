import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

// Mock product data - in real app this would come from Supabase
const mockProducts = [
  {
    id: "1",
    name: "Modern Oak Dining Table",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    category: "Dining Room",
    isNew: false,
    isOnSale: true,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Luxury Velvet Sofa",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    category: "Living Room",
    isNew: true,
    isOnSale: false,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Minimalist Bedside Table",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    category: "Bedroom",
    isNew: false,
    isOnSale: false,
    rating: 4.6,
  },
  {
    id: "4",
    name: "Executive Office Chair",
    price: 599.99,
    originalPrice: 799.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    category: "Office",
    isNew: false,
    isOnSale: true,
    rating: 4.7,
  },
  {
    id: "5",
    name: "Rustic Coffee Table",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    category: "Living Room",
    isNew: true,
    isOnSale: false,
    rating: 4.5,
  },
  {
    id: "6",
    name: "Elegant Wardrobe",
    price: 1599.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    category: "Bedroom",
    isNew: false,
    isOnSale: false,
    rating: 4.8,
  },
];

const categories = ["All", "Living Room", "Bedroom", "Dining Room", "Office", "Storage"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  // Handle search from URL parameters
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.isNew ? 1 : -1;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: any) => {
    console.log("Added to cart:", product);
    // In real app, this would update cart state/Supabase
  };

  const handleViewDetails = (product: any) => {
    console.log("View details:", product);
    // In real app, this would navigate to product detail page
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-section mb-4">Our Furniture Collection</h1>
          <p className="text-elegant max-w-2xl">
            Discover our carefully curated selection of premium furniture pieces, 
            designed to transform your space into a haven of style and comfort.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8">
          {/* Search and View Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-border">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("All")}>
                {selectedCategory} ×
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                "{searchQuery}" ×
              </Badge>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {mockProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}>
              Clear all filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;