"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWaiterAuthStore } from "@/lib/stores/waiterAuthStore";
import { waiterClient } from "@/lib/api/waiterClient";
import { Loader2, LogOut, RefreshCw } from "lucide-react";

interface Table {
    id: number;
    table_number: string;
    capacity: number;
    status: 'available' | 'occupied' | 'reserved' | 'cleaning';
    current_session?: {
        id: number;
        waiter_id: number;
    };
}

export default function WaiterDashboard() {
    const { isAuthenticated, token, logout, user } = useWaiterAuthStore();
    const router = useRouter();
    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !token) {
            router.push("/waiter/login");
            return;
        }
        fetchTables();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, token, router]);

    const fetchTables = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await waiterClient.get<Table[]>("/tables", token);
            setTables(data);
        } catch (error) {
            console.error("Error fetching tables", error);
            if ((error as Error).message === 'Unauthorized') {
                logout();
                router.push("/waiter/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/waiter/login");
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
            case 'occupied': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
            case 'cleaning': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'available': return 'Disponible';
            case 'occupied': return 'Ocupada';
            case 'reserved': return 'Reservada';
            case 'cleaning': return 'Limpieza';
            default: return status;
        }
    };

    if (!isAuthenticated && !token) {
        return null; // Redirecting
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        Hola, {user?.name}
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchTables}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            title="Actualizar"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Salir
                        </button>
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
                                    router.push(`/waiter/table/${table.id}/order`);
                                }}
                                className={`
                    relative p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md
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
