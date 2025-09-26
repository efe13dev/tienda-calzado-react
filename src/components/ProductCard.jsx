import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage.js';
import { translations } from '../data/translations';

const ProductCard = ({ product, onAddToCart }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="card overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {t.products.featuredBadge}
          </span>
        )}
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 bg-white text-primary-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-600 hover:text-white"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <Link to={`/producto/${product.id}`} className="hover:text-primary-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-2">(24 {t.products.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            €{product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="btn-primary text-sm"
          >
            {t.products.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;