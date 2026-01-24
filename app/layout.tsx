/**
 * Layout Raíz de la Aplicación - RootLayout
 * 
 * Este archivo define el layout principal que envuelve toda la aplicación Next.js.
 * Configura los proveedores globales, metadatos SEO, fuentes tipográficas y scripts externos.
 * 
 * Estructura de proveedores (de afuera hacia adentro):
 * 1. ThemeProvider - Gestión de temas claro/oscuro
 * 2. QueryProvider - Cliente de React Query para peticiones HTTP
 * 3. ProgressBarProvider - Barra de progreso en navegación
 * 
 * También incluye componentes globales como:
 * - ProductTour: Tour guiado de la aplicación
 * - InitialLoader: Pantalla de carga inicial
 * - ScrollToTop: Botón para volver arriba
 * - Script de Culqi: Pasarela de pagos
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import ProgressBarProvider from "@/providers/ProgressBarProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { cn } from "@/lib/utils";
import { ProductTour } from "@/components/ui/ProductTour";
import { InitialLoader } from "@/components/ui/InitialLoader";

// Configuración de la fuente Inter de Google Fonts
const inter = Inter({ subsets: ["latin"] });

/**
 * Metadatos SEO de la Aplicación
 * 
 * Define el título y descripción que aparecen en:
 * - Pestaña del navegador
 * - Resultados de búsqueda de Google
 * - Compartir en redes sociales
 */
export const metadata: Metadata = {
    title: "Sabor - Restaurante Premium",
    description: "La mejor experiencia culinaria en tu ciudad.",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "RestaurantApp",
    },
};

/**
 * Configuración de Viewport
 * Separado de metadata según requerimientos de Next.js 15+
 */
export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#f97316",
};

/**
 * Componente RootLayout
 * 
 * Layout raíz que envuelve todas las páginas de la aplicación.
 * Configura el HTML base, proveedores de contexto y componentes globales.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Páginas y componentes hijos
 * @returns {JSX.Element} Estructura HTML completa de la aplicación
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            </head>
            <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
                {/* Proveedor de temas - Gestiona modo claro/oscuro */}
                <ThemeProvider
                    attribute="class"              // Usa clases CSS para cambiar temas
                    defaultTheme="light"           // Tema por defecto: claro
                    enableSystem                   // Detecta preferencia del sistema
                    disableTransitionOnChange      // Evita animaciones al cambiar tema
                >
                    {/* Proveedor de React Query - Gestiona peticiones HTTP */}
                    <QueryProvider>
                        {/* Proveedor de barra de progreso - Muestra progreso en navegación */}
                        <ProgressBarProvider>
                            {children}
                            <ProductTour />      {/* Tour guiado de la aplicación */}
                            <InitialLoader />    {/* Pantalla de carga inicial */}
                        </ProgressBarProvider>
                    </QueryProvider>
                    <ScrollToTop />              {/* Botón flotante para volver arriba */}
                    {/* Script de Culqi para procesamiento de pagos */}
                    <script src="https://checkout.culqi.com/js/v4"></script>
                </ThemeProvider>
            </body>
        </html>
    );
}
