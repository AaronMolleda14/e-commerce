// app/services/user.service.ts
"use client";

export async function deleteUser(id: number) {
    const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Error al eliminar el usuario" }));
        throw new Error(error.error || "Error al eliminar el usuario");
    }
}
