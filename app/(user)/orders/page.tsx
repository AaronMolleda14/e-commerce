// app/(user)/orders/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import Link from "next/link";

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        redirect("/login");
    }

    // Get all orders for the user
    const allOrders = await prisma.order.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            orderItems: {
                include: {
                    product: {
                        include: {
                            images: true,
                        },
                    },
                },
            },
        },
    });

    // Separate active and completed orders
    const activeOrders = allOrders.filter(
        (order) => order.status === "PENDING" || order.status === "PAID" || order.status === "SHIPPED"
    );

    const completedOrders = allOrders.filter(
        (order) => order.status === "CANCELLED" || 
        (order.status === "SHIPPED" && 
         new Date(order.updatedAt).getTime() < Date.now() - 30 * 24 * 60 * 60 * 1000) // Older than 30 days
    );

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            PENDING: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
            PAID: { label: "Pagado", className: "bg-green-100 text-green-800" },
            SHIPPED: { label: "Enviado", className: "bg-blue-100 text-blue-800" },
            CANCELLED: { label: "Cancelado", className: "bg-red-100 text-red-800" },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
        return (
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    const OrderCard = ({ order }: { order: typeof allOrders[0] }) => {
        const total = Number(order.total);
        const firstProduct = order.orderItems[0]?.product;
        const productImage = firstProduct?.images[0]?.url || "/placeholder.png";

        return (
            <Link
                href={`/orders/${order.id}`}
                className="block border rounded-lg p-4 hover:bg-gray-50 transition hover:shadow-md"
            >
                <div className="flex gap-4">
                    {/* Product Image */}
                    {firstProduct && (
                        <img
                            src={productImage}
                            alt={firstProduct.name}
                            className="w-20 h-20 object-cover rounded"
                        />
                    )}

                    {/* Order Info */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold text-lg">Orden #{order.id}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-xl">${total.toFixed(2)}</p>
                                {getStatusBadge(order.status)}
                            </div>
                        </div>

                        {/* Products Preview */}
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">
                                {order.orderItems.length} producto{order.orderItems.length !== 1 ? "s" : ""}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {order.orderItems.slice(0, 3).map((item) => (
                                    <span
                                        key={item.id}
                                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                                    >
                                        {item.product.name} x{item.quantity}
                                    </span>
                                ))}
                                {order.orderItems.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                        +{order.orderItems.length - 3} más
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-6">
                <Link
                    href="/account"
                    className="text-blue-500 hover:text-blue-700 transition mb-4 inline-block"
                >
                    ← Volver a mi cuenta
                </Link>
                <h1 className="text-3xl font-bold">Mis Órdenes</h1>
                <p className="text-gray-600 mt-2">
                    Gestiona y revisa todas tus órdenes
                </p>
            </div>

            {/* Active Orders Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Órdenes Activas</h2>
                    <span className="text-sm text-gray-500">
                        {activeOrders.length} {activeOrders.length === 1 ? "orden" : "órdenes"}
                    </span>
                </div>

                {activeOrders.length === 0 ? (
                    <div className="border rounded-lg p-8 text-center bg-gray-50">
                        <p className="text-gray-600">No tienes órdenes activas en este momento</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activeOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>

            {/* Order History Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Historial de Órdenes</h2>
                    <span className="text-sm text-gray-500">
                        {completedOrders.length} {completedOrders.length === 1 ? "orden" : "órdenes"}
                    </span>
                </div>

                {completedOrders.length === 0 ? (
                    <div className="border rounded-lg p-8 text-center bg-gray-50">
                        <p className="text-gray-600">Aún no tienes órdenes completadas</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {completedOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>

            {/* Empty State */}
            {allOrders.length === 0 && (
                <div className="border rounded-lg p-12 text-center bg-gray-50">
                    <p className="text-gray-600 text-lg mb-4">No has realizado ninguna compra aún</p>
                    <Link
                        href="/"
                        className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Comenzar a comprar
                    </Link>
                </div>
            )}
        </div>
    );
}

