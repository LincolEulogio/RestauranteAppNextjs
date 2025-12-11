import dynamic from "next/dynamic"
import Hero from "@/components/home/Hero"
import FeaturedDishes from "@/components/home/FeaturedDishes"
import { categories } from "@/lib/data"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Utensils, Salad, ChefHat, Cake, Coffee, Tag, PackageOpen, Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"


// Componentes cargados dinámicamente para mejorar el rendimiento inicial use dynamic
const Promotions = dynamic(() => import("@/components/home/Promotions"), {
    loading: () => <div className="container py-16"><Skeleton className="h-96 w-full rounded-3xl" /></div>
})
const AboutUs = dynamic(() => import("@/components/home/AboutUs"), {
    loading: () => <div className="container py-20"><Skeleton className="h-96 w-full rounded-3xl" /></div>
})
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
    loading: () => <div className="container py-20"><Skeleton className="h-80 w-full rounded-3xl" /></div>
})
const Gallery = dynamic(() => import("@/components/home/Gallery"), {
    loading: () => <div className="container py-20"><Skeleton className="h-[600px] w-full rounded-3xl" /></div>
})
const ReservationCTA = dynamic(() => import("@/components/home/ReservationCTA"), {
    loading: () => <div className="container py-20"><Skeleton className="h-64 w-full rounded-3xl" /></div>
})
const DishCard = dynamic(() => import("@/components/menu/DishCard"), {
    loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />
})

const categoryIcons: Record<string, any> = {
    "entradas": Salad,
    "platos-principales": ChefHat,
    "postres": Cake,
    "bebidas": Coffee,
    "promociones": Tag,
    "combos": PackageOpen,
    "especiales": Star,
}

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            <Hero />

            <section className="py-16 container" id="category-section">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Categorías</h2>
                        <p className="text-muted-foreground">Explora nuestra variedad de sabores</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categories.filter(c => c.id !== 'todos').map((category) => {
                        const IconComponent = categoryIcons[category.id] || Utensils
                        return (
                            <div
                                key={category.id}
                                className="flex flex-col items-center justify-center p-6 rounded-xl border bg-card hover:bg-primary/5 hover:border-primary transition-all duration-300 gap-3 group hover:shadow-lg cursor-default"
                            >
                                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                    <IconComponent className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-sm font-medium text-center leading-tight">{category.name}</span>
                            </div>
                        )
                    })}
                </div>
            </section>


            <FeaturedDishes />


            {/* Promociones */}
            <Promotions />

            {/* Sobre Nosotros */}
            <AboutUs />

            {/* Testimonios */}
            <Testimonials />

            {/* Galería del Restaurante */}
            <Gallery />

            {/* Llamado a la Acción - Reservas */}
            <ReservationCTA />

            <Footer />
        </main>
    )
}
