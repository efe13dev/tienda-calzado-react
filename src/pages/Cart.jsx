import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage.js';
import { translations } from '../data/translations';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, size, color);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && 
        item.selectedSize === size && 
        item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (id, size, color) => {
    setCart(prevCart =>
      prevCart.filter(item =>
        !(item.id === id && 
          item.selectedSize === size && 
          item.selectedColor === color)
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header cartCount={0} />
        
        <main className="flex-grow flex items-center justify-center py-8">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.cart.empty}</h1>
            <p className="text-gray-600 mb-8">{t.cart.emptyMessage}</p>
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header cartCount={getTotalItems()} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.cart.title}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Talla: {item.selectedSize} | Color: {item.selectedColor}
                        </p>
                        <p className="text-lg font-bold text-primary-600">€{item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t.cart.summary}</h2>
                
                <div className="space-y-3 mb-6">
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
                    <span className="font-medium text-gray-900 dark:text-white">€{(getTotalPrice() * 0.21).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">{t.cart.total}</span>
                      <span className="text-primary-600">€{(getTotalPrice() * 1.21).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary w-full mb-4">
                  {t.cart.checkout}
                </button>
                
                <Link to="/productos" className="block text-center text-primary-600 hover:text-primary-700">
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