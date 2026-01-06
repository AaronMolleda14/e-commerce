// app/(shop)/checkout/confirmation/[id]/page.tsx
import Link from "next/link";
import { prisma } from "@/app/lib/db";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function ConfirmationPage({ params }: Props) {
    const resolvedParams = await params;
    const orderId = parseInt(resolvedParams.id);

    if (isNaN(orderId)) {
        return <p>ID de orden inválido</p>;
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { orderItems: { include: { product: true } } },
    });

    if (!order) return <p>Orden no encontrada</p>;

    const total = Number(order.total);

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold">Gracias por tu compra</h1>
            <p>ID de la orden: {order.id}</p>
            <p>Total pagado: ${total.toFixed(2)}</p>

            {/* Resumen de items */}
            <div className="space-y-2 border-t pt-4">
                <h2 className="font-semibold mb-2">Productos:</h2>
                {order.orderItems.map(item => {
                    const itemPrice = Number(item.price);
                    const itemTotal = itemPrice * item.quantity;
                    return (
                        <div key={item.id} className="flex justify-between border-b pb-2">
                            <span>{item.product.name} x {item.quantity}</span>
                            <span>${itemTotal.toFixed(2)}</span>
                        </div>
                    );
                })}
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-4">
                <Link
                    href={`/orders/${order.id}`}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                    Ver detalles de la orden
                </Link>
                <Link
                    href="/"
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
                >
                    Continuar comprando
                </Link>
            </div>
        </div>
    );
}