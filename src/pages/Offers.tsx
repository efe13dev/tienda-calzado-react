import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard.tsx";
import SEOHybrid from "../components/SEOHybrid";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/useLanguage";
import { products } from "../data/products";
import { translations } from "../data/translations";

const Offers = () => {
  const { state } = useCart();
  const { language } = useLanguage();
  const t = translations[language];

  const offerProducts = products.filter((product) => product.oferta);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHybrid
        title="Ofertas y Promociones | MisPapes Tienda de Calzado"
        description="Descubre nuestras ofertas exclusivas en calzado. Zapatos, zapatillas y botas con descuentos especiales. Calidad garantizada al mejor precio."
        keywords="ofertas calzado, promociones zapatos, descuentos calzado, zapatos rebajas, tienda calzado ofertas, MisPapes ofertas"
        canonicalUrl="https://mispapes.com/ofertas"
        ogImage="https://mispapes.com/og-offers.jpg"
      />
      <Header cartCount={state.totalItems} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{t.nav.offers}</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Descubre nuestros productos en oferta con precios especiales
            </p>
          </div>

          <div className="mb-8 flex items-center justify-center">
            <div className="rounded-full bg-red-100 px-6 py-2 font-semibold text-red-800">
              🔥 {offerProducts.length} productos en oferta
            </div>
          </div>

          {offerProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerProducts.map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                      OFERTA
                    </span>
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">🏷️</div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">No hay ofertas disponibles</h2>
              <p className="text-gray-600">Vuelve pronto para descubrir nuestras promociones.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Offers;
