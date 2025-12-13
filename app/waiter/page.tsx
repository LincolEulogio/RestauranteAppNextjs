"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWaiterAuthStore, useWaiterAuthStoreHydration } from "@/lib/stores/waiterAuthStore";
import { waiterClient } from "@/lib/api/waiterClient";
import { Loader2, LogOut, RefreshCw, User, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Swal from 'sweetalert2';

interface Table {
    id: number;
    table_number: string;
    capacity: number;
    status: 'available' | 'occupied' | 'reserved' | 'maintenance';
    current_session?: {
        id: number;
        waiter_id: number;
    };
}

export default function WaiterDashboard() {
    const { isAuthenticated, token, logout, user } = useWaiterAuthStore();
    const hydrated = useWaiterAuthStoreHydration(); // Use the custom hook checks hydration
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);



    useEffect(() => {
        // Only redirect if effectively NOT authenticated and store IS hydrated
        if (hydrated && (!isAuthenticated || !token)) {
            router.push("/waiter/login");
            return;
        }

        if (hydrated && isAuthenticated && token) {
            fetchTables();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hydrated, isAuthenticated, token, router]);

    const fetchTables = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await waiterClient.get<Table[]>("/tables", token);
            setTables(data);
        } catch (error) {
            console.error("Error fetching tables", error);
            if ((error as Error).message === 'Unauthorized') {
                Swal.fire({
                    title: 'Sesión Expirada',
                    text: 'Su sesión ha expirado, por favor ingrese nuevamente.',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    logout();
                    router.push("/waiter/login");
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // ... rest of functions (updateTableStatus, etc) match existing code, 
    // but I must include them or just replace the top part.
    // Since this is a large file, I should try to target the start of the component up to fetchTables.

    const updateTableStatus = async (tableId: number, newStatus: 'available' | 'occupied' | 'reserved' | 'maintenance') => {
        if (!token) return;
        try {
            await waiterClient.patch(`/tables/${tableId}/status`, { status: newStatus }, token);
            // Optimistic update or refetch
            setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
        } catch (error) {
            console.error("Error updating table status", error);
            Swal.fire('Error', 'Error actualizando estado de la mesa', 'error');
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar Sesión?',
            text: "Se desconectará del sistema",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                router.push("/waiter/login");
            }
        });
    };

    // Helper functions need to be preserved or I replace the whole component body?
    // I'll assume I need to keep the UI exactly as is.
    // I will replace from `export default function...` down to `if (!isAuthenticated...` to ensure I capture the new hooks.

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
            case 'occupied': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
            case 'maintenance': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'available': return 'Disponible';
            case 'occupied': return 'Ocupada';
            case 'reserved': return 'Reservada';
            case 'maintenance': return 'Mantenimiento';
            default: return status;
        }
    };

    // Replace the early return logic with a loader if not hydrated
    if (!hydrated) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>;
    }

    if (!isAuthenticated && !token) {
        return null; // Will redirect via effect
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
                            <User className="w-5 h-5" />
                        </div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                            Hola, {user?.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchTables}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            title="Actualizar"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                            >
                                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsProfileOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 mb-2">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'Mesero'}</p>
                                        </div>

                                        <div className="px-2 mb-2">
                                            <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tema</p>
                                            <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-900/50 p-1 rounded-lg">
                                                <button
                                                    onClick={() => setTheme("light")}
                                                    className={`flex items-center justify-center gap-2 p-2 rounded-md transition-all ${theme === 'light' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200/50 dark:hover:bg-gray-700'}`}
                                                >
                                                    <Sun className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setTheme("dark")}
                                                    className={`flex items-center justify-center gap-2 p-2 rounded-md transition-all ${theme === 'dark' ? 'bg-gray-700 shadow text-blue-400' : 'text-gray-500 hover:bg-gray-200/50 dark:hover:bg-gray-700'}`}
                                                >
                                                    <Moon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="px-2">
                                            <button
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    handleLogout();
                                                }}
                                                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Estado de Mesas</h2>

                {loading && tables.length === 0 ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {tables.map((table) => (
                            <div
                                key={table.id}
                                onClick={() => {
                                    if (table.status === 'available') {
                                        router.push(`/waiter/table/${table.id}/order`);
                                    } else {
                                        Swal.fire({
                                            toast: true,
                                            position: 'top-end',
                                            icon: 'info',
                                            title: `La mesa está ${getStatusLabel(table.status)}`,
                                            showConfirmButton: false,
                                            timer: 2000
                                        });
                                    }
                                }}
                                className={`
                    relative p-6 rounded-xl border-2 transition-all hover:shadow-md
                    ${table.status === 'available' ? 'cursor-pointer' : 'cursor-not-allowed opacity-90'}
                    ${getStatusColor(table.status)}
                    flex flex-col items-center justify-center aspect-square
                `}
                            >
                                <span className="text-3xl font-bold mb-2">{table.table_number}</span>
                                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-white/50 dark:bg-black/20">
                                    {getStatusLabel(table.status)}
                                </span>
                                <span className="absolute bottom-4 text-xs opacity-75">
                                    Cap: {table.capacity}
                                </span>

                                {/* Active Session Indicator */}
                                {table.status === 'occupied' && (
                                    <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                )}

                                {/* Status Toggle Menu */}
                                <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 hover:opacity-100 transition-opacity bg-black/60 rounded-b-xl flex justify-center gap-2 backdrop-blur-sm"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Available Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Swal.fire({
                                                title: '¿Marcar como DISPONIBLE?',
                                                text: "La mesa cambiará a estado disponible",
                                                icon: 'question',
                                                showCancelButton: true,
                                                confirmButtonColor: '#22c55e',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Sí, cambiar',
                                                cancelButtonText: 'Cancelar'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    updateTableStatus(table.id, 'available');
                                                }
                                            });
                                        }}
                                        className="p-1.5 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-sm"
                                        title="Disponible"
                                    >
                                        <div className="w-4 h-4 rounded-full border-2 border-white" />
                                    </button>

                                    {/* Occupied Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Swal.fire({
                                                title: '¿Marcar como OCUPADA?',
                                                text: "La mesa cambiará a estado ocupada",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#ef4444',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Sí, ocupar',
                                                cancelButtonText: 'Cancelar'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    updateTableStatus(table.id, 'occupied');
                                                }
                                            });
                                        }}
                                        className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                        title="Ocupada"
                                    >
                                        <div className="w-4 h-4 bg-white rounded-full" />
                                    </button>

                                    {/* Maintenance Button - Replaces Cleaning */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Swal.fire({
                                                title: '¿Mantenimiento?',
                                                text: "La mesa pasará a estado de mantenimiento",
                                                icon: 'info',
                                                showCancelButton: true,
                                                confirmButtonColor: '#6b7280',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Confirmar',
                                                cancelButtonText: 'Cancelar'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    updateTableStatus(table.id, 'maintenance');
                                                }
                                            });
                                        }}
                                        className="p-1.5 rounded-full bg-gray-500 text-white hover:bg-gray-600 shadow-sm"
                                        title="Mantenimiento"
                                    >
                                        <div className="w-4 h-4 border-2 border-dashed border-white rounded-full" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {tables.length === 0 && (
                            <p className="col-span-full text-center text-gray-500">No hay mesas configuradas.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
