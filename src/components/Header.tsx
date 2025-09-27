import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../data/translations.ts";

import LanguageToggle from "./LanguageToggle";

interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="font-display text-primary-600 text-4xl font-black transform hover:scale-105 transition-transform duration-200">
            MisPapes
          </Link>

          <nav className="hidden space-x-8 md:flex">
            <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}>
              {t.nav.home}
            </Link>
            <Link
              to="/productos"
              className={`transition-colors ${location.pathname === '/productos' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}
            >
              {t.nav.products}
            </Link>
            <Link to="/ofertas" className={`transition-colors ${location.pathname === '/ofertas' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}>
              {t.nav.offers}
            </Link>
            <Link to="/contacto" className={`transition-colors ${location.pathname === '/contacto' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}>
              {t.nav.contact}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Link to="/carrito" className="relative">
              <ShoppingCart className="hover:text-primary-600 h-6 w-6 text-gray-700 transition-colors" />
              {cartCount > 0 && (
                <span className="bg-primary-600 absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="text-gray-700 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-gray-200 py-4 md:hidden">
            <div className="flex flex-col space-y-2">
              <Link to="/" className={`py-2 transition-colors ${location.pathname === '/' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}>
                {t.nav.home}
              </Link>
              <Link
                to="/productos"
                className={`py-2 transition-colors ${location.pathname === '/productos' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}
              >
                {t.nav.products}
              </Link>
              <Link
                to="/ofertas"
                className={`py-2 transition-colors ${location.pathname === '/ofertas' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}
              >
                {t.nav.offers}
              </Link>
              <Link
                to="/contacto"
                className={`py-2 transition-colors ${location.pathname === '/contacto' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}
              >
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
