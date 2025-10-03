# Conexión a Supabase - MisPapes

Este documento explica cómo usar la conexión a Supabase en la aplicación MisPapes.

## 📁 Archivos Creados

### Configuración
- **`.env`** - Variables de entorno con credenciales de Supabase
- **`.env.example`** - Plantilla de variables de entorno
- **`src/lib/supabase.ts`** - Cliente de Supabase configurado

### Tipos TypeScript
- **`src/types/supabase.ts`** - Tipos generados para la base de datos

### Hooks Personalizados
- **`src/hooks/useProducts.ts`** - Hooks para obtener productos:
  - `useProducts()` - Obtiene todos los productos
  - `useProductById(id)` - Obtiene un producto por ID
  - `useFeaturedProducts()` - Obtiene productos destacados
  - `useProductsOnSale()` - Obtiene productos en oferta

### Servicios
- **`src/services/productService.ts`** - Funciones para interactuar con productos:
  - `getProducts(filters?)` - Obtiene productos con filtros opcionales
  - `getProductById(id)` - Obtiene un producto por ID
  - `getFeaturedProducts()` - Obtiene productos destacados
  - `getProductsOnSale()` - Obtiene productos en oferta
  - `searchProducts(searchTerm)` - Busca productos por nombre o descripción

## 🚀 Uso

### Opción 1: Usando Hooks (Recomendado para componentes)

```typescript
import { useProducts } from "../hooks/useProducts";

function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Opción 2: Usando Servicios (Para funciones async)

```typescript
import { getProducts, searchProducts } from "../services/productService";

async function loadProducts() {
  const { data, error } = await getProducts({
    gender: "hombre",
    season: "invierno",
    oferta: true
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}
```

## 🔍 Ejemplos de Filtros

```typescript
// Productos de hombre en invierno
const { data } = await getProducts({
  gender: "hombre",
  season: "invierno"
});

// Productos en oferta entre 20€ y 40€
const { data } = await getProducts({
  oferta: true,
  minPrice: 20,
  maxPrice: 40
});

// Buscar productos por nombre
const { data } = await searchProducts("zapatillas");
```

## 📊 Estructura de la Base de Datos

### Tabla: `products`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | number | ID único del producto |
| `name` | string | Nombre del producto |
| `description` | string | Descripción del producto |
| `price` | number | Precio del producto |
| `images` | string[] | Array de URLs de imágenes |
| `season` | "invierno" \| "verano" | Temporada |
| `sizes` | number[] | Tallas disponibles |
| `featured` | boolean | Producto destacado |
| `gender` | "hombre" \| "mujer" \| "unisex" | Género |
| `oferta` | boolean | En oferta |
| `discount` | number \| null | Porcentaje de descuento |
| `model` | 100 \| 142 \| 77 \| 110 | Modelo |
| `characteristics` | string[] | Características del producto |
| `created_at` | string | Fecha de creación |
| `updated_at` | string | Fecha de actualización |

## 🔐 Variables de Entorno

Las credenciales de Supabase están en el archivo `.env`:

```env
VITE_SUPABASE_URL=https://qvpvomifvcspeyeytvou.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**⚠️ IMPORTANTE:** El archivo `.env` está en `.gitignore` y no se subirá al repositorio.

## 🔄 Migración de Datos Locales a Supabase

Para cambiar de usar datos locales (`data/products.ts`) a Supabase:

### Antes (datos locales):
```typescript
import { products } from "../data/products";

function ProductList() {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Después (Supabase):
```typescript
import { useProducts } from "../hooks/useProducts";

function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## 📝 Notas

- Los 31 productos del archivo `data/products.ts` ya están migrados a Supabase
- Los tipos de TypeScript son compatibles entre ambas fuentes de datos
- Puedes seguir usando el archivo local como respaldo si lo necesitas
- La conexión a Supabase no requiere autenticación para lectura (anon key)

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias (ya instalado)
bun add @supabase/supabase-js

# Ejecutar en desarrollo
bun run dev

# Verificar errores de lint
bun run lint
```
