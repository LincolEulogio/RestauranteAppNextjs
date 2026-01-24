/**
 * Componente Footer - Pie de Página
 * 
 * Pie de página del sitio web con información del restaurante y enlaces útiles.
 * 
 * Secciones incluidas:
 * - Logo y descripción del restaurante
 * - Enlaces de navegación rápida
 * - Información de contacto (dirección, teléfono, email)
 * - Redes sociales (Facebook, Instagram, Twitter)
 * - Copyright con año dinámico
 * 
 * Layout responsive:
 * - 1 columna en móvil
 * - 4 columnas en desktop (md y superior)
 */

import { UtensilsCrossed, Facebook, Instagram, Twitter } from "lucide-react"

/**
 * Componente Footer
 * 
 * Pie de página con información del restaurante, enlaces y redes sociales.
 * 
 * @returns {JSX.Element} Footer completo con grid responsive
 */
export default function Footer() {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="container py-12">
                {/* Grid responsive de 4 columnas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Columna 1: Logo y descripción */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl text-primary">
                            <UtensilsCrossed className="h-6 w-6" />
                            <span>Sabor</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Experiencias culinarias inolvidables con los mejores ingredientes y la mejor atención.
                        </p>
                    </div>

                    {/* Columna 2: Enlaces de navegación */}
                    <div>
                        <h3 className="font-semibold mb-4">Enlaces</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Inicio</a></li>
                            <li><a href="#" className="hover:text-primary">Menú</a></li>
                            <li><a href="#" className="hover:text-primary">Reservas</a></li>
                            <li><a href="#" className="hover:text-primary">Blogs</a></li>
                            <li><a href="#" className="hover:text-primary">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Información de contacto */}
                    <div>
                        <h3 className="font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Av. Larco 123, Miraflores</li>
                            <li>+51 987 654 321</li>
                            <li>contacto@sabor.pe</li>
                        </ul>
                    </div>

                    {/* Columna 4: Redes sociales */}
                    <div>
                        <h3 className="font-semibold mb-4">Síguenos</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright con año dinámico */}
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Sabor Restaurante. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    )
}
