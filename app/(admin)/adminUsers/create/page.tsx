// app/(admin)/adminUsers/create/page.tsx
import { createUser } from "@/app/services/user.server";
import { redirect } from "next/navigation";
import UserForm from "@/app/components/admin/users/UserForm";

async function createUserAction(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as "USER" | "ADMIN";

    await createUser({
        name,
        email,
        password,
        role,
    });

    redirect("/adminUsers");
}

export default function CreateUserPage() {
    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Nuevo Usuario
            </h1>
            
            <UserForm action={createUserAction} />
        </div>
    );
}
