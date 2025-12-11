"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCartStore } from "@/store/useCartStore"
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, Bike, Tag } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Swal from "sweetalert2"
import CardPaymentModal from "./CardPaymentModal"
import YapePaymentModal from "./YapePaymentModal"
import PlinPaymentModal from "./PlinPaymentModal"
import { createOrder, type CreateOrderData } from "@/lib/api/orders"
import { useMutation } from "@tanstack/react-query"

export default function CartSidebar() {
    const { items, removeItem, updateQuantity, total, clearCart, selectedPromotion, removePromotion } = useCartStore()
    const [isOpen, setIsOpen] = useState(false)
    // const [couponCode, setCouponCode] = useState("") // Removed per requirement

    // Estados principales de tipo de entrega/pago
    const [orderType, setOrderType] = useState<"delivery" | "online" | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<"card" | "yape" | "plin" | null>(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    // Estados para dirección
    const [deliveryAddress, setDeliveryAddress] = useState("")

    // Estados para datos del cliente
    const [customerName, setCustomerName] = useState("")
    const [customerLastName, setCustomerLastName] = useState("")
    const [customerDNI, setCustomerDNI] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")

    // Estados para formulario de tarjeta
    const [cardNumber, setCardNumber] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardExpiry, setCardExpiry] = useState("")
    const [cardCvv, setCardCvv] = useState("")

    // Derived Promo Items (Mapped to match CartItem structure for display)
    const promoItems = selectedPromotion?.products?.map(prod => ({
        id: `promo-${prod.id}`,
        name: prod.name,
        price: prod.price,
        quantity: 1,
        image: prod.image
    })) || []

    // Regular Items (from store) - Filter out any potential residual promo items
    const regularItems = items.filter(item => !item.id.toString().startsWith('promo-'))

    // Combined items for display (Promo items first)
    const displayItems = [...promoItems, ...regularItems]

    // Calculate totals
    const promoOriginalTotal = promoItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const regularTotal = regularItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    // Calculate Discount
    let promoDiscount = 0
    if (selectedPromotion && selectedPromotion.discount && selectedPromotion.discount.includes('%')) {
        const percentage = parseFloat(selectedPromotion.discount.replace('%', ''))
        if (!isNaN(percentage)) {
            promoDiscount = promoOriginalTotal * (percentage / 100)
        }
    }

    const promoNetTotal = promoOriginalTotal - promoDiscount

    const subtotal = promoNetTotal + regularTotal
    const shipping = 3.50 // Fixed shipping for now, or percent if previously requested
    const taxes = subtotal * 0.18 // 18% IGV
    const finalTotal = subtotal + shipping + taxes

    // Mutation para crear pedido
    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: (response: any) => {
            // Cerrar modales primero
            setShowPaymentModal(false)
            setIsOpen(false)

            // Extraer el pedido de la respuesta
            const order = response.order || response

            // Mostrar éxito
            setTimeout(() => {
                Swal.fire({
                    icon: "success",
                    title: "¡Pedido Creado!",
                    html: `
                        <p>Tu pedido <strong>${order.order_number || 'N/A'}</strong> ha sido creado exitosamente.</p>
                        <p class="mt-2">Total: <strong>S/ ${order.total ? Number(order.total).toFixed(2) : '0.00'}</strong></p>
                        <p class="mt-2 text-sm text-gray-600">Recibirás una confirmación pronto.</p>
                    `,
                    confirmButtonColor: "#10b981",
                    confirmButtonText: "Entendido",
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    heightAuto: false,
                    customClass: {
                        container: 'swal-high-z',
                        popup: 'dark:bg-slate-800 dark:text-gray-100',
                        title: 'dark:text-white',
                        htmlContainer: 'dark:text-gray-300'
                    }
                }).then(() => {
                    // Limpiar el carrito y formularios
                    clearCart()
                    setOrderType(null)
                    setPaymentMethod(null)
                    setDeliveryAddress("")
                    setCustomerName("")
                    setCustomerLastName("")
                    setCustomerDNI("")
                    setCustomerEmail("")
                    setCustomerPhone("")
                    setCardNumber("")
                    setCardName("")
                    setCardExpiry("")
                    setCardCvv("")
                    // setCouponCode("") // Removed
                })
            }, 100)
        },
        onError: (error: any) => {
            setShowPaymentModal(false)
            setTimeout(() => {
                Swal.fire({
                    icon: "error",
                    title: "Error al crear pedido",
                    text: error.message || "Hubo un problema al procesar tu pedido. Por favor intenta nuevamente.",
                    confirmButtonColor: "#ef4444",
                    heightAuto: false,
                    customClass: {
                        container: 'swal-high-z',
                        popup: 'dark:bg-slate-800 dark:text-gray-100',
                        title: 'dark:text-white',
                        htmlContainer: 'dark:text-gray-300'
                    }
                })
            }, 100)
        },
    })

    const handleProceedToPayment = () => {
        if (!orderType) {
            Swal.fire({
                icon: "warning",
                title: "Tipo de Entrega",
                text: "Por favor selecciona un tipo de entrega/pago",
                confirmButtonColor: "#3085d6",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: true,
                heightAuto: false,
                customClass: {
                    container: 'swal-high-z',
                    popup: 'dark:bg-slate-800 dark:text-gray-100',
                    title: 'dark:text-white'
                }
            })
            return
        }
        if (!paymentMethod) {
            Swal.fire({
                icon: "warning",
                title: "Método de Pago",
                text: "Por favor selecciona un método de pago",
                confirmButtonColor: "#3085d6",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: true,
                heightAuto: false,
                customClass: {
                    container: 'swal-high-z',
                    popup: 'dark:bg-slate-800 dark:text-gray-100',
                    title: 'dark:text-white'
                }
            })
            return
        }
        if (orderType === "delivery") {
            if (!customerName.trim() || !customerLastName.trim() || !customerDNI.trim()) {
                Swal.fire({
                    icon: "warning",
                    title: "Datos Incompletos",
                    text: "Por favor completa todos tus datos personales",
                    confirmButtonColor: "#3085d6",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    heightAuto: false,
                    customClass: {
                        container: 'swal-high-z',
                        popup: 'dark:bg-slate-800 dark:text-gray-100',
                        title: 'dark:text-white'
                    }
                })
                return
            }
            if (!customerEmail.trim() || !customerPhone.trim()) {
                Swal.fire({
                    icon: "warning",
                    title: "Contacto Requerido",
                    text: "Por favor ingresa tu email y teléfono",
                    confirmButtonColor: "#3085d6",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    heightAuto: false,
                    customClass: {
                        container: 'swal-high-z',
                        popup: 'dark:bg-slate-800 dark:text-gray-100',
                        title: 'dark:text-white'
                    }
                })
                return
            }
            if (!deliveryAddress.trim()) {
                Swal.fire({
                    icon: "warning",
                    title: "Dirección Requerida",
                    text: "Por favor ingresa tu dirección de entrega",
                    confirmButtonColor: "#3085d6",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    heightAuto: false,
                    customClass: {
                        container: 'swal-high-z',
                        popup: 'dark:bg-slate-800 dark:text-gray-100',
                        title: 'dark:text-white'
                    }
                })
                return
            }
        }
        setShowPaymentModal(true)
    }

    const handleConfirmPayment = () => {
        // Validar datos antes de enviar
        if (items.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Carrito Vacío",
                text: "No hay productos en el carrito",
                confirmButtonColor: "#3085d6",
                heightAuto: false,
                customClass: {
                    popup: 'dark:bg-slate-800 dark:text-gray-100',
                    title: 'dark:text-white'
                }
            })
            return
        }

        // Preparar datos del pedido
        const orderData: CreateOrderData = {
            customer_name: customerName,
            customer_lastname: customerLastName || undefined,
            customer_dni: customerDNI || undefined,
            customer_email: customerEmail || undefined,
            customer_phone: customerPhone,
            order_type: orderType === "delivery" ? "delivery" : "online",
            payment_method: paymentMethod || undefined,
            delivery_address: orderType === "delivery" ? deliveryAddress : undefined,
            items: items.map((item) => ({
                product_id: parseInt(item.id),
                quantity: item.quantity,
            })),
        }

        // Enviar pedido
        createOrderMutation.mutate(orderData)
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {items.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:w-[400px] p-0 max-w-full sm:max-w-[400px] bg-white border-l shadow-xl">
                <div className="h-full overflow-y-auto flex flex-col px-6 py-6 custom-scrollbar">
                    <SheetHeader className="pb-4 -mx-6 px-6">
                        <SheetTitle>Tu Pedido</SheetTitle>
                    </SheetHeader>

                    {displayItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-1 text-muted-foreground">
                            <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <div className="space-y-4 pb-4">
                            {/* Sección de Promoción */}
                            {selectedPromotion && promoItems.length > 0 && (
                                <div className="space-y-3 mb-6">
                                    <div className="bg-gray-100 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-orange-500 rounded-full">
                                                    <Tag className="h-3 w-3 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-sm text-orange-400">Promoción Aplicada</h3>
                                                    <p className="text-xs font-medium">{selectedPromotion.title}</p>
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
                                                        <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200 line-clamp-1 truncate">{item.name}</h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-xs font-medium text-slate-800 dark:text-slate-400">Cant: {item.quantity}</span>
                                                            <span className="bg-slate-700 text-slate-300 border border-slate-600/50 px-1 py-1 rounded text-xs">
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
                                                {/* Subtotal de los platos sumados */}
                                                <div className="flex justify-between items-center text-xs text-slate-400">
                                                    <span className="font-medium text-slate-800 dark:text-slate-400">Precio Normal</span>
                                                    <span className="line-through text-slate-800 dark:text-slate-500">S/ <span className="font-medium">{promoOriginalTotal.toFixed(2)}</span></span>
                                                </div>

                                                {/* Descuento Aplicado */}
                                                {promoDiscount > 0 && (
                                                    <div className="flex justify-between items-center text-xs text-blue-800 dark:text-blue-400 font-medium">
                                                        <span>Descuento ({selectedPromotion.discount})</span>
                                                        <span>-S/ {promoDiscount.toFixed(2)}</span>
                                                    </div>
                                                )}

                                                {/* Total Final Promoción */}
                                                <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
                                                    <span className="text-sm font-semibold text-orange-400">Total Pago</span>
                                                    <span className="text-base font-bold text-slate-800 dark:text-white">S/ {promoNetTotal.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Sección de Productos Adicionales */}
                            {regularItems.length > 0 && (
                                <div className="space-y-3 border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-gray-100 dark:bg-slate-900">
                                    {(selectedPromotion && promoItems.length > 0) && (
                                        <div className="flex items-center gap-2 px-1 mb-1">
                                            <ShoppingBag className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Adicionales</h3>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        {regularItems.map((item) => (
                                            <div key={item.id} className="flex gap-4 group bg-white dark:bg-slate-950 p-2 rounded-lg transition-colors border border-transparent hover:border-orange-200 dark:hover:border-slate-700 shadow-sm dark:shadow-none">
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
                                                        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5 h-7 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6 hover:bg-background rounded-sm dark:hover:bg-background dark:hover:text-slate-100"
                                                                onClick={() => {
                                                                    if (item.quantity > 1) {
                                                                        updateQuantity(item.id, item.quantity - 1)
                                                                    }
                                                                }}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                            <span className="text-sm w-6 text-center font-medium tabular-nums text-slate-800 dark:text-slate-200">{item.quantity}</span>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6 hover:bg-background rounded-sm dark:hover:bg-background dark:hover:text-slate-100"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors dark:hover:bg-destructive/10 dark:hover:text-slate-100"
                                                            onClick={() => {
                                                                // ... sweet alert logic ... (keeping it short for potential previous logic reuse or will add back if needed)
                                                                Swal.fire({
                                                                    title: "¿Eliminar?",
                                                                    text: "Se eliminará el producto",
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: "#ef4444",
                                                                    cancelButtonColor: "#e5e7eb",
                                                                    confirmButtonText: "Sí",
                                                                    cancelButtonText: "No",
                                                                    customClass: {
                                                                        popup: 'rounded-xl dark:bg-slate-800 dark:text-white',
                                                                        confirmButton: 'rounded-lg',
                                                                        cancelButton: 'rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-700'
                                                                    }
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) removeItem(item.id)
                                                                })
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
                            )}

                            <Separator className="bg-slate-200 dark:bg-slate-700" />

                            {/* Resumen del pedido */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-base text-slate-900 dark:text-white">Resumen del Pedido</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                                        <span className="text-slate-900 dark:text-slate-200">S/. {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Envío</span>
                                        <span className="text-slate-900 dark:text-slate-200">S/. {shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Impuestos</span>
                                        <span className="text-slate-900 dark:text-slate-200">S/. {taxes.toFixed(2)}</span>
                                    </div>

                                </div>
                            </div>

                            <Separator className="bg-slate-200 dark:bg-slate-700" />

                            <div className="flex justify-between items-center font-bold text-lg text-slate-900 dark:text-white">
                                <span>Total</span>
                                <span>S/. {finalTotal.toFixed(2)}</span>
                            </div>

                            <Separator className="bg-slate-200 dark:bg-slate-700" />

                            {/* Tipo de Entrega/Pago Principal */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-base text-slate-900 dark:text-white">Tipo de Entrega / Pago</h3>

                                {/* Delivery */}
                                <div
                                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${orderType === "delivery"
                                        ? "border-blue-500 dark:border-blue-400 shadow-sm bg-blue-50/50 dark:bg-blue-900/10"
                                        : "border-gray-200 dark:border-slate-700 hover:border-blue-300 hover:bg-slate-50 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                                        }`}
                                    onClick={() => {
                                        setOrderType("delivery")
                                        setPaymentMethod(null)
                                    }}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${orderType === "delivery" ? "border-blue-500 dark:border-blue-400" : "border-muted-foreground/30"
                                        }`}>
                                        {orderType === "delivery" && (
                                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-blue-500 p-1.5 rounded">
                                            <Bike className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-slate-900 dark:text-white">Delivery</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Envío a domicilio con pago digital</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pago en Línea */}
                                <div
                                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${orderType === "online"
                                        ? "border-green-500 dark:border-green-400 shadow-sm bg-green-50/50 dark:bg-green-900/10"
                                        : "border-gray-200 dark:border-slate-700 hover:border-green-300 hover:bg-slate-50 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                                        }`}
                                    onClick={() => {
                                        setOrderType("online")
                                        setPaymentMethod(null)
                                    }}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${orderType === "online" ? "border-green-500 dark:border-green-400" : "border-muted-foreground/30"
                                        }`}>
                                        {orderType === "online" && (
                                            <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-green-500 p-1.5 rounded">
                                            <CreditCard className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-slate-900 dark:text-white">Pago en Línea</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Paga antes de procesar tu pedido</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Datos del Cliente (para Delivery) */}
                            {orderType === "delivery" && (
                                <>
                                    <Separator />
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-base">Datos del Cliente</h3>
                                        <div className="space-y-2">
                                            <Label htmlFor="customerName" className="font-medium mb-3 block">Nombres</Label>
                                            <Input
                                                id="customerName"
                                                placeholder="Juan Carlos"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                className="dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customerLastName" className="font-medium mb-3 block">Apellidos</Label>
                                            <Input
                                                id="customerLastName"
                                                placeholder="Pérez García"
                                                value={customerLastName}
                                                onChange={(e) => setCustomerLastName(e.target.value)}
                                                className="dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customerDNI" className="font-medium mb-3 block">DNI</Label>
                                            <Input
                                                id="customerDNI"
                                                placeholder="12345678"
                                                value={customerDNI}
                                                onChange={(e) => setCustomerDNI(e.target.value)}
                                                maxLength={8}
                                                className="dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customerEmail" className="font-medium mb-3 block">Email</Label>
                                            <Input
                                                id="customerEmail"
                                                type="email"
                                                placeholder="correo@ejemplo.com"
                                                value={customerEmail}
                                                onChange={(e) => setCustomerEmail(e.target.value)}
                                                className="dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customerPhone" className="font-medium mb-3 block">Teléfono</Label>
                                            <Input
                                                id="customerPhone"
                                                type="tel"
                                                placeholder="999 999 999"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                maxLength={9}
                                                className="dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Campo de Dirección (solo para Delivery) */}
                            {orderType === "delivery" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="font-medium mb-3 block">Dirección de Entrega</Label>
                                        <Input
                                            id="address"
                                            placeholder="Av. Example 123, Distrito, Ciudad"
                                            value={deliveryAddress}
                                            onChange={(e) => setDeliveryAddress(e.target.value)}
                                            className="dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Métodos de Pago Secundarios (Solo para Delivery y Pago en Línea) */}
                            {(orderType === "delivery" || orderType === "online") && (
                                <>
                                    <Separator />
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-base text-slate-900 dark:text-white">Método de Pago</h3>

                                        {/* Tarjeta */}
                                        <div
                                            className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === "card"
                                                ? "border-blue-500 dark:border-blue-400 shadow-sm bg-blue-50/50 dark:bg-blue-900/10"
                                                : "border-gray-200 dark:border-slate-700 hover:border-blue-300 hover:bg-slate-50 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                                                }`}
                                            onClick={() => setPaymentMethod("card")}
                                        >
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-blue-500 dark:border-blue-400" : "border-muted-foreground/30"
                                                }`}>
                                                {paymentMethod === "card" && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="bg-blue-500 p-1.5 rounded">
                                                    <CreditCard className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-slate-900 dark:text-white">Tarjeta</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Crédito o Débito</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Yape */}
                                        <div
                                            className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === "yape"
                                                ? "border-purple-500 dark:border-purple-400 shadow-sm"
                                                : "border-border hover:border-purple-300 hover:bg-accent dark:hover:border-gray-600"
                                                }`}
                                            onClick={() => setPaymentMethod("yape")}
                                        >
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "yape" ? "border-purple-500 dark:border-purple-400" : "border-muted-foreground/30"
                                                }`}>
                                                {paymentMethod === "yape" && (
                                                    <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="bg-purple-600 p-1.5 rounded">
                                                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-slate-900 dark:text-white">Yape</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">BCP - Pago instantáneo</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Plin */}
                                        <div
                                            className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === "plin"
                                                ? "border-cyan-500 dark:border-cyan-400 shadow-sm"
                                                : "border-border hover:border-cyan-300 hover:bg-accent dark:hover:border-gray-600"
                                                }`}
                                            onClick={() => setPaymentMethod("plin")}
                                        >
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "plin" ? "border-cyan-500 dark:border-cyan-400" : "border-muted-foreground/30"
                                                }`}>
                                                {paymentMethod === "plin" && (
                                                    <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="bg-cyan-500 p-1.5 rounded">
                                                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-slate-900 dark:text-white">Plin</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Interbank - Pago rápido</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <Button className="w-full font-bold dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700" size="lg" onClick={handleProceedToPayment}>
                                Proceder al Pago
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>

            {/* Modal de Pago */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="sm:max-w-[425px] max-w-[90%] max-h-[85vh] overflow-y-auto rounded-2xl bg-background dark:bg-slate-900 border-border dark:border-slate-800">
                    <DialogDescription className="sr-only">
                        Completa la información de pago para finalizar tu pedido
                    </DialogDescription>
                    {paymentMethod === "card" && (
                        <CardPaymentModal
                            cardNumber={cardNumber}
                            setCardNumber={setCardNumber}
                            cardName={cardName}
                            setCardName={setCardName}
                            cardExpiry={cardExpiry}
                            setCardExpiry={setCardExpiry}
                            cardCvv={cardCvv}
                            setCardCvv={setCardCvv}
                            finalTotal={finalTotal}
                            onConfirm={handleConfirmPayment}
                        />
                    )}

                    {paymentMethod === "yape" && (
                        <YapePaymentModal
                            finalTotal={finalTotal}
                            onCancel={() => setShowPaymentModal(false)}
                        />
                    )}

                    {paymentMethod === "plin" && (
                        <PlinPaymentModal
                            finalTotal={finalTotal}
                            onCancel={() => setShowPaymentModal(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Sheet>
    )
}
