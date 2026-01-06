// app/components/admin/users/UsersHeader.tsx
import Link from "next/link";

export function UsersHeader() {
    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Usuarios
            </h1>
            <Link href="/adminUsers/create" className="btn-primary text-sm">
                + Nuevo Usuario
            </Link>
        </div>
    );
}
