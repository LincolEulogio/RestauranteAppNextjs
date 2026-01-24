/**
 * Proveedor de Temas - ThemeProvider
 * 
 * Este componente envuelve la aplicación con el contexto de next-themes,
 * permitiendo gestionar temas claros y oscuros de manera automática.
 * 
 * next-themes proporciona:
 * - Cambio automático entre tema claro y oscuro
 * - Persistencia de la preferencia del usuario
 * - Detección de preferencias del sistema
 * - Sin parpadeo (flash) al cargar la página
 */

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Componente ThemeProvider
 * 
 * Wrapper del proveedor de temas de next-themes.
 * Permite a todos los componentes hijos acceder y cambiar el tema de la aplicación.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al tema
 * @param {Object} props - Propiedades adicionales heredadas de NextThemesProvider
 * @returns {JSX.Element} Proveedor de temas
 * 
 * @example
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
