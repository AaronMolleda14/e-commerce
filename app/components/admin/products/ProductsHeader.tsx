// app/components/admin/products/ProductsHeader.tsx
import Link from "next/link";

export function ProductsHeader () {
    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Productos
            </h1>
            <Link href="/adminProducts/create" className="btn-primary text-sm">
                + Nuevo Producto
            </Link>
        </div>
    );
}