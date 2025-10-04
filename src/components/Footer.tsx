import { Link } from "react-router-dom";

import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../data/translations.ts";
import Pantufla from "../assets/pantufla.png";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-primary-400 mb-4 flex items-center gap-2 text-xl font-bold">
              MisPapes
              <img src={Pantufla} alt="MisPapes" className="h-10" />
            </h3>
            <p className="text-gray-400">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 text-gray-400 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/productos"
                  className="hover:text-primary-400 text-gray-400 transition-colors"
                >
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link
                  to="/ofertas"
                  className="hover:text-primary-400 text-gray-400 transition-colors"
                >
                  {t.nav.offers}
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="hover:text-primary-400 text-gray-400 transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">{t.footer.categories}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/invierno"
                  className="hover:text-primary-400 text-gray-400 transition-colors"
                >
                  {t.footer.winter}
                </Link>
              </li>
              <li>
                <Link
                  to="/verano"
                  className="hover:text-primary-400 text-gray-400 transition-colors"
                >
                  {t.footer.summer}
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?gender=hombre"
                  className="hover:text-primary-400 text-gray-400 transition-colors"
                >
                  {t.footer.forHim}
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?gender=mujer"
                  className="hover:text-primary-400 text-gray-400 transition-colors"
                >
                  {t.footer.forHer}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">{t.footer.contact}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t.footer.phone}: +34 900 123 456</li>
              <li>{t.footer.email}: info@misPapes.com</li>
              <li>{t.footer.address}: Calle Principal 123</li>
              <li>{t.footer.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} MisPapes. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
