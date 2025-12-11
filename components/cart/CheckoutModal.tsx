"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { createOrder, type CreateOrderData } from "@/lib/api/orders"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"

interface CheckoutModalProps {
    onClose: () => void
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
    const { items, clearCart } = useCartStore()
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        delivery_address: "",
        order_type: "pickup" as "delivery" | "pickup" | "dine-in",
        notes: "",
    })

    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            // Close modal first
            onClose()

            // Show success message
            setTimeout(() => {
                Swal.fire({
                    icon: "success",
                    title: "¡Pedido Creado!",
                    html: `
            <p>Tu pedido <strong>${data.order_number}</strong> ha sido creado exitosamente.</p>
            <p class="mt-2">Total: <strong>$${data.total.toFixed(2)}</strong></p>
            <p class="mt-2 text-sm text-gray-600">Recibirás una confirmación pronto.</p>
          `,
                    confirmButtonColor: "#10b981",
                    confirmButtonText: "Entendido",
                    allowOutsideClick: false,
                    heightAuto: false,
                }).then(() => {
                    clearCart()
                })
            }, 100)
        },
        onError: (error: any) => {
            Swal.fire({
                icon: "error",
                title: "Error al crear pedido",
                text: error.message || "Hubo un problema al procesar tu pedido. Por favor intenta nuevamente.",
                confirmButtonColor: "#ef4444",
                heightAuto: false,
            })
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        if (!formData.customer_name.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Nombre requerido",
                text: "Por favor ingresa tu nombre",
                confirmButtonColor: "#3085d6",
                heightAuto: false,
            })
            return
        }

        if (!formData.customer_phone.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Teléfono requerido",
                text: "Por favor ingresa tu número de teléfono",
                confirmButtonColor: "#3085d6",
                heightAuto: false,
            })
            return
        }

        if (formData.order_type === "delivery" && !formData.delivery_address.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Dirección requerida",
                text: "Por favor ingresa tu dirección de entrega",
                confirmButtonColor: "#3085d6",
                heightAuto: false,
            })
            return
        }

        // Prepare order data
        const orderData: CreateOrderData = {
            customer_name: formData.customer_name,
            customer_email: formData.customer_email || undefined,
            customer_phone: formData.customer_phone,
            delivery_address: formData.order_type === "delivery" ? formData.delivery_address : undefined,
            order_type: formData.order_type,
            notes: formData.notes || undefined,
            items: items.map((item) => ({
                product_id: parseInt(item.id),
                quantity: item.quantity,
            })),
        }

        createOrderMutation.mutate(orderData)
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
                    <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Customer Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Nombre Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.customer_name}
                            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                            placeholder="Juan Pérez"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Teléfono <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={formData.customer_phone}
                            onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                            placeholder="999 999 999"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Email (opcional)</label>
                        <input
                            type="email"
                            value={formData.customer_email}
                            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    {/* Order Type */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Tipo de Pedido</label>
                        <select
                            value={formData.order_type}
                            onChange={(e) => setFormData({ ...formData, order_type: e.target.value as any })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                        >
                            <option value="pickup">Recoger en tienda</option>
                            <option value="delivery">Delivery</option>
                            <option value="dine-in">Comer en el lugar</option>
                        </select>
                    </div>

                    {/* Delivery Address (conditional) */}
                    {formData.order_type === "delivery" && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Dirección de Entrega <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.delivery_address}
                                onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                                placeholder="Av. Principal 123, Distrito, Ciudad"
                                rows={3}
                                required={formData.order_type === "delivery"}
                            />
                        </div>
                    )}

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Notas (opcional)</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                            placeholder="Instrucciones especiales..."
                            rows={3}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={createOrderMutation.isPending}
                        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {createOrderMutation.isPending ? "Procesando..." : "Confirmar Pedido"}
                    </button>
                </form>
            </div>
        </div>
    )
}
