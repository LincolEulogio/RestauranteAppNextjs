/**
 * Componente FeaturedDishes - Platos Destacados
 * 
 * Muestra los primeros 4 productos del backend como platos destacados.
 * 
 * Características:
 * - Obtiene productos del backend usando React Query
 * - Muestra skeleton mientras carga
 * - Transforma datos de Product a formato Dish
 * - Grid responsive (1-2-4 columnas)
 * - Enlace para ver el menú completo
 * - Carga dinámica del componente DishCard
 * 
 * Flujo de datos:
 * 1. React Query obtiene productos del backend
 * 2. Se toman los primeros 4 productos disponibles
 * 3. Se transforman al formato esperado por DishCard
 * 4. Se renderizan en un grid responsive
 * 
 * Manejo de estados:
 * - isLoading: Muestra spinner de carga
 * - data: Muestra grid de productos
 * - error: (manejado por React Query)
 */

"use client"

import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchProducts, type Product } from "@/lib/api/products"

// Carga dinámica del componente DishCard para mejor rendimiento
const DishCard = dynamic(() => import("@/components/menu/DishCard"), {
    loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />
})

/**
 * Componente FeaturedDishes
 * 
 * Sección que muestra los platos destacados del restaurante.
 * Obtiene los productos del backend y muestra los primeros 4.
 * 
 * @returns {JSX.Element} Sección con grid de platos destacados
 */
export default function FeaturedDishes() {
    // Obtener productos del backend usando React Query
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    // Obtener los primeros 4 productos disponibles como destacados
    const featuredProducts = products.slice(0, 4)

    /**
     * Transforma productos del backend al formato esperado por DishCard
     * 
     * Convierte:
     * - id a string
     * - price a número
     * - Agrega valores por defecto para rating y reviews
     * - Maneja imágenes faltantes con placeholder
     */
    const featuredDishes = featuredProducts.map((product: Product) => ({
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price.toString()),
        category: product.category?.name || "Sin categoría",
        image: product.image || product.image_url || "https://placehold.co/600x400/e2e8f0/64748b?text=No+Image",
        rating: 4.5,
        reviews: 0,
    }))

    return (
        <section className="py-16 bg-muted/30" id="featured-dishes">
            <div className="container">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Platos Destacados</h2>
                        <p className="text-muted-foreground">Los favoritos de nuestros clientes</p>
                    </div>
                    <Button variant="ghost" asChild className="gap-2">
                        <Link href="/menu">
                            Ver todo el menú <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredDishes.map((dish) => (
                            <DishCard key={dish.id} {...dish} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
