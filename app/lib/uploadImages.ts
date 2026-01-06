// app/lib/uploadImages.ts
import { supabase } from "./supabase";
import { prisma } from "./db";

export async function uploadProductImages(
    files: File[],
    productId: number
) {
    for (const file of files) {
        if (!(file instanceof File)) continue;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const ext = file.name.split(".").pop();
        const fileName = `${productId}/${crypto.randomUUID()}.${ext}`;

        const { error } = await supabase.storage.from("products").upload(fileName, buffer);

        if (error) throw new Error(error.message);

        const { data } = supabase.storage.from("products").getPublicUrl(fileName);

        if (!data?.publicUrl) {
            throw new Error("No se pudo obtener la URL de la imagen");
        }

        await prisma.productImage.create({
            data: {
                productId,
                url: data.publicUrl,
            },
        });

        console.log("Imagen subida: ", data.publicUrl);
    }
}