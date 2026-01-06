// app/(admin)/adminProducts/page.tsx
import { getAdminProducts } from "@/app/services/product.server";
import { ProductsHeader } from "@/app/components/admin/products/ProductsHeader";
import { ProductsToolbar } from "@/app/components/admin/products/ProductsToolbar";
import { ProductsTable } from "@/app/components/admin/products/ProductsTable";
import { ProductsEmptyState } from "@/app/components/admin/products/ProductsEmptyState";

export default async function AdminProductsPage() {
    const products = await getAdminProducts();

    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl">
            <ProductsHeader />
            <ProductsToolbar />

            {products.length === 0 ? (
                <ProductsEmptyState />
            ) : (
                <ProductsTable products={products} />
            )}
        </div>
    );
}