const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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

export async function createCulqiOrder(orderId: number) {
  const response = await fetch(`${API_URL}/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_id: orderId }),
  });
  return response.json();
}
