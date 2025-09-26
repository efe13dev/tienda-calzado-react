import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage.js';
import LanguageToggle from './LanguageToggle';
import { translations } from '../data/translations';

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            CalzadoHogar
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.home}
            </Link>
            <Link to="/productos" className="text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.products}
            </Link>
            <Link to="/ofertas" className="text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.offers}
            </Link>
            <Link to="/contacto" className="text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.contact}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Link to="/carrito" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors py-2">
                {t.nav.home}
              </Link>
              <Link to="/productos" className="text-gray-700 hover:text-primary-600 transition-colors py-2">
                {t.nav.products}
              </Link>
              <Link to="/ofertas" className="text-gray-700 hover:text-primary-600 transition-colors py-2">
                {t.nav.offers}
              </Link>
              <Link to="/contacto" className="text-gray-700 hover:text-primary-600 transition-colors py-2">
                {t.nav.contact}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;