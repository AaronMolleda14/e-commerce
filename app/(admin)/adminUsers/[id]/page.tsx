// app/(admin)/adminUsers/[id]/page.tsx
import { getAdminUserById, updateUser } from "@/app/services/user.server";
import UserForm from "@/app/components/admin/users/UserForm";
import { notFound, redirect } from "next/navigation";

type Props = {
    params: Promise<{id: string}>;
};

export default async function EditUserPage({ params }: Props) {
    const resolvedParams = await params;
    if (!resolvedParams?.id) notFound();

    const userId = Number(resolvedParams.id);
    if(isNaN(userId)) notFound();

    const user = await getAdminUserById(userId);
    if(!user) notFound();
    
    async function updateUserAction(formData: FormData) {
        "use server";

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as "USER" | "ADMIN";

        await updateUser(userId, {
            name,
            email,
            role,
            password: password || undefined,
        });

        redirect("/adminUsers");
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Editar Usuario
            </h1>

            <UserForm
                user={user}
                action={updateUserAction}
            />
        </div>
    );
}
