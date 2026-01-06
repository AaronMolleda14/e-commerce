// app/components/admin/orders/OrdersToolbar.tsx
"use client";

export function OrdersToolbar() {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <input 
                type="text"
                placeholder="Buscar pedido..."
                className="input w-64"
            />

            <select className="input w-48">
                <option value="">Estado</option>
                <option value="PENDING">Pendiente</option>
                <option value="PAID">Pagado</option>
                <option value="SHIPPED">Enviado</option>
                <option value="CANCELLED">Cancelado</option>
            </select>
        </div>
    );
}
