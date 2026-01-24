/**
 * Funciones Auxiliares del Carrito - cart-helpers.ts
 *
 * Este archivo contiene funciones de utilidad para procesar y calcular
 * los datos del carrito de compras, incluyendo:
 * - Separación de items regulares y promocionales
 * - Cálculo de subtotales, descuentos y total final
 * - Aplicación de promociones y descuentos
 */

import { CartItem, Promotion } from "@/store/useCartStore";

/**
 * Interfaz CartTotals
 *
 * Define la estructura de los totales calculados del carrito.
 *
 * @property {number} promoOriginalTotal - Total original de items promocionales (sin descuento)
 * @property {number} regularTotal - Total de items regulares (sin promoción)
 * @property {number} promoDiscount - Monto del descuento aplicado a la promoción
 * @property {number} promoNetTotal - Total neto de items promocionales (con descuento aplicado)
 * @property {number} subtotal - Suma de promoNetTotal + regularTotal
 * @property {number} shipping - Costo de envío/delivery
 * @property {number} taxes - Impuestos (actualmente 0, incluido en precios)
 * @property {number} finalTotal - Total final a pagar (subtotal + shipping + taxes)
 */
export interface CartTotals {
  promoOriginalTotal: number;
  regularTotal: number;
  promoDiscount: number;
  promoNetTotal: number;
  subtotal: number;
  shipping: number;
  taxes: number;
  finalTotal: number;
}

/**
 * Interfaz ProcessedCartItems
 *
 * Define la estructura de los items del carrito procesados y separados.
 *
 * @property {CartItem[]} promoItems - Items que forman parte de una promoción
 * @property {CartItem[]} regularItems - Items regulares sin promoción
 * @property {CartItem[]} displayItems - Todos los items para mostrar (promoItems + regularItems)
 */
export interface ProcessedCartItems {
  promoItems: CartItem[];
  regularItems: CartItem[];
  displayItems: CartItem[];
}

/**
 * Procesa los items del carrito separando promocionales de regulares
 *
 * Toma los items del carrito y la promoción seleccionada, y los separa en:
 * - Items promocionales: Productos incluidos en la promoción activa
 * - Items regulares: Productos agregados normalmente al carrito
 * - Items para mostrar: Combinación de ambos para renderizar en la UI
 *
 * @param {CartItem[]} items - Items actuales en el carrito
 * @param {Promotion | null} selectedPromotion - Promoción actualmente aplicada (si existe)
 * @returns {ProcessedCartItems} Objeto con items separados y procesados
 *
 * @example
 * const { promoItems, regularItems, displayItems } = processCartItems(cartItems, promotion);
 */
export const processCartItems = (
  items: CartItem[],
  selectedPromotion: Promotion | null,
): ProcessedCartItems => {
  // Crear items promocionales a partir de los productos de la promoción
  const promoItems =
    selectedPromotion?.products?.map((prod) => ({
      id: `promo-${prod.id}`, // Prefijo "promo-" para identificar items promocionales
      name: prod.name,
      price: prod.price,
      quantity: 1, // Las promociones suelen tener cantidad fija de 1
      image: prod.image,
    })) || [];

  // Filtrar items regulares (excluir cualquier item con prefijo "promo-")
  const regularItems = items.filter(
    (item) => !item.id.toString().startsWith("promo-"),
  );

  // Combinar todos los items para mostrar en la UI
  const displayItems = [...promoItems, ...regularItems];

  return { promoItems, regularItems, displayItems };
};

/**
 * Calcula todos los totales del carrito
 *
 * Realiza los cálculos financieros del carrito incluyendo:
 * - Totales de items promocionales y regulares
 * - Aplicación de descuentos porcentuales
 * - Suma de subtotales, envío e impuestos
 * - Cálculo del total final a pagar
 *
 * @param {CartItem[]} promoItems - Items promocionales del carrito
 * @param {CartItem[]} regularItems - Items regulares del carrito
 * @param {Promotion | null} selectedPromotion - Promoción aplicada (si existe)
 * @param {number} deliveryFee - Costo de envío (por defecto 0)
 * @returns {CartTotals} Objeto con todos los totales calculados
 *
 * @example
 * const totals = calculateCartTotals(promoItems, regularItems, promotion, 5.00);
 * console.log(totals.finalTotal); // Total a pagar
 */
export const calculateCartTotals = (
  promoItems: CartItem[],
  regularItems: CartItem[],
  selectedPromotion: Promotion | null,
  deliveryFee: number = 0,
): CartTotals => {
  // Calcular total original de items promocionales
  const promoOriginalTotal = promoItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Calcular total de items regulares
  const regularTotal = regularItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Calcular descuento de la promoción (si aplica)
  let promoDiscount = 0;
  if (
    selectedPromotion &&
    selectedPromotion.discount &&
    selectedPromotion.discount.includes("%")
  ) {
    // Extraer el porcentaje del string (ej: "20%" -> 20)
    const percentage = parseFloat(selectedPromotion.discount.replace("%", ""));
    if (!isNaN(percentage)) {
      promoDiscount = promoOriginalTotal * (percentage / 100);
    }
  }

  // Calcular total neto de items promocionales (con descuento aplicado)
  const promoNetTotal = promoOriginalTotal - promoDiscount;

  // Calcular subtotal (suma de promocionales y regulares)
  const subtotal = promoNetTotal + regularTotal;

  // Costo de envío
  const shipping = deliveryFee;

  // Impuestos (actualmente 0, ya que están incluidos en el precio o se calculan en el backend)
  const taxes = 0;

  // Total final a pagar
  const finalTotal = subtotal + shipping + taxes;

  return {
    promoOriginalTotal,
    regularTotal,
    promoDiscount,
    promoNetTotal,
    subtotal,
    shipping,
    taxes,
    finalTotal,
  };
};
