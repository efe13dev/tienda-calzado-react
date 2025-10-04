import { Snowflake } from "lucide-react";
import { useEffect } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard.tsx";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import SEOHybrid from "../components/SEOHybrid";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/useLanguage";
import { useWinterProducts } from "../hooks/useProducts";

const WinterProducts = () => {
  const { state } = useCart();
  const { language } = useLanguage();
  const { products: winterProducts, loading, error } = useWinterProducts();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHybrid
        title="Productos de Invierno | MisPapes Tienda de Calzado"
        description="Descubre nuestra colección de calzado de invierno. Botines, zapatillas y pantuflas cálidas para mantenerte cómodo durante los meses fríos."
        keywords="calzado invierno, botines invierno, zapatillas frío, pantuflas cálidas, calzado abrigado, MisPapes invierno"
        canonicalUrl="https://mispapes.com/invierno"
        ogImage="https://mispapes.com/og-winter.jpg"
      />
      <Header cartCount={state.totalItems} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Snowflake className="h-8 w-8 text-blue-500" />
              <h1 className="text-4xl font-bold text-gray-900">
                {language === "es" ? "Colección de Invierno" : "Winter Collection"}
              </h1>
              <Snowflake className="h-8 w-8 text-blue-500" />
            </div>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {language === "es"
                ? "Mantén tus pies cálidos y cómodos con nuestra selección de calzado ideal para los meses fríos"
                : "Keep your feet warm and comfortable with our selection of ideal footwear for the cold months"}
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
                  ? "Error al cargar productos de invierno"
                  : "Error loading winter products"}
              </h3>
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-center">
                <div className="rounded-full bg-blue-100 px-6 py-2 font-semibold text-blue-800">
                  ❄️ {winterProducts.length}{" "}
                  {language === "es" ? "productos de invierno" : "winter products"}
                </div>
              </div>

              {winterProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {winterProducts.map((product) => (
                    <ProductCard key={product.id} product={product} from="invierno" />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="mb-4 text-6xl">❄️</div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    {language === "es"
                      ? "No hay productos de invierno disponibles"
                      : "No winter products available"}
                  </h2>
                  <p className="text-gray-600">
                    {language === "es"
                      ? "Vuelve pronto para descubrir nuestra colección de invierno."
                      : "Check back soon to discover our winter collection."}
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

export default WinterProducts;
