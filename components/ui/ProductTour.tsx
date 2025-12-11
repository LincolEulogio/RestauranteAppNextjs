"use client"

import { useEffect, useState } from "react"
import { driver, Driver } from "driver.js"
import "driver.js/dist/driver.css"
import { usePathname } from "next/navigation"

export function ProductTour() {
    const [isMounted, setIsMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return
        if (pathname !== "/") return

        const hasSeenTour = localStorage.getItem("hasSeenProductTour")
        if (hasSeenTour) return

        const driverObj: Driver = driver({
            showProgress: true,
            animate: true,
            allowClose: true,
            doneBtnText: "¡Listo!",
            nextBtnText: "Siguiente",
            prevBtnText: "Anterior",
            onDestroyed: () => {
                localStorage.setItem("hasSeenProductTour", "true")
            },
            steps: [
                {
                    element: "#tour-welcome",
                    popover: {
                        title: "¡Bienvenido a Sabor!",
                        description: "Te invitamos a un recorrido rápido por nuestra nueva experiencia digital.",
                        side: "bottom",
                        align: 'start'
                    }
                },
                {
                    element: "#nav-menu",
                    popover: {
                        title: "Explora nuestro Menú",
                        description: "Descubre nuestra exquisita selección de platos, desde entradas hasta postres.",
                        side: "bottom",
                        align: 'start'
                    }
                },
                {
                    element: "#nav-reservas",
                    popover: {
                        title: "Reserva tu Mesa",
                        description: "Asegura tu lugar en Sabor de manera rápida y sencilla.",
                        side: "bottom",
                        align: 'start'
                    }
                },
                {
                    element: "#category-section",
                    popover: {
                        title: "Categorías",
                        description: "¿Buscas algo específico? Navega por nuestras categorías de comida.",
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: "#featured-dishes",
                    popover: {
                        title: "Platos Destacados",
                        description: "No te pierdas los favoritos de nuestros clientes.",
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: "#promotions-section",
                    popover: {
                        title: "Promociones Especiales",
                        description: "¡Ofertas increíbles te esperan! Revisa nuestras promociones vigentes.",
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: "#about-us-section",
                    popover: {
                        title: "Nuestra Historia",
                        description: "Conoce más sobre nosotros, nuestra pasión y el equipo detrás de Sabor.",
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: "#testimonials-section",
                    popover: {
                        title: "Testimonios",
                        description: "Descubre lo que nuestros clientes dicen de su experiencia con nosotros.",
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: "#reservation-cta-section",
                    popover: {
                        title: "Haz tu Reserva",
                        description: "¿Listo para visitarnos? Reserva tu mesa en pocos clicks.",
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: "#theme-toggle",
                    popover: {
                        title: "Modo Oscuro",
                        description: "Prefieres un ambiente más íntimo? Cambia al modo oscuro aquí.",
                        side: "bottom",
                        align: 'start'
                    }
                }
            ]
        })

        // Slight delay to ensure everything renders
        const timer = setTimeout(() => {
            driverObj.drive()
        }, 1500)

        return () => clearTimeout(timer)
    }, [isMounted, pathname])

    return null
}
