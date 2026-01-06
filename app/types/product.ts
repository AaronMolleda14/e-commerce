// app/types/product.ts
export interface AdminProduct {
    description: string | number | readonly string[] | undefined;
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    price: number;
    stock: number;
    createdAt: Date;
    images: { url: string }[];
}

export interface ProductImage {
    id: number;
    url: string;
}

export interface ProductWithImages {
    id: number;
    name: string;
    description: string;
    price: number;
    images: ProductImage[];
    slug: string;
}