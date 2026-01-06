// app/components/admin/layout/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname?.startsWith(path);
    };

    return (
        <div
            className={`fixed inset-0 z-50 transition-all duration-300 ${
                open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose}
            >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
                open ? "opacity-100" : "opacity-0"
                }`}
            ></div>

            {/* Sidebar Panel */}
            <aside
                className={`absolute right-0 top-0 w-80 h-screen bg-white shadow-2xl transition-transform duration-300 transform ${
                open ? "translate-x-0" : "translate-x-full"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Administración
                        </h2>
                        <button
                            onClick={onClose}
                            className="cursor-pointer p-2 rounded-lg hover:bg-orange-50 text-gray-600 hover:text-orange-600 transition text-xl font-bold"
                            aria-label="Cerrar menú"
                        >
                        ✕
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 flex-1">
                        <Link
                            href="/dashboard"
                            onClick={onClose}
                            className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium ${
                                isActive("/dashboard")
                                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            }`}
                        >
                            <span className="text-xl">📊</span>
                            <span>Dashboard</span>
                        </Link>

                        <Link
                            href="/adminProducts"
                            onClick={onClose}
                            className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium ${
                                isActive("/adminProducts")
                                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            }`}
                        >
                            <span className="text-xl">📦</span>
                            <span>Productos</span>
                        </Link>

                        <Link
                            href="/adminUsers"
                            onClick={onClose}
                            className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium ${
                                isActive("/adminUsers")
                                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            }`}
                        >
                            <span className="text-xl">👥</span>
                            <span>Usuarios</span>
                        </Link>

                        <Link
                            href="/adminOrders"
                            onClick={onClose}
                            className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium ${
                                isActive("/adminOrders")
                                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            }`}
                        >
                            <span className="text-xl">📋</span>
                            <span>Pedidos</span>
                        </Link>

                        <div className="border-t border-gray-200 my-4"></div>

                        <Link
                            href="/"
                            onClick={onClose}
                            className="px-4 py-3 rounded-lg flex items-center gap-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all font-medium"
                        >
                            <span className="text-xl">🏠</span>
                            <span>Tienda</span>
                        </Link>

                        {/* Logout Button */}
                        <button 
                            onClick={() => {
                                signOut();
                                onClose();
                            }} 
                            className="cursor-pointer px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all font-medium flex items-center gap-3 text-left"
                        >
                            <span className="text-xl">🚪</span>
                            <span>Cerrar sesión</span>
                        </button>
                    </nav>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-200 mt-4 text-center">
                        <p className="text-xs text-gray-500">© 2026 Mochiflex</p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
