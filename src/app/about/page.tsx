import Header from '@/components/Header';
import { getActiveFabrics } from '@/lib/firebaseService';

export const dynamic = 'force-dynamic';

export default async function About() {
  const fabrics = await getActiveFabrics();
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-500 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Giới Thiệu Các Loại Vải
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Khám phá bộ sưu tập vải cao cấp đa dạng với nhiều chất liệu và mục đích sử dụng khác nhau
          </p>
        </div>
      </div>

      {/* Fabrics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fabrics.map((fabric) => (
            <div
              key={fabric.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-pink-400 to-pink-500 overflow-hidden">
                {fabric.image ? (
                  <img 
                    src={fabric.image} 
                    alt={fabric.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Fabric pattern icon fallback */}
                    <svg width="150" height="150" viewBox="0 0 150 150" className="opacity-20">
                      <pattern id={`pattern-${fabric.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="20" y2="20" stroke="white" strokeWidth="1" />
                        <line x1="20" y1="0" x2="0" y2="20" stroke="white" strokeWidth="1" />
                      </pattern>
                      <rect width="150" height="150" fill={`url(#pattern-${fabric.id})`} />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name and Price */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {fabric.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-pink-600 font-bold text-xl">
                      {fabric.pricePerMeterMin.toLocaleString()}đ - {fabric.pricePerMeterMax.toLocaleString()}đ/m
                    </span>
                  </div>
                </div>

                {/* Material */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Chất liệu:</h4>
                  <p className="text-gray-700">{fabric.material}</p>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Mô tả:</h4>
                  <p className="text-gray-700 leading-relaxed">{fabric.description}</p>
                </div>

                {/* Uses */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Công dụng:</h4>
                  <p className="text-gray-700 leading-relaxed">{fabric.uses}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Cần tư vấn về loại vải phù hợp?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Liên hệ ngay với chúng tôi để được tư vấn chi tiết và báo giá tốt nhất!
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Liên Hệ Ngay
          </a>
        </div>
      </div>
    </div>
  );
}
