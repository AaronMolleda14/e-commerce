// app/components/admin/products/ProductsEmptyState.tsx
import Link from "next/link";

export function ProductsEmptyState() {
    return (
        <div className="card p-12 text-center">
            <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Aún no hay productos creados
                </h3>
                <p className="text-gray-600 mb-6">
                    Comienza agregando tu primer producto a la tienda
                </p>
                <Link href="/adminProducts/create" className="btn-primary inline-block">
                    + Crear primer producto
                </Link>
            </div>
        </div>
    );
}