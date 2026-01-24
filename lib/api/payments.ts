/**
 * Módulo de Pagos - Integración con Culqi
 *
 * Este archivo contiene funciones para procesar pagos a través de la pasarela Culqi.
 * Soporta dos métodos de pago:
 * - Tarjetas de crédito/débito (usando tokens de Culqi)
 * - Yape/Plin (usando órdenes de Culqi con código QR)
 *
 * Flujo de pago:
 * 1. Se crea el pedido en el backend
 * 2. Se obtiene token/orden de Culqi desde el frontend
 * 3. Se envía al backend para procesar el pago
 * 4. Backend confirma con Culqi y actualiza el estado del pedido
 */

// URL base del API obtenida de variable de entorno
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Procesa un pago con tarjeta usando token de Culqi
 *
 * Envía el token generado por Culqi Checkout al backend para procesar el cargo.
 * El backend se comunica con Culqi para completar la transacción.
 *
 * @param {number} orderId - ID del pedido a pagar
 * @param {string} token - Token de tarjeta generado por Culqi (ej: "tkn_test_xxxxx")
 * @param {string} email - Email del cliente para recibo
 * @returns {Promise<any>} Promesa con resultado del procesamiento
 *
 * @example
 * const result = await processCardPayment(123, "tkn_test_abc123", "cliente@email.com");
 * if (result.success) {
 *   console.log("Pago exitoso");
 * }
 */
export async function processCardPayment(
  orderId: number,
  token: string,
  email: string,
) {
  const response = await fetch(`${API_URL}/payment/process-card`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_id: orderId, token, email }),
  });
  return response.json();
}

/**
 * Crea una orden de pago en Culqi para Yape/Plin
 *
 * Genera una orden en Culqi que permite pagar mediante código QR con Yape o Plin.
 * El backend crea la orden en Culqi y retorna el ID para abrir el checkout.
 *
 * @param {number} orderId - ID del pedido a pagar
 * @returns {Promise<any>} Promesa con datos de la orden (incluye order_id de Culqi)
 *
 * @example
 * const result = await createCulqiOrder(123);
 * if (result.success) {
 *   // Abrir Culqi Checkout con result.order_id
 *   window.Culqi.settings({ order: result.order_id });
 *   window.Culqi.open();
 * }
 */
export async function createCulqiOrder(orderId: number) {
  const response = await fetch(`${API_URL}/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_id: orderId }),
  });
  return response.json();
}
