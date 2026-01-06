// app/types/user.ts
import { UserRole } from "@/app/generated/prisma";

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    _count?: {
        orders: number;
    };
}
