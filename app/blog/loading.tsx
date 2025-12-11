import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function BlogLoading() {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Skeleton */}
            <section className="py-20 bg-muted/10">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                        <Skeleton className="h-8 w-40 rounded-full mb-6" />
                        <Skeleton className="h-12 w-3/4 mb-6" />
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-6 w-5/6" />
                    </div>
                </div>
            </section>

            {/* Featured Skeleton */}
            <section className="py-16 container">
                <div className="flex items-center gap-2 mb-8">
                    <Skeleton className="h-8 w-32" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-2xl border bg-card overflow-hidden h-full flex flex-col">
                            <Skeleton className="h-56 w-full" />
                            <div className="p-6 flex-1 flex flex-col space-y-4">
                                <Skeleton className="h-7 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <div className="pt-4 border-t flex justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Skeleton */}
            <section className="py-8 bg-muted/30">
                <div className="container">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-10 w-24 rounded-full" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Posts Grid Skeleton */}
            <section className="py-16 container">
                <Skeleton className="h-8 w-48 mb-8" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="rounded-2xl border bg-card overflow-hidden">
                            <Skeleton className="h-48 w-full" />
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <div className="pt-4 border-t space-y-2">
                                    <Skeleton className="h-3 w-24" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-3 w-32" />
                                        <Skeleton className="h-3 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}
