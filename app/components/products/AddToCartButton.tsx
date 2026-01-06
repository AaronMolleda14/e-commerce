// app/components/products/AddToCartButton.tsx
"use client";

import { useCart } from "@/app/hooks/useCart";
import { ProductWithImages } from "@/app/types/product";
import { useState } from "react";

interface Props {
    product: ProductWithImages;
    quantity?: number;
}

export default function AddToCartButton({ product, quantity = 1 }: Props) {
    const { items, addItem, updateQuantity } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        const existingItem = items.find(item => item.productId === product.id);

        if (existingItem) {
            // Use updateQuantity to increment existing item
            updateQuantity(product.id, existingItem.quantity + quantity);
        } else {
            addItem({
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                quantity,
                image: product.images?.[0]?.url ?? "/placeholder.png",
            });
        }

        setAdded(true);
        setTimeout(() => setAdded(false), 1000);
    };

    return (
        <button 
            onClick={(e) => { e.preventDefault(); handleAddToCart(); }} 
            className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 ${
                added 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
                    : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
            }`}
        >
            {added ? "✓ Añadido" : "🛒 Agregar al carrito"}
        </button>
    );
}