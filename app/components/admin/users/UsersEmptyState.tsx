// app/components/admin/users/UsersEmptyState.tsx
import Link from "next/link";

export function UsersEmptyState() {
    return (
        <div className="card p-12 text-center">
            <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Aún no hay usuarios registrados
                </h3>
                <p className="text-gray-600 mb-6">
                    Comienza agregando tu primer usuario al sistema
                </p>
                <Link href="/adminUsers/create" className="btn-primary inline-block">
                    + Crear primer usuario
                </Link>
            </div>
        </div>
    );
}
