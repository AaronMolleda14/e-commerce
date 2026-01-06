// app/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const { data: session } = useSession();

    return (
        <div 
            className={`fixed inset-0 z-50 transition-all duration-300 ${
                open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
                open ? 'opacity-100' : 'opacity-0'
            }`}></div>

            {/* Sidebar Panel */}
            <aside
                className={`absolute right-0 top-0 w-80 h-screen bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-2xl transition-transform duration-300 transform ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-orange-200">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Menú
                        </h2>
                        <button 
                            onClick={onClose} 
                            className="cursor-pointer p-2 rounded-lg hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition text-xl font-bold"
                            aria-label="Cerrar menú"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 flex-1">
                        {!session ? (
                            <>
                                <Link 
                                    href="/" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">🏠</span>
                                    <span>Inicio</span>
                                </Link>
                                <Link 
                                    href="/login" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3 group"
                                >
                                    <span className="text-xl">🔐</span>
                                    <span>Iniciar sesión</span>
                                </Link>
                                <Link 
                                    href="/register" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transition-all font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <span className="text-xl">✨</span>
                                    <span>Registrarse</span>
                                </Link>
                                <div className="border-t border-orange-200 my-4"></div>
                                <Link 
                                    href="/about" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">ℹ️</span>
                                    <span>Acerca de</span>
                                </Link>
                                <Link 
                                    href="/social-media" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">📸</span>
                                    <span>Redes Sociales</span>
                                </Link>
                                <Link 
                                    href="/legal" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">⚖️</span>
                                    <span>Información Legal</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    href="/" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">🏠</span>
                                    <span>Inicio</span>
                                </Link>
                                <Link 
                                    href="/account" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">👤</span>
                                    <span>Mi Cuenta</span>
                                </Link>
                                <Link 
                                    href="/orders" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">📦</span>
                                    <span>Mis Pedidos</span>
                                </Link>
                                <Link 
                                    href="/cart" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">🛒</span>
                                    <span>Mi Carrito</span>
                                </Link>
                                <div className="border-t border-orange-200 my-4"></div>
                                <Link 
                                    href="/about" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">ℹ️</span>
                                    <span>Acerca de</span>
                                </Link>
                                <Link 
                                    href="/social-media" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">📸</span>
                                    <span>Redes Sociales</span>
                                </Link>
                                <Link 
                                    href="/legal" 
                                    onClick={onClose}
                                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-600 transition-all font-medium flex items-center gap-3"
                                >
                                    <span className="text-xl">⚖️</span>
                                    <span>Información Legal</span>
                                </Link>
                                <div className="border-t border-orange-200 my-4"></div>
                                {session?.user?.role === "ADMIN" && (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            onClick={onClose}
                                            className="px-4 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transition-all font-medium flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            <span className="text-xl">🛠️</span>
                                            <span>Panel de Administración</span>
                                        </Link>
                                    </>
                                )}
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
                            </>
                        )}
                    </nav>

                    {/* Footer */}
                    <div className="pt-4 border-t border-orange-200 mt-auto">
                        <p className="text-xs text-gray-500 text-center">
                            © 2026 Mochiflex
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
