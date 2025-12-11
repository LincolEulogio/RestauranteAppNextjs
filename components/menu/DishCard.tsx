"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Check } from "lucide-react"
import { useCart } from "@/lib/hooks"
import type { Dish } from "@/lib/types"

type DishCardProps = Omit<Dish, "category">

export default function DishCard({ id, name, description, price, image, rating, reviews }: DishCardProps) {
    const { addToCart, isInCart, getItemQuantity } = useCart()

    const itemQuantity = getItemQuantity(id)
    const inCart = isInCart(id)

    const handleAddToCart = () => {
        addToCart({
            id,
            name,
            price,
            quantity: 1,
            image
        })
    }

    return (
        <Card className="overflow-hidden group border border-border bg-card shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                />
            </div>
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold line-clamp-1">{name}</CardTitle>
                    <span className="font-bold text-primary">S/. {price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{rating}</span>
                    <span>({reviews})</span>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={handleAddToCart}
                    className="w-full gap-2 hover:scale-105 transition-all duration-300 group/btn"
                    disabled={false}
                    variant={inCart ? "secondary" : "default"}
                >
                    {inCart ? (
                        <>
                            <Check className="h-4 w-4 group-hover/btn:animate-bounce" />
                            En el Carrito ({itemQuantity})
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4 group-hover/btn:rotate-90 transition-transform duration-300" />
                            Agregar
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
