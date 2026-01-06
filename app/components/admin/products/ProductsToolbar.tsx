// app/components/admin/products/ProductsToolbar.tsx
"use client";

export function ProductsToolbar() {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <input 
                type="text"
                placeholder="Buscar producto..."
                className="input w-64"
            />

            <select className="input w-48">
                <option value="">Stock</option>
                <option value="in">Con stock</option>
                <option value="out">Sin stock</option>
            </select>

            <select className="input w-48">
                <option value="">Categoria</option>
                <option disabled>(Proximamente)</option>
            </select>
        </div>
    );
}