"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, MapPin, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ReservationCTA() {
    return (
        <section className="py-20 container" id="reservation-cta-section">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-orange-600 to-orange-700 p-1">
                {/* Decoración con blur */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

                <div className="relative bg-card rounded-[22px] overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Contenido */}
                        <div className="p-8 sm:p-12 flex flex-col justify-center order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 w-fit">
                                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                                <span className="text-sm font-semibold text-primary">Experiencia Premium</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                                ¿Quieres Disfrutar en Salón?
                            </h2>

                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Reserva tu mesa y vive una experiencia gastronómica inolvidable.
                                Ambiente acogedor, servicio excepcional y los mejores sabores te esperan.
                            </p>

                            {/* Features */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group/feature">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover/feature:scale-110 transition-transform duration-300">
                                        <Calendar className="h-5 w-5 text-primary group-hover/feature:rotate-12 transition-transform duration-300" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Reserva Fácil</p>
                                        <p className="text-xs text-muted-foreground">En segundos</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group/feature">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover/feature:scale-110 transition-transform duration-300">
                                        <Clock className="h-5 w-5 text-primary group-hover/feature:rotate-12 transition-transform duration-300" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Horarios Flexibles</p>
                                        <p className="text-xs text-muted-foreground">Todos los días</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group/feature">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover/feature:scale-110 transition-transform duration-300">
                                        <Users className="h-5 w-5 text-primary group-hover/feature:rotate-12 transition-transform duration-300" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Grupos Grandes</p>
                                        <p className="text-xs text-muted-foreground">Hasta 20 personas</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group/feature">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover/feature:scale-110 transition-transform duration-300">
                                        <MapPin className="h-5 w-5 text-primary group-hover/feature:rotate-12 transition-transform duration-300" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Ubicación Ideal</p>
                                        <p className="text-xs text-muted-foreground">Centro de la ciudad</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Button size="lg" className="w-full sm:w-auto gap-2 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all group" asChild>
                                <Link href="/reservas">
                                    <Calendar className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                    Reservar Ahora
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </Link>
                            </Button>

                            <p className="text-xs text-muted-foreground mt-4">
                                * Confirmación inmediata • Sin costo adicional • Modificable 24/7
                            </p>
                        </div>

                        {/* Imagen */}
                        <div className="relative h-64 sm:h-80 lg:h-full min-h-[400px] order-1 lg:order-2">
                            <Image
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                                alt="Interior del restaurante"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-card lg:via-transparent lg:to-transparent" />

                            {/* Badge flotante */}
                            <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-auto bg-white dark:bg-gray-900/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-full bg-green-500">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-base text-white">Disponibilidad Confirmada</p>
                                        <p className="text-sm text-white/90">Reserva sin esperas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
