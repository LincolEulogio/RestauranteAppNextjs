/**
 * Utilidades de Clases CSS - utils.ts
 *
 * Este archivo contiene funciones de utilidad para trabajar con clases CSS.
 * Principalmente se usa para combinar clases de Tailwind CSS de manera eficiente.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Función cn (className)
 *
 * Combina múltiples clases CSS de manera inteligente, resolviendo conflictos
 * entre clases de Tailwind CSS.
 *
 * Utiliza:
 * - clsx: Para combinar clases condicionales
 * - twMerge: Para resolver conflictos de Tailwind (ej: si hay "p-4" y "p-2", solo aplica "p-2")
 *
 * @param {...ClassValue[]} inputs - Lista de clases CSS, objetos condicionales o arrays
 * @returns {string} String con las clases CSS combinadas y optimizadas
 *
 * @example
 * // Combinar clases simples
 * cn("bg-red-500", "text-white") // "bg-red-500 text-white"
 *
 * @example
 * // Clases condicionales
 * cn("base-class", isActive && "active-class") // "base-class active-class" si isActive es true
 *
 * @example
 * // Resolver conflictos de Tailwind
 * cn("p-4 text-sm", "p-2") // "text-sm p-2" (p-2 sobrescribe p-4)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
