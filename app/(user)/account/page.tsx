// app/(user)/account/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import Link from "next/link";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            orders: {
                orderBy: { createdAt: "desc" },
                include: {
                    orderItems: {
                        include: {
                            product: true,
                        },
                    },
                },
            },
        },
    });

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Información del usuario */}
                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Nombre:</span> {user.name}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                        <p className="text-sm text-gray-500">
                            Miembro desde: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Resumen de órdenes */}
                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Total de órdenes:</span> {user.orders.length}</p>
                        <p className="text-sm text-gray-500">
                            {user.orders.length > 0
                                ? `Última orden: ${new Date(user.orders[0].createdAt).toLocaleDateString()}`
                                : "Aún no has realizado ninguna compra"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Lista de órdenes */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Mis Órdenes</h2>
                {user.orders.length === 0 ? (
                    <div className="border rounded-lg p-8 text-center">
                        <p className="text-gray-600 mb-4">No tienes órdenes aún</p>
                        <Link
                            href="/"
                            className="text-blue-500 hover:text-blue-700 transition"
                        >
                            Comenzar a comprar
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {user.orders.map((order) => {
                            const total = Number(order.total);
                            return (
                                <Link
                                    key={order.id}
                                    href={`/orders/${order.id}`}
                                    className="block border rounded-lg p-4 hover:bg-gray-50 transition"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">Orden #{order.id}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString("es-ES", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                            <p className="text-sm">
                                                {order.orderItems.length} producto(s)
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">${total.toFixed(2)}</p>
                                            <span
                                                className={`inline-block px-2 py-1 rounded text-xs ${
                                                    order.status === "PAID"
                                                        ? "bg-green-100 text-green-800"
                                                        : order.status === "SHIPPED"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : order.status === "CANCELLED"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {order.status === "PAID"
                                                    ? "Pagado"
                                                    : order.status === "SHIPPED"
                                                    ? "Enviado"
                                                    : order.status === "CANCELLED"
                                                    ? "Cancelado"
                                                    : "Pendiente"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

