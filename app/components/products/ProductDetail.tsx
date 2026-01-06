// app/components/products/ProductDetail.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductWithImages } from "@/app/types/product";

interface ProductDetailProps {
    product: ProductWithImages;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]?.url ?? "/placeholder.png");
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        console.log(`Agregar al carrito: ${product.name}, cantidad: ${quantity}`);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    {product.images.map((img) => (
                        <button
                            key={img.id}
                            className={`border ${selectedImage === img.url ? "border-blue-500" : "border-gray-300"} p-1`}
                            onClick={() => setSelectedImage(img.url)}
                        >
                            <Image src={img.url} alt={product.name} width={60} height={60} className="object-cover cursor-pointer" />
                        </button>
                    ))}
                </div>

                <div className="flex-1 border p-4">
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="object-contain w-full h-full"
                        />
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-2xl text-gray-700">${product.price.toFixed(2)}</p>
                <p className="text-gray-600">{product.description}</p>

                <div className="flex items-center gap-2 mt-4">
                    <button onClick={() => handleQuantityChange(-1)} className="border px-3 py-1 hover:bg-gray-200 transition">
                        -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="border px-3 py-1 hover:bg-gray-200 transition">
                        +
                    </button>
                </div>

                <button onClick={handleAddToCart} className="cursor-pointer mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transition shadow-md hover:shadow-lg font-medium">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}