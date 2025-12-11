import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useCartStore } from "@/store/useCartStore";
import { createOrder, type CreateOrderData } from "@/lib/api/orders";
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
    selectedPromotion
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
          icon: "success",
          title: "¡Pedido Creado!",
          html: `
                        <p>Tu pedido <strong>${
                          order.order_number || "N/A"
                        }</strong> ha sido creado exitosamente.</p>
                        <p class="mt-2">Total: <strong>S/ ${
                          order.total ? Number(order.total).toFixed(2) : "0.00"
                        }</strong></p>
                        <p class="mt-2 text-sm text-gray-600">Recibirás una confirmación pronto.</p>
                    `,
          confirmButtonColor: "#10b981",
          confirmButtonText: "Entendido",
          allowOutsideClick: false,
          allowEscapeKey: true,
          heightAuto: false,
          customClass: {
            container: "swal-high-z",
            popup: "dark:bg-slate-800 dark:text-gray-100",
            title: "dark:text-white",
            htmlContainer: "dark:text-gray-300",
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
    if (orderType === "delivery") {
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
    itemsCount: items.length,

    // Handlers
    handleProceedToPayment,
    handleConfirmPayment,
  };
};
