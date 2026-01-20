'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/firebaseService';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showAllThumbs, setShowAllThumbs] = useState(false);

  // Format tiền VNĐ
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Tính tổng tiền
  const totalPrice = product.pricePerMeter * quantity;

  // Handle quantity change
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImage(prev => (prev > 0 ? prev - 1 : product.imageUrls.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImage(prev => (prev < product.imageUrls.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product.imageUrls.length]);

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setSelectedImage(prev => (prev < product.imageUrls.length - 1 ? prev + 1 : 0));
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right
      setSelectedImage(prev => (prev > 0 ? prev - 1 : product.imageUrls.length - 1));
    }
  };

  const nextImage = () => {
    setSelectedImage(prev => (prev < product.imageUrls.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setSelectedImage(prev => (prev > 0 ? prev - 1 : product.imageUrls.length - 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery with Slider */}
        <div>
          {/* Main Image with Navigation (slide + pager) */}
          <div 
            className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${selectedImage * 100}%)` }}
              >
                {product.imageUrls.map((img, idx) => (
                  <div key={idx} className="min-w-full h-full relative">
                    <Image
                      src={img}
                      alt={`${product.name} - ${idx + 1}`}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            {product.imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors z-10"
                  aria-label="Next image"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {product.imageUrls.length}
            </div>
          </div>

          {/* Thumbnail Images with 'Xem thêm' */}
          <div className="grid grid-cols-4 gap-3">
            {product.imageUrls.slice(0, showAllThumbs ? product.imageUrls.length : 8).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-4 ring-pink-500' : 'ring-1 ring-gray-200'
                } hover:ring-pink-400 transition-all duration-200`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
            {product.imageUrls.length > 8 && (
              <button
                onClick={() => setShowAllThumbs(prev => !prev)}
                className="col-span-4 mt-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-colors"
              >
                {showAllThumbs ? 'Thu gọn' : 'Xem thêm ảnh'}
              </button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-[#3d3226] mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mb-6 p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border-2 border-pink-200">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-pink-600">
                {formatPrice(product.pricePerMeter)}
              </span>
              <span className="text-gray-600">/mét</span>
            </div>
            <p className="text-sm text-gray-600">Giá có thể thay đổi tùy theo số lượng</p>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <span className="text-[#3d3226] font-semibold min-w-[120px]">Kích thước:</span>
              <span className="text-gray-700">{product.size}</span>
            </div>
            <div className="flex items-start">
              <span className="text-[#3d3226] font-semibold min-w-[120px]">Xuất xứ:</span>
              <span className="text-gray-700">{product.origin}</span>
            </div>
          </div>

          {/* Selected Image Preview */}
          <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border-2 border-pink-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Bạn đã chọn:</p>
            <div className="relative h-32 w-32 rounded-lg overflow-hidden shadow-md border border-white">
              <Image
                src={product.imageUrls[selectedImage]}
                alt={`${product.name} - Selected`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border-2 border-pink-200">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Số lượng (mét):
            </label>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={decrementQuantity}
                className="w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-md flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setQuantity(val > 0 ? val : 1);
                }}
                className="w-24 h-14 text-center text-2xl font-bold border-2 border-pink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                min="1"
              />
              <button
                onClick={incrementQuantity}
                className="w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-md flex items-center justify-center"
                aria-label="Increase quantity"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Total Price */}
            <div className="border-t-2 border-pink-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Đơn giá:</span>
                <span className="font-semibold">{formatPrice(product.pricePerMeter)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Số lượng:</span>
                <span className="font-semibold">{quantity} mét</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-pink-400">
                <span className="text-xl font-bold text-gray-800">Tổng tiền:</span>
                <span className="text-3xl font-bold text-pink-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Zalo Button */}
            <a
              href={`https://zalo.me/0123456789?text=Xin chào, tôi muốn đặt ${quantity} mét ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#0068FF] text-white rounded-lg hover:bg-[#0052CC] transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path d="M8 10 L16 10 M12 8 L12 16" stroke="#0068FF" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Đặt hàng qua Zalo
            </a>

            {/* Facebook Button */}
            <a
              href="https://www.facebook.com/khovaihanhan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0068FF] to-[#8B3DFF] text-white rounded-lg hover:from-[#0052CC] hover:to-[#7030DD] transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                  fill="currentColor"
                />
              </svg>
              Liên hệ Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
