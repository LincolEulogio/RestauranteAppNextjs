/**
 * Módulo de Pedidos - API de Órdenes
 *
 * Este archivo define las interfaces y funciones para gestionar pedidos (órdenes).
 * Permite crear nuevos pedidos, obtener listados y consultar pedidos específicos.
 *
 * Tipos de pedidos soportados:
 * - delivery: Entrega a domicilio
 * - pickup: Recoger en tienda
 * - dine-in: Consumo en restaurante
 * - online: Pedido web
 */

import { apiClient } from "./client";

/**
 * Interfaz OrderItem
 *
 * Define un item (producto) dentro de un pedido.
 *
 * @property {number} product_id - ID del producto a ordenar
 * @property {number} quantity - Cantidad de unidades del producto
 * @property {string} [special_instructions] - Instrucciones especiales opcionales (ej: "sin cebolla")
 */
export interface OrderItem {
  product_id: number;
  quantity: number;
  special_instructions?: string;
}

/**
 * Interfaz CreateOrderData
 *
 * Define los datos necesarios para crear un nuevo pedido.
 *
 * @property {string} customer_name - Nombre del cliente (requerido)
 * @property {string} [customer_lastname] - Apellido del cliente (opcional)
 * @property {string} [customer_dni] - DNI/documento del cliente (opcional)
 * @property {string} [customer_email] - Email del cliente (opcional)
 * @property {string} customer_phone - Teléfono del cliente (requerido)
 * @property {string} [delivery_address] - Dirección de entrega (requerido solo para delivery)
 * @property {string} order_type - Tipo de pedido: "delivery" | "pickup" | "dine-in" | "online"
 * @property {string} [payment_method] - Método de pago: "card" | "yape" | "plin" | "cash"
 * @property {OrderItem[]} items - Array de productos a ordenar (requerido)
 * @property {string} [notes] - Notas adicionales del pedido (opcional)
 */
export interface CreateOrderData {
  customer_name: string;
  customer_lastname?: string;
  customer_dni?: string;
  customer_email?: string;
  customer_phone: string;
  delivery_address?: string;
  order_type: "delivery" | "pickup" | "dine-in" | "online";
  payment_method?: "card" | "yape" | "plin" | "cash";
  items: OrderItem[];
  notes?: string;
}

/**
 * Interfaz Order
 *
 * Define la estructura completa de un pedido obtenido del backend.
 *
 * @property {number} id - ID único del pedido
 * @property {string} order_number - Número de orden legible (ej: "ORD-001")
 * @property {string} customer_name - Nombre del cliente
 * @property {string} [customer_email] - Email del cliente
 * @property {string} customer_phone - Teléfono del cliente
 * @property {string} [delivery_address] - Dirección de entrega
 * @property {string} order_type - Tipo de pedido
 * @property {string} status - Estado del pedido (pending, preparing, ready, delivered, etc.)
 * @property {number} subtotal - Subtotal del pedido
 * @property {number} tax - Impuestos aplicados
 * @property {number} delivery_fee - Costo de envío
 * @property {number} total - Total final a pagar
 * @property {string} [notes] - Notas del pedido
 * @property {string} created_at - Fecha de creación en formato ISO
 * @property {Array} items - Array de items del pedido con detalles
 */
export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  delivery_address?: string;
  order_type: string;
  status: string;
  subtotal: number;
  tax: number;
  delivery_fee: number;
  total: number;
  notes?: string;
  created_at: string;
  items: {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    special_instructions?: string;
  }[];
}

/**
 * Crea un nuevo pedido en el backend
 *
 * Envía los datos del pedido al servidor para su procesamiento.
 * El backend validará los datos, calculará totales y creará el pedido.
 *
 * @param {CreateOrderData} data - Datos del pedido a crear
 * @returns {Promise<Order>} Promesa con el pedido creado
 * @throws {Error} Si hay error en la validación o creación del pedido
 *
 * @example
 * const orderData = {
 *   customer_name: "Juan Pérez",
 *   customer_phone: "987654321",
 *   order_type: "delivery",
 *   delivery_address: "Av. Principal 123",
 *   payment_method: "card",
 *   items: [{ product_id: 1, quantity: 2 }]
 * };
 * const order = await createOrder(orderData);
 */
export async function createOrder(data: CreateOrderData): Promise<Order> {
  return apiClient.post<Order>("/orders", data);
}

/**
 * Obtiene la lista de todos los pedidos
 *
 * @returns {Promise<Order[]>} Promesa con array de pedidos
 * @throws {Error} Si hay error al obtener los pedidos
 */
export async function getOrders(): Promise<Order[]> {
  return apiClient.get<Order[]>("/orders");
}

/**
 * Obtiene un pedido específico por su ID
 *
 * @param {number} id - ID del pedido a consultar
 * @returns {Promise<Order>} Promesa con los datos del pedido
 * @throws {Error} Si el pedido no existe o hay error en la petición
 *
 * @example
 * const order = await getOrder(123);
 * console.log(order.order_number); // "ORD-123"
 */
export async function getOrder(id: number): Promise<Order> {
  return apiClient.get<Order>(`/orders/${id}`);
}
