// app/components/admin/dashboard/QuickActions.tsx
import Link from "next/link";

export function QuickActions() {
    const actions = [
        { href: "/adminProducts/create", label: "Nuevo Producto", icon: "📦", color: "from-orange-600 to-red-600" },
        { href: "/adminUsers/create", label: "Nuevo Usuario", icon: "👥", color: "from-blue-600 to-purple-600" },
        { href: "/adminOrders", label: "Ver Pedidos", icon: "📋", color: "from-green-600 to-teal-600" },
        { href: "/adminProducts", label: "Gestionar Productos", icon: "🛍️", color: "from-pink-600 to-rose-600" },
    ];

    return (
        <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {actions.map((action) => (
                    <Link
                        key={action.href}
                        href={action.href}
                        className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all transform hover:-translate-y-0.5`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{action.icon}</span>
                            <span className="font-medium">{action.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
