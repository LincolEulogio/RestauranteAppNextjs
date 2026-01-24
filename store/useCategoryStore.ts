/**
 * Store de Categorías - useCategoryStore
 *
 * Este archivo define el estado global para la gestión de categorías de productos.
 * Permite seleccionar y filtrar productos por categoría en toda la aplicación.
 *
 * Utiliza Zustand para la gestión del estado global sin necesidad de Context API.
 */

import { create } from "zustand";

/**
 * Interfaz CategoryState
 *
 * Define la estructura del estado de categorías y las acciones disponibles.
 *
 * @property {string} selectedCategory - Categoría actualmente seleccionada
 * @property {Function} setSelectedCategory - Función para cambiar la categoría seleccionada
 */
interface CategoryState {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

/**
 * Hook useCategoryStore
 *
 * Store para gestionar la categoría de productos seleccionada.
 * Por defecto, la categoría seleccionada es "Todos" para mostrar todos los productos.
 *
 * @example
 * const { selectedCategory, setSelectedCategory } = useCategoryStore();
 * setSelectedCategory("Pizzas"); // Filtra solo productos de la categoría Pizzas
 */
export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: "Todos", // Categoría por defecto

  /**
   * Establece la categoría seleccionada
   *
   * @param {string} category - Nombre de la categoría a seleccionar
   */
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
