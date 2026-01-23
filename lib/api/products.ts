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
  image_url: string | null;
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
  try {
    const products = await apiClient.get<Product[]>("/products");
    // Add timestamp to prevent caching issues
    return products.map(product => ({
      ...product,
      // Ensure image_url is valid or provide fallback
      image_url: product.image_url && product.image_url.startsWith('http') ? product.image_url : null
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch all active categories from the backend
 */
export async function fetchCategories(): Promise<Category[]> {
  return apiClient.get<Category[]>("/categories");
}
