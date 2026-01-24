/**
 * Constantes del Menú - menu.ts
 *
 * Define las categorías y platos del menú del restaurante.
 * Estos datos se usan como fallback cuando no hay conexión con el backend.
 *
 * Contenido:
 * - MENU_CATEGORIES: Array de categorías del menú con iconos
 * - MENU_DISHES: Array de platos con detalles completos
 * - FEATURED_DISHES: Platos destacados filtrados del menú
 *
 * Nota: En producción, estos datos se obtienen del backend vía API.
 * Este archivo sirve como datos de ejemplo y fallback.
 */

import { Category, Dish } from "@/lib/types";

/**
 * Categorías del Menú
 *
 * Array de categorías disponibles en el restaurante.
 * Cada categoría tiene un icono de lucide-react asociado.
 */
export const MENU_CATEGORIES: Category[] = [
  { id: "todos", name: "Todos", icon: "Utensils" },
  { id: "entradas", name: "Entradas", icon: "Soup" },
  { id: "platos-principales", name: "Platos Principales", icon: "ChefHat" },
  { id: "postres", name: "Postres", icon: "IceCream" },
  { id: "bebidas", name: "Bebidas", icon: "Coffee" },
  { id: "promociones", name: "Promociones", icon: "Tag" },
  { id: "combos", name: "Combos", icon: "Package" },
  { id: "especiales", name: "Especiales del Chef", icon: "Star" },
];

/**
 * Platos del Menú
 *
 * Array de platos disponibles con información completa:
 * - Nombre, descripción y precio
 * - Categoría a la que pertenece
 * - Imagen de Unsplash
 * - Rating y número de reseñas
 *
 * Estos datos son de ejemplo y en producción se obtienen del backend.
 */
export const MENU_DISHES: Dish[] = [
  {
    id: "1",
    name: "Salmón a la Parrilla",
    description: "Con vegetales asados y salsa de limón",
    price: 45,
    category: "platos-principales",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Pasta Carbonara",
    description: "Cremosa salsa con bacon y parmesano",
    price: 38,
    category: "platos-principales",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "3",
    name: "Ensalada César",
    description: "Con pollo grillado y aderezo especial",
    price: 28,
    category: "entradas",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: "4",
    name: "Lomo Saltado",
    description: "Tradicional con papas y arroz",
    price: 52,
    category: "platos-principales",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "5",
    name: "Tiramisu",
    description: "Postre italiano con café y mascarpone",
    price: 18,
    category: "postres",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    rating: 4.8,
    reviews: 87,
  },
  {
    id: "6",
    name: "Ceviche Clásico",
    description: "Pescado fresco con limón y camote",
    price: 42,
    category: "entradas",
    image:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5.0,
    reviews: 178,
  },
  {
    id: "7",
    name: "Pizza Margherita",
    description: "Con mozzarella fresca y albahaca",
    price: 35,
    category: "platos-principales",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    rating: 4.7,
    reviews: 145,
  },
  {
    id: "8",
    name: "Limonada Frozen",
    description: "Refrescante y natural",
    price: 12,
    category: "bebidas",
    image:
      "https://images.unsplash.com/photo-1575596510825-f748919a2bf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGltb25hZGF8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
    reviews: 92,
  },
];

export const FEATURED_DISHES = MENU_DISHES.filter((dish) =>
  ["1", "4", "6"].includes(dish.id),
);
