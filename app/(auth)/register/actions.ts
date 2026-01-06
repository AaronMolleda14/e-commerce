// app/(auth)/register/actions.ts
"use server";

import { prisma } from "@/app/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { AuthFormState } from "@/app/types/authFormState";

export async function registerUser(
    _state: AuthFormState | null,
    formData: FormData
): Promise<AuthFormState | null> {
    const name= formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
        return { error: "Todos los campos son obligatorios"};
    }

    const exists = await prisma.user.findUnique({
        where: { email },
    });

    if (exists) {
        return { error: "El email ya está registrado"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // Redirect to login page - user can sign in after registration
    redirect("/login");
}