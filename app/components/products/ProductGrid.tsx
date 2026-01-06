// app/components/products/ProductGrid.tsx
import { Product, ProductImage } from "@/app/generated/prisma";
import ProductCard from "@/app/components/products/ProductCard";

type ProductWithImages = Omit<Product, 'price'> & {
    images: ProductImage[];
    price: number;
}

interface Props {
    products: ProductWithImages[];
}

export default function ProductGrid({ products }: Props) {
    if (products.length === 0) {
        return <p>No hay productos disponibles.</p>
    }

    return (
        <div className="inline-grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-center">

            {products.map(product=> (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>

    );
}