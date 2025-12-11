'use client';

import { useState, useEffect } from "react"
import { Calendar, Clock, User, ArrowRight, Tag, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    status: string;
    published_at: string;
    created_at: string;
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("todos");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Helper to get image URL
    const getImageUrl = (imagePath: string | null) => {
        if (!imagePath) return '/img/hero.jpg'; // Fallback image
        if (imagePath.startsWith('http')) return imagePath;
        return `${process.env.NEXT_PUBLIC_API_URL}/${imagePath}`;
    };

    // Calculate read time (rough estimate)
    const getReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min lectura`;
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-primary/10 via-orange-500/5 to-background">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Blog & Novedades</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Descubre Nuestras Novedades
                        </h1>

                        <p className="text-xl text-muted-foreground">
                            Platos especiales, eventos únicos y promociones exclusivas.
                            Mantente al día con todo lo que sucede en nuestro restaurante.
                        </p>
                    </div>
                </div>
            </section>

            {/* All Posts */}
            <section className="py-16 container">
                <h2 className="text-2xl font-bold mb-8">
                    Últimas Publicaciones
                </h2>

                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-2xl border bg-card h-[400px] animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-20 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group"
                            >
                                <div className="overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={getImageUrl(post.image)}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                        <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                                            Noticias
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                                            {post.content}
                                        </p>

                                        <div className="flex flex-col gap-2 pt-4 border-t">
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        <span>{new Date(post.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        <span>{getReadTime(post.content)}</span>
                                                    </div>
                                                </div>
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {!isLoading && blogs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No hay publicaciones disponibles.</p>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    )
}
