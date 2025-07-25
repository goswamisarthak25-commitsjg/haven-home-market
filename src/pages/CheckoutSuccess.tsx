import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful checkout
    clearCart();
    
    // In a real app, you'd fetch order details using the session_id
    // For now, we'll show a generic success message
    if (sessionId) {
      setOrderDetails({
        id: sessionId,
        status: 'paid'
      });
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {sessionId && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-sm bg-muted p-2 rounded">
                    {sessionId}
                  </p>
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to your email address with your order details and tracking information.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <Link to="/products">
              <Button size="lg" className="mr-4">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg">
                Return Home
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Package className="w-5 h-5 text-primary mr-2" />
                  <h3 className="font-semibold">Free Shipping</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your order qualifies for free shipping and will be delivered within 3-5 business days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <h3 className="font-semibold">Quality Guaranteed</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  All our furniture comes with a 30-day money-back guarantee and 2-year warranty.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <ArrowRight className="w-5 h-5 text-primary mr-2" />
                  <h3 className="font-semibold">What's Next?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking information once your order ships, typically within 24 hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;