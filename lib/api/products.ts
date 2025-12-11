import { apiClient } from "./client";

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
  image: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

/**
 * Fetch all available products from the backend
 */
export async function fetchProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>("/products");
}

/**
 * Fetch all active categories from the backend
 */
export async function fetchCategories(): Promise<Category[]> {
  return apiClient.get<Category[]>("/categories");
}
