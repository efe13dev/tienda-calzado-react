import { Link } from "react-router-dom";

import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard.tsx";
import SEOHybrid from "../components/SEOHybrid";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/useLanguage";
import { products } from "../data/products.ts";
import { translations } from "../data/translations.ts";

const Home = () => {
  const { language } = useLanguage();
  const { state } = useCart();
  const t = translations[language];

  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHybrid
        title="MisPapes | Zapatillas de Casa: Comodidad para tu Hogar"
        description="Tienda especializada en zapatillas de estar en casa. Descubre nuestras zapatillas cómodas, pantuflas y calzado para hogar con envío gratis 24-48h. Calidad premium."
        keywords="zapatillas de casa, pantuflas, calzado para hogar, zapatillas comodas, comprar zapatillas online, calzado estar en casa, zapatillas hogar, pantuflas mujer, zapatillas hombre"
        canonicalUrl="https://mispapes.com/"
        ogImage="https://mispapes.com/og-home.jpg"
      />

      <Header cartCount={state.totalItems} />

      <main className="flex-grow">
        <Hero />
        <Features />

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                {t.products.featured}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">{t.products.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/productos"
                className="btn-primary inline-flex items-center transition-colors duration-300 hover:text-blue-600"
              >
                {t.products.viewAll}
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
