import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && product.colors && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
    } else {
      // If no sizes/colors specified, add with default values
      addToCart(product, 'One Size', 'Default', 1);
    }
  };
  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-slate-400">
              {product.name.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.featured && (
            <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          {!product.inStock && (
            <span className="bg-slate-500 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
          <Heart className="h-4 w-4 text-slate-600 hover:text-red-500" />
        </button>

        {/* Quick Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-white/90 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors duration-200 flex items-center justify-center gap-2"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-500 uppercase tracking-wide">
            {product.category}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-slate-600 ml-1">4.5</span>
          </div>
        </div>

        <Link href={`/products/${product._id}`}>
          <h3 className="font-medium text-slate-900 mb-2 line-clamp-2 hover:text-slate-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <Link 
            href={`/products/${product._id}`}
            className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
