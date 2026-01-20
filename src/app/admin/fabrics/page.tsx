import Link from 'next/link';
import { getFabrics } from '@/lib/firebaseService';

export const dynamic = 'force-dynamic';

export default async function AdminFabricsPage() {
  const fabrics = await getFabrics();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Vải</h2>
        <Link 
          href="/admin/fabrics/create"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Thêm Vải
        </Link>
      </div>

      {fabrics.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">Chưa có vải nào</p>
          <Link 
            href="/admin/fabrics/create"
            className="text-blue-600 hover:underline"
          >
            Tạo vải đầu tiên
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fabrics.map((fabric) => (
            <div key={fabric.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
              {fabric.image && (
                <img 
                  src={fabric.image} 
                  alt={fabric.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{fabric.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{fabric.material}</p>
                <p className="text-blue-600 font-medium mb-4">
                  {fabric.pricePerMeterMin.toLocaleString()}đ - {fabric.pricePerMeterMax.toLocaleString()}đ/m
                </p>
                <div className="flex items-center justify-between">
                  {fabric.isActive ? (
                    <span className="text-green-600 text-sm">● Active</span>
                  ) : (
                    <span className="text-gray-400 text-sm">○ Inactive</span>
                  )}
                  <Link 
                    href={`/admin/fabrics/${fabric.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    ✏️ Chỉnh sửa
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
