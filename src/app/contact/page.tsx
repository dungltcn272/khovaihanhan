import Header from '@/components/Header';
import { getContactInfo } from '@/lib/firebaseService';

export const dynamic = 'force-dynamic';

export default async function Contact() {
  const contactInfo = await getContactInfo();

  // Fallback data if not set
  const info = contactInfo || {
    avatarUrl: '',
    storeName: 'KHO VẢI HÂN HÂN',
    ownerName: 'Chủ Cửa Hàng',
    phone: '0123456789',
    email: 'contact@khovaihanhan.com',
    address: '123 Đường ABC',
    city: 'Hồ Chí Minh',
    zaloLink: 'https://zalo.me/0123456789',
    facebookLink: 'https://facebook.com/khovaihanhan',
    description: 'Kho Vải Hân Hân là địa chỉ uy tín chuyên cung cấp các loại vải cao cấp với đa dạng chủng loại và màu sắc.'
  };
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-500 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xl text-white/90">
            Chúng tôi sẵn sàng hỗ trợ bạn bất cứ lúc nào!
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Avatar and Business Info */}
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 text-center">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl overflow-hidden">
                {info.avatarUrl ? (
                  <img 
                    src={info.avatarUrl} 
                    alt={info.storeName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg width="80" height="80" viewBox="0 0 80 80" className="text-pink-600">
                    <text x="40" y="55" fontSize="48" fontWeight="bold" textAnchor="middle" fill="currentColor">
                      {info.storeName.charAt(0)}
                    </text>
                  </svg>
                )}
              </div>
            </div>

            {/* Business Name */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {info.storeName}
            </h2>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
              <p className="text-white font-medium">Uy Tín - Chất Lượng - Phong Phú</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-8 md:p-12">
            {/* Introduction */}
            <div className="mb-8 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong className="text-pink-600">{info.storeName}</strong> - {info.description}
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Phone */}
              <div className="bg-pink-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Điện Thoại</h3>
                    <a
                      href={`tel:${info.phone}`}
                      className="text-pink-600 font-bold text-lg hover:underline"
                    >
                      {info.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-pink-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Địa Chỉ</h3>
                    <p className="text-gray-700">
                      {info.address}, {info.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Kết Nối Với Chúng Tôi
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Zalo */}
                <a
                  href={info.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="white">
                    <circle cx="14" cy="14" r="12" fill="currentColor" />
                    <path d="M10 12 L18 12 M14 9 L14 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="font-semibold">Liên hệ qua Zalo</span>
                </a>

                {/* Facebook */}
                <a
                  href={info.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="white">
                    <path
                      d="M14 2C7.373 2 2 7.373 2 14c0 5.989 4.388 10.954 10.125 11.854v-8.385H9.078V14h3.047v-2.343c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874V14h3.328l-.532 3.469h-2.796v8.385C21.612 24.954 26 19.99 26 14c0-6.627-5.373-12-12-12z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-semibold">Fanpage Facebook</span>
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mt-8 bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-3 text-center">Giờ Làm Việc</h3>
              <div className="text-center text-gray-700">
                <p className="mb-2">
                  <span className="font-semibold">Thứ 2 - Thứ 7:</span> 8:00 - 20:00
                </p>
                <p>
                  <span className="font-semibold">Chủ Nhật:</span> 8:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Optional) */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Đến Thăm Showroom Của Chúng Tôi
          </h3>
          <p className="text-gray-700 mb-6">
            Hãy đến trực tiếp để xem và cảm nhận chất lượng vải của chúng tôi!
          </p>
        </div>
      </div>
    </div>
  );
}
