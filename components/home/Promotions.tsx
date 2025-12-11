"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tag, Clock, Percent, Gift } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useCartStore } from "@/store/useCartStore"

interface Promotion {
    id: number
    title: string
    description: string
    discount: string | null
    validUntil: string
    image: string | null
    badge: string | null
    color: string
}

export default function Promotions() {
    const [promotions, setPromotions] = useState<Promotion[]>([])
    const [loading, setLoading] = useState(true)
    const { applyPromotion, selectedPromotion } = useCartStore()

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions`)
                if (response.ok) {
                    const data = await response.json()
                    setPromotions(data)
                } else {
                    console.error("Failed to fetch promotions");
                }
            } catch (error) {
                console.error("Error fetching promotions:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPromotions()
    }, [])

    if (!loading && promotions.length === 0) {
        return null // Don't show section if no promotions
    }

    return (
        <section className="py-16 container" id="promotions-section">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Tag className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold">Promociones Especiales</h2>
                    </div>
                    <p className="text-muted-foreground">Aprovecha nuestras ofertas exclusivas</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                    ? Array(3).fill(0).map((_, i) => (
                        <div key={i} className="rounded-2xl border bg-card h-[400px]">
                            <Skeleton className="h-48 w-full rounded-t-2xl" />
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))
                    : promotions.map((promo) => (
                        <div
                            key={promo.id}
                            className="group relative overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Imagen */}
                            <div className="relative h-48 overflow-hidden bg-muted">
                                {promo.image ? (
                                    <Image
                                        src={promo.image}
                                        alt={promo.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        <Gift className="h-12 w-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Badge */}
                                {promo.badge && (
                                    <div className="absolute top-4 right-4">
                                        <Badge
                                            variant="secondary"
                                            className={`
                                                ${promo.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                                                ${promo.color === 'green' ? 'bg-green-500 hover:bg-green-600' : ''}
                                                ${promo.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                                                ${promo.color === 'red' ? 'bg-red-500 hover:bg-red-600' : ''}
                                                text-white font-semibold shadow-lg border-0
                                            `}
                                        >
                                            {promo.badge}
                                        </Badge>
                                    </div>
                                )}

                                {/* Descuento */}
                                {promo.discount && (
                                    <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <div className="flex items-center gap-1">
                                            <span className="text-xl font-bold text-primary">{promo.discount}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contenido */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {promo.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                                    {promo.description}
                                </p>

                                {/* Validez */}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Válido hasta: {promo.validUntil}</span>
                                </div>

                                {/* Botón */}
                                <Button
                                    className="w-full gap-2 group/btn"
                                    size="sm"
                                    variant={selectedPromotion?.id === promo.id ? "secondary" : "default"}
                                    onClick={() => {
                                        applyPromotion(promo as any)
                                        document.querySelector("button[aria-haspopup='dialog']")?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
                                    }}
                                >
                                    <Gift className={`h-4 w-4 ${selectedPromotion?.id === promo.id ? '' : 'group-hover/btn:animate-pass'}`} />
                                    {selectedPromotion?.id === promo.id ? 'Promoción Seleccionada' : 'Elegir promoción'}
                                </Button>
                            </div>

                            {/* Efecto decorativo */}
                            <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ))}
            </div>
        </section>
    )
}
