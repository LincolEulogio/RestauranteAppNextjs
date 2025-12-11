"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Evitar problemas de hidratación
    React.useEffect(() => {
        setMounted(true)
    }, [])

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
