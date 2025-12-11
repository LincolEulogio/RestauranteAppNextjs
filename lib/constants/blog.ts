import { BlogPost, BlogCategory } from "@/lib/types";

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "all", name: "Todos", slug: "todos", icon: "LayoutGrid" },
  {
    id: "plato-del-mes",
    name: "Plato del Mes",
    slug: "plato-del-mes",
    icon: "Award",
  },
  { id: "eventos", name: "Eventos", slug: "eventos", icon: "Calendar" },
  { id: "promociones", name: "Promociones", slug: "promociones", icon: "Tag" },
  { id: "noticias", name: "Noticias", slug: "noticias", icon: "Newspaper" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "nuevo-plato-salmon-teriyaki",
    title: "Nuevo Plato: Salmón Teriyaki con Vegetales Asiáticos",
    excerpt:
      "Descubre nuestro nuevo plato estrella que combina la frescura del salmón con los sabores únicos de la cocina asiática.",
    content: `
# Salmón Teriyaki: Una Fusión de Sabores

Estamos emocionados de presentar nuestro nuevo plato estrella: **Salmón Teriyaki con Vegetales Asiáticos**. 

## Ingredientes Selectos

- Salmón fresco del Atlántico
- Salsa teriyaki artesanal
- Vegetales de temporada
- Arroz jazmín aromático

## La Experiencia

Nuestro chef ha perfeccionado esta receta durante meses, combinando técnicas tradicionales japonesas con un toque contemporáneo que resalta los sabores naturales del salmón.

### Disponibilidad

Disponible de lunes a domingo en horario de almuerzo y cena. ¡No te lo pierdas!
    `,
    author: "Chef Carlos Rodríguez",
    date: "2025-12-01",
    category: "plato-del-mes",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80",
    tags: ["salmón", "teriyaki", "fusión", "nuevo"],
    readTime: "4 min",
    featured: true,
  },
  {
    slug: "festival-gastronomico-diciembre",
    title: "Festival Gastronómico de Fin de Año",
    excerpt:
      "Celebra con nosotros el Festival Gastronómico más esperado del año con platillos exclusivos y música en vivo.",
    content: `
# Festival Gastronómico de Fin de Año

## Del 15 al 31 de Diciembre

Únete a nuestra celebración anual con un menú especial diseñado para estas fechas festivas.

### Eventos Especiales

- **Viernes 22**: Noche de Jazz en vivo
- **Sábado 23**: Cena de Gala
- **Domingo 24**: Brunch Navideño
- **Domingo 31**: Cena de Fin de Año

### Reservas

Las reservas están abiertas. Cupos limitados para las fechas especiales.
    `,
    author: "María García",
    date: "2025-11-28",
    category: "eventos",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    tags: ["festival", "fin de año", "eventos", "música"],
    readTime: "3 min",
    featured: true,
  },
  {
    slug: "promocion-2x1-pizzas",
    title: "Promoción 2x1 en Pizzas todos los Martes",
    excerpt:
      "¡Los martes son de pizza! Aprovecha nuestra increíble promoción 2x1 en todas nuestras pizzas artesanales.",
    content: `
# 2x1 en Pizzas - ¡Todos los Martes!

## La Promoción Más Esperada

Cada martes, disfruta de nuestras pizzas artesanales con masa madre preparada diariamente.

### Pizzas Incluidas

- Margherita Clásica
- Pepperoni Suprema
- Vegetariana Deluxe
- Cuatro Quesos
- BBQ Chicken

### Condiciones

- Válido solo los martes
- Para consumo en local y delivery
- No aplica con otras promociones
- Segunda pizza de igual o menor valor

¡Reserva tu mesa!
    `,
    author: "Ana Martínez",
    date: "2025-11-25",
    category: "promociones",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
    tags: ["promoción", "pizza", "2x1", "martes"],
    readTime: "2 min",
    featured: false,
  },
  {
    slug: "menu-vegano-ampliado",
    title: "Ampliamos Nuestro Menú Vegano",
    excerpt:
      "Nuevas opciones plant-based llegan a nuestro menú con sabores innovadores y nutritivos.",
    content: `
# Menú Vegano Renovado

## Compromiso con la Diversidad Culinaria

Hemos ampliado nuestra oferta vegana con 8 nuevos platillos que sorprenderán tu paladar.

### Nuevos Platillos

1. **Bowl Buddha**: Quinoa, vegetales asados y tahini
2. **Curry Verde**: Con leche de coco y tofu
3. **Hamburguesa Beyond**: Con papas rústicas
4. **Tacos de Jackfruit**: Con guacamole casero

### Ingredientes

Todos nuestros ingredientes son frescos, orgánicos cuando es posible, y preparados con técnicas que resaltan su sabor natural.
    `,
    author: "Chef Laura Vega",
    date: "2025-11-20",
    category: "noticias",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
    tags: ["vegano", "plant-based", "saludable", "nuevo"],
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "taller-cocina-italiana",
    title: "Taller de Cocina Italiana - Inscripciones Abiertas",
    excerpt:
      "Aprende a preparar auténtica pasta italiana de la mano de nuestro chef especializado.",
    content: `
# Taller de Cocina Italiana

## Aprende con los Expertos

**Fecha**: Sábado 16 de Diciembre  
**Horario**: 10:00 AM - 2:00 PM  
**Cupo**: 12 personas

### Qué Aprenderás

- Preparación de masa fresca
- Técnicas de relleno
- Salsas clásicas italianas
- Presentación profesional

### Incluye

- Todos los ingredientes
- Recetario digital
- Certificado de participación
- Almuerzo incluido

**Inversión**: S/. 180 por persona
    `,
    author: "Chef Marco Antonelli",
    date: "2025-11-15",
    category: "eventos",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80",
    tags: ["taller", "cocina", "italiana", "pasta"],
    readTime: "3 min",
    featured: false,
  },
  {
    slug: "happy-hour-extendido",
    title: "Happy Hour Extendido - De 3pm a 7pm",
    excerpt:
      "Extendimos nuestro Happy Hour para que disfrutes más tiempo de nuestras mejores promociones en bebidas y entradas.",
    content: `
# Happy Hour Extendido

## ¡Ahora con Más Tiempo!

De lunes a viernes, de **3:00 PM a 7:00 PM**

### Promociones

- 40% descuento en cócteles selectos
- 2x1 en cervezas artesanales
- Entradas a mitad de precio
- Tabla de quesos al 30% off

### Ambiente

Disfruta de música en vivo los jueves y viernes, y aprovecha nuestro espacio al aire libre.

**Términos**: No acumulable con otras promociones. Válido de lunes a viernes.
    `,
    author: "Roberto Silva",
    date: "2025-11-10",
    category: "promociones",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=80",
    tags: ["happy hour", "bebidas", "promoción", "cócteles"],
    readTime: "2 min",
    featured: true,
  },
];
