import Link from 'next/link';
import { Product } from '@/lib/firebaseService';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-pink-200 to-pink-300 overflow-hidden">
        {/* Sale Badge - Small Rectangle */}
        {product.discountPercent && product.discountPercent > 0 && (
          <div className="absolute top-1 right-1 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap">
            <div className="text-xs font-bold">{product.discountPercent}%</div>
          </div>
        )}

        {product.imageUrls && product.imageUrls.length > 0 ? (
          <img 
            src={product.imageUrls[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Fabric icon */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-30">
              <path
                d="M40 20 Q 60 30 55 45 T 40 70 Q 20 60 25 45 T 40 20"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="40" cy="45" r="10" fill="white" opacity="0.5" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 text-center flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

        {/* Bottom Section */}
        <div className="mt-auto">
          {/* Price with Gradient Text */}
          <div className="mb-3">
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-bold text-lg">{formatPrice(product.pricePerMeter)}</span>
            <span className="text-gray-500 text-sm ml-1">/mét</span>
          </div>

          {/* View Details Button */}
          <div className="w-full py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold text-sm md:text-base hover:from-pink-600 hover:to-pink-700 transition-all duration-300">
            Xem chi tiết
          </div>
        </div>
      </div>
    </Link>
  );
}
