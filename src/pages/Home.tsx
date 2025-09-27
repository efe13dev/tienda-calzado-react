import { useState } from "react";

import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../contexts/useLanguage";
import { products } from "../data/products.ts";
import { translations } from "../data/translations.ts";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  featured?: boolean;
  quantity: number;
}

const Home = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  const addToCart = (product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    featured?: boolean;
  }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />

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
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="/productos" className="btn-primary inline-flex items-center">
                {t.products.viewAll}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
