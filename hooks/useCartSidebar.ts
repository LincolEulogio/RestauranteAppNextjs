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
    null
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
    setOrderType(null);
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
            <div class="flex flex-col items-center text-center">
                <div class="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300 ring-4 ring-green-500/10">
                    <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                
                <h2 class="text-3xl font-bold text-white mb-2 tracking-tight">¡Pedido Recibido!</h2>
                <p class="text-slate-400 mb-8 text-base leading-relaxed">Tu pedido ha sido creado exitosamente.</p>
                
                <div class="w-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8 relative overflow-hidden backdrop-blur-sm">
                     <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full -mr-4 -mt-4"></div>
                     <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">NÚMERO DE ORDEN</p>
                     <strong class="text-3xl font-mono text-white tracking-widest text-glow">${
                       order.order_number || "N/A"
                     }</strong>
                </div>

                <div class="w-full bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                    <p class="text-amber-200 text-sm font-medium flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Sugerencia Importante
                    </p>
                    <p class="text-amber-100/80 text-sm mt-1">
                        Para agilizar tu pedido, te sugerimos <strong>realizar el seguimiento por WhatsApp</strong> ahora.
                    </p>
                </div>
                
                <div class="flex flex-col w-full gap-3">
                    <a 
                        id="btn-track-order"
                        href="https://wa.me/51937377571?text=${encodeURIComponent(
                          `Hola, quiero hacer seguimiento a mi pedido *${order.order_number}*. Mi número registrado es ${order.customer_phone}`
                        )}"
                        target="_blank"
                        class="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0e7468] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-900/50 transition-all transform hover:-translate-y-1 active:translate-y-0 !no-underline group ring-1 ring-white/20"
                    >
                        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.347-5.238c0-5.443 4.429-9.876 9.88-9.876 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.444-4.432 9.876-9.883 9.875m3.743-16.892c-2.34-2.345-5.46-3.638-8.773-3.638-6.191 0-11.234 4.81-11.238 10.723 0 1.77.427 3.396 1.171 4.845L.306 20.37l5.228-1.312a10.957 10.957 0 015.176 1.295h.005c6.202 0 11.258-4.816 11.263-10.739 0-2.863-1.285-5.592-3.629-7.935"/>
                        </svg>
                        <span>Realizar Seguimiento por WhatsApp</span>
                    </a>
                </div>
            </div>
            `,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          heightAuto: false,
          buttonsStyling: false,
          background: "#0f172a", // Force slate-900 background
          customClass: {
            container: "swal-high-z backdrop-blur-md",
            popup:
              "!rounded-3xl !p-0 !overflow-visible shadow-2xl border border-slate-800",
            htmlContainer: "!m-0 !p-8",
            actions: "!mt-0",
          },
          didOpen: () => {
            // Auto-redirect logic could go here if user insisted, but simpler for now to just show the button
            const btnTrack = document.getElementById("btn-track-order");
            if (btnTrack) {
              btnTrack.addEventListener("click", () => {
                Swal.close();
              });
            }
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
    if (!orderType) {
      showWarning(
        "Tipo de Entrega",
        "Por favor selecciona un tipo de entrega/pago"
      );
      return;
    }
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
