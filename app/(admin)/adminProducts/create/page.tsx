// app/(admin)/adminProducts/create/page.tsx
import { createProduct } from "@/app/services/product.server";
import { redirect } from "next/navigation";
import ProductForm from "@/app/components/admin/products/ProductForm";
import { uploadProductImages } from "@/app/lib/uploadImages";

async function createProductAction(formData: FormData) {
    "use server";

    const newProduct = await createProduct({
        name: formData.get("name") as string,
        shortDescription: formData.get("shortDescription") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
    });

    const productId = newProduct.id;

    const images = formData.getAll("images") as File[];
    if (images.length > 0 && images[0].size > 0) {
        await uploadProductImages(images, productId);
    }

    redirect("/adminProducts");
}

export default function CreateProductPage() {
    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Nuevo Producto
            </h1>
            
            <ProductForm action={createProductAction} />
        </div>
    )
}