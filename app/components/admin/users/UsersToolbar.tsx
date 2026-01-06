// app/components/admin/users/UsersToolbar.tsx
"use client";

export function UsersToolbar() {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <input 
                type="text"
                placeholder="Buscar usuario..."
                className="input w-64"
            />

            <select className="input w-48">
                <option value="">Rol</option>
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
            </select>
        </div>
    );
}
