// app/api/admin/orders/[id]/route.ts
import { deleteOrder } from "@/app/services/order.server";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const params = await context.params;
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    try {
        await deleteOrder(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting order:", error);
        return NextResponse.json(
            { error: error?.message || "Error al eliminar el pedido" },
            { status: 500 }
        );
    }
}
