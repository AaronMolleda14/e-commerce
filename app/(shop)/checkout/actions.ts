// app/(shop)/checkout/actions.ts

"use server";

import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { CartItem } from "@/app/types/cart";

export async function checkoutCart(items: CartItem[]) {
    if (!items || items.length=== 0) {
        return { error: "El carrito está vacio" };
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return { error: "Debes iniciar sesión para hacer una compra "};
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return { error: "Usuario no encontrado" };
    }

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await prisma.order.create({
        data: {
            userId: user.id,
            total,
            status: "PAID",
            orderItems: {
                create: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                })),
            }      ,
        },
    });

    return { orderId: order.id };
}