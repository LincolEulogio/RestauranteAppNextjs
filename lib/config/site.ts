// Site-wide configuration

export const SITE_CONFIG = {
  name: "Sabor Restaurant",
  description:
    "Restaurante de cocina fusión con ingredientes frescos y de calidad",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    facebook: "https://facebook.com/saborrestaurant",
    instagram: "https://instagram.com/saborrestaurant",
    twitter: "https://twitter.com/saborrestaurant",
  },
};

export const NAVIGATION_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Menú", href: "/menu" },
  { name: "Blog", href: "/blog" },
  { name: "Reservas", href: "/reservas" },
  { name: "Contacto", href: "/contacto" },
];

export const PAYMENT_METHODS = {
  delivery: {
    label: "Pago Contra Entrega",
    description: "Efectivo o Tarjeta",
    icon: "Bike",
    color: "blue",
  },
  card: {
    label: "Tarjeta de Crédito/Débito",
    description: "Visa, Mastercard",
    icon: "CreditCard",
    color: "blue",
  },
  online: {
    label: "Transferencia Bancaria",
    description: "BCP, Interbank",
    icon: "Building",
    color: "green",
  },
  yape: {
    label: "Yape",
    description: "Pago instantáneo",
    icon: "Smartphone",
    color: "purple",
  },
  plin: {
    label: "Plin",
    description: "Pago rápido",
    icon: "Zap",
    color: "cyan",
  },
};

export const DELIVERY_TIMES = [
  { value: "30-40", label: "30-40 min", popular: false },
  { value: "45-60", label: "45-60 min", popular: true },
  { value: "60-90", label: "60-90 min", popular: false },
];
