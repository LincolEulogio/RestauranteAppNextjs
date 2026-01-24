/**
 * Store del Carrito de Compras - useCartStore
 *
 * Este archivo define el estado global del carrito de compras utilizando Zustand.
 * Gestiona los productos agregados al carrito, las promociones aplicadas y las operaciones
 * relacionadas con la gestión del carrito (agregar, eliminar, actualizar cantidades).
 *
 * El estado se persiste en localStorage usando el middleware 'persist' de Zustand,
 * lo que permite mantener el carrito entre sesiones del navegador.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Interfaz CartItem
 *
 * Define la estructura de un producto en el carrito de compras.
 *
 * @property {string} id - Identificador único del producto
 * @property {string} name - Nombre del producto
 * @property {number} price - Precio unitario del producto
 * @property {number} quantity - Cantidad de unidades del producto en el carrito
 * @property {string} [image] - URL opcional de la imagen del producto
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

/**
 * Interfaz Promotion
 *
 * Define la estructura de una promoción que puede aplicarse al carrito.
 *
 * @property {number} id - Identificador único de la promoción
 * @property {string} title - Título de la promoción
 * @property {string} description - Descripción detallada de la promoción
 * @property {string | null} discount - Porcentaje o monto de descuento (ej: "20%" o "S/. 10")
 * @property {string} validUntil - Fecha de vencimiento de la promoción
 * @property {string | null} image - URL de la imagen promocional
 * @property {string | null} badge - Etiqueta o insignia de la promoción (ej: "NUEVO", "POPULAR")
 * @property {string} color - Color temático de la promoción en formato hexadecimal
 * @property {Array} [products] - Lista opcional de productos incluidos en la promoción
 */
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

/**
 * Interfaz CartState
 *
 * Define la estructura del estado del carrito y las acciones disponibles.
 *
 * @property {CartItem[]} items - Array de productos en el carrito
 * @property {Promotion | null} selectedPromotion - Promoción actualmente aplicada al carrito
 * @property {Function} addItem - Función para agregar un producto al carrito
 * @property {Function} removeItem - Función para eliminar un producto del carrito
 * @property {Function} updateQuantity - Función para actualizar la cantidad de un producto
 * @property {Function} clearCart - Función para vaciar completamente el carrito
 * @property {Function} applyPromotion - Función para aplicar una promoción
 * @property {Function} removePromotion - Función para remover la promoción aplicada
 * @property {Function} total - Función para calcular el total del carrito
 */
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

/**
 * Hook useCartStore
 *
 * Store principal del carrito de compras creado con Zustand.
 * Proporciona acceso al estado del carrito y a las funciones para manipularlo.
 *
 * El estado se persiste automáticamente en localStorage bajo la clave "cart-storage".
 *
 * @example
 * const { items, addItem, total } = useCartStore();
 * addItem({ id: '1', name: 'Pizza', price: 25, quantity: 1 });
 * const totalAmount = total();
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      items: [],
      selectedPromotion: null,

      /**
       * Agrega un producto al carrito
       *
       * Si el producto ya existe en el carrito, incrementa su cantidad.
       * Si es un producto nuevo, lo agrega a la lista de items.
       *
       * @param {CartItem} item - Producto a agregar al carrito
       */
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          // Si el producto ya existe, actualizar la cantidad
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          });
        } else {
          // Si es un producto nuevo, agregarlo al carrito
          set({ items: [...currentItems, item] });
        }
      },

      /**
       * Elimina un producto del carrito
       *
       * @param {string} id - ID del producto a eliminar
       */
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      /**
       * Actualiza la cantidad de un producto en el carrito
       *
       * @param {string} id - ID del producto a actualizar
       * @param {number} quantity - Nueva cantidad del producto
       */
      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }),

      /**
       * Vacía completamente el carrito
       *
       * Elimina todos los productos y la promoción aplicada.
       */
      clearCart: () => set({ items: [], selectedPromotion: null }),

      /**
       * Aplica una promoción al carrito
       *
       * @param {Promotion} promotion - Promoción a aplicar
       */
      applyPromotion: (promotion) => {
        set({
          selectedPromotion: promotion,
        });
      },

      /**
       * Remueve la promoción aplicada al carrito
       */
      removePromotion: () => set({ selectedPromotion: null }),

      /**
       * Calcula el total del carrito
       *
       * Suma el precio de todos los productos multiplicado por su cantidad.
       *
       * @returns {number} Total del carrito en la moneda configurada
       */
      total: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage", // Nombre de la clave en localStorage
    },
  ),
);
