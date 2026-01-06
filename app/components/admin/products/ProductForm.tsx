// app/components/admin/products/ProductForm.tsx
"use client";

import { AdminProduct } from "@/app/types/product";
import { useState, useEffect } from "react";

interface ProductFormProps {
    product?: AdminProduct;
    action: (formData: FormData) => void;
}

export default function ProductForm({ product, action }: ProductFormProps) {
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        if (product?.images) {
            setPreviewImages(product.images.map(img => img.url));
        }
    }, [product]);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    }

    return (
        <div className="card p-6 md:p-8">
            <form action={action} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre del producto
                        </label>
                        <input
                            name="name"
                            defaultValue={product?.name}
                            className="input"
                            placeholder="Nombre"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Descripción corta
                        </label>
                        <input 
                            name="shortDescription"
                            defaultValue={product?.shortDescription}
                            className="input"
                            placeholder="Descripción corta"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Descripción completa
                        </label>
                        <textarea
                            name="description"
                            defaultValue={product?.description}
                            className="input min-h-[120px] resize-y"
                            placeholder="Descripción"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Precio
                        </label>
                        <input 
                            name="price"
                            type="number"
                            step="0.01"
                            defaultValue={product?.price}
                            className="input"
                            placeholder="0.00"
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Stock
                        </label>
                        <input 
                            name="stock"
                            type="number"
                            defaultValue={product?.stock}
                            className="input"
                            placeholder="0"
                            required
                            min="0"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Imágenes del producto
                        </label>
                        <input 
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-orange-600 file:to-red-600 file:text-white hover:file:from-orange-700 hover:file:to-red-700 file:cursor-pointer transition"
                            onChange={handleImageChange}
                        />
                    </div>

                    {previewImages.length > 0 && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Vista previa
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {previewImages.map((src, i) => (
                                    <div key={i} className="relative group">
                                        <img 
                                            src={src} 
                                            alt={`Preview ${i + 1}`}
                                            className="h-32 w-full object-cover rounded-lg border-2 border-gray-200 group-hover:border-orange-400 transition"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button type="submit" className="btn-primary">
                        {product ? "💾 Guardar Cambios" : "✨ Crear Producto"}
                    </button>
                    {product && (
                        <a 
                            href="/adminProducts" 
                            className="btn-secondary"
                        >
                            Cancelar
                        </a>
                    )}
                </div>
            </form>
        </div>
    );
}