import { apiClient } from "./client";

export interface OrderItem {
  product_id: number;
  quantity: number;
  special_instructions?: string;
}

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

export async function createOrder(data: CreateOrderData): Promise<Order> {
  return apiClient.post<Order>("/orders", data);
}

export async function getOrders(): Promise<Order[]> {
  return apiClient.get<Order[]>("/orders");
}

export async function getOrder(id: number): Promise<Order> {
  return apiClient.get<Order>(`/orders/${id}`);
}
