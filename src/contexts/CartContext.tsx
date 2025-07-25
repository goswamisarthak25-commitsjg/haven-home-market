import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Generate a session ID for guest users
  const getSessionId = () => {
    let sessionId = localStorage.getItem('guest_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('guest_session_id', sessionId);
    }
    return sessionId;
  };

  // Load cart items on mount
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase.from('cart_items').select('*');
      
      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        const sessionId = getSessionId();
        query = query.eq('session_id', sessionId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: any) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Check if item already exists in cart
      const existingItem = items.find(item => item.product_id === product.id);
      
      if (existingItem) {
        await updateQuantity(product.id, existingItem.quantity + 1);
        return;
      }

      const cartItem = {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image,
        quantity: 1,
        user_id: user?.id || null,
        session_id: user ? null : getSessionId(),
      };

      const { data, error } = await supabase
        .from('cart_items')
        .insert(cartItem)
        .select()
        .single();

      if (error) throw error;
      
      setItems(prev => [...prev, data]);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase.from('cart_items').delete();
      
      if (user) {
        query = query.eq('user_id', user.id).eq('product_id', productId);
      } else {
        const sessionId = getSessionId();
        query = query.eq('session_id', sessionId).eq('product_id', productId);
      }

      const { error } = await query;
      
      if (error) throw error;
      
      setItems(prev => prev.filter(item => item.product_id !== productId));
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase.from('cart_items').update({ quantity });
      
      if (user) {
        query = query.eq('user_id', user.id).eq('product_id', productId);
      } else {
        const sessionId = getSessionId();
        query = query.eq('session_id', sessionId).eq('product_id', productId);
      }

      const { error } = await query;
      
      if (error) throw error;
      
      setItems(prev => 
        prev.map(item => 
          item.product_id === productId 
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase.from('cart_items').delete();
      
      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        const sessionId = getSessionId();
        query = query.eq('session_id', sessionId);
      }

      const { error } = await query;
      
      if (error) throw error;
      
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      loading,
    }}>
      {children}
    </CartContext.Provider>
  );
};