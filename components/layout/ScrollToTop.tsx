/**
 * Componente ScrollToTop - Botón para Volver Arriba
 * 
 * Botón flotante que aparece cuando el usuario hace scroll hacia abajo
 * y permite volver rápidamente al inicio de la página.
 * 
 * Características:
 * - Aparece solo después de scrollear más de 300px
 * - Animación suave de aparición/desaparición
 * - Scroll suave al hacer clic (smooth behavior)
 * - Posición fija en la esquina inferior derecha
 * - Efectos hover con escala y sombra
 * - Icono de flecha que se mueve al hacer hover
 * 
 * Gestión de eventos:
 * - Listener de scroll para detectar posición
 * - Cleanup automático del listener al desmontar
 */

"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Componente ScrollToTop
 * 
 * Botón flotante que permite volver al inicio de la página con scroll suave.
 * Se muestra solo cuando el usuario ha scrolleado más de 300px.
 * 
 * @returns {JSX.Element} Botón flotante con animaciones
 */
export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        /**
         * Función que controla la visibilidad del botón
         * 
         * Muestra el botón cuando el scroll vertical supera los 300px,
         * lo oculta cuando está por debajo de ese umbral.
         */
        const toggleVisibility = () => {
            // Mostrar el botón cuando el usuario ha scrolleado más de 300px
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        // Agregar el event listener para detectar scroll
        window.addEventListener("scroll", toggleVisibility)

        // Limpiar el event listener al desmontar el componente
        // Esto previene memory leaks
        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    /**
     * Función que ejecuta el scroll hacia arriba
     * 
     * Usa scrollTo con behavior "smooth" para una animación suave.
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div
            className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
                }`}
        >
            <Button
                onClick={scrollToTop}
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90 text-primary-foreground group"
                aria-label="Volver arriba"
            >
                {/* Icono con animación de traslación al hacer hover */}
                <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
            </Button>
        </div>
    )
}
