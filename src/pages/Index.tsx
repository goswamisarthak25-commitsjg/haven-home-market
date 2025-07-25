import { useState } from "react";
import { ArrowRight, Truck, Shield, Headphones, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

// Mock featured products
const featuredProducts = [
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
];

const Index = () => {
  const { toast } = useToast();

  const handleViewDetails = (product: any) => {
    console.log("View details:", product);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">Featured Products</h2>
            <p className="text-elegant max-w-2xl mx-auto">
              Discover our handpicked selection of premium furniture pieces, 
              crafted with attention to detail and designed to last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="btn-hero">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">Shop by Category</h2>
            <p className="text-elegant max-w-2xl mx-auto">
              Browse our extensive collection organized by room and function.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Living Room", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", count: "120+ items" },
              { name: "Bedroom", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", count: "85+ items" },
              { name: "Dining Room", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", count: "65+ items" },
              { name: "Office", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", count: "45+ items" },
            ].map((category) => (
              <Card key={category.name} className="card-elegant group cursor-pointer overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-elegant">
                Free shipping on all orders over $500. Fast and secure delivery to your doorstep.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-elegant">
                All furniture comes with a 5-year warranty. Premium materials and craftsmanship.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-elegant">
                Our customer service team is always ready to help with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "Absolutely love my new dining set! The quality is exceptional and delivery was seamless.",
              },
              {
                name: "Michael Chen",
                rating: 5,
                comment: "Best furniture shopping experience I've had. Great customer service and beautiful pieces.",
              },
              {
                name: "Emma Wilson",
                rating: 5,
                comment: "The bedroom furniture transformed our space completely. Highly recommend Furnish!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="card-elegant">
                <CardContent className="p-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-elegant mb-4">"{testimonial.comment}"</p>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-section text-white mb-4">Stay Updated</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest furniture trends, exclusive offers, and design inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/20"
            />
            <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
                <span className="font-playfair text-xl font-bold">Furnish</span>
              </div>
              <p className="text-primary-foreground/80">
                Creating beautiful living spaces with premium furniture since 2008.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="text-primary-foreground/80 space-y-2">
                <p>1234 Furniture St.</p>
                <p>Design City, DC 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: hello@furnish.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Furnish. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
