import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useCartStore } from "@/store/useCartStore";
import { CreateOrderData, createOrder, OrderItem } from "../lib/api/orders";
import { processCartItems, calculateCartTotals } from "@/lib/cart-helpers";

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
    "delivery" // Default to delivery since it's the only option
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "yape" | "plin" | null
  >(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Customer Data State
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerDNI, setCustomerDNI] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Card Data State
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Calculations
  const { promoItems, regularItems, displayItems } = processCartItems(
    items,
    selectedPromotion
  );
  const totals = calculateCartTotals(
    promoItems,
    regularItems,
    selectedPromotion,
    orderType === "delivery" ? 0 : 0
  );

  const resetForm = () => {
    setOrderType("delivery"); // Reset to default delivery
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

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (response: any) => {
      setShowPaymentModal(false);
      setIsOpen(false);
      const order = response.order || response;

      setTimeout(() => {
        Swal.fire({
          html: `
            <div class="flex flex-col items-center text-center px-2">
                <!-- Success Icon with Animation -->
                <div class="relative mb-8">
                    <div class="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                    <div class="relative w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 ring-4 ring-green-500/20">
                        <svg class="w-14 h-14 text-white animate-[scale-in_0.5s_ease-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>
                
                <!-- Title -->
                <h2 class="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent mb-3 tracking-tight">
                    ¡Pedido Recibido!
                </h2>
                <p class="text-slate-400 mb-8 text-lg">Tu pedido ha sido creado exitosamente</p>
                
                <!-- Order Number Card -->
                <div class="w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-6 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-tr-full opacity-50"></div>
                    
                    <p class="text-xs font-bold text-green-400 uppercase tracking-[0.2em] mb-3 relative z-10">Número de Orden</p>
                    <div class="relative z-10 bg-slate-900/50 rounded-xl px-6 py-4 border border-green-500/20">
                        <strong class="text-4xl font-mono font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent tracking-wider">
                            ${order.order_number || "N/A"}
                        </strong>
                    </div>
                </div>

                <!-- WhatsApp Suggestion -->
                <div class="w-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-5 mb-6 backdrop-blur-sm">
                    <div class="flex items-start gap-3 mb-2">
                        <div class="flex-shrink-0 w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center mt-0.5">
                            <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="text-left flex-1">
                            <p class="text-amber-300 text-sm font-semibold mb-1">Sugerencia Importante</p>
                            <p class="text-amber-100/90 text-sm leading-relaxed">
                                Para agilizar tu pedido, te sugerimos <strong class="text-amber-200">realizar el seguimiento por WhatsApp</strong> ahora.
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- WhatsApp Button -->
                <a 
                    id="btn-track-order"
                    href="https://wa.me/51937377571?text=${encodeURIComponent(
                      `Hola, quiero hacer seguimiento a mi pedido *${order.order_number}*. Mi número registrado es ${order.customer_phone}`
                    )}"
                    target="_blank"
                    class="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0e7468] text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-green-900/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-900/40 active:scale-[0.98] !no-underline group ring-2 ring-white/10 hover:ring-white/20"
                >
                    <svg class="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.347-5.238c0-5.443 4.429-9.876 9.88-9.876 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.444-4.432 9.876-9.883 9.875m3.743-16.892c-2.34-2.345-5.46-3.638-8.773-3.638-6.191 0-11.234 4.81-11.238 10.723 0 1.77.427 3.396 1.171 4.845L.306 20.37l5.228-1.312a10.957 10.957 0 015.176 1.295h.005c6.202 0 11.258-4.816 11.263-10.739 0-2.863-1.285-5.592-3.629-7.935"/>
                    </svg>
                    <span class="text-base">Realizar Seguimiento por WhatsApp</span>
                </a>

                <!-- Auto-close indicator -->
                <p class="text-slate-500 text-xs mt-6 flex items-center justify-center gap-2">
                    <svg class="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Se cerrará automáticamente en <span id="countdown">5</span> segundos
                </p>
            </div>
            
            <style>
                @keyframes scale-in {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            </style>
            `,
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          heightAuto: false,
          buttonsStyling: false,
          background: "#0f172a",
          customClass: {
            container: "swal-high-z backdrop-blur-md",
            popup:
              "!rounded-3xl !p-0 !overflow-visible shadow-2xl border border-slate-700/50",
            htmlContainer: "!m-0 !p-10",
            timerProgressBar:
              "!bg-gradient-to-r !from-green-400 !to-emerald-500 !h-1",
          },
          didOpen: () => {
            const btnTrack = document.getElementById("btn-track-order");
            if (btnTrack) {
              btnTrack.addEventListener("click", () => {
                Swal.close();
              });
            }

            // Countdown timer
            const countdownEl = document.getElementById("countdown");
            let timeLeft = 5;
            const countdownInterval = setInterval(() => {
              timeLeft--;
              if (countdownEl && timeLeft > 0) {
                countdownEl.textContent = timeLeft.toString();
              } else {
                clearInterval(countdownInterval);
              }
            }, 1000);
          },
        }).then(() => {
          clearCart();
          resetForm();
        });
      }, 100);
    },
    onError: (error: any) => {
      setShowPaymentModal(false);
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Error al crear pedido",
          text:
            error.message ||
            "Hubo un problema al procesar tu pedido. Por favor intenta nuevamente.",
          confirmButtonColor: "#ef4444",
          heightAuto: false,
          customClass: {
            container: "swal-high-z",
            popup: "dark:bg-slate-800 dark:text-gray-100",
            title: "dark:text-white",
            htmlContainer: "dark:text-gray-300",
          },
        });
      }, 100);
    },
  });

  const handleProceedToPayment = () => {
    // orderType is always 'delivery' now, so we skip that validation
    if (!paymentMethod) {
      showWarning("Método de Pago", "Por favor selecciona un método de pago");
      return;
    }
    if (orderType === "delivery" || orderType === "online") {
      if (
        !customerName.trim() ||
        !customerLastName.trim() ||
        !customerDNI.trim()
      ) {
        showWarning(
          "Datos Incompletos",
          "Por favor completa todos tus datos personales"
        );
        return;
      }
      if (!customerEmail.trim() || !customerPhone.trim()) {
        showWarning(
          "Contacto Requerido",
          "Por favor ingresa tu email y teléfono"
        );
        return;
      }
    }

    if (orderType === "delivery") {
      if (!deliveryAddress.trim()) {
        showWarning(
          "Dirección Requerida",
          "Por favor ingresa tu dirección de entrega"
        );
        return;
      }
    }
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = () => {
    if (items.length === 0) {
      showWarning("Carrito Vacío", "No hay productos en el carrito");
      return;
    }

    // Combine regular items and promo items for the payload
    const orderItems: OrderItem[] = [
      ...regularItems.map((item) => ({
        product_id: parseInt(item.id),
        quantity: item.quantity,
        special_instructions: "", // You could add notes for regular items if supported in UI
      })),
      ...promoItems.map((item) => ({
        // Promo items have IDs like "promo-123", we need the real ID
        product_id: parseInt(item.id.replace("promo-", "")),
        quantity: item.quantity,
        special_instructions: `** PROMOCIÓN: ${
          selectedPromotion?.title || "Combo"
        } **`,
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
    createOrderMutation.mutate(orderData);
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

  return {
    // State
    isOpen,
    setIsOpen,
    orderType,
    setOrderType,
    paymentMethod,
    setPaymentMethod,
    showPaymentModal,
    setShowPaymentModal,

    // Form Data
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

    // Card Data
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cardExpiry,
    setCardExpiry,
    cardCvv,
    setCardCvv,

    // Derived Data
    promoItems,
    regularItems,
    displayItems,
    totals,

    // Store Actions
    removeItem,
    updateQuantity,
    removePromotion,
    selectedPromotion,
    itemsCount: items.length + (selectedPromotion ? 1 : 0),

    // Handlers
    handleProceedToPayment,
    handleConfirmPayment,
  };
};
