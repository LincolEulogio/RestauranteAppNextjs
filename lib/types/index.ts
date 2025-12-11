// Types para el sistema de restaurante

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface ContactInfo {
  icon: any;
  title: string;
  content: string;
  subtitle: string;
  color: string;
}

export interface SocialMedia {
  icon: any;
  name: string;
  link: string;
  color: string;
}

export interface TimeSlot {
  time: string;
  available: "high" | "medium" | "low";
  spots: number;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  preferences: string;
  tableType: string;
  notes: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  platform: string;
  date: string;
  verified: boolean;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  span: string;
}

export interface ValueCard {
  icon: any;
  title: string;
  description: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  badge: string;
  color: string;
}
