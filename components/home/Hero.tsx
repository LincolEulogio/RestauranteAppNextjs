/**
 * Componente Hero - Banner Principal de la Página de Inicio
 * 
 * Sección hero con imagen de fondo, texto promocional y llamados a la acción.
 * 
 * Características:
 * - Imagen de fondo con overlay oscuro para mejor legibilidad
 * - Animaciones con Framer Motion (entrada desde la izquierda y abajo)
 * - Diseño responsive con diferentes tamaños de texto
 * - Dos botones CTA: "Ver Menú Completo" y "Hacer Reserva"
 * - Estadísticas del restaurante (rating, pedidos, tiempo de delivery)
 * - Imagen del chef con efecto de hover y badge flotante
 * - Gradiente radial animado de fondo
 * 
 * Layout responsive:
 * - 1 columna en móvil (solo texto)
 * - 2 columnas en desktop (texto + imagen del chef)
 * 
 * Optimizaciones:
 * - Imagen con priority para carga rápida
 * - Blur placeholder para mejor UX
 * - Lazy loading de imagen del chef
 */

"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Star, Utensils } from "lucide-react"

/**
 * Componente Hero
 * 
 * Banner principal con animaciones, imagen de fondo y CTAs.
 * Muestra el mensaje principal del restaurante y estadísticas clave.
 * 
 * @returns {JSX.Element} Sección hero completa con animaciones
 */
export default function Hero() {
    return (
        <section id="tour-welcome" className="relative min-h-[500px] sm:min-h-[600px] lg:h-[700px] w-full overflow-hidden bg-slate-950 flex items-center py-12 sm:py-0">
            <div className="absolute inset-0 z-0 opacity-60">
                <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
                    alt="Restaurant Background"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            </div>

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 sm:space-y-6 text-center lg:text-left"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                        Sabores <span className="text-primary">auténticos</span> <br />
                        a tu mesa
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
                        Descubre una experiencia culinaria única con ingredientes frescos y recetas tradicionales preparadas por nuestros chefs expertos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                        <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                            <Link href="/menu">Ver Menú Completo</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto bg-transparent text-white hover:bg-white/10 hover:text-white border-white">
                            <Link href="/reservas">Hacer Reserva</Link>
                        </Button>
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 pt-4 text-white/80 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-yellow-400 text-lg sm:text-xl">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <span className="font-bold">4.9</span>
                            <span className="hidden sm:inline">(2.4k reviews)</span>
                            <span className="sm:hidden">(2.4k)</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-primary text-lg sm:text-xl">
                                <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <span className="font-bold">5.2k+</span>
                            <span>Pedidos</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-green-400 text-lg sm:text-xl">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <span className="font-bold">30 min</span>
                            <span>Delivery</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
                    className="hidden lg:flex relative h-[400px] lg:h-[500px] xl:h-[700px] w-full items-end justify-center"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse" />

                    <motion.div
                        className="relative w-full h-full flex items-end justify-center"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src="/img/chef.png"
                            alt="Chef Profesional"
                            fill
                            sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 400px"
                            className="object-contain object-bottom z-10 drop-shadow-2xl"
                            priority
                            quality={90}
                        />

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="absolute bottom-12 sm:bottom-16 lg:bottom-20 right-0 lg:right-4 bg-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full shadow-2xl z-20"
                        >
                            <span className="block text-xs sm:text-sm text-gray-900 font-bold uppercase tracking-wider">Chef Especializado</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
