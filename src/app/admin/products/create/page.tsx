'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/firebaseService';
import CloudinaryUpload from '@/components/CloudinaryUpload';

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    size: '',
    origin: '',
    pricePerMeter: 0,
    discountPercent: 0,
    category: 'featured' as 'featured' | 'new' | 'bestseller',
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageUrls.length === 0) {
      alert('Vui lòng upload ít nhất 1 ảnh');
      return;
    }

    setLoading(true);
    try {
      await createProduct({
        ...formData,
        imageUrls,
      });
      
      alert('Tạo sản phẩm thành công!');
      router.push('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Lỗi: Không tạo được sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Tạo Sản Phẩm Mới</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-8 space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Tên Sản Phẩm *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => {
              setFormData({ 
                ...formData, 
                name: e.target.value,
                slug: generateSlug(e.target.value)
              });
            }}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="Vải lụa tơ tằm cao cấp"
          />
        </div>

        {/* Slug (auto-generated) */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Đường Dẫn (URL)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
            placeholder="vai-lua-to-tam-cao-cap"
          />
          <p className="text-xs md:text-sm text-gray-500 mt-1">Tự động sinh từ tên sản phẩm</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Mô Tả *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="Mô tả chi tiết sản phẩm..."
          />
        </div>

        {/* Size & Origin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Kích Thước *
            </label>
            <input
              type="text"
              required
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="150cm x 50m"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Xuất Xứ *
            </label>
            <input
              type="text"
              required
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="Việt Nam"
            />
          </div>
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Giá Mỗi Mét (đ) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricePerMeter}
              onChange={(e) => setFormData({ ...formData, pricePerMeter: Number(e.target.value) })}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Giảm Giá (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.discountPercent}
              onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="10"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Danh Mục *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
          >
            <option value="featured">Nổi Bật</option>
            <option value="new">Mới</option>
            <option value="bestseller">Bán Chạy</option>
          </select>
        </div>

        {/* Images Upload */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Ảnh sản phẩm * (Có thể upload nhiều ảnh cùng lúc)
          </label>
          <CloudinaryUpload
            folder="products"
            multiple={true}
            imageUrls={imageUrls}
            onImageUrlsChange={(urlsOrUpdater) => {
              // Support both direct value and functional updater
              if (typeof urlsOrUpdater === 'function') {
                setImageUrls(urlsOrUpdater);
              } else {
                setImageUrls(urlsOrUpdater);
              }
            }}
          />
          {imageUrls.length > 0 && (
            <p className="text-xs md:text-sm text-green-600 mt-2">
              ✓ Đã upload {imageUrls.length} ảnh
            </p>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-xs md:text-sm font-medium text-gray-700">
            Kích Hoạt (hiển trên website)
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-4 md:px-6 py-3 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium text-sm md:text-base"
          >
            {loading ? 'Đang tạo...' : 'Tạo Sản Phẩm'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full md:w-auto px-4 md:px-6 py-3 md:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-sm md:text-base"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
