// app/components/admin/layout/AdminHeader.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminHeader() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:from-orange-700 hover:to-red-700 transition">
                            Mochiflex
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium">
                            Panel de Administrador
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition text-xl font-bold"
                            aria-label="Abrir menú"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </header>
            <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    );
}
