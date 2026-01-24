/**
 * Hook Personalizado del Sidebar del Carrito - useCartSidebar
 *
 * Este hook gestiona toda la lógica del carrito de compras y el proceso de checkout:
 *
 * Funcionalidades principales:
 * - Gestión del estado del sidebar (abrir/cerrar)
 * - Manejo de datos del cliente (nombre, dirección, contacto, etc.)
 * - Selección de tipo de pedido (delivery/pickup)
 * - Selección de método de pago (tarjeta, Yape, Plin, efectivo)
 * - Integración con Culqi para procesamiento de pagos
 * - Creación de pedidos en el backend
 * - Validación de formularios
 * - Cálculo de totales y aplicación de promociones
 * - Manejo de estados de éxito y error
 *
 * Flujo de pago:
 * 1. Usuario completa datos personales y selecciona método de pago
 * 2. Se crea el pedido en el backend
 * 3. Si es pago electrónico (tarjeta/Yape/Plin), se abre Culqi Checkout
 * 4. Culqi procesa el pago y ejecuta callback
 * 5. Se muestra mensaje de éxito y se limpia el carrito
 *
 * Integración con Culqi:
 * - Tarjeta: Usa Culqi.token para tokenizar datos de tarjeta
 * - Yape/Plin: Usa Culqi.order para generar código QR de pago
 * - Efectivo: Crea pedido directamente sin Culqi
 */

"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useCartStore } from "@/store/useCartStore";
import { CreateOrderData, createOrder, OrderItem } from "../lib/api/orders";
import { processCardPayment, createCulqiOrder } from "../lib/api/payments";
import { processCartItems, calculateCartTotals } from "@/lib/cart-helpers";

/**
 * Hook useCartSidebar
 *
 * Hook personalizado que encapsula toda la lógica del carrito de compras,
 * proceso de checkout y gestión de pagos.
 *
 * @returns {Object} Objeto con estados, funciones y datos del carrito
 *
 * @example
 * const {
 *   isOpen,
 *   setIsOpen,
 *   totals,
 *   handleProceedToPayment,
 *   displayItems
 * } = useCartSidebar();
 */
