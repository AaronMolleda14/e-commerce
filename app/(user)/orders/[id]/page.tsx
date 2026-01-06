// app/(user)/orders/[id]/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import Link from "next/link";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function OrderDetailPage({ params }: Props) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    const resolvedParams = await params;
    const orderId = parseInt(resolvedParams.id);

    if (isNaN(orderId)) {
        return <p className="container mx-auto px-4 py-10">ID de orden inválido</p>;
    }

    // Get the current user
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        redirect("/login");
    }

    // Get the order and verify it belongs to the user
    const order = await prisma.order.findUnique({
        where: { id: orderId },
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

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-10">
                <p>Orden no encontrada</p>
                <Link href="/account" className="text-blue-500 hover:text-blue-700">
                    Volver a mi cuenta
                </Link>
            </div>
        );
    }

    // Verify the order belongs to the current user
    if (order.userId !== user.id) {
        redirect("/account");
    }

    const total = Number(order.total);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-6">
                <Link
                    href="/account"
                    className="text-blue-500 hover:text-blue-700 transition mb-4 inline-block"
                >
                    ← Volver a mi cuenta
                </Link>
                <h1 className="text-3xl font-bold">Detalles de la Orden #{order.id}</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Información de la orden */}
                <div className="md:col-span-2 space-y-6">
                    <div className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Información de la Orden</h2>
                        <div className="space-y-2">
                            <p>
                                <span className="font-medium">ID de orden:</span> #{order.id}
                            </p>
                            <p>
                                <span className="font-medium">Fecha:</span>{" "}
                                {new Date(order.createdAt).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                            <p>
                                <span className="font-medium">Estado:</span>{" "}
                                <span
                                    className={`inline-block px-2 py-1 rounded text-sm ${
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
                            </p>
                        </div>
                    </div>

                    {/* Productos */}
                    <div className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Productos</h2>
                        <div className="space-y-4">
                            {order.orderItems.map((item) => {
                                const itemPrice = Number(item.price);
                                const itemTotal = itemPrice * item.quantity;
                                const productImage = item.product.images[0]?.url || "/placeholder.png";

                                return (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 border-b pb-4 last:border-0"
                                    >
                                        {item.product.images.length > 0 && (
                                            <img
                                                src={productImage}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <Link
                                                href={`/products/${item.product.slug}`}
                                                className="font-semibold hover:text-blue-500 transition"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-sm text-gray-500">
                                                Cantidad: {item.quantity}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Precio unitario: ${itemPrice.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ${itemTotal.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Resumen */}
                <div className="md:col-span-1">
                    <div className="border rounded-lg p-6 sticky top-4">
                        <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span>
                                    Subtotal ({order.orderItems.reduce((acc, item) => acc + item.quantity, 0)} artículos)
                                </span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

