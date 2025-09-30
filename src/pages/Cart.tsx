import { HelpCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SEOHybrid from "../components/SEOHybrid";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../data/translations.ts";

const Cart = () => {
  const { language } = useLanguage();
  const { state, updateQuantity, removeItem } = useCart();
  const t = translations[language];

  if (state.items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <SEOHybrid
          title="Carrito de Compra | MisPapes Tienda de Calzado"
          description="Revisa tu carrito de compra en MisPapes. Calzado de calidad con envío gratis y devoluciones fáciles."
          keywords="carrito compra, tienda calzado online, zapatos carrito, comprar calzado, MisPapes carrito"
          canonicalUrl="https://mispapes.com/carrito"
          ogImage="https://mispapes.com/og-cart.jpg"
        />
        <Header cartCount={state.totalItems} />

        <main className="flex flex-grow items-center justify-center py-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-gray-300" />
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              {t.cart.empty}
            </h1>
            <p className="mb-8 text-gray-600">{t.cart.emptyMessage}</p>
            <Link to="/productos" className="btn-primary">
              {t.cart.viewProducts}
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHybrid
        title="Carrito de Compra | MisPapes Tienda de Calzado"
        description="Revisa tu carrito de compra en MisPapes. Calzado de calidad con envío gratis y devoluciones fáciles."
        keywords="carrito compra, tienda calzado online, zapatos carrito, comprar calzado, MisPapes carrito"
        canonicalUrl="https://mispapes.com/carrito"
        ogImage="https://mispapes.com/og-cart.jpg"
      />
      <Header cartCount={state.totalItems} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            {t.cart.title}
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="p-6">
                  {state.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border-b py-4 last:border-b-0"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Talla: {item.selectedSize} | Color:{" "}
                          {item.selectedColor}
                        </p>
                        <div className="flex items-center gap-2">
                          {item.originalPrice &&
                          item.originalPrice > item.price ? (
                            <>
                              <span className="text-gray-400 text-sm font-medium line-through">
                                €{item.originalPrice.toFixed(2)}
                              </span>
                              <span className="text-red-600 text-lg font-bold">
                                €{item.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-primary-600 text-lg font-bold">
                              €{item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                          )
                        }
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-4 rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  {t.cart.summary}
                </h2>

                {state.totalPrice < 50 && 50 - state.totalPrice <= 15 && (
                  <div className="mb-4 rounded-lg bg-blue-50 p-3 text-center">
                    <p className="text-sm text-blue-800">
                      ¡Te faltan{" "}
                      <span className="font-bold">
                        €{(50 - state.totalPrice).toFixed(2)}
                      </span>{" "}
                      para tener envío gratis!
                    </p>
                  </div>
                )}

                {state.totalPrice >= 50 && (
                  <div className="mb-4 rounded-lg bg-green-50 p-3 text-center">
                    <p className="text-sm text-green-800">
                      ¡Felicidades!{" "}
                      <span className="font-bold">Tu envío será gratuito</span>
                    </p>
                  </div>
                )}

                <div className="mb-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.cart.subtotal}</span>
                    <span className="font-medium text-gray-900">
                      €{state.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.cart.shipping}</span>
                    <span className="font-medium text-gray-900">
                      {state.totalPrice > 50 ? t.cart.free : "€4.99"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{t.cart.tax}</span>
                      <div className="group relative">
                        <HelpCircle className="h-4 w-4 cursor-help text-gray-400" />
                        <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden w-56 -translate-x-1/2 rounded-lg bg-gray-800 p-3 text-xs text-white shadow-lg group-hover:block">
                          Todos los productos tienen el IVA del 21% incluido en
                          su precio
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">{t.cart.total}</span>
                      <span className="text-primary-600">
                        €
                        {(
                          state.totalPrice + (state.totalPrice > 50 ? 0 : 4.99)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="btn-primary mb-4 w-full">
                  {t.cart.checkout}
                </button>

                <Link
                  to="/productos"
                  className="text-primary-600 block text-center transition-colors duration-300 hover:text-blue-700"
                >
                  {t.cart.continueShopping}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
