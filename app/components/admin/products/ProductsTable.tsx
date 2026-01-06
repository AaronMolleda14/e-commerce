// app/components/admin/products/ProductsTable.tsx
"use client";

import { AdminProduct } from "@/app/types/product";
import { ProductsTableRow } from "./ProductsTableRow";

interface Props {
    products: AdminProduct[];
}

export function ProductsTable({ products }: Props) {
    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                        <tr>
                            <th className="text-left p-4 font-semibold">Nombre</th>
                            <th className="text-left p-4 font-semibold">Precio</th>
                            <th className="text-left p-4 font-semibold">Stock</th>
                            <th className="text-left p-4 font-semibold">Creado</th>
                            <th className="text-right p-4 font-semibold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {products.map((product) => (
                            <ProductsTableRow key={product.id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}