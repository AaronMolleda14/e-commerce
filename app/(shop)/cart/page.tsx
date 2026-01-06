// app/(shop)/cart/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItem from "@/app/components/cart/CartItem";
import { useCart } from "@/app/hooks/useCart";

export default function CartPage() {
    const router = useRouter();
    const { items, totalPrice } = useCart();

    const handleCheckout = () => {
        router.push("/checkout");
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Mi Carrito</h1>
                <div className="text-center py-20 card max-w-md mx-auto">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-600 mb-6 text-lg">Tu carrito está vacío</p>
                    <Link 
                        href="/" 
                        className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transition shadow-lg hover:shadow-xl font-semibold"
                    >
                        Continuar comprando
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Mi Carrito</h1>
            
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-4">
                    {items.map(item => (
                        <CartItem key={item.productId} item={item} editable={true} />
                    ))}
                </div>
                
                <div className="md:col-span-1">
                    <div className="card p-6 sticky top-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Resumen del pedido</h2>
                        
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} artículos)</span>
                                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <div className="border-t border-orange-200 pt-4 mb-4">
                            <div className="flex justify-between font-bold text-xl">
                                <span className="text-gray-800">Total:</span>
                                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleCheckout}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-3"
                        >
                            💳 Proceder al pago
                        </button>
                        
                        <Link 
                            href="/" 
                            className="block text-center px-4 py-2 rounded-lg border-2 border-orange-600 text-orange-600 hover:bg-orange-50 transition font-medium"
                        >
                            Continuar comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

