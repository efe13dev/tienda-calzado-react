import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../data/translations.ts";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  featured?: boolean;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id: number, size: string, color: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id, size, color);

      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color),
      ),
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header cartCount={0} />

        <main className="flex flex-grow items-center justify-center py-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-gray-300" />
            <h1 className="mb-4 text-2xl font-bold text-gray-900">{t.cart.empty}</h1>
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
      <Header cartCount={getTotalItems()} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">{t.cart.title}</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="p-6">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border-b py-4 last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Talla: {item.selectedSize} | Color: {item.selectedColor}
                        </p>
                        <p className="text-primary-600 text-lg font-bold">€{item.price}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize || "",
                              item.selectedColor || "",
                              item.quantity - 1,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize || "",
                              item.selectedColor || "",
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
                          removeFromCart(item.id, item.selectedSize || "", item.selectedColor || "")
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
                <h2 className="mb-4 text-xl font-bold text-gray-900">{t.cart.summary}</h2>

                <div className="mb-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.cart.subtotal}</span>
                    <span className="font-medium text-gray-900">€{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t.cart.shipping}</span>
                    <span className="font-medium text-gray-900">{t.cart.free}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t.cart.tax}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      €{(getTotalPrice() * 0.21).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">{t.cart.total}</span>
                      <span className="text-primary-600">
                        €{(getTotalPrice() * 1.21).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="btn-primary mb-4 w-full">{t.cart.checkout}</button>

                <Link
                  to="/productos"
                  className="text-primary-600 hover:text-primary-700 block text-center"
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
