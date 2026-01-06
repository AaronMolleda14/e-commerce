// app/layout/AdminLayoutClientWrapper.tsx
"use client";

import AdminHeader from "@/app/components/admin/layout/AdminHeader";
import AdminFooter from "@/app/components/admin/layout/AdminFooter";

export default function AdminLayoutClientWrapper({ children }: { children: React.ReactNode}) {
    return (
        <>
            <AdminHeader />
            <main className="flex-1">{children}</main>
            <AdminFooter />
        </>
    );
}
