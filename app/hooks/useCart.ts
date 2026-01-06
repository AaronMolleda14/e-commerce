// app/hooks/useCart.ts

import { useCartContext } from "../context/CartContext";

export function useCart() {
    return useCartContext();
}