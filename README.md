# 🍽️ Restaurant App - Next.js 15

> Aplicación web moderna de restaurante con sistema de pedidos, reservas, blog y más.

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.0-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Características

- 🛒 **Sistema de Carrito**: Añadir, remover y gestionar productos
- 📅 **Sistema de Reservas**: Reservar mesas con horarios disponibles
- 📝 **Blog**: Sistema completo con categorías y posts
- 🌓 **Dark Mode**: Tema claro/oscuro con persistencia
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🎨 **Animaciones**: Transiciones suaves con Framer Motion
- 🔍 **Búsqueda**: Filtros por categoría y búsqueda de platos
- 💳 **Checkout**: Proceso de compra con múltiples métodos de pago
- 📧 **Contacto**: Formulario de contacto con validación
- ⚡ **Performance**: Optimizado para velocidad y SEO

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18.17 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/LincolEulogio/RestauranteAppNextjs.git

# Navegar al directorio
cd RestaurantApp

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📦 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Verificar código
npm run type-check   # Verificar tipos TypeScript
npm run format       # Formatear código
npm run clean        # Limpiar cache
```

## 📁 Estructura del Proyecto

```
RestaurantApp/
├── app/              # Next.js App Router
├── components/       # Componentes React
│   ├── cart/        # Componentes del carrito
│   ├── home/        # Componentes del home
│   ├── layout/      # Header, Footer, etc
│   ├── menu/        # Componentes del menú
│   └── ui/          # Componentes UI genéricos
├── lib/             # Lógica de negocio
│   ├── constants/   # Constantes (menú, blog, etc)
│   ├── types/       # TypeScript types
│   ├── config/      # Configuración
│   ├── helpers/     # Funciones helper
│   └── hooks/       # Custom React hooks
├── store/           # Zustand stores
├── providers/       # Context providers
└── public/          # Archivos estáticos
```

Ver [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) para más detalles.

## 🛠️ Tecnologías

### Core

- **Next.js 15.1.6** - Framework React
- **React 19.2.1** - Biblioteca UI
- **TypeScript 5.9.3** - Tipado estático
- **Tailwind CSS 4.0.0** - Estilos utility-first

### UI & Animaciones

- **shadcn/ui** - Componentes accesibles
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos
- **next-themes** - Tema claro/oscuro

### Estado & Data

- **Zustand 5.0.9** - Estado global
- **TanStack Query** - Data fetching

### Utilidades

- **SweetAlert2** - Notificaciones
- **clsx** - Utilidad para classNames

## 📚 Documentación

- [🏗️ Estructura del Proyecto](./PROJECT_STRUCTURE.md)
- [📖 API Documentation](./API_DOCS.md)
- [🔧 Guía de Mantenimiento](./MAINTENANCE.md)

## 🎯 Características Principales

### Sistema de Menú

- Categorías dinámicas
- Filtrado y búsqueda
- Calificaciones y reseñas
- Imágenes optimizadas

### Carrito de Compras

- Añadir/remover productos
- Actualizar cantidades
- Calcular totales
- Persistencia con localStorage

### Sistema de Reservas

- Selección de fecha y hora
- Disponibilidad en tiempo real
- Formulario de datos
- Confirmación de reserva

### Blog

- Posts con categorías
- Búsqueda y filtros
- Posts destacados
- Páginas individuales

### Dark Mode

- Cambio automático
- Persistencia de preferencia
- Transiciones suaves
- Optimizado para ambos modos

## 🎨 Paleta de Colores

```css
/* Light Mode */
--primary: hsl(24.6 95% 53.1%)
--background: hsl(0 0% 100%)
--foreground: hsl(20 14.3% 4.1%)

/* Dark Mode */
--primary: hsl(20.5 90.2% 48.2%)
--background: hsl(20 14.3% 4.1%)
--foreground: hsl(60 9.1% 97.8%)
```

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile L */
md: 768px   /* Tablet */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large Desktop */
```

## 🔐 Variables de Entorno

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Agregar más según necesidad
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
vercel
```

### Build manual

```bash
npm run build
npm run start
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Roadmap

- [ ] Sistema de autenticación
- [ ] Panel de administración
- [ ] Integración con pasarelas de pago
- [ ] Sistema de cupones y descuentos
- [ ] Notificaciones push
- [ ] App móvil (React Native)
- [ ] Multi-idioma (i18n)
- [ ] Tests automatizados

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 👨‍💻 Autor

**Lincoln Eulogio**

- GitHub: [@LincolEulogio](https://github.com/LincolEulogio)
- Repositorio: [RestauranteAppNextjs](https://github.com/LincolEulogio/RestauranteAppNextjs)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
