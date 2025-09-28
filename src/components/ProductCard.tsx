import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../contexts/useLanguage";
import { useCart } from "../contexts/CartContext";
import { Product } from "../data/products";
import { translations } from "../data/translations.ts";

interface ProductCardProps {
  product: Product;
  gender?: string;
}

const ProductCard = ({ product, gender }: ProductCardProps) => {
  const { language } = useLanguage();
  const { addItem } = useCart();
  const t = translations[language];

  return (
    <Link
      to={gender ? `/producto/${product.id}?gender=${gender}` : `/producto/${product.id}`}
      className="card group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.featured && (
          <span className="bg-primary-600 absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-medium text-white">
            {t.products.featuredBadge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem({
              ...product,
              quantity: 1,
            });
          }}
          className="text-primary-600 hover:bg-primary-600 absolute right-4 bottom-4 rounded-full bg-white p-2 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 hover:text-white"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-grow flex-col p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{product.name}</h3>

        <p className="mb-3 line-clamp-2 text-sm text-gray-700">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-primary-600 text-2xl font-bold">€{product.price}</span>
          <span className="btn-primary text-sm transition-colors duration-300 hover:text-blue-600">
            Ver más
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
