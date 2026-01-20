import Link from 'next/link';
import { getProducts } from '@/lib/firebaseService';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Sản Phẩm</h2>
        <Link 
          href="/admin/products/create"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Thêm Sản Phẩm
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">Chưa có sản phẩm nào</p>
          <Link 
            href="/admin/products/create"
            className="text-blue-600 hover:underline"
          >
            Tạo sản phẩm đầu tiên
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ảnh</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Giá</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Danh Mục</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng Thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {product.imageUrls[0] && (
                      <img 
                        src={product.imageUrls[0]} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">{product.pricePerMeter.toLocaleString()}đ</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.isActive ? (
                      <span className="text-green-600">● Active</span>
                    ) : (
                      <span className="text-gray-400">○ Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      ✏️ Chỉnh sửa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
