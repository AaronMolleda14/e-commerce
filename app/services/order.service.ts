// app/services/order.service.ts
"use client";

export async function finishOrder(id: number) {
    const response = await fetch(`/api/admin/orders/${id}/finish`, {
        method: "PATCH",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Error al terminar el pedido" }));
        throw new Error(error.error || "Error al terminar el pedido");
    }
}

export async function deleteOrder(id: number) {
    const response = await fetch(`/api/admin/orders/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Error al eliminar el pedido" }));
        throw new Error(error.error || "Error al eliminar el pedido");
    }
}
