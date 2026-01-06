// app/services/product.server.ts
import { prisma } from "@/app/lib/db";
import { AdminProduct } from "@/app/types/product";
import { slugify } from "../lib/slugify";

export async function getAdminProducts(): Promise<AdminProduct[]> {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            slug: true,
            shortDescription: true,
            description: true,
            price: true,
            stock: true,
            createdAt: true,
            images: { select: { url: true } }
        },
    });

    return products.map((product) => ({
        ...product,
        price: Number(product.price),
        images: product.images.map(img => ({ url: img.url })),
    }));
}

export async function createProduct(data: {
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    stock: number;
}) {
    const slug = slugify(data.name);

    return prisma.product.create({
        data: {
            name: data.name,
            slug,
            shortDescription: data.shortDescription,
            description: data.description,
            price: data.price,
            stock: data.stock,
        },
    });
}

export async function getAdminProductById(
    id: number
): Promise<AdminProduct | null> {
    const product = await prisma.product.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            slug: true,
            shortDescription: true,
            description: true,
            price: true,
            stock: true,
            createdAt: true,
            images: { select: { url: true } }
        },
    });

    if (!product) return null;

    return {
        ...product,
        price: Number(product.price),
        images: product.images.map(img => ({ url: img.url })),
    };
}

export async function updateProduct(
    id: number,
    data: {
        name: string;
        shortDescription: string;
        description: string;
        price: number;
        stock: number;
    }
) {
    return prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            shortDescription: data.shortDescription,
            description: data.description,
            price: data.price,
            stock: data.stock,
        },
    });
}

