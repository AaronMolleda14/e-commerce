// app/(auth)/login/actions.ts
"use server";

import { verifyCredentials } from "@/app/lib/auth-helpers";
import { AuthFormState } from "@/app/types/authFormState";

export async function loginUser(
    _state: AuthFormState | null,
    formData: FormData
): Promise<AuthFormState | null> {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return { error: "Email y contraseña requeridos" };
    }

    const user = await verifyCredentials(email, password);

    if (!user) {
        return { error: "Credenciales inválidas" };
    }

    // Return success with email - client will handle sign-in
    // Note: We return email so client can call signIn, but password is not stored
    return { success: true, email };
}