import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../contexts/useLanguage";
import { Product } from "../data/products";
import { translations } from "../data/translations.ts";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="card group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.featured && (
          <span className="bg-primary-600 absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-medium text-white">
            {t.products.featuredBadge}
          </span>
        )}
        <button
          onClick={() => onAddToCart(product)}
          className="text-primary-600 hover:bg-primary-600 absolute right-4 bottom-4 rounded-full bg-white p-2 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 hover:text-white"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          <Link to={`/producto/${product.id}`} className="hover:text-primary-600 transition-colors">
            {product.name}
          </Link>
        </h3>

        <p className="mb-3 line-clamp-2 text-sm text-gray-700">{product.description}</p>

        <div className="mb-3 flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">(24 {t.products.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-primary-600 text-2xl font-bold">€{product.price}</span>
          <button onClick={() => onAddToCart(product)} className="btn-primary text-sm">
            {t.products.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
