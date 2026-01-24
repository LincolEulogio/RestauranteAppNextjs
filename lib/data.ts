/**
 * Archivo de Datos - data.ts
 *
 * Este archivo se mantiene por compatibilidad hacia atrás (backwards compatibility).
 * Re-exporta las constantes de menú desde su nueva ubicación organizada.
 *
 * Migración:
 * - Antes: import { categories, dishes } from '@/lib/data'
 * - Ahora: import { MENU_CATEGORIES, MENU_DISHES } from '@/lib/constants/menu'
 *
 * Este archivo permite que el código antiguo siga funcionando mientras
 * se migra gradualmente a la nueva estructura de carpetas.
 */

// Re-exportar desde la nueva estructura organizada
// Este archivo se mantiene por compatibilidad hacia atrás
export {
  MENU_CATEGORIES as categories,
  MENU_DISHES as dishes,
} from "./constants/menu";
