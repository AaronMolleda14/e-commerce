// app/types/ccart.ts

export interface CartItem {
    productId: number;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface CartState {
    items: CartItem[];
}