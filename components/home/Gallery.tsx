"use client"

import { Camera, Heart, Users, ChefHat, Sparkles } from "lucide-react"
import Image from "next/image"

const galleryImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        alt: "Salón principal del restaurante",
        title: "Salón Principal",
        description: "Ambiente acogedor y elegante",
        span: "col-span-2 row-span-2"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
        alt: "Terraza al aire libre",
        title: "Terraza",
        description: "Disfruta al aire libre",
        span: "col-span-1 row-span-1"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        alt: "Cocina profesional",
        title: "Nuestra Cocina",
        description: "Tecnología de primera",
        span: "col-span-1 row-span-1"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        alt: "Mesas elegantes",
        title: "Mesas Preparadas",
        description: "Cada detalle cuenta",
        span: "col-span-1 row-span-1"
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
        alt: "Chef preparando platillos",
        title: "Chef en Acción",
        description: "Pasión en cada plato",
        span: "col-span-1 row-span-1"
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        alt: "Personal del restaurante",
        title: "Nuestro Equipo",
        description: "Servicio con sonrisas",
        span: "col-span-2 row-span-1"
    }
]

const highlights = [
    {
        icon: Heart,
        label: "Ambiente Cálido",
        color: "text-red-500"
    },
    {
        icon: Users,
        label: "Para Todos",
        color: "text-blue-500"
    },
    {
        icon: ChefHat,
        label: "Cocina Abierta",
        color: "text-orange-500"
    },
    {
        icon: Sparkles,
        label: "Experiencia Única",
        color: "text-purple-500"
    }
]

export default function Gallery() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4 hover:scale-105 transition-transform duration-300">
                        <Camera className="h-4 w-4 text-primary hover:rotate-12 transition-transform duration-300" />
                        <span className="text-sm font-semibold text-primary">Nuestro Espacio</span>
                    </div>

                    <h2 className="text-4xl font-bold mb-4">
                        Descubre Nuestro Ambiente
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Un espacio diseñado para crear momentos memorables. Conoce cada rincón donde la magia sucede.
                    </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {highlights.map((highlight, index) => {
                        const IconComponent = highlight.icon
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-5 py-3 rounded-full border bg-card hover:shadow-md transition-all duration-300 group hover:scale-105"
                            >
                                <IconComponent className={`h-5 w-5 ${highlight.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                                <span className="font-medium text-sm">{highlight.label}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                    {galleryImages.map((image) => (
                        <div
                            key={image.id}
                            className={`group relative overflow-hidden rounded-2xl ${image.span}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    {image.description}
                                </p>
                            </div>

                            {/* Icon Overlay */}
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                                <Camera className="h-5 w-5 text-white" />
                            </div>

                            {/* Border Effect */}
                            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border bg-card">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Heart className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-lg">¿Te gustó lo que viste?</p>
                                <p className="text-sm text-muted-foreground">Ven a vivir la experiencia completa</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Cada foto cuenta una historia, pero nada se compara con estar aquí.
                            Reserva tu mesa y descubre por qué nuestros clientes nos eligen una y otra vez.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
