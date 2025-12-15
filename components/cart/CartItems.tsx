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
            <div className="bg-orange-50 dark:bg-slate-900 rounded-xl p-4 border border-orange-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-orange-500 rounded-full">
                            <Tag className="h-3 w-3 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-orange-400">Promoción Aplicada</h3>
                            <p className="text-xs font-medium text-slate-300">{selectedPromotion.title}</p>
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
                        <div key={item.id} className="flex gap-3 items-center p-2 rounded-lg backdrop-blur-sm border border-slate-400/50 dark:border-slate-700/50">
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
                                <h4 className="font-medium text-sm text-slate-900 dark:text-slate-200 line-clamp-1 truncate">{item.name}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-400">Cant: {item.quantity}</span>
                                    <span className="bg-orange-200 text-orange-800 dark:bg-slate-700 dark:text-slate-300 border border-orange-300 dark:border-slate-600/50 px-1 py-1 rounded text-xs">
                                        Incluido
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-orange-500">S/ {item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}

                    <div className="mt-3 pt-3 border-t border-slate-300 dark:border-slate-700 space-y-2">
                        <div className="flex justify-between items-center text-xs text-slate-400">
                            <span className="font-medium text-slate-700 dark:text-slate-400">Precio Normal</span>
                            <span className="line-through text-slate-600 dark:text-slate-500">S/ <span className="font-medium">{promoOriginalTotal.toFixed(2)}</span></span>
                        </div>

                        {promoDiscount > 0 && (
                            <div className="flex justify-between items-center text-xs text-blue-700 dark:text-blue-400 font-medium">
                                <span>Descuento ({selectedPromotion.discount})</span>
                                <span>-S/ {promoDiscount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
                            <span className="text-sm font-semibold text-orange-400">Total Pago</span>
                            <span className="text-base font-bold text-slate-900 dark:text-white">S/ {promoNetTotal.toFixed(2)}</span>
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
        <div className="space-y-3 border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
            {hasPromo && (
                <div className="flex items-center gap-2 px-1 mb-1">
                    <ShoppingBag className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Adicionales</h3>
                </div>
            )}

            <div className="space-y-3 mt-3">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group bg-white dark:bg-slate-950 p-2 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
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
                                <h4 className="font-medium text-sm line-clamp-1 truncate pr-2 text-slate-900 dark:text-slate-100 hover:text-slate-100">{item.name}</h4>
                                <p className="text-sm font-medium whitespace-nowrap text-slate-900 dark:text-slate-100">S/ {item.price.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1 rounded-md p-0.5 h-7 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 rounded-sm text-slate-700 dark:text-slate-100"
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        }}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-sm w-6 text-center font-medium tabular-nums text-slate-900 dark:text-slate-100">{item.quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 rounded-sm text-slate-700 dark:text-slate-100"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-slate-600 dark:text-slate-100 hover:text-destructive hover:bg-destructive/10 transition-colors"
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
