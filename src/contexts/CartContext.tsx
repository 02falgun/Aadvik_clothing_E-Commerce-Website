'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product, CartItem } from '@/types';
import toast from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever items change
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Show toast for cart actions
  useEffect(() => {
    if (lastAction) {
      toast.success(lastAction);
      setLastAction(null);
    }
  }, [lastAction]);

  const addToCart = (product: Product, size: string, color: string, quantity: number) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product._id === product._id && item.size === size && item.color === color
      );

      if (existingItemIndex > -1) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setLastAction('Updated cart!');
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          product,
          size,
          color,
          quantity,
        };
        setLastAction('Added to cart!');
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems(prevItems => {
      const filteredItems = prevItems.filter(
        item => !(item.product._id === productId && item.size === size && item.color === color)
      );
      setLastAction('Removed from cart!');
      return filteredItems;
    });
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.product._id === productId && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    setLastAction('Cart cleared!');
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
