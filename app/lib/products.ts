import { prisma } from "@/app/lib/db";
import { Product, ProductImage } from "@/app/generated/prisma";

type ProductWithImagesRaw = Product & {
    images: ProductImage[];
};

type ProductWithImagesSerialized = Omit<ProductWithImagesRaw, 'price'> & {
    price: number;
};

// Helper function to serialize product (convert Decimal to number)
function serializeProduct(product: ProductWithImagesRaw): ProductWithImagesSerialized {
    return {
        ...product,
        price: Number(product.price),
    };
}

export async function getProducts() {
    const products = await prisma.product.findMany({
        include: {
            images: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    
    return products.map(serializeProduct);
}

export async function getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            images: true,
        },
    });
    
    return product ? serializeProduct(product) : null;
}
