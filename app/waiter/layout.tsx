"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWaiterAuthStore } from "@/lib/stores/waiterAuthStore";
import Swal from 'sweetalert2';

export default function WaiterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, logout } = useWaiterAuthStore();
    const router = useRouter();

    // Inactivity Timer Global for Waiter Section
    useEffect(() => {
        // Only run timer if authenticated
        if (!isAuthenticated) return;

        let timeoutId: NodeJS.Timeout;
        const INACTIVITY_LIMIT = 40 * 60 * 1000; // 40 minutes

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                console.log("Inactivity timeout: Logging out waiter");
                Swal.fire({
                    title: 'Sesión Expirada',
                    text: 'Su sesión ha cerrado por inactividad',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    logout();
                    router.push("/waiter/login");
                });
            }, INACTIVITY_LIMIT);
        };

        // Listen for user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(event => document.addEventListener(event, resetTimer));

        // Start timer
        resetTimer();

        return () => {
            clearTimeout(timeoutId);
            events.forEach(event => document.removeEventListener(event, resetTimer));
        };
    }, [isAuthenticated, logout, router]);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="waiter-theme"
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
