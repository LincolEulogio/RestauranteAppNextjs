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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sabor - Restaurante Premium",
    description: "La mejor experiencia culinaria en tu ciudad.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryProvider>
                        <ProgressBarProvider>
                            {children}
                            <ProductTour />
                            <InitialLoader />
                        </ProgressBarProvider>
                    </QueryProvider>
                    <ScrollToTop />
                    <script src="https://checkout.culqi.com/js/v4"></script>
                </ThemeProvider>
            </body>
        </html>
    );
}
