// app/components/admin/users/UserForm.tsx
"use client";

import { AdminUser } from "@/app/types/user";

interface UserFormProps {
    user?: AdminUser;
    action: (formData: FormData) => void;
}

export default function UserForm({ user, action }: UserFormProps) {
    return (
        <div className="card p-6 md:p-8">
            <form action={action} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre
                        </label>
                        <input
                            name="name"
                            defaultValue={user?.name}
                            className="input"
                            placeholder="Nombre completo"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            defaultValue={user?.email}
                            className="input"
                            placeholder="email@ejemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="input"
                            placeholder={user ? "Dejar vacío para no cambiar" : "Contraseña"}
                            required={!user}
                            minLength={6}
                        />
                        {user && (
                            <p className="text-xs text-gray-500 mt-1">
                                Dejar vacío para mantener la contraseña actual
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rol
                        </label>
                        <select
                            name="role"
                            defaultValue={user?.role || "USER"}
                            className="input"
                            required
                        >
                            <option value="USER">Usuario</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button type="submit" className="btn-primary">
                        {user ? "💾 Guardar Cambios" : "✨ Crear Usuario"}
                    </button>
                    {user && (
                        <a 
                            href="/adminUsers" 
                            className="btn-secondary"
                        >
                            Cancelar
                        </a>
                    )}
                </div>
            </form>
        </div>
    );
}
