// app/api/admin/users/[id]/route.ts
import { deleteUser } from "@/app/services/user.server";
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
        await deleteUser(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { error: error?.message || "Error al eliminar el usuario" },
            { status: 500 }
        );
    }
}
