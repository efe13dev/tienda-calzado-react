import { Loader2 } from "lucide-react";

import { useProducts } from "../hooks/useProducts";

/**
 * Componente de ejemplo que muestra cómo usar productos desde Supabase
 * Este componente puede reemplazar cualquier lista de productos que use datos locales
 */
export function ProductListSupabase() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg">Cargando productos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h3 className="font-semibold text-red-800">Error al cargar productos</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <img src={product.images[0]} alt={product.name} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{product.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">
                {product.oferta && product.discount ? (
                  <>
                    <span className="mr-2 text-sm text-gray-500 line-through">
                      €{product.price.toFixed(2)}
                    </span>
                    <span>€{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                  </>
                ) : (
                  <>€{product.price.toFixed(2)}</>
                )}
              </span>
              {product.oferta && product.discount && (
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {product.gender}
              </span>
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {product.season}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
