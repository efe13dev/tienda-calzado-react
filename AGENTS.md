# AGENTS.md

## Project Overview

**MisPapes** es una tienda online de calzado para estar en casa especializada en zapatillas, pantuflas y calzado cómodo para uso doméstico. Es una aplicación e-commerce moderna desarrollada con React 19, TypeScript y Tailwind CSS.

### Características Principales
- Catálogo de 31 productos con filtrado por género (hombre/mujer/unisex) y temporada (verano/invierno)
- Sistema de carrito de compras funcional con persistencia en localStorage
- Gestión de ofertas y descuentos con cálculo automático de precios
- Soporte para español e inglés con sistema de traducción completo
- Diseño responsive y moderno con enfoque mobile-first
- SEO optimizado con metaetiquetas dinámicas
- Envío gratis para pedidos superiores a 50€

### Arquitectura
- **Frontend**: React 19 con TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Enrutamiento**: React Router Dom
- **Gestión de Estado**: Context API con useReducer
- **Iconos**: Lucide React
- **SEO**: React Helmet Async
- **Gestión de Paquetes**: Bun

## Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Run ESLint with auto-fix
- `bun run preview` - Preview production build
- No test framework configured - add testing setup if needed

## Code Style

- Use TypeScript with React functional components and hooks
- Import React explicitly in .tsx files
- ESLint: 100 char width, double quotes, trailing commas, 2-space tabs
- Use Tailwind CSS with primary (blue) and secondary (yellow) color palette
- Component names in PascalCase, files in PascalCase.tsx
- Use Context API with useReducer for state management (CartContext, LanguageContext)
- Import order: type, builtin, external, internal, parent, sibling, index
- Use Lucide React icons for all iconography
- Structure: components/, pages/, contexts/, data/ directories
- Use React Router with Spanish route names (/productos, /carrito, /contacto, /ofertas)
- Light mode only, mobile-first responsive design
- Error handling: try-catch for async operations, console.error for logging
- Types: define interfaces for props, use TypeScript generics
- Custom hooks: use prefix (useCart, useLanguage)
- Line padding: between statements, returns, exports, and variable declarations

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables (Header, Footer, ProductCard, etc.)
├── contexts/        # Contextos para estado global (CartContext, LanguageContext)
├── data/           # Datos estáticos (products.ts, translations.ts)
├── pages/          # Páginas de la aplicación (Home, Products, Cart, etc.)
└── assets/         # Recursos estáticos (imágenes, iconos)
```

## Páginas Disponibles

1. **Inicio** (`/`) - Hero section con productos destacados
2. **Productos** (`/productos`) - Catálogo completo con filtros por género y temporada
3. **Detalle de Producto** (`/producto/:id`) - Vista individual con galería de imágenes
4. **Ofertas** (`/ofertas`) - Productos con descuentos especiales
5. **Carrito** (`/carrito`) - Gestión del carrito de compras
6. **Contacto** (`/contacto`) - Formulario de contacto e información de la tienda

## Estado Actual del Proyecto

### Funcionalidades Implementadas
- ✅ Galería de imágenes en vista de producto
- ✅ Logo junto al título de la tienda
- ✅ Estilos del título en vistas mobile
- ✅ Animación al pulsar el título de la tienda
- ✅ Sistema de carrito funcional
- ✅ Internacionalización (español/inglés)
- ✅ Filtros de productos
- ✅ Sistema de ofertas

### Funcionalidades Pendientes
- ❌ Completar traducciones faltantes
- ⚠️ Mejorar funcionalidad de añadir producto al carrito (parcialmente implementada)

## Datos del Catálogo

- **Total de productos**: 31
- **Categorías**: Hombre (20 productos), Mujer (11 productos)
- **Temporadas**: Verano, Invierno
- **Rango de tallas**: 36-45
- **Rango de precios**: €14.99 - €54.99
- **Productos en oferta**: 15 productos con descuentos del 15-30%

## Contextos de Estado

### CartContext
- Gestión del carrito de compras
- Persistencia en localStorage
- Operaciones: addItem, removeItem, updateQuantity, clearCart
- Cálculo automático de totales y descuentos

### LanguageContext
- Gestión de idioma (español/inglés)
- Persistencia en localStorage
- Sistema de traducciones completo
- Toggle de idioma con componente dedicado

## Consideraciones de Desarrollo

- El proyecto utiliza **Bun** como gestor de paquetes
- Configuración de ESLint con Prettier para formato consistente
- Optimización SEO con metaetiquetas dinámicas por página
- Diseño enfocado en la comodidad y el hogar
- Marca posicionada como "Fabricado en España 100%"
