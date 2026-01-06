// app/(admin)/adminOrders/page.tsx
import { getAdminOrders } from "@/app/services/order.server";
import { OrdersHeader } from "@/app/components/admin/orders/OrdersHeader";
import { OrdersToolbar } from "@/app/components/admin/orders/OrdersToolbar";
import { OrdersTable } from "@/app/components/admin/orders/OrdersTable";
import { OrdersEmptyState } from "@/app/components/admin/orders/OrdersEmptyState";

export default async function AdminOrdersPage() {
    const orders = await getAdminOrders();

    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl">
            <OrdersHeader />
            <OrdersToolbar />

            {orders.length === 0 ? (
                <OrdersEmptyState />
            ) : (
                <OrdersTable orders={orders} />
            )}
        </div>
    );
}
