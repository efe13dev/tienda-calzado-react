const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Skeleton imagen */}
      <div className="relative h-64 w-full animate-pulse bg-gray-200">
        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      </div>

      {/* Skeleton contenido */}
      <div className="flex flex-grow flex-col p-4">
        {/* Skeleton título */}
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>

        {/* Skeleton descripción */}
        <div className="mb-3 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Skeleton precio */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-20 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
          </div>

          {/* Skeleton botón */}
          <div className="h-8 w-20 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
