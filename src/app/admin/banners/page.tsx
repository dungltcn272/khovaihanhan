import Link from 'next/link';
import { getAllBanners } from '@/lib/firebaseService';

export const dynamic = 'force-dynamic';

export default async function AdminBannersPage() {
  const banners = await getAllBanners();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Banner</h2>
        <Link 
          href="/admin/banners/create"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Thêm Banner
        </Link>
      </div>

      {banners.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">Chưa có banner nào</p>
          <Link 
            href="/admin/banners/create"
            className="text-blue-600 hover:underline"
          >
            Tạo banner đầu tiên
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
              <div className="flex items-center gap-6 p-6">
                {/* Banner Image */}
                <div className="w-48 h-32 flex-shrink-0">
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Banner Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{banner.title}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                      Order: {banner.order}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{banner.description}</p>
                  <div className="flex items-center gap-4">
                    {banner.isActive ? (
                      <span className="text-green-600 text-sm">● Active</span>
                    ) : (
                      <span className="text-gray-400 text-sm">○ Inactive</span>
                    )}
                    <Link 
                      href={`/admin/banners/edit/${banner.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