export const useCartSidebar = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    selectedPromotion,
    removePromotion,
  } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  // Order & Payment State
  const [orderType, setOrderType] = useState<"delivery" | "online" | null>(
    "delivery",
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "yape" | "plin" | "cash" | null
  >(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Customer Data State
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerDNI, setCustomerDNI] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Card Data State (No longer strictly needed for Culqi Checkout but kept for state parity if needed)
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Calculations
  const { promoItems, regularItems, displayItems } = processCartItems(
    items,
    selectedPromotion,
  );
  const totals = calculateCartTotals(
    promoItems,
    regularItems,
    selectedPromotion,
    orderType === "delivery" ? 0 : 0,
  );

  // Culqi initialization
  useEffect(() => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.Culqi) {
      // @ts-ignore
      window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || "";

      // Define callback
      // @ts-ignore
      window.culqi = async () => {
        // @ts-ignore
        if (window.Culqi.token) {
          // Card Payment Flow
          // @ts-ignore
          const token = window.Culqi.token.id;
          const orderId = localStorage.getItem("last_order_id");
          const email = localStorage.getItem("last_customer_email");
          const orderNumber = localStorage.getItem("last_order_number");

          if (orderId && token && email) {
            try {
              const res = await processCardPayment(
                parseInt(orderId),
                token,
                email,
              );
              if (res.success) {
                handleOrderSuccess(orderNumber || "");
              } else {
                showError(
                  "Pago Fallido",
                  res.message || "Error al procesar el pago",
                );
              }
            } catch (error) {
              showError("Error", "Ocurrió un error inesperado");
            }
          }
        }
        // @ts-ignore
        else if (window.Culqi.order) {
          // Yape / Plin Flow
          const orderNumber = localStorage.getItem("last_order_number");
          handleOrderSuccess(orderNumber || "");
        }
        // @ts-ignore
        else if (window.Culqi.error) {
          // @ts-ignore
          showError("Error", window.Culqi.error.user_message);
        }
      };
    }
  }, []);

  const resetForm = () => {
    setOrderType("delivery");
    setPaymentMethod(null);
    setDeliveryAddress("");
    setCustomerName("");
    setCustomerLastName("");
    setCustomerDNI("");
    setCustomerEmail("");
    setCustomerPhone("");
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
  };

  const showError = (title: string, text: string) => {
    Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: "#ef4444",
      heightAuto: false,
      customClass: {
        container: "swal-high-z",
        popup: "dark:bg-slate-800 dark:text-gray-100",
        title: "dark:text-white",
        htmlContainer: "dark:text-gray-300",
      },
    });
  };

  const showWarning = (title: string, text: string) => {
    Swal.fire({
      icon: "warning",
      title,
      text,
      confirmButtonColor: "#3085d6",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
      heightAuto: false,
      customClass: {
        container: "swal-high-z",
        popup: "dark:bg-slate-800 dark:text-gray-100",
        title: "dark:text-white",
      },
    });
  };

  const handleOrderSuccess = (orderData: any) => {
    const orderNumber =
      typeof orderData === "string"
        ? orderData
        : orderData?.order_number || "N/A";

    setShowPaymentModal(false);
    setIsOpen(false);

    setTimeout(() => {
      Swal.fire({
        html: `
                <div class="flex flex-col items-center text-center px-2">
                    <div class="relative mb-8">
                        <div class="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                        <div class="relative w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 ring-4 ring-green-500/20">
                            <svg class="w-14 h-14 text-white animate-[scale-in_0.5s_ease-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>
                    <h2 class="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent mb-3 tracking-tight">
                        ¡Pedido Recibido!
                    </h2>
                    <p class="text-slate-400 mb-8 text-lg">Tu pedido ha sido creado exitosamente</p>
                    <div class="w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-6 relative overflow-hidden group">
                        <p class="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-3 relative z-10">Número de Orden</p>
                        <div class="relative z-10 bg-slate-900/50 rounded-xl px-6 py-4 border border-green-500/20">
                            <strong class="text-4xl font-mono font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent tracking-wider">
                                ${orderNumber}
                            </strong>
                        </div>
                    </div>
                </div>
                `,
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        heightAuto: false,
        background: "#0f172a",
        customClass: {
          container: "swal-high-z backdrop-blur-md",
          popup:
            "!rounded-3xl !p-0 !overflow-visible shadow-2xl border border-slate-700/50",
          htmlContainer: "!m-0 !p-10",
          timerProgressBar:
            "!bg-gradient-to-r !from-green-400 !to-emerald-500 !h-1",
        },
      }).then(() => {
        clearCart();
        resetForm();
        localStorage.removeItem("last_order_id");
        localStorage.removeItem("last_order_number");
        localStorage.removeItem("last_customer_email");
      });
    }, 100);
  };

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.Culqi) {
      // @ts-ignore
      window.Culqi.publicKey =
        process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxx";

      // @ts-ignore
      window.culqi = async () => {
        // @ts-ignore
        if (window.Culqi.token) {
          // @ts-ignore
          const token = window.Culqi.token.id;
          const orderId = localStorage.getItem("last_order_id");
          const email = localStorage.getItem("last_customer_email");
          if (orderId && token && email) {
            try {
              const res = await processCardPayment(
                parseInt(orderId),
                token,
                email,
              );
              if (res.success) {
                handleOrderSuccess({
                  order_number: localStorage.getItem("last_order_number"),
                });
              } else {
                showError(
                  "Pago Fallido",
                  res.message || "No se pudo procesar el pago",
                );
              }
            } catch (err) {
              showError("Error de Pago", "Ocurrió un error inesperado");
            }
          }
          // @ts-ignore
        } else if (window.Culqi.order) {
          handleOrderSuccess({
            order_number: localStorage.getItem("last_order_number"),
          });
        } else {
          // @ts-ignore
          if (window.Culqi.error) {
            // @ts-ignore
            showError("Error Culqi", window.Culqi.error.user_message);
          }
        }
      };
    }
  }, []);

  const handleProceedToPayment = () => {
    if (!paymentMethod) {
      showWarning("Método de Pago", "Por favor selecciona un método de pago");
      return;
    }
    if (
      !customerName.trim() ||
      !customerLastName.trim() ||
      !customerDNI.trim()
    ) {
      showWarning(
        "Datos Incompletos",
        "Por favor completa todos tus datos personales",
      );
      return;
    }
    if (!customerEmail.trim() || !customerPhone.trim()) {
      showWarning(
        "Contacto Requerido",
        "Por favor ingresa tu email y teléfono",
      );
      return;
    }
    if (orderType === "delivery" && !deliveryAddress.trim()) {
      showWarning(
        "Dirección Requerida",
        "Por favor ingresa tu dirección de entrega",
      );
      return;
    }

    if (paymentMethod === "cash") {
      handleConfirmPayment();
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleConfirmPayment = async () => {
    const orderItems: OrderItem[] = [
      ...regularItems.map((item) => ({
        product_id: parseInt(item.id),
        quantity: item.quantity,
        special_instructions: "",
      })),
      ...promoItems.map((item) => ({
        product_id: parseInt(item.id.replace("promo-", "")),
        quantity: item.quantity,
        special_instructions: `** PROMOCIÓN: ${selectedPromotion?.title || "Combo"} **`,
      })),
    ];

    const orderData: CreateOrderData = {
      customer_name: customerName,
      customer_lastname: customerLastName || undefined,
      customer_dni: customerDNI || undefined,
      customer_email: customerEmail || undefined,
      customer_phone: customerPhone,
      order_type: orderType === "delivery" ? "delivery" : "pickup",
      payment_method: paymentMethod || undefined,
      delivery_address: orderType === "delivery" ? deliveryAddress : undefined,
      items: orderItems,
    };

    try {
      const response: any = await createOrder(orderData);
      const order = response.order || response;

      if (paymentMethod === "cash") {
        handleOrderSuccess(order);
        return;
      }

      localStorage.setItem("last_order_id", order.id.toString());
      localStorage.setItem("last_order_number", order.order_number);
      localStorage.setItem("last_customer_email", customerEmail);

      // @ts-ignore
      if (typeof window !== "undefined" && window.Culqi) {
        if (paymentMethod === "card") {
          // @ts-ignore
          window.Culqi.settings({
            title: "Sabor Restaurante",
            currency: "PEN",
            description: "Pedido #" + order.order_number,
            amount: Math.round(totals.finalTotal * 100),
          });
          // @ts-ignore
          window.Culqi.open();
        } else if (paymentMethod === "yape" || paymentMethod === "plin") {
          const culqiOrderRes = await createCulqiOrder(order.id);
          if (culqiOrderRes.success) {
            // @ts-ignore
            window.Culqi.settings({
              title: "Sabor Restaurante",
              currency: "PEN",
              description: "Pedido #" + order.order_number,
              amount: Math.round(totals.finalTotal * 100),
              order: culqiOrderRes.order_id,
            });
            // @ts-ignore
            window.Culqi.open();
          }
        }
      }
    } catch (err) {
      showError("Error", "No se pudo crear el pedido");
    }
  };

  return {
    isOpen,
    setIsOpen,
    orderType,
    setOrderType,
    paymentMethod,
    setPaymentMethod,
    showPaymentModal,
    setShowPaymentModal,
    deliveryAddress,
    setDeliveryAddress,
    customerName,
    setCustomerName,
    customerLastName,
    setCustomerLastName,
    customerDNI,
    setCustomerDNI,
    customerEmail,
    setCustomerEmail,
    customerPhone,
    setCustomerPhone,
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cardExpiry,
    setCardExpiry,
    cardCvv,
    setCardCvv,
    promoItems,
    regularItems,
    displayItems,
    totals,
    removeItem,
    updateQuantity,
    removePromotion,
    selectedPromotion,
    itemsCount: items.length + (selectedPromotion ? 1 : 0),
    handleProceedToPayment,
    handleConfirmPayment,
    handleOrderSuccess,
  };
};
