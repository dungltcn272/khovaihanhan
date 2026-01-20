'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProducts, getBanners, Product, Banner } from '@/lib/firebaseService';

type TabType = 'featured' | 'new' | 'bestseller';

export default function Home() {
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
      const data = await getBanners();
      setBanners(data);
    }
    fetchBanners();
  }, []);

  // Fetch products from Firestore
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const data = await getProducts(activeTab);
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <Header />

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
                className="min-w-full h-full relative"
              >
                {/* Banner Image */}
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-3 text-center drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl text-center drop-shadow-md">
                    {banner.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="min-w-full h-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-3">Chào mừng đến với cửa hàng vải</h2>
                <p className="text-lg md:text-xl">Khám phá bộ sưu tập vải cao cấp</p>
              </div>
            </div>
          )}
        </div>

        {/* Indicators */}
        {banners.length > 0 && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-3 bg-white'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-3 relative z-10 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm vải..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-8">
        <div className="overflow-x-auto scrollbar-hide px-2">
          <div className="flex space-x-3 min-w-max justify-center pb-2">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'featured'
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border-2 border-pink-200'
              }`}
            >
              Sản phẩm nổi bật
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'new'
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border-2 border-pink-200'
              }`}
            >
              Sản phẩm mới
            </button>
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'bestseller'
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border-2 border-pink-200'
              }`}
            >
              Bán chạy
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid - 2 columns on mobile, 4 on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Đang tải sản phẩm...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm phù hợp</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

