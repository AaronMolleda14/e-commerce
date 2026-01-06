// app/api/admin/orders/[id]/finish/route.ts
import { finishOrder } from "@/app/services/order.server";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const params = await context.params;
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    try {
        await finishOrder(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Error al terminar el pedido" },
            { status: 500 }
        );
    }
}
