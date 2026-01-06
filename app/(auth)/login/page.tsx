// app/(shop)/login/page.tsx
"use client";

import { useEffect, useRef, useActionState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginUser } from "./actions";
import AuthForm from "@/app/components/auth/AuthForm";

export default function LoginPage() {
    const [state, action] = useActionState(loginUser, null);
    const router = useRouter();
    const passwordRef = useRef<string>("");

    // Intercept form submission to store password
    const handleAction = async (formData: FormData) => {
        passwordRef.current = formData.get("password")?.toString() || "";
        return action(formData);
    };

    useEffect(() => {
        if (state?.success && state.email && passwordRef.current) {
            signIn("credentials", {
                email: state.email,
                password: passwordRef.current,
                redirect: false,
            }).then((result) => {
                if (result?.ok) {
                    router.push("/");
                    router.refresh();
                } else {
                    // Clear password ref on error
                    passwordRef.current = "";
                }
            });
        }
    }, [state, router]);

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="card p-8 gradient-bg border-orange-200">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Iniciar sesión
                </h1>
                <p className="text-gray-600 mb-6">Ingresa a tu cuenta para continuar</p>

                <AuthForm
                    action={handleAction}
                    error={state?.error}
                    submitLabel="🔐 Ingresar"
                    fields={[
                        { name: "email", label: "Email", type: "email" },
                        { name: "password", label: "Contraseña", type: "password" },
                    ]}
                />
            </div>
        </div>
    );
}