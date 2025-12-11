import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function MenuLoading() {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Skeleton */}
            <div className="bg-muted/30 py-12">
                <div className="container">
                    <Skeleton className="h-10 w-64 mb-4" />
                    <Skeleton className="h-6 w-full max-w-2xl" />
                </div>
            </div>

            <div className="container py-8 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Skeleton */}
                <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-6 w-32" />
                        <div className="flex flex-col gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-10 w-full" />
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Grid Skeleton */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="border rounded-2xl overflow-hidden bg-card">
                                <Skeleton className="h-48 w-full" />
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-9 w-24 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
