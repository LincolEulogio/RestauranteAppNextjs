/**
 * Proveedor de React Query - QueryProvider
 * 
 * Este componente envuelve la aplicación con el contexto de React Query (TanStack Query),
 * permitiendo realizar peticiones HTTP con caché automático, revalidación y gestión de estado.
 * 
 * React Query proporciona:
 * - Caché automático de datos
 * - Revalidación en segundo plano
 * - Gestión de estados de carga y error
 * - Sincronización de datos entre componentes
 */

"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

/**
 * Componente QueryProvider
 * 
 * Proveedor de contexto para React Query que debe envolver toda la aplicación
 * o las partes que necesiten realizar peticiones HTTP.
 * 
 * Crea una instancia única de QueryClient por sesión del navegador.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso a React Query
 * @returns {JSX.Element} Proveedor de React Query
 * 
 * @example
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 */
export default function QueryProvider({ children }: { children: React.ReactNode }) {
    // Crea una instancia única de QueryClient usando useState
    // Esto asegura que el cliente se cree solo una vez durante el ciclo de vida del componente
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
