/**
 * Waiter API Client with Sanctum Auth
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const waiterClient = {
  async get<T>(endpoint: string, token: string): Promise<T> {
    const response = await fetch(`${API_URL}/api/waiter${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },

  async post<T>(endpoint: string, data: unknown, token: string): Promise<T> {
    const response = await fetch(`${API_URL}/api/waiter${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    return response.json();
  },

  // Login separate as it's not under /api/waiter usually, or maybe it is standard login
  async login(credentials: unknown): Promise<{ token: string; user: any }> {
    // We'll use the standard Laravel Sanctum login
    // First get cookie if needed (CSRF) but for API token usually just /api/login endpoint
    // I'll assume standard Laravel /api/login endpoint exists or I need to create it.
    // The plan didn't specify creating a login endpoint, but Sanctum usually provides one or I need to make one.
    // I'll check routes/api.php again. IF not there, I need to add it.

    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Login Failed`);
    }

    return response.json();
  },
};
