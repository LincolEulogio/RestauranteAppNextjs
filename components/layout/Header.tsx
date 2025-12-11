"use client"

import Link from "next/link"
import CartSidebar from "@/components/cart/CartSidebar"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { UtensilsCrossed } from "lucide-react"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <UtensilsCrossed className="h-6 w-6" />
                    <span>Sabor</span>
                </Link>

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

                <div className="flex items-center gap-2" id="theme-toggle">
                    <ThemeToggle />
                    <CartSidebar />
                </div>
            </div>
        </header>
    )
}
