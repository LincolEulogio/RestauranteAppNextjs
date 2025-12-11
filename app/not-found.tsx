'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Utensils, SearchX } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/50 dark:from-gray-950 dark:via-gray-900 dark:to-orange-950/20 flex items-center justify-center px-4 py-16">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    {/* Animated 404 Number */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="relative"
                        >
                            <span className="text-9xl md:text-[180px] font-bold text-orange-400/40 dark:text-orange-500/25 select-none">
                                4
                            </span>
                        </motion.div>

                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                            className="relative"
                        >
                            <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 dark:shadow-orange-600/30">
                                <Utensils className="w-10 h-10 md:w-16 md:h-16 text-white" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                            className="relative"
                        >
                            <span className="text-9xl md:text-[180px] font-bold text-orange-400/40 dark:text-orange-500/25 select-none">
                                4
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-8 space-y-4"
                >
                    <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400 mb-4">
                        <SearchX className="w-6 h-6" />
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Página No Encontrada
                        </h1>
                    </div>

                    <p className="text-foreground/80 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                        Lo sentimos, no pudimos encontrar el plato que buscabas.
                        Parece que esta receta no está en nuestro menú.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Volver al Inicio
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-2 border-orange-500 dark:border-orange-600 text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:border-orange-600 dark:hover:border-orange-500 hover:scale-105 transition-all duration-300 group"
                    >
                        <Link href="/menu" className="flex items-center gap-2">
                            <Utensils className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Ver Menú
                        </Link>
                    </Button>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto"
                >
                    {[
                        { icon: Home, label: 'Inicio', href: '/' },
                        { icon: Utensils, label: 'Menú', href: '/menu' },
                        { icon: ArrowLeft, label: 'Volver', onClick: () => window.history.back() },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-900/60 hover:border-orange-400 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-gray-700 hover:shadow-xl hover:scale-105 shadow-md transition-all duration-300 group"
                                >
                                    <item.icon className="w-6 h-6 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-foreground font-medium">{item.label}</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={item.onClick}
                                    className="w-full flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-900/60 hover:border-orange-400 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-gray-700 hover:shadow-xl hover:scale-105 shadow-md transition-all duration-300 group"
                                >
                                    <item.icon className="w-6 h-6 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-foreground font-medium">{item.label}</span>
                                </button>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Fun Message */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-12 text-sm text-muted-foreground italic"
                >
                    "El chef está buscando en la cocina, pero esta página no existe... 🍳"
                </motion.p>
            </div>
        </div>
    )
}
