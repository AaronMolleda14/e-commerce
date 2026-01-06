// app/components/admin/orders/OrdersEmptyState.tsx
export function OrdersEmptyState() {
    return (
        <div className="card p-12 text-center">
            <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No hay pedidos registrados
                </h3>
                <p className="text-gray-600">
                    Los pedidos aparecerán aquí cuando los clientes realicen compras
                </p>
            </div>
        </div>
    );
}
