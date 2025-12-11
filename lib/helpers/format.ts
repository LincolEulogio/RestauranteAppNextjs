// Helper functions for formatting and utilities

export const formatCurrency = (amount: number): string => {
  return `S/. ${amount.toFixed(2)}`;
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("es-PE", options);
};

export const formatTime = (time: string): string => {
  return time;
};

export const calculateTotal = (
  items: { price: number; quantity: number }[]
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateSubtotal = (price: number, quantity: number): number => {
  return price * quantity;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 9;
};

export const getAvailabilityColor = (availability: string): string => {
  switch (availability) {
    case "high":
      return "bg-green-500 text-green-500 border-green-500";
    case "medium":
      return "bg-yellow-500 text-yellow-500 border-yellow-500";
    case "low":
      return "bg-red-500 text-red-500 border-red-500";
    default:
      return "bg-muted text-muted-foreground border-muted";
  }
};

export const getAvailabilityText = (availability: string): string => {
  switch (availability) {
    case "high":
      return "Alta disponibilidad";
    case "medium":
      return "Disponibilidad media";
    case "low":
      return "Pocas mesas disponibles";
    default:
      return "No disponible";
  }
};

export const generateReservationCode = (): string => {
  return `#RSV${Math.floor(Math.random() * 10000)}`;
};
