// app/components/checkout/ProtectedCheckout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import CheckoutPageContent from "./CheckoutPageContent";

export default function ProtectedCheckout() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [show, setShow]  = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push("/login");
            } else {
                setShow(true);
            }
        }
    }, [isAuthenticated, loading, router]);

    if (loading) return <p>Cargando...</p>
    if (!show) return null;

    return <CheckoutPageContent />
}