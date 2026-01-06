// app/types/order.ts
import { OrderStatus } from "@/app/generated/prisma";

export interface AdminOrder {
    id: number;
    userId: number;
    status: OrderStatus;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: number;
        name: string;
        email: string;
    };
    _count?: {
        orderItems: number;
    };
}
