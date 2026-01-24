/**
 * Componente Header - Encabezado de la Aplicación
 * 
 * Barra de navegación principal que se muestra en todas las páginas.
 * 
 * Características:
 * - Sticky (se mantiene fijo al hacer scroll)
 * - Backdrop blur para efecto de vidrio esmerilado
 * - Logo del restaurante con enlace a inicio
 * - Menú de navegación responsive (oculto en móvil)
 * - Toggle de tema claro/oscuro
 * - Botón del carrito de compras
 * 
 * Navegación incluye:
 * - Inicio
 * - Menú
 * - Reservas
 * - Blogs
 * - Contacto
 */

"use client"

import Link from "next/link"
import CartSidebar from "@/components/cart/CartSidebar"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { UtensilsCrossed } from "lucide-react"

/**
 * Componente Header
 * 
 * Encabezado principal de la aplicación con navegación y utilidades.
 * 
 * @returns {JSX.Element} Barra de navegación sticky con logo, menú y acciones
 */
export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo del restaurante */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <UtensilsCrossed className="h-6 w-6" />
                    <span>Sabor</span>
                </Link>

                {/* Menú de navegación - Oculto en móvil */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">
                        Inicio
                    </Link>
                    <Link href="/menu" id="nav-menu" className="transition-colors hover:text-primary">
                        Menú
                    </Link>
                    <Link href="/reservas" id="nav-reservas" className="transition-colors hover:text-primary">
                        Reservas
                    </Link>
                    <Link href="/blog" className="transition-colors hover:text-primary">
                        Blogs
                    </Link>
                    <Link href="/contacto" className="transition-colors hover:text-primary">
                        Contacto
                    </Link>
                </nav>

                {/* Acciones: Toggle de tema y carrito */}
                <div className="flex items-center gap-2" id="theme-toggle">
                    <ThemeToggle />
                    <CartSidebar />
                </div>
            </div>
        </header>
    )
}
