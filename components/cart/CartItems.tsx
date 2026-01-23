import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tag, Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Swal from "sweetalert2"
import { CartItem, Promotion } from "@/store/useCartStore"

interface CartPromoSectionProps {
    selectedPromotion: Promotion
    promoItems: CartItem[]
    removePromotion: () => void
    promoOriginalTotal: number
    promoDiscount: number
    promoNetTotal: number
}

export const CartPromoSection = ({
    selectedPromotion,
    promoItems,
    removePromotion,
    promoOriginalTotal,
    promoDiscount,
    promoNetTotal
}: CartPromoSectionProps) => {
    return (
        <div className="space-y-3 mb-6">
            <div className="bg-orange-500/10 dark:bg-orange-500/5 rounded-xl p-4 border border-orange-500/20">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-orange-500 rounded-lg shadow-sm shadow-orange-500/20">
                            <Tag className="h-3 w-3 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-orange-600 dark:text-orange-400">Promoción Aplicada</h3>
                            <p className="text-xs font-semibold text-foreground/80">{selectedPromotion.title}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-orange-400 hover:text-orange-300 hover:bg-orange-950/50 transition-colors"
                        onClick={() => {
                            removePromotion()
                            Swal.fire({
                                icon: "info",
                                title: "Promoción removida",
                                toast: true,
                                position: "top-end",
                                timer: 1500,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                customClass: {
                                    popup: 'bg-slate-800 text-white'
                                }
                            })
                        }}
                    >
                        <span className="text-xs font-semibold">Quitar</span>
                    </Button>
                </div>

                <div className="space-y-3 pl-1">
                    {promoItems.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center p-2.5 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm">
                            {item.image && (
                                <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0 border border-slate-700">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm text-foreground line-clamp-1">{item.name}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs font-medium text-muted-foreground">Cant: {item.quantity}</span>
                                    <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                        Incluido
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-orange-500">S/ {item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}

                    <div className="mt-3 pt-3 border-t border-orange-500/10 space-y-2">
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span className="font-medium">Precio Normal</span>
                            <span className="line-through opacity-70">S/ {promoOriginalTotal.toFixed(2)}</span>
                        </div>

                        {promoDiscount > 0 && (
                            <div className="flex justify-between items-center text-xs text-blue-600 dark:text-blue-400 font-bold">
                                <span>Descuento ({selectedPromotion.discount})</span>
                                <span>-S/ {promoDiscount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-2 border-t border-orange-500/10">
                            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">Total Pago</span>
                            <span className="text-base font-black text-foreground">S/ {promoNetTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CartRegularItemsProps {
    items: CartItem[]
    updateQuantity: (id: string, quantity: number) => void
    removeItem: (id: string) => void
    hasPromo: boolean
    setIsOpen?: (open: boolean) => void
}

export const CartRegularItems = ({ items, updateQuantity, removeItem, hasPromo, setIsOpen }: CartRegularItemsProps) => {
    return (
        <div className="space-y-3 border border-border p-4 rounded-xl bg-accent/20 backdrop-blur-sm">
            {hasPromo && (
                <div className="flex items-center gap-2 px-1 mb-1">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    <h3 className="font-bold text-sm text-foreground">Adicionales</h3>
                </div>
            )}

            <div className="space-y-3 mt-3">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group bg-background p-2.5 rounded-xl transition-all border border-border shadow-sm hover:border-primary/30">
                        {item.image && (
                            <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-sm text-foreground pr-2 group-hover:text-primary transition-colors">{item.name}</h4>
                                <p className="text-sm font-black whitespace-nowrap text-foreground">S/ {item.price.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-1 rounded-lg p-0.5 h-8 bg-accent border border-border">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-md text-foreground hover:bg-background"
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        }}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-sm w-6 text-center font-bold tabular-nums text-foreground">{item.quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-md text-foreground hover:bg-background"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-lg"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "¿Eliminar producto?",
                                            text: "Se eliminará el producto de su carrito",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#ef4444",
                                            cancelButtonColor: "#6b7280",
                                            confirmButtonText: "Sí, eliminar",
                                            cancelButtonText: "No",
                                            backdrop: false, // Don't close sidebar
                                            allowOutsideClick: false,
                                            customClass: {
                                                container: 'swal-high-z',
                                                popup: 'rounded-xl dark:bg-slate-800 dark:text-white shadow-2xl',
                                                confirmButton: 'rounded-lg cursor-pointer',
                                                cancelButton: 'rounded-lg cursor-pointer'
                                            },
                                            heightAuto: false
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                removeItem(item.id);

                                                // Show success toast
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Producto eliminado',
                                                    toast: true,
                                                    position: 'top-start',
                                                    showConfirmButton: false,
                                                    timer: 2000,
                                                    timerProgressBar: true,
                                                    customClass: {
                                                        popup: 'rounded-xl shadow-lg'
                                                    }
                                                });

                                                // Close sidebar if cart becomes empty (only 1 item left)
                                                if (items.length === 1 && setIsOpen) {
                                                    setTimeout(() => setIsOpen(false), 300);
                                                }
                                            }
                                        });
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
