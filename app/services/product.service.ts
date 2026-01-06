// app/services/product.service.ts
export async function deleteProduct(id: number) {
    const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar producto");
    }

    return await response.json();
}