// app/components/admin/users/UsersTableRow.tsx
"use client";

import Link from "next/link";
import { AdminUser } from "@/app/types/user";
import { deleteUser } from "@/app/services/user.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    user: AdminUser;
}

export function UsersTableRow({ user }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!confirm("¿Desea eliminar este usuario?")) return;

        setLoading(true);
        try {
            await deleteUser(user.id);
            router.refresh();
        } catch (error: any) {
            alert(error?.message || "Error al eliminar el usuario");
        } finally {
            setLoading(false);
        }
    }

    return (
        <tr className="hover:bg-orange-50/50 transition-colors">
            <td className="p-4">
                <div className="font-semibold text-gray-800">
                    {user.name}
                </div>
            </td>

            <td className="p-4">
                <span className="text-gray-700">{user.email}</span>
            </td>

            <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === "ADMIN"
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                }`}>
                    {user.role === "ADMIN" ? "Administrador" : "Usuario"}
                </span>
            </td>

            <td className="p-4">
                <span className="text-gray-600">
                    {user._count?.orders || 0}
                </span>
            </td>

            <td className="p-4 text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
            </td>

            <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-3">
                    <Link 
                        href={`/adminUsers/${user.id}`} 
                        className="cursor-pointer text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                    >
                        Editar
                    </Link>

                    <button 
                        className="cursor-pointer text-red-600 hover:text-red-700 font-medium hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </td>
        </tr>
    );
}
