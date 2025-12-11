"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api/client";
import { Loader2, UtensilsCrossed, ChevronRight } from "lucide-react";
import Link from "next/link";

interface TableInfo {
    id: number;
    table_number: string;
    status: string;
    qr_code: string;
}

export default function TableLandingPage({ params }: { params: Promise<{ qrCode: string }> }) {
    const { qrCode } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [table, setTable] = useState<TableInfo | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        checkTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrCode]);

    const checkTable = async () => {
        try {
            // Logic to fetch table info by QR code
            // We need an endpoint for this: /api/qr/table/{qrCode}
            const data = await apiClient.get<{ table: TableInfo; status: string }>(`/qr/table/${qrCode}`);
            setTable(data.table);
        } catch (err) {
            console.error("Invalid QR", err);
            setError("Código QR inválido o mesa no encontrada.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-500">Verificando mesa...</p>
            </div>
        );
    }

    if (error || !table) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <UtensilsCrossed className="h-8 w-8 text-red-500" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Error</h1>
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600 to-blue-500 rounded-b-[40%] z-0"></div>

            <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 text-center">
                    <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <UtensilsCrossed className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        ¡Bienvenido!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Estás en la <span className="font-bold text-blue-600 dark:text-blue-400">Mesa {table.table_number}</span>
                    </p>

                    <Link
                        href={`/table/${qrCode}/menu`}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 group transition-all shadow-lg shadow-blue-500/30"
                    >
                        Ver el Menú
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-center text-gray-400">
                            Escanea este código para ordenar desde tu celular sin esperar al mesero.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
