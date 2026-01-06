// app/components/admin/dashboard/RecentOrders.tsx
import Link from "next/link";

interface RecentOrder {
    id: number;
    total: number;
    status: string;
    createdAt: Date;
    user: {
        name: string;
        email: string;
    };
}

interface Props {
    orders: RecentOrder[];
}

export function RecentOrders({ orders }: Props) {
    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { label: string; className: string }> = {
            PENDING: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
            PAID: { label: "Pagado", className: "bg-green-100 text-green-800" },
            SHIPPED: { label: "Enviado", className: "bg-blue-100 text-blue-800" },
            CANCELLED: { label: "Cancelado", className: "bg-red-100 text-red-800" },
        };

        const config = statusConfig[status] || statusConfig.PENDING;
        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Pedidos Recientes</h3>
                <Link 
                    href="/adminOrders" 
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                    Ver todos →
                </Link>
            </div>
            
            {orders.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">No hay pedidos recientes</p>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-semibold text-gray-800">#{order.id}</span>
                                    {getStatusBadge(order.status)}
                                </div>
                                <p className="text-sm text-gray-600">{order.user.name}</p>
                                <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-800">${order.total.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
