// app/components/checkout/CheckoutPageContent.tsx
"use client";

import { useCart } from "@/app/hooks/useCart";
import { useState } from "react";
import { checkoutCart } from "@/app/(shop)/checkout/actions";
import CartSummary from "@/app/components/cart/CartSummary";

interface CheckoutState {
    error?: string;
}

export default function CheckoutPageContent() {
    const { items, clearCart } = useCart();
    const [state, setState] = useState<CheckoutState>({});

    const handleCheckout = async () => {
        try {
            const result = await checkoutCart(items);
            if (result?.error) {
                setState({ error: result.error });
                return;
            }
      
            // Checkout exitoso
            clearCart();
            setState({ error: undefined });
      
            // redirigir a página de confirmación
            if (result?.orderId) {
                window.location.href = `/checkout/confirmation/${result.orderId}`;
            }
        } catch (err) {
            console.error(err);
            setState({ error: "Ocurrió un error al procesar el checkout" });
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {state?.error && <p className="text-red-500 mb-2">{state.error}</p>}

            <CartSummary showActions={false} onCheckout={handleCheckout} />
        </div>
    );
}