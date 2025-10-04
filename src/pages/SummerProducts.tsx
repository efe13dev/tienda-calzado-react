import { Sun } from "lucide-react";
import { useEffect } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard.tsx";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import SEOHybrid from "../components/SEOHybrid";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/useLanguage";
import { useSummerProducts } from "../hooks/useProducts";

const SummerProducts = () => {
  const { state } = useCart();
  const { language } = useLanguage();
  const { products: summerProducts, loading, error } = useSummerProducts();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHybrid
        title="Productos de Verano | MisPapes Tienda de Calzado"
        description="Descubre nuestra colección de calzado de verano. Sandalias, zapatillas ligeras y calzado fresco para disfrutar de la temporada con comodidad."
        keywords="calzado verano, sandalias verano, zapatillas ligeras, calzado fresco, calzado ventilado, MisPapes verano"
        canonicalUrl="https://mispapes.com/verano"
        ogImage="https://mispapes.com/og-summer.jpg"
      />
      <Header cartCount={state.totalItems} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Sun className="h-8 w-8 text-yellow-500" />
              <h1 className="text-4xl font-bold text-gray-900">
                {language === "es" ? "Colección de Verano" : "Summer Collection"}
              </h1>
              <Sun className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {language === "es"
                ? "Mantén tus pies frescos y cómodos con nuestra selección de calzado ideal para los días calurosos"
                : "Keep your feet fresh and comfortable with our selection of ideal footwear for hot days"}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">
                {language === "es"
                  ? "Error al cargar productos de verano"
                  : "Error loading summer products"}
              </h3>
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-center">
                <div className="rounded-full bg-yellow-100 px-6 py-2 font-semibold text-yellow-800">
                  ☀️ {summerProducts.length}{" "}
                  {language === "es" ? "productos de verano" : "summer products"}
                </div>
              </div>

              {summerProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {summerProducts.map((product) => (
                    <ProductCard key={product.id} product={product} from="verano" />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="mb-4 text-6xl">☀️</div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    {language === "es"
                      ? "No hay productos de verano disponibles"
                      : "No summer products available"}
                  </h2>
                  <p className="text-gray-600">
                    {language === "es"
                      ? "Vuelve pronto para descubrir nuestra colección de verano."
                      : "Check back soon to discover our summer collection."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SummerProducts;
