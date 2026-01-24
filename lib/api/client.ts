/**
 * Cliente API - Configuración y Métodos HTTP
 *
 * Este archivo configura el cliente HTTP para comunicarse con el backend de Laravel.
 * Proporciona métodos reutilizables para realizar peticiones GET y POST.
 *
 * Configuración:
 * - URL base del API obtenida de variables de entorno
 * - Headers estándar para JSON
 * - Manejo de errores centralizado
 * - Sin credenciales (CORS) para APIs públicas
 */

// URL base del API obtenida de variable de entorno o localhost por defecto
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Cliente API
 *
 * Objeto que encapsula los métodos HTTP para comunicarse con el backend.
 * Todos los endpoints se prefijan automáticamente con "/api".
 */
export const apiClient = {
  baseURL: API_URL,

  /**
   * Realiza una petición GET al backend
   *
   * @template T - Tipo de dato esperado en la respuesta
   * @param {string} endpoint - Ruta del endpoint (ej: "/products", "/orders")
   * @returns {Promise<T>} Promesa con los datos de la respuesta
   * @throws {Error} Si la petición falla o el servidor responde con error
   *
   * @example
   * const products = await apiClient.get<Product[]>("/products");
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Credenciales removidas para evitar errores CORS
      // No son necesarias para APIs públicas sin autenticación
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Realiza una petición POST al backend
   *
   * @template T - Tipo de dato esperado en la respuesta
   * @param {string} endpoint - Ruta del endpoint (ej: "/orders", "/payment/process")
   * @param {unknown} data - Datos a enviar en el cuerpo de la petición
   * @returns {Promise<T>} Promesa con los datos de la respuesta
   * @throws {Error} Si la petición falla o el servidor responde con error
   *
   * @example
   * const order = await apiClient.post<Order>("/orders", orderData);
   */
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Credenciales removidas para evitar errores CORS
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Intentar extraer mensaje de error del backend
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    return response.json();
  },
};

export default apiClient;
