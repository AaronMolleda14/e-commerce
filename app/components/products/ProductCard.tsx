// app/components/products/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Product, ProductImage } from "@/app/generated/prisma";
import AddToCartButton from "./AddToCartButton";

type ProductWithImages = Omit<Product, 'price'> & {
    images: ProductImage[];
    price: number;
}

interface Props {
    product: ProductWithImages;
}

export default function ProductCard({ product }: Props) {
    const mainImage = product.images[0]?.url ?? '/placeholder.png';

    return (
        <Link 
            href={`/products/${product.slug}`} 
            className="group card overflow-hidden hover:-translate-y-1 w-full"
        >
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-orange-600 transition">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.shortDescription}
                </p>

                <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                    </p>
                </div>

                <AddToCartButton product={product} />
            </div>
        </Link>
    );
}