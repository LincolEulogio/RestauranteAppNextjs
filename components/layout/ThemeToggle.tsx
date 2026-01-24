/**
 * Componente ThemeToggle - Botón de Cambio de Tema
 * 
 * Botón que permite alternar entre tema claro y oscuro.
 * 
 * Características:
 * - Usa next-themes para gestión de temas
 * - Previene problemas de hidratación con estado mounted
 * - Iconos animados (Sol para tema claro, Luna para tema oscuro)
 * - Transiciones suaves al cambiar de tema
 * - Accesible con texto para lectores de pantalla
 * 
 * Prevención de hidratación:
 * - Muestra un placeholder hasta que el componente esté montado en el cliente
 * - Evita diferencias entre el HTML del servidor y el cliente
 */

"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

/**
 * Componente ThemeToggle
 * 
 * Botón para alternar entre tema claro y oscuro.
 * Implementa lógica de prevención de hidratación para evitar errores.
 * 
 * @returns {JSX.Element} Botón con icono de sol o luna según el tema activo
 */
export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    /**
     * Efecto para marcar el componente como montado
     * 
     * Previene problemas de hidratación al esperar a que el componente
     * esté completamente montado en el cliente antes de mostrar el tema real.
     */
    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Mostrar placeholder mientras el componente no esté montado
    // Esto previene diferencias entre servidor y cliente (hydration mismatch)
    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-9 h-9">
                <Sun className="h-5 w-5" />
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-9 h-9 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            title={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
            ) : (
                <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
            )}
            <span className="sr-only">Cambiar tema</span>
        </Button>
    )
}
