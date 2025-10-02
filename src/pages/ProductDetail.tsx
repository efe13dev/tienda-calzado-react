import { Share2, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageGallery from "../components/ImageGallery";
import SEOHybrid from "../components/SEOHybrid";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/useLanguage";
import { products, type ProductSize } from "../data/products";
import { translations } from "../data/translations";

const getSizesByGender = (gender: string): ProductSize[] => {
  return gender === "hombre" ? [40, 41, 42, 43, 44, 45] : [36, 37, 38, 39, 40, 41];
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { language } = useLanguage();
  const { addItem, state } = useCart();
  const t = translations[language];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Obtener los parámetros de búsqueda
  const searchParams = new URLSearchParams(location.search);
  const gender = searchParams.get("gender");
  const fromOffers = searchParams.get("from") === "offers";

  const product = products.find((p) => p.id === parseInt(id || "0"));

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">{t.productDetail.notFound}</h1>
          <Link to="/productos" className="btn-primary">
            {t.productDetail.backToProducts}
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");

      return;
    }

    const finalPrice =
      product.oferta && product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    addItem({
      ...product,
      quantity,
      selectedSize,
      price: Math.round(finalPrice * 100) / 100,
      originalPrice: product.oferta && product.discount ? product.price : undefined,
    });
  };

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("¡Enlace copiado al portapapeles!");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHybrid
        title={`${product.name} | MisPapes Tienda de Calzado`}
        description={`Compra ${product.name} en MisPapes. ${product.description} Calidad garantizada y envío gratis.`}
        keywords={`${product.name}, calzado ${product.gender}, ${product.season}, zapatos online, tienda calzado, MisPapes`}
        canonicalUrl={`https://mispapes.com/producto/${product.id}`}
        ogImage={product.images[0]}
        ogType="product"
      />
      <Header cartCount={state.totalItems} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link
              to={fromOffers ? "/ofertas" : gender ? `/productos?gender=${gender}` : "/productos"}
              className="text-primary-600 inline-flex items-center transition-colors duration-300 hover:text-blue-600"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {fromOffers ? "Volver a ofertas" : "Volver a productos"}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            <div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900">{product.name}</h1>

              <div className="mb-4 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-500">(24 {t.products.reviews})</span>
              </div>

              <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>

              <div className="mb-6">
                {product.oferta && product.discount ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-medium text-gray-400 line-through">
                      €{product.price}
                    </span>
                    <span className="text-3xl font-bold text-red-600">
                      €{(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="rounded bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                      -{product.discount}%
                    </span>
                  </div>
                ) : (
                  <div className="text-primary-600 text-3xl font-bold">€{product.price}</div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">{t.productDetail.size}</h3>
                <div className="flex flex-wrap gap-2">
                  {getSizesByGender(product.gender).map((size) => {
                    const isAvailable = product.sizes.includes(size);
                    const isSelected = selectedSize === size.toString();

                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size.toString())}
                        disabled={!isAvailable}
                        className={`rounded-lg border px-4 py-2 transition-colors ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : isAvailable
                              ? "border-gray-300 text-gray-700 hover:border-blue-600"
                              : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {t.productDetail.quantity}
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6 flex gap-4">
                <button
                  onClick={addToCart}
                  disabled={!selectedSize}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ${
                    !selectedSize
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl active:scale-95"
                  }`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {t.productDetail.addToCart}
                </button>
                <button
                  onClick={shareProduct}
                  className="rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-100"
                  title="Compartir producto"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {t.productDetail.characteristics}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {product.characteristics.map((characteristic, index) => (
                    <li key={index}>• {characteristic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
