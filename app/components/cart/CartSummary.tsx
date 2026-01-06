// app/components/cart/CartSummary.tsx
"use client";

import CartItem from "./CartItem";
import { useCart } from "@/app/hooks/useCart";

interface Props {
    showActions?: boolean;
    onCheckout?: () => void;
}

export default function CartSummary({ showActions = false, onCheckout }: Props) {
    const { items, totalPrice } = useCart();

    if (items.length === 0) return <p>Tu carrito está vacío</p>

    return (
        <div className="space-y-4">
            {items.map(item => (
                <CartItem key={item.productId} item={item} editable={showActions} />
            ))}

            <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>

            {onCheckout && (
                <button
                onClick={onCheckout}
                className="bg-black text-white px-4 py-2 rounded w-full"
                >
                Pagar (simulado)
                </button>
            )}
        </div>
    );
}