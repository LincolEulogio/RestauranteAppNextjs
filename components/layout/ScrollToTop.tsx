"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            // Mostrar el botón cuando el usuario ha scrolleado más de 300px
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        // Agregar el event listener
        window.addEventListener("scroll", toggleVisibility)

        // Limpiar el event listener
        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

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
                <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
            </Button>
        </div>
    )
}
