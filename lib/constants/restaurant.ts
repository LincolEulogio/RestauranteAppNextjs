import {
  TimeSlot,
  Promotion,
  Testimonial,
  GalleryImage,
  ValueCard,
} from "@/lib/types";
import { Heart, Award, Users, Sparkles, Camera, ChefHat } from "lucide-react";

export const RESTAURANT_INFO = {
  name: "Sabor Restaurant",
  address: "Av. Larco 123, Miraflores",
  city: "Lima, Perú",
  phone: "+51 987 654 321",
  email: "contacto@sabor.pe",
  emailInfo: "info@sabor.pe",
  hours: "11:00 AM - 11:00 PM",
  hoursDetail: "Lun - Dom: 11:00 AM - 11:00 PM",
  yearsExperience: "15+",
  deliveryRadius: "5km",
};

export const TIME_SLOTS: TimeSlot[] = [
  { time: "11:00 AM", available: "high", spots: 12 },
  { time: "11:30 AM", available: "high", spots: 10 },
  { time: "12:00 PM", available: "medium", spots: 5 },
  { time: "12:30 PM", available: "medium", spots: 4 },
  { time: "01:00 PM", available: "low", spots: 2 },
  { time: "01:30 PM", available: "low", spots: 1 },
  { time: "02:00 PM", available: "medium", spots: 6 },
  { time: "06:00 PM", available: "high", spots: 15 },
  { time: "06:30 PM", available: "high", spots: 12 },
  { time: "07:00 PM", available: "medium", spots: 7 },
  { time: "07:30 PM", available: "low", spots: 3 },
  { time: "08:00 PM", available: "medium", spots: 8 },
  { time: "08:30 PM", available: "high", spots: 10 },
  { time: "09:00 PM", available: "high", spots: 14 },
  { time: "09:30 PM", available: "medium", spots: 6 },
  { time: "10:00 PM", available: "medium", spots: 5 },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 1,
    title: "2x1 en Pizzas",
    description: "Todos los martes y jueves en pizzas familiares",
    discount: "50%",
    validUntil: "30 Dic 2025",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    badge: "Popular",
    color: "orange",
  },
  {
    id: 2,
    title: "Combo Familiar",
    description: "4 platos principales + 2 postres + bebidas",
    discount: "30%",
    validUntil: "31 Dic 2025",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
    badge: "Nuevo",
    color: "green",
  },
  {
    id: 3,
    title: "Happy Hour",
    description: "De 3pm a 6pm en bebidas y entradas",
    discount: "40%",
    validUntil: "Diario",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80",
    badge: "Limitado",
    color: "blue",
  },
];

export const VALUES: ValueCard[] = [
  {
    icon: Heart,
    title: "Pasión Culinaria",
    description:
      "Cada plato es preparado con amor y dedicación por nuestro equipo de chefs experimentados",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description:
      "Ingredientes frescos y de primera calidad, seleccionados cuidadosamente cada día",
  },
  {
    icon: Users,
    title: "Experiencia Única",
    description:
      "Creamos momentos memorables para cada uno de nuestros comensales",
  },
  {
    icon: Sparkles,
    title: "Innovación",
    description:
      "Fusionamos tradición con creatividad para sorprender tu paladar",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    role: "Cliente Frecuente",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    rating: 5,
    text: "La mejor experiencia gastronómica que he tenido. Los sabores son increíbles y el servicio es excepcional. ¡Volvería una y otra vez!",
    platform: "Google Reviews",
    date: "Hace 2 semanas",
    verified: true,
  },
  {
    id: 2,
    name: "Carlos Ramírez",
    role: "Cliente VIP",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    rating: 5,
    text: "Vengo aquí cada viernes con mi familia. La calidad nunca decepciona y el ambiente es perfecto para compartir momentos especiales.",
    platform: "Facebook Reviews",
    date: "Hace 1 mes",
    verified: true,
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Cliente Satisfecha",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    rating: 5,
    text: "Ingredientes frescos, presentación impecable y un servicio de primera. Sin duda el mejor restaurante de la zona. ¡100% recomendado!",
    platform: "Google Reviews",
    date: "Hace 3 días",
    verified: true,
  },
  {
    id: 4,
    name: "Luis Fernández",
    role: "Cliente Regular",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    rating: 5,
    text: "El equipo siempre atento y la comida deliciosa. Las promociones son geniales y la relación calidad-precio es excelente.",
    platform: "Facebook Reviews",
    date: "Hace 1 semana",
    verified: true,
  },
  {
    id: 5,
    name: "Patricia Silva",
    role: "Cliente Nueva",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    rating: 5,
    text: "Primera vez que vengo y quedé encantada. Todo estaba perfecto, desde la entrada hasta el postre. Ya recomendé a mis amigos.",
    platform: "Google Reviews",
    date: "Hace 5 días",
    verified: true,
  },
  {
    id: 6,
    name: "Roberto Torres",
    role: "Cliente Frecuente",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    rating: 5,
    text: "Llevo años viniendo y la calidad siempre es consistente. El chef sabe lo que hace. Mi familia y yo somos fans incondicionales.",
    platform: "Facebook Reviews",
    date: "Hace 2 semanas",
    verified: true,
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    alt: "Salón principal del restaurante",
    title: "Salón Principal",
    description: "Ambiente acogedor y elegante",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    alt: "Terraza al aire libre",
    title: "Terraza",
    description: "Disfruta al aire libre",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    alt: "Cocina profesional",
    title: "Nuestra Cocina",
    description: "Tecnología de primera",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Mesas elegantes",
    title: "Mesas Preparadas",
    description: "Cada detalle cuenta",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
    alt: "Chef preparando platillos",
    title: "Chef en Acción",
    description: "Pasión en cada plato",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    alt: "Personal del restaurante",
    title: "Nuestro Equipo",
    description: "Servicio con sonrisas",
    span: "col-span-2 row-span-1",
  },
];

export const GALLERY_HIGHLIGHTS = [
  {
    icon: Heart,
    label: "Ambiente Cálido",
    color: "text-red-500",
  },
  {
    icon: Users,
    label: "Para Todos",
    color: "text-blue-500",
  },
  {
    icon: ChefHat,
    label: "Cocina Abierta",
    color: "text-orange-500",
  },
  {
    icon: Sparkles,
    label: "Experiencia Única",
    color: "text-purple-500",
  },
];

export const STATS = [
  { label: "Reseñas Positivas", value: "2,500+", icon: "ThumbsUp" },
  { label: "Calificación Promedio", value: "4.9/5.0", icon: "Star" },
  { label: "Clientes Satisfechos", value: "15,000+", icon: "Quote" },
];
