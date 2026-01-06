// app/layout/LayoutClientWrapper.tsx
"use client";

import { use, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    
    // Don't render regular header/footer for admin routes
    const isAdminRoute = pathname?.startsWith("/adminProducts") || pathname?.startsWith("/adminUsers") || pathname?.startsWith("/adminOrders") || pathname?.startsWith("/dashboard");

    if (isAdminRoute) {
        // Admin routes use their own layout, just pass through children
        return <>{children}</>;
    }

    return (
        <>
            <Header onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen}/>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1">{children}</main>
            <Footer />
        </>
    );
}