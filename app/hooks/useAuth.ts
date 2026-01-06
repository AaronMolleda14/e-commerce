// app/hooks/useAuth.ts
"use client";

import { useSession } from "next-auth/react";

export default function useAuth() {
    const { data: session, status } = useSession();

    return {
        session,
        loading: status === "loading",
        isAuthenticated: status === "authenticated",
    };
}