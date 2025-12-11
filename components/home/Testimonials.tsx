"use client"

import { Star, Quote, ThumbsUp } from "lucide-react"
import Image from "next/image"

const testimonials = [
    {
        id: 1,
        name: "María González",
        role: "Cliente Frecuente",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        rating: 5,
        text: "La mejor experiencia gastronómica que he tenido. Los sabores son increíbles y el servicio es excepcional. ¡Volvería una y otra vez!",
        platform: "Google Reviews",
        date: "Hace 2 semanas",
        verified: true
    },
    {
        id: 2,
        name: "Carlos Ramírez",
        role: "Cliente VIP",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        rating: 5,
        text: "Vengo aquí cada viernes con mi familia. La calidad nunca decepciona y el ambiente es perfecto para compartir momentos especiales.",
        platform: "Facebook Reviews",
        date: "Hace 1 mes",
        verified: true
    },
    {
        id: 3,
        name: "Ana Martínez",
        role: "Cliente Satisfecha",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        rating: 5,
        text: "Ingredientes frescos, presentación impecable y un servicio de primera. Sin duda el mejor restaurante de la zona. ¡100% recomendado!",
        platform: "Google Reviews",
        date: "Hace 3 días",
        verified: true
    },
    {
        id: 4,
        name: "Luis Fernández",
        role: "Cliente Regular",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
        rating: 5,
        text: "El equipo siempre atento y la comida deliciosa. Las promociones son geniales y la relación calidad-precio es excelente.",
        platform: "Facebook Reviews",
        date: "Hace 1 semana",
        verified: true
    },
    {
        id: 5,
        name: "Patricia Silva",
        role: "Cliente Nueva",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
        rating: 5,
        text: "Primera vez que vengo y quedé encantada. Todo estaba perfecto, desde la entrada hasta el postre. Ya recomendé a mis amigos.",
        platform: "Google Reviews",
        date: "Hace 5 días",
        verified: true
    },
    {
        id: 6,
        name: "Roberto Torres",
        role: "Cliente Frecuente",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        rating: 5,
        text: "Llevo años viniendo y la calidad siempre es consistente. El chef sabe lo que hace. Mi familia y yo somos fans incondicionales.",
        platform: "Facebook Reviews",
        date: "Hace 2 semanas",
        verified: true
    }
]

const stats = [
    { label: "Reseñas Positivas", value: "2,500+", icon: ThumbsUp },
    { label: "Calificación Promedio", value: "4.9/5.0", icon: Star },
    { label: "Clientes Satisfechos", value: "15,000+", icon: Quote }
]

export default function Testimonials() {
    return (
        <section className="py-20 container" id="testimonials-section">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                    <Star className="h-4 w-4 text-primary fill-primary animate-pulse" />
                    <span className="text-sm font-semibold text-primary">Testimonios Reales</span>
                </div>

                <h2 className="text-4xl font-bold mb-4">
                    Lo Que Dicen Nuestros Clientes
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Miles de comensales satisfechos respaldan nuestra calidad y servicio excepcional
                </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-3 p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <IconComponent className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Testimonios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="group relative p-6 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-all duration-300 group-hover:scale-110">
                            <Quote className="h-12 w-12 text-primary group-hover:rotate-6 transition-transform duration-300" />
                        </div>

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold truncate">{testimonial.name}</h4>
                                    {testimonial.verified && (
                                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            "{testimonial.text}"
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                                {testimonial.platform.includes("Google") ? (
                                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                ) : (
                                    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                )}
                                <span className="text-xs font-medium">{testimonial.platform}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                        </div>

                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    )
}
