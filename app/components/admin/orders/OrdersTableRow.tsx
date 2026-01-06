// app/components/admin/orders/OrdersTableRow.tsx
"use client";

import { AdminOrder } from "@/app/types/order";
import { finishOrder, deleteOrder } from "@/app/services/order.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    order: AdminOrder;
}

export function OrdersTableRow({ order }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState<"finish" | "delete" | null>(null);

    async function handleFinish() {
        if (!confirm("¿Desea marcar este pedido como terminado?")) return;

        setLoading(true);
        setActionType("finish");
        try {
            await finishOrder(order.id);
            router.refresh();
        } catch (error) {
            alert("Error al terminar el pedido");
        } finally {
            setLoading(false);
            setActionType(null);
        }
    }

    async function handleDelete() {
        if (!confirm("¿Desea eliminar este pedido?")) return;

        setLoading(true);
        setActionType("delete");
        try {
            await deleteOrder(order.id);
            router.refresh();
        } catch (error: any) {
            alert(error?.message || "Error al eliminar el pedido");
        } finally {
            setLoading(false);
            setActionType(null);
        }
    }

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { label: string; className: string }> = {
            PENDING: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
            PAID: { label: "Pagado", className: "bg-green-100 text-green-800" },
            SHIPPED: { label: "Enviado", className: "bg-blue-100 text-blue-800" },
            CANCELLED: { label: "Cancelado", className: "bg-red-100 text-red-800" },
        };

        const config = statusConfig[status] || statusConfig.PENDING;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    return (
        <tr className="hover:bg-orange-50/50 transition-colors">
            <td className="p-4">
                <div className="font-semibold text-gray-800">
                    #{order.id}
                </div>
            </td>

            <td className="p-4">
                <span className="text-gray-800">{order.user.name}</span>
            </td>

            <td className="p-4">
                <span className="text-gray-600 text-sm">{order.user.email}</span>
            </td>

            <td className="p-4">
                <span className="font-semibold text-gray-800">${order.total.toFixed(2)}</span>
            </td>

            <td className="p-4">
                {getStatusBadge(order.status)}
            </td>

            <td className="p-4">
                <span className="text-gray-600">
                    {order._count?.orderItems || 0}
                </span>
            </td>

            <td className="p-4 text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
            </td>

            <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-3">
                    {order.status !== "SHIPPED" && order.status !== "CANCELLED" && (
                        <button 
                            className="cursor-pointer text-green-600 hover:text-green-700 font-medium hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleFinish}
                            disabled={loading}
                        >
                            {loading && actionType === "finish" ? "Terminando..." : "Terminar"}
                        </button>
                    )}

                    <button 
                        className="cursor-pointer text-red-600 hover:text-red-700 font-medium hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading && actionType === "delete" ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </td>
        </tr>
    );
}
