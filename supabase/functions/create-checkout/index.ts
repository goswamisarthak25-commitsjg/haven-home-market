import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cartItems } = await req.json();
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Cart is empty or invalid");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase with service role key for secure operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get user if authenticated
    const authHeader = req.headers.get("Authorization");
    let user = null;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
    }

    // Prepare line items for Stripe
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product_name,
          images: item.product_image ? [item.product_image] : [],
        },
        unit_amount: Math.round(item.product_price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Calculate total amount
    const totalAmount = cartItems.reduce((sum: number, item: any) => 
      sum + (item.product_price * item.quantity), 0
    );

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout/cancel`,
      customer_email: user?.email || undefined,
      metadata: {
        user_id: user?.id || "",
        cart_items: JSON.stringify(cartItems.map((item: any) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product_price
        }))),
      },
    });

    // Create order record in our database
    const orderData = {
      user_id: user?.id || null,
      stripe_session_id: session.id,
      total_amount: totalAmount,
      currency: "usd",
      status: "pending",
      customer_email: user?.email || null,
    };

    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw orderError;
    }

    // Create order items
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      product_image: item.product_image,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabaseClient
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      throw itemsError;
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id,
      orderId: order.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});