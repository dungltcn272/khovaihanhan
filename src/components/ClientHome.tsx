'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { getActiveProducts, getActiveBanners, Product, Banner } from '@/lib/firebaseService';

type TabType = 'featured' | 'new' | 'bestseller';

export default function ClientHome() {
  const [activeTab, setActiveTab] = useState<TabType>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch banners from Firestore
  useEffect(() => {
    async function fetchBanners() {
      const data = await getActiveBanners();
      setBanners(data);
    }
    fetchBanners();
  }, []);

  // Fetch products from Firestore
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const data = await getActiveProducts(activeTab);
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [activeTab]);

  // Auto slide
  useEffect(() => {
      if (isUserInteracting || banners.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= banners.length - 1) return 0;
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isUserInteracting, banners.length]);

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
      setIsUserInteracting(true);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) {
      // Swipe left - next slide
      setCurrentSlide((prev) => Math.min(prev + 1, banners.length - 1));
    }
    if (swipeDistance < -50) {
      // Swipe right - previous slide
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Banner Slider */}
      <div 
        className="relative h-64 md:h-96 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.length > 0 ? (
            banners.map((banner) => (
              <div
                key={banner.id}
                className="w-full h-full flex-shrink-0 relative"
              >
                {banner.imageUrl ? (
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
                      <p className="text-lg">{banner.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center flex-shrink-0">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">Chào mừng đến với cửa hàng vải</h2>
                <p className="text-lg">Khám phá bộ sưu tập vải cao cấp</p>
              </div>
            </div>
          )}
        </div>

        {/* Dots indicator */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        {banners.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors hidden md:block"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, banners.length - 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors hidden md:block"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm vải..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 border-2 border-pink-200 rounded-full focus:outline-none focus:border-pink-500 shadow-lg transition-colors"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === 'featured'
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-pink-200 hover:border-pink-500'
            }`}
          >
            Sản phẩm nổi bật
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === 'new'
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-pink-200 hover:border-pink-500'
            }`}
          >
            Sản phẩm mới
          </button>
          <button
            onClick={() => setActiveTab('bestseller')}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === 'bestseller'
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-pink-200 hover:border-pink-500'
            }`}
          >
            Bán chạy
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-600"></div>
            <span className="ml-4 text-gray-600">Đang tải sản phẩm...</span>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm phù hợp</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
