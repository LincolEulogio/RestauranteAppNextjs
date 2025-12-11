/**
 * Formatea un número como precio en Soles Peruanos (S/)
 * @param amount - El monto a formatear
 * @returns String formateado como S/ XX.XX
 */
export function formatPrice(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

/**
 * Formatea un número como precio en Soles Peruanos sin decimales
 * @param amount - El monto a formatear
 * @returns String formateado como S/ XX
 */
export function formatPriceShort(amount: number): string {
  return `S/ ${Math.round(amount)}`;
}

/**
 * Convierte de dólares a soles usando tasa de cambio
 * @param amountInUSD - Monto en dólares
 * @param exchangeRate - Tasa de cambio (por defecto 3.75)
 * @returns Monto en soles
 */
export function convertToSoles(
  amountInUSD: number,
  exchangeRate: number = 3.75
): number {
  return amountInUSD * exchangeRate;
}
