// app/components/admin/orders/OrdersTable.tsx
"use client";

import { AdminOrder } from "@/app/types/order";
import { OrdersTableRow } from "./OrdersTableRow";

interface Props {
    orders: AdminOrder[];
}

export function OrdersTable({ orders }: Props) {
    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                        <tr>
                            <th className="text-left p-4 font-semibold">ID</th>
                            <th className="text-left p-4 font-semibold">Cliente</th>
                            <th className="text-left p-4 font-semibold">Email</th>
                            <th className="text-left p-4 font-semibold">Total</th>
                            <th className="text-left p-4 font-semibold">Estado</th>
                            <th className="text-left p-4 font-semibold">Items</th>
                            <th className="text-left p-4 font-semibold">Fecha</th>
                            <th className="text-right p-4 font-semibold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {orders.map((order) => (
                            <OrdersTableRow key={order.id} order={order} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
