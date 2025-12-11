"use client"

import { Heart, Award, Utensils, Users, Sparkles, ChefHat } from "lucide-react"
import Image from "next/image"

const values = [
    {
        icon: Heart,
        title: "Pasión Culinaria",
        description: "Cada plato es preparado con amor y dedicación por nuestro equipo de chefs experimentados"
    },
    {
        icon: Award,
        title: "Calidad Premium",
        description: "Ingredientes frescos y de primera calidad, seleccionados cuidadosamente cada día"
    },
    {
        icon: Users,
        title: "Experiencia Única",
        description: "Creamos momentos memorables para cada uno de nuestros comensales"
    },
    {
        icon: Sparkles,
        title: "Innovación",
        description: "Fusionamos tradición con creatividad para sorprender tu paladar"
    }
]

export default function AboutUs() {
    return (
        <section className="py-20 bg-muted/30" id="about-us-section">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                                alt="Nuestro restaurante"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                            {/* Badge flotante */}
                            <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-900 px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-primary/10">
                                        <ChefHat className="h-6 w-6 text-primary hover:rotate-12 transition-transform duration-300" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-white">15+ Años</p>
                                        <p className="text-sm text-slate-200">De Experiencia</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decoración */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -z-10" />
                    </div>

                    {/* Contenido */}
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                            <Heart className="h-4 w-4 text-primary animate-pulse" />
                            <span className="text-sm font-semibold text-primary">Sobre Nosotros</span>
                        </div>

                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            Donde la Tradición se Encuentra con la Excelencia
                        </h2>

                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                            Desde 2009, hemos sido el hogar de momentos inolvidables y sabores auténticos.
                            Nuestra historia comenzó con un sueño simple: <span className="text-foreground font-semibold">crear experiencias
                                culinarias que conecten corazones y culturas</span>.
                        </p>

                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                            Cada plato cuenta una historia de pasión, dedicación y respeto por los ingredientes.
                            Nuestra cocina fusiona <span className="text-foreground font-semibold">recetas tradicionales con técnicas
                                contemporáneas</span>, siempre manteniendo la autenticidad y el sabor que nos caracteriza.
                        </p>

                        {/* Valores */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {values.map((value, index) => {
                                const IconComponent = value.icon
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-3 p-4 rounded-xl border bg-card hover:shadow-md transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 h-fit">
                                            <IconComponent className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">{value.title}</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Quote */}
                        <div className="border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
                            <p className="text-lg font-medium italic text-foreground">
                                "No solo servimos comida, creamos experiencias que perduran en el corazón"
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">— Chef Fundador</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
