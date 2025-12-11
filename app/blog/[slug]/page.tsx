'use client';

import { useState, useEffect } from "react"
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useParams, notFound } from "next/navigation"

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

export default function BlogPostPage() {
    const params = useParams();
    const [post, setPost] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.slug}`);
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.slug) {
            fetchPost();
        }
    }, [params.slug]);

    if (isLoading) {
        return (
            <main className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
                <Footer />
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow container py-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">Publicación no encontrada</h1>
                    <p className="text-muted-foreground mb-8">Lo sentimos, no pudimos encontrar la publicación que buscas.</p>
                    <Button asChild>
                        <Link href="/blog">Volver al Blog</Link>
                    </Button>
                </div>
                <Footer />
            </main>
        );
    }

    // Helper to get image URL
    const getImageUrl = (imagePath: string | null) => {
        if (!imagePath) return '/img/hero.jpg';
        if (imagePath.startsWith('http')) return imagePath;
        return `${process.env.NEXT_PUBLIC_API_URL}/${imagePath}`;
    };

    // Calculate read time
    const getReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min lectura`;
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px]">
                <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-10">
                    <Button variant="secondary" size="sm" className="gap-2" asChild>
                        <Link href="/blog">
                            <ArrowLeft className="h-4 w-4" />
                            Volver al Blog
                        </Link>
                    </Button>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="container max-w-4xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Administrador</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date(post.published_at).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{getReadTime(post.content)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="py-16 container max-w-4xl">
                {/* Main Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {post.content.split('\n').map((paragraph: string, index: number) => {
                        if (paragraph.startsWith('# ')) {
                            return <h1 key={index} className="text-4xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>
                        }
                        if (paragraph.startsWith('## ')) {
                            return <h2 key={index} className="text-3xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>
                        }
                        if (paragraph.startsWith('### ')) {
                            return <h3 key={index} className="text-2xl font-bold mt-5 mb-2">{paragraph.replace('### ', '')}</h3>
                        }
                        if (paragraph.startsWith('#### ')) {
                            return <h4 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.replace('#### ', '')}</h4>
                        }
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            return <p key={index} className="font-bold my-3">{paragraph.replace(/\*\*/g, '')}</p>
                        }
                        if (paragraph.startsWith('- ')) {
                            return <li key={index} className="ml-6 my-1">{paragraph.replace('- ', '')}</li>
                        }
                        if (paragraph.startsWith('> ')) {
                            return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">{paragraph.replace('> ', '')}</blockquote>
                        }
                        if (paragraph.trim() === '') {
                            return <br key={index} />
                        }
                        return <p key={index} className="my-4 leading-relaxed text-muted-foreground">{paragraph}</p>
                    })}
                </div>

                {/* CTA */}
                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-500/5 border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">¿Te gustó este artículo?</h3>
                            <p className="text-muted-foreground">
                                Ven a probar nuestros platos y vive la experiencia completa.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button size="lg" asChild>
                                <Link href="/menu">Ver Menú</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/reservas">Reservar</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    )
}
