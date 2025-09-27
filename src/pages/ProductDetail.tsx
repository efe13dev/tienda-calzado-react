import { useState } from "react";
import { Heart, Share2, ShoppingCart, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLanguage } from "../contexts/useLanguage";
import { products } from "../data/products";
import { translations } from "../data/translations";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  featured?: boolean;
  quantity: number;
  selectedSize?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const [quantity, setQuantity] = useState<number>(1);
  const { language } = useLanguage();
  const t = translations[language];

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

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity,
          selectedSize,
        },
      ];
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="h-96 w-full rounded-lg object-cover shadow-lg"
              />
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

              <div className="text-primary-600 mb-6 text-3xl font-bold">€{product.price}</div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">{t.productDetail.size}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size.toString())}
                      className={`rounded-lg border px-4 py-2 transition-colors ${
                        selectedSize === size.toString()
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 text-gray-700 hover:border-blue-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
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
                  className="btn-primary flex flex-1 items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t.productDetail.addToCart}
                </button>
                <button className="rounded-lg border border-gray-300 p-3 hover:bg-gray-100">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="rounded-lg border border-gray-300 p-3 hover:bg-gray-100">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {t.productDetail.characteristics}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Material premium de alta calidad</li>
                  <li>• Suela antideslizante</li>
                  <li>• Diseño ergonómico</li>
                  <li>• Fácil de limpiar</li>
                  <li>• 100% satisfacción garantizada</li>
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
