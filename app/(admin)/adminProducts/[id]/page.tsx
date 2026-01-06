// app/(admin)/adminProducts/[id]/page.tsx
import { getAdminProductById, updateProduct } from "@/app/services/product.server";
import { uploadProductImages } from "@/app/lib/uploadImages";
import ProductForm from "@/app/components/admin/products/ProductForm";
import { notFound, redirect } from "next/navigation";

type Props = {
    params: Promise<{id: string}>;
};

export default async function EditProductPage({ params }: Props) {
    const resolvedParams = await params;
    if (!resolvedParams?.id) notFound();

    const productId = Number(resolvedParams.id);
    if(isNaN(productId)) notFound();
    

    const product = await getAdminProductById(productId);
    if(!product) notFound();
    
    async function updateProductAction(formData: FormData) {
        "use server";

        const images = formData.getAll("images") as File[];

        await updateProduct(productId, {
            name: formData.get("name") as string,
            shortDescription: formData.get("shortDescription") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price")),
            stock: Number(formData.get("stock")),
        })

        if (images.length > 0 && images[0].size > 0) {
            await uploadProductImages(images, productId);
        }

        redirect("/adminProducts");
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Editar Producto
            </h1>

            <ProductForm
                product={product}
                action={updateProductAction}
            />
        </div>
    );
}