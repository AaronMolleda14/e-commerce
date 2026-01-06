// app/components/admin/users/UsersTable.tsx
"use client";

import { AdminUser } from "@/app/types/user";
import { UsersTableRow } from "./UsersTableRow";

interface Props {
    users: AdminUser[];
}

export function UsersTable({ users }: Props) {
    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                        <tr>
                            <th className="text-left p-4 font-semibold">Nombre</th>
                            <th className="text-left p-4 font-semibold">Email</th>
                            <th className="text-left p-4 font-semibold">Rol</th>
                            <th className="text-left p-4 font-semibold">Pedidos</th>
                            <th className="text-left p-4 font-semibold">Creado</th>
                            <th className="text-right p-4 font-semibold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {users.map((user) => (
                            <UsersTableRow key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
