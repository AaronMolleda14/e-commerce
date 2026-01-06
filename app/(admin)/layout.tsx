// app/(admin)/layout.tsx
import AdminLayoutClientWrapper from "@/app/layout/AdminLayoutClientWrapper";
import { requireAdmin } from "@/app/lib/require-admin";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireAdmin();

    return (
        <AdminLayoutClientWrapper>
            {children}
        </AdminLayoutClientWrapper>
    );
}
