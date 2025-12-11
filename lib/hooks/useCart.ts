import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/lib/types";
import Swal from "sweetalert2";

export default function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const addToCart = (item: CartItem, showNotification = true) => {
    addItem(item);

    if (showNotification) {
      Swal.fire({
        icon: "success",
        title: "¡Agregado al Carrito!",
        text: `${item.name} se agregó correctamente`,
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const removeFromCart = (id: string) => {
    removeItem(id);
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const isInCart = (id: string): boolean => {
    return items.some((item) => item.id === id);
  };

  const getItemQuantity = (id: string): number => {
    const item = items.find((item) => item.id === id);
    return item?.quantity || 0;
  };

  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
  };
}
