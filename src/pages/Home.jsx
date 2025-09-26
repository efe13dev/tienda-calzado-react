import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useLanguage } from '../contexts/useLanguage.js';
import { translations } from '../data/translations';

const Home = () => {
  const [cart, setCart] = useState([]);
  const { language } = useLanguage();
  const t = translations[language];

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t.products.featured}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.products.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
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