import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/useLanguage.js';
import { translations } from '../data/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">CalzadoHogar</h3>
            <p className="text-gray-400">
              {t.footer.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">{t.nav.home}</Link></li>
              <li><Link to="/productos" className="text-gray-400 hover:text-primary-400 transition-colors">{t.nav.products}</Link></li>
              <li><Link to="/ofertas" className="text-gray-400 hover:text-primary-400 transition-colors">{t.nav.offers}</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-primary-400 transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.categories}</h4>
            <ul className="space-y-2">
              <li><Link to="/productos/zapatillas" className="text-gray-400 hover:text-primary-400 transition-colors">Zapatillas</Link></li>
              <li><Link to="/productos/pantuflas" className="text-gray-400 hover:text-primary-400 transition-colors">Pantuflas</Link></li>
              <li><Link to="/productos/sandalias" className="text-gray-400 hover:text-primary-400 transition-colors">Sandalias</Link></li>
              <li><Link to="/productos/botines" className="text-gray-400 hover:text-primary-400 transition-colors">Botines</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Teléfono: +34 900 123 456</li>
              <li>Email: info@calzadohogar.com</li>
              <li>Dirección: Calle Principal 123</li>
              <li>Ciudad, País 28001</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CalzadoHogar. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;