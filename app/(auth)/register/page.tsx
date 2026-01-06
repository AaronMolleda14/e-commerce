// app/(shop)/register/page.tsx
"use client";

import { useActionState } from "react";
import { registerUser } from "./actions";
import AuthForm from "@/app/components/auth/AuthForm";

export default function RegisterPAGE() {
    const [state, action] = useActionState(registerUser, null);

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="card p-8 gradient-bg border-orange-200">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Crear cuenta
                </h1>
                <p className="text-gray-600 mb-6">Únete a nosotros y comienza a comprar</p>

                <AuthForm
                    action={action}
                    error={state?.error}
                    submitLabel="✨ Registrarse"
                    fields={[
                        { name: "name", label: "Nombre" },
                        { name: "email", label: "Email", type: "email" },
                        { name: "password", label: "Contraseña", type: "password" },
                    ]}
                />
            </div>
        </div>
    );
}