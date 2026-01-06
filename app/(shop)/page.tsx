import { getProducts } from "@/app/lib/products";
import ProductGrid from "@/app/components/products/ProductGrid";

export const metadata = {
    title: "Productos",
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Productos</h1>

            <ProductGrid products={products} />
        </section>
    );
}