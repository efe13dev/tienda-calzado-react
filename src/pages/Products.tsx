import { Mars, Snowflake, Sun, Venus } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import SEOHybrid from "../components/SEOHybrid";
import { useLanguage } from "../contexts/useLanguage";
import { useCart } from "../contexts/CartContext";
import { products } from "../data/products";
import { translations } from "../data/translations";

type GenderSelection = null | "hombre" | "mujer";
type Season = "todos" | "verano" | "invierno";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState<GenderSelection>(null);
  const { state } = useCart();

  const getCurrentSeason = (): Season => {
    const currentMonth = new Date().getMonth() + 1;

    return currentMonth >= 3 && currentMonth <= 9 ? "verano" : "invierno";
  };

  const [selectedSeason, setSelectedSeason] = useState<Season>(getCurrentSeason());
  const { language } = useLanguage();
  const t = translations[language];

  // Efecto para manejar el parámetro de género en la URL
  useEffect(() => {
    const genderParam = searchParams.get("gender");

    if (genderParam === "hombre" || genderParam === "mujer") {
      setSelectedGender(genderParam);
    }
  }, [searchParams]);

  const seasons: Season[] = ["todos", "verano", "invierno"];

  const filteredProducts = selectedGender
    ? products.filter((product) => product.gender === selectedGender)
    : [];

  const filterProductsBySeason = (productList: typeof products) => {
    if (selectedSeason === "todos") return productList;

    return productList.filter((product) => {
      if (selectedSeason === "verano") {
        return ["sandalias", "chanclas"].includes(product.category);
      } else if (selectedSeason === "invierno") {
        return ["botines", "pantuflas", "mocasines"].includes(product.category);
      }

      return true;
    });
  };

  const finalProducts = filterProductsBySeason(filteredProducts);

  const renderProducts = () => {
    if (!selectedGender) return null;

    return (
      <section className="mb-16 rounded-lg bg-gray-50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            {selectedGender === "hombre" ? (
              <>
                <Mars className="h-6 w-6 text-blue-600" /> Para Hombre
              </>
            ) : (
              <>
                <Venus className="h-6 w-6 text-pink-500" /> Para Mujer
              </>
            )}
          </h2>
          <button
            onClick={() => {
              setSelectedGender(null);
              setSearchParams({});
            }}
            className="btn-primary flex items-center transition-colors duration-300 hover:text-blue-600"
          >
            ← Volver
          </button>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {seasons.map((season) => {
            let icon = null;
            let label: string = season;

            if (season === "verano") {
              icon = <Sun className="mr-2 h-4 w-4" />;
              label = "verano";
            } else if (season === "invierno") {
              icon = <Snowflake className="mr-2 h-4 w-4" />;
              label = "invierno";
            } else {
              label = "todas las estaciones";
            }

            return (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`flex items-center rounded-full border-2 px-6 py-2 capitalize transition-all duration-200 ${
                  selectedSeason === season
                    ? "scale-105 transform border-blue-600 bg-blue-600 text-white shadow-lg"
                    : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {icon}
                {label}
              </button>
            );
          })}
        </div>

        {finalProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {finalProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                gender={selectedGender || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHybrid
        title="Catálogo de Productos | MisPapes Tienda de Calzado"
        description="Explora nuestro catálogo completo de calzado para hombre y mujer. Zapatos, zapatillas, botas y más con la mejor calidad y diseño."
        keywords="catálogo calzado, productos calzado, zapatos hombre, zapatillas mujer, botas, tienda online calzado, calzado original"
        canonicalUrl="https://mispapes.com/productos"
        ogImage="https://mispapes.com/og-products.jpg"
      />
      <Header cartCount={state.totalItems} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {!selectedGender ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">{t.products.title}</h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">{t.products.subtitle}</p>
              </div>

              <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
                <button
                  onClick={() => setSelectedGender("hombre")}
                  className="group flex w-full max-w-md transform flex-col items-center justify-center rounded-2xl bg-blue-50 p-8 transition-all hover:scale-105 hover:bg-blue-100 md:w-96"
                >
                  <Mars className="mb-4 h-16 w-16 text-blue-600 transition-transform group-hover:scale-105" />
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">Para Hombre</h2>
                  <p className="text-center text-gray-600">
                    Descubre nuestra colección de calzado para hombre
                  </p>
                  <div className="mt-4 text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Ver productos →
                  </div>
                </button>

                <button
                  onClick={() => setSelectedGender("mujer")}
                  className="group flex w-full max-w-md transform flex-col items-center justify-center rounded-2xl bg-pink-50 p-8 transition-all hover:scale-105 hover:bg-pink-100 md:w-96"
                >
                  <Venus className="mb-4 h-16 w-16 text-pink-500 transition-transform group-hover:scale-105" />
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">Para Mujer</h2>
                  <p className="text-center text-gray-600">
                    Explora nuestra exclusiva colección para mujer
                  </p>
                  <div className="mt-4 text-pink-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Ver productos →
                  </div>
                </button>
              </div>
            </>
          ) : (
            renderProducts()
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
