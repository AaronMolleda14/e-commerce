// app/services/order.server.ts
import { prisma } from "@/app/lib/db";
import { AdminOrder } from "@/app/types/order";
import { OrderStatus } from "@/app/generated/prisma";

export async function getAdminOrders(): Promise<AdminOrder[]> {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            userId: true,
            status: true,
            total: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            _count: {
                select: {
                    orderItems: true,
                },
            },
        },
    });

    return orders.map((order) => ({
        ...order,
        total: Number(order.total),
    }));
}

export async function finishOrder(id: number) {
    return prisma.order.update({
        where: { id },
        data: {
            status: "SHIPPED" as OrderStatus,
        },
    });
}

export async function deleteOrder(id: number) {
    // First, delete all orderItems for this order
    await prisma.orderItem.deleteMany({
        where: { orderId: id },
    });

    // Now delete the order
    return prisma.order.delete({
        where: { id },
    });
}
