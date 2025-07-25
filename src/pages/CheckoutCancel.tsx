import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <XCircle className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Checkout Cancelled
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              No worries! Your cart items are still saved and you can complete your purchase anytime.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happened?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You cancelled the checkout process before completing your payment. 
                All items in your cart have been saved and are ready when you're ready to purchase.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Link to="/cart">
              <Button size="lg" className="mr-4">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Return to Cart
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you experienced any issues during checkout or have questions about your order, 
                  we're here to help.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Customer Support:</strong> support@furnish.com
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> 1-800-FURNISH
                  </p>
                  <p className="text-sm">
                    <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;