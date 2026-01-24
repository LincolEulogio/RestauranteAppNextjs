/**
 * Archivo de Exportaciones Centralizadas - index.ts
 *
 * Este archivo centraliza todas las exportaciones de la carpeta /lib,
 * permitiendo importar desde un solo lugar.
 *
 * Ventajas:
 * - Imports más limpios: import { Category, cn } from '@/lib'
 * - Punto único de exportación
 * - Fácil refactorización y reorganización
 *
 * Módulos exportados:
 * - types: Interfaces y tipos TypeScript
 * - constants: Constantes del menú, blog y restaurante
 * - config: Configuración del sitio
 * - helpers: Funciones auxiliares de formato
 * - hooks: Custom hooks
 * - utils: Utilidades (cn, etc.)
 */

// Exportar todos los módulos de la librería

export * from "./types";
export * from "./constants/menu";
export * from "./constants/blog";
export * from "./constants/restaurant";
export * from "./config/site";
export * from "./helpers/format";
export * from "./hooks";
export { cn } from "./utils";
