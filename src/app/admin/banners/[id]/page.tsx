'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getBannerById, updateBanner, deleteBanner } from '@/lib/firebaseService';
import CloudinaryUpload from '@/components/CloudinaryUpload';

export default function EditBannerPage() {
  const router = useRouter();
  const params = useParams();
  const bannerId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const banner = await getBannerById(bannerId);
        if (banner) {
          setFormData({
            title: banner.title,
            description: banner.description,
            order: banner.order,
            isActive: banner.isActive,
          });
          setImageUrl(banner.imageUrl);
        }
      } catch (error) {
        console.error(error);
        alert('Lỗi: Không tải được banner');
      } finally {
        setFetching(false);
      }
    };

    fetchBanner();
  }, [bannerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert('Vui lòng upload ảnh banner');
      return;
    }

    setLoading(true);
    try {
      await updateBanner(bannerId, {
        ...formData,
        imageUrl,
      });
      
      alert('Cập nhật banner thành công!');
      router.push('/admin/banners');
    } catch (error) {
      console.error(error);
      alert('Lỗi: Không cập nhật được banner');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc muốn xóa banner này?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteBanner(bannerId);
      alert('Xóa banner thành công!');
      router.push('/admin/banners');
    } catch (error) {
      console.error(error);
      alert('Lỗi: Không xóa được banner');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Chỉnh Sửa Banner</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-8 space-y-6">
        {/* Banner Title */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Tiêu Đề *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="Lụa Satin Cao Cấp"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Mô Tả *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="Chất liệu mềm mại, sang trọng"
          />
        </div>

        {/* Order */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Thứ Tự Hiển Thị *
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="1"
          />
          <p className="text-xs md:text-sm text-gray-500 mt-1">Số nhỏ hơn hiển thị trước</p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Ảnh Banner * (Khuyến nghị: 1200x400px)
          </label>
          <CloudinaryUpload
            folder="banners"
            multiple={false}
            imageUrls={imageUrl ? [imageUrl] : []}
            onImageUrlsChange={(urlsOrUpdater) => {
              if (typeof urlsOrUpdater === 'function') {
                const urls = urlsOrUpdater(imageUrl ? [imageUrl] : []);
                setImageUrl(urls[0] || '');
              } else {
                setImageUrl(urlsOrUpdater[0] || '');
              }
            }}
          />
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
            Kích Hoạt (hiển thị trên trang chủ)
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium text-sm md:text-base"
          >
            {loading ? 'Đang cập nhật...' : 'Cập Nhật'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="w-full md:w-auto px-4 md:px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-medium text-sm md:text-base"
          >
            Xóa Banner
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full md:w-auto px-4 md:px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-sm md:text-base"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
