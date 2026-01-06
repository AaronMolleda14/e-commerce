// app/api/admin/products/[id]/route.ts
import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const productId = Number(id);

    if (isNaN(productId)) {
        return NextResponse.json({ error: "ID invalido" }, { status: 400 });
    }

    try {
        await prisma.product.delete({
            where: { id: productId },
        });
        return NextResponse.json({ message: "Producto eliminado" }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar: ", error);
        return NextResponse.json({ error: "No se pudo eliminar el producto" }, { status: 500 });
    }
}