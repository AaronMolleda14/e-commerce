// app/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { CartItem } from "../types/cart";

interface CartContextValue {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<any[]>([]);

    // Hidratar desde localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
        setItems(JSON.parse(stored));
        }
    }, []);

    // Persistir cambios
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    // Agregar al carrito
    const addItem = (item: CartItem) => {
        setItems(prev => {
            const existing = prev.find(
                (i) => i.productId === item.productId
            );

            if (existing) {
                return prev.map((i) =>
                i.productId === item.productId
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                );
            }

            return [...prev, item];
        });
    };

    const removeItem = (productId: number) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
          removeItem(productId);
          return;
        }
        
        setItems((prev) =>
            prev.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = useMemo(
        () => items.reduce((acc, item) => acc + item.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            ),
        [items]
    );

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado con un CartProvider");
    }
    return context;
}