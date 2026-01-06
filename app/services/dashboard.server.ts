// app/services/dashboard.server.ts
import { prisma } from "@/app/lib/db";

export interface DashboardStats {
    totalProducts: number;
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    lowStockProducts: number;
    pendingOrders: number;
    recentOrders: Array<{
        id: number;
        total: number;
        status: string;
        createdAt: Date;
        user: {
            name: string;
            email: string;
        };
    }>;
    lowStockItems: Array<{
        id: number;
        name: string;
        stock: number;
    }>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    // Get counts
    const [totalProducts, totalUsers, totalOrders, orders] = await Promise.all([
        prisma.product.count(),
        prisma.user.count(),
        prisma.order.count(),
        prisma.order.findMany({
            select: {
                id: true,
                total: true,
                status: true,
                createdAt: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            take: 10,
        }),
    ]);

    // Calculate total revenue
    const allOrders = await prisma.order.findMany({
        select: {
            total: true,
        },
    });
    const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.total), 0);

    // Get low stock products (stock <= 5)
    const lowStockItems = await prisma.product.findMany({
        where: {
            stock: {
                lte: 5,
            },
        },
        select: {
            id: true,
            name: true,
            stock: true,
        },
        orderBy: { stock: "asc" },
        take: 5,
    });

    // Count pending orders
    const pendingOrders = await prisma.order.count({
        where: {
            status: {
                in: ["PENDING", "PAID"],
            },
        },
    });

    return {
        totalProducts,
        totalUsers,
        totalOrders,
        totalRevenue,
        lowStockProducts: lowStockItems.length,
        pendingOrders,
        recentOrders: orders.map((order) => ({
            ...order,
            total: Number(order.total),
        })),
        lowStockItems,
    };
}
