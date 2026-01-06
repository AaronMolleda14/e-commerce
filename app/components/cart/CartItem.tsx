// app/components/cart/CartItem.tsx
"use client";

import { CartItem as CartItemType } from "@/app/types/cart";
import { useCart } from "@/app/hooks/useCart";

interface Props {
    item: CartItemType;
    editable?: boolean;
}

export default function CartItem({ item, editable = false }: Props) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="card p-4 flex justify-between items-center">
            <div className="flex gap-4 items-center flex-1">
                {item.image && (
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                )}
                <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                    <p className="text-sm font-bold mt-1 text-orange-600">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
    
            {editable && (
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 border-2 border-orange-200 rounded-lg bg-white">
                        <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-3 py-1.5 hover:bg-orange-50 text-orange-600 font-bold transition rounded-l"
                            aria-label="Decrementar cantidad"
                        >
                            −
                        </button>
                        <span className="px-4 py-1.5 min-w-[2.5rem] text-center font-semibold text-gray-800">{item.quantity}</span>
                        <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-3 py-1.5 hover:bg-orange-50 text-orange-600 font-bold transition rounded-r"
                            aria-label="Incrementar cantidad"
                        >
                            +
                        </button>
                    </div>
                    <button 
                        onClick={() => removeItem(item.productId)} 
                        className="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-medium"
                        aria-label="Eliminar producto"
                    >
                        🗑️ Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}