// app/(admin)/adminUsers/page.tsx
import { getAdminUsers } from "@/app/services/user.server";
import { UsersHeader } from "@/app/components/admin/users/UsersHeader";
import { UsersToolbar } from "@/app/components/admin/users/UsersToolbar";
import { UsersTable } from "@/app/components/admin/users/UsersTable";
import { UsersEmptyState } from "@/app/components/admin/users/UsersEmptyState";

export default async function AdminUsersPage() {
    const users = await getAdminUsers();

    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl">
            <UsersHeader />
            <UsersToolbar />

            {users.length === 0 ? (
                <UsersEmptyState />
            ) : (
                <UsersTable users={users} />
            )}
        </div>
    );
}
