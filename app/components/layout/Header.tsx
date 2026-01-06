// app/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCart } from "@/app/hooks/useCart";

interface HeaderProps {
    onMenuClick: () => void;
    sidebarOpen: boolean;
}

export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
    const { data: session } = useSession();
    const { totalItems } = useCart();

    return (
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4">

                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:from-orange-700 hover:to-red-700 transition">
                    Mochiflex
                </Link>

                <div className="flex items-center gap-4">
                    <Link 
                        href="/cart" 
                        className="relative px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition font-medium"
                    >
                        🛒 Mi Carrito
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                                {totalItems > 99 ? '99+' : totalItems}
                            </span>
                        )}
                    </Link>

                    {!session ? (
                        <>
                            <Link href="/login" className="px-4 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition font-medium">
                                Iniciar Sesión
                            </Link>
                            <Link href="/register" className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transition shadow-md hover:shadow-lg font-medium">
                                Registrarse
                            </Link>
                        </>
                    ) : (
                        <Link href="/account" className="px-4 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition font-medium">
                            👤 Cuenta
                        </Link>
                    )}

                    <button 
                        className="text-2xl font-bold p-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition cursor-pointer" 
                        onClick={onMenuClick} 
                        aria-label="Abrir menu"
                    >
                        ☰
                    </button>
                 
                </div>
            </div>
        </header>
    );
}