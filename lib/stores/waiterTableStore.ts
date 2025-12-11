import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  image?: string;
}

interface TableCartState {
  items: CartItem[];
  addItem: (product: any, quantity?: number, notes?: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useTableCartStore = create<TableCartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, notes = "") => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product_id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product_id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product_id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                quantity,
                notes,
                image: product.image_url,
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "table-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
