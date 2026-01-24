/**
 * Módulo de Productos - API de Productos y Categorías
 *
 * Este archivo define las interfaces de datos y funciones para interactuar
 * con los endpoints de productos y categorías del backend.
 *
 * Funcionalidades:
 * - Obtener lista de productos disponibles
 * - Obtener lista de categorías activas
 * - Validación y normalización de URLs de imágenes
 */

import { apiClient } from "./client";

/**
 * Interfaz Product
 *
 * Define la estructura de un producto obtenido del backend.
 *
 * @property {number} id - ID único del producto
 * @property {string} name - Nombre del producto
 * @property {string} description - Descripción detallada del producto
 * @property {number} price - Precio del producto en la moneda local
 * @property {number} category_id - ID de la categoría a la que pertenece
 * @property {Object | null} category - Objeto con datos de la categoría
 * @property {string | null} image_url - URL completa de la imagen del producto
 * @property {string | null} image - Alias de image_url para compatibilidad
 * @property {boolean} is_available - Indica si el producto está disponible para venta
 * @property {string} created_at - Fecha de creación en formato ISO
 * @property {string} updated_at - Fecha de última actualización en formato ISO
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  category: {
    id: number;
    name: string;
  } | null;
  image_url: string | null;
  image: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Interfaz Category
 *
 * Define la estructura de una categoría de productos.
 *
 * @property {number} id - ID único de la categoría
 * @property {string} name - Nombre de la categoría
 * @property {string} slug - Slug URL-friendly de la categoría
 * @property {string | null} description - Descripción opcional de la categoría
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

/**
 * Obtiene todos los productos disponibles del backend
 *
 * Realiza una petición GET al endpoint /api/products y procesa los datos:
 * - Valida que las URLs de imágenes sean válidas (comiencen con http)
 * - Establece null para URLs inválidas
 * - Retorna array de productos listos para usar
 *
 * @returns {Promise<Product[]>} Promesa con array de productos
 * @throws {Error} Si hay error en la petición o el servidor no responde
 *
 * @example
 * try {
 *   const products = await fetchProducts();
 *   console.log(`Se obtuvieron ${products.length} productos`);
 * } catch (error) {
 *   console.error("Error al cargar productos:", error);
 * }
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const products = await apiClient.get<Product[]>("/products");
    // Agregar timestamp para prevenir problemas de caché
    return products.map((product) => ({
      ...product,
      // Asegurar que image_url sea válida o proporcionar fallback
      image_url:
        product.image_url && product.image_url.startsWith("http")
          ? product.image_url
          : null,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Obtiene todas las categorías activas del backend
 *
 * Realiza una petición GET al endpoint /api/categories.
 *
 * @returns {Promise<Category[]>} Promesa con array de categorías
 * @throws {Error} Si hay error en la petición o el servidor no responde
 *
 * @example
 * const categories = await fetchCategories();
 * categories.forEach(cat => console.log(cat.name));
 */
export async function fetchCategories(): Promise<Category[]> {
  return apiClient.get<Category[]>("/categories");
}
