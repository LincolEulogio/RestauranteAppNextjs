import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string | null;
  validUntil: string;
  image: string | null;
  badge: string | null;
  color: string;
  products?: {
    id: number;
    name: string;
    price: number;
    image?: string;
  }[];
}

interface CartState {
  items: CartItem[];
  selectedPromotion: Promotion | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyPromotion: (promotion: Promotion) => void;
  removePromotion: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      selectedPromotion: null,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...currentItems, item] });
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }),
      clearCart: () => set({ items: [], selectedPromotion: null }),
      applyPromotion: (promotion) => {
        set({
          selectedPromotion: promotion,
        });
      },
      removePromotion: () => set({ selectedPromotion: null }),
      total: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
