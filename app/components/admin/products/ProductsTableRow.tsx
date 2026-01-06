// app/components/admin/products/ProductsTableRow.tsx
"use client";

import Link from "next/link";
import { AdminProduct } from "@/app/types/product";
import { deleteProduct } from "@/app/services/product.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    product: AdminProduct;
}

export function ProductsTableRow({ product }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!confirm("¿Desea eliminar este producto?")) return;

        setLoading(true);
        try {
            await deleteProduct(product.id);
            router.refresh();
        } catch (error) {
            alert("Error al eliminar el producto");
        } finally {
            setLoading(false);
        }
    }

    return (
        <tr className="hover:bg-orange-50/50 transition-colors">
            <td className="p-4">
                <div className="font-semibold text-gray-800">
                    {product.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    {product.shortDescription}
                </div>
            </td>

            <td className="p-4">
                <span className="font-semibold text-gray-800">${product.price.toString()}</span>
            </td>

            <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    {product.stock}
                </span>
            </td>

            <td className="p-4 text-gray-600">
                {new Date(product.createdAt).toLocaleDateString()}
            </td>

            <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-3">
                    <Link 
                        href={`/adminProducts/${product.id}`} 
                        className="cursor-pointer text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                    >
                        Editar
                    </Link>

                    <button 
                        className="cursor-pointer text-red-600 hover:text-red-700 font-medium hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </td>
        </tr>
    );
}