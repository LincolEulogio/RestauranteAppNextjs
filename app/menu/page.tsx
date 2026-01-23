"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import DishCard from "@/components/menu/DishCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { fetchProducts, fetchCategories, type Product } from "@/lib/api/products"

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState<number | "todos">("todos")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 6

    // Fetch products from backend
    const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    // Fetch categories from backend
    const { data: backendCategories = [], isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    // Add "Todos" category
    const categories = [
        { id: "todos" as const, name: "Todos", slug: "todos" },
        ...backendCategories
    ]

    // Filter products
    const filteredDishes = products.filter((product: Product) => {
        const matchesCategory = selectedCategory === "todos" || product.category_id === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // Convert Product to Dish format for DishCard
    const allDishes = filteredDishes.map((product: Product) => ({
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price.toString()),
        category: product.category?.name || "Sin categoría",
        image: product.image_url || "https://placehold.co/600x400/e2e8f0/64748b?text=No+Image",
        rating: 4.5, // Default rating since backend doesn't have this yet
        reviews: 0,
    }))

    // Pagination Logic
    const totalPages = Math.ceil(allDishes.length / ITEMS_PER_PAGE)
    const dishesForDisplay = allDishes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            <div className="bg-muted/30 py-12">
                <div className="container">
                    <h1 className="text-4xl font-bold mb-4">Nuestro Menú</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Explora nuestra selección cuidadosamente elaborada de platos auténticos y deliciosos
                    </p>
                </div>
            </div>

            <div className="container py-8 flex flex-col lg:flex-row items-start gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 space-y-8 flex-shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2 scrollbar-thin">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Buscar</h3>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar plato..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1) // Reset pagination on search
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Categorías</h3>
                        {categoriesLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {categories.map((category) => (
                                    <Button
                                        key={category.id}
                                        variant={selectedCategory === category.id ? "default" : "ghost"}
                                        className={cn("justify-start", selectedCategory === category.id && "bg-primary text-primary-foreground")}
                                        onClick={() => {
                                            setSelectedCategory(category.id)
                                            setCurrentPage(1) // Reset pagination on category change
                                        }}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {productsError ? (
                        <div className="text-center py-12 text-destructive">
                            Error al cargar los platos. Por favor, intenta de nuevo más tarde.
                        </div>
                    ) : productsLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : dishesForDisplay.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No se encontraron platos que coincidan con tu búsqueda.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {dishesForDisplay.map((dish) => (
                                    <DishCard key={dish.id} {...dish} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-12 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Anterior
                                    </Button>
                                    <span className="text-sm text-muted-foreground mx-2">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    )
}
