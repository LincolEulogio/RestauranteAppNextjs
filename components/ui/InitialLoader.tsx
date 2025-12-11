"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UtensilsCrossed } from "lucide-react"

export function InitialLoader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Verificar si ya se mostró el loader en esta sesión
        const hasSeenLoader = sessionStorage.getItem("hasSeenLoader")

        if (hasSeenLoader) {
            setIsLoading(false)
            return
        }

        // Simular tiempo de carga inicial y luego ocultar
        const timer = setTimeout(() => {
            setIsLoading(false)
            sessionStorage.setItem("hasSeenLoader", "true")
        }, 2000) // 2 segundos de carga

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-primary p-6 rounded-full shadow-2xl"
                        >
                            <UtensilsCrossed className="w-16 h-16 text-primary-foreground" />
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sabor</h1>
                            <p className="text-muted-foreground mt-2">Experiencia Culinaria</p>
                        </motion.div>

                        <motion.div
                            className="w-48 h-1 bg-muted rounded-full mt-4 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
