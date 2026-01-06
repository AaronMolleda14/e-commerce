// app/services/user.server.ts
import { prisma } from "@/app/lib/db";
import { AdminUser } from "@/app/types/user";
import { UserRole } from "@/app/generated/prisma";
import bcrypt from "bcrypt";

export async function getAdminUsers(): Promise<AdminUser[]> {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    orders: true,
                },
            },
        },
    });

    return users;
}

export async function getAdminUserById(id: number): Promise<AdminUser | null> {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    orders: true,
                },
            },
        },
    });

    return user;
}

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        },
    });
}

export async function updateUser(
    id: number,
    data: {
        name: string;
        email: string;
        role: UserRole;
        password?: string;
    }
) {
    const updateData: any = {
        name: data.name,
        email: data.email,
        role: data.role,
    };

    if (data.password && data.password.trim() !== "") {
        updateData.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
        where: { id },
        data: updateData,
    });
}

export async function deleteUser(id: number) {
    // First, delete all orders for this user (which will cascade to orderItems)
    const userOrders = await prisma.order.findMany({
        where: { userId: id },
        select: { id: true },
    });

    // Delete all orderItems for these orders, then delete orders
    for (const order of userOrders) {
        await prisma.orderItem.deleteMany({
            where: { orderId: order.id },
        });
        await prisma.order.delete({
            where: { id: order.id },
        });
    }

    // Now delete the user
    return prisma.user.delete({
        where: { id },
    });
}
