'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getFabricById, updateFabric, deleteFabric } from '@/lib/firebaseService';
import CloudinaryUpload from '@/components/CloudinaryUpload';

export default function EditFabricPage() {
  const router = useRouter();
  const params = useParams();
  const fabricId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    pricePerMeterMin: 0,
    pricePerMeterMax: 0,
    material: '',
    description: '',
    uses: '',
    isActive: true,
  });

  useEffect(() => {
    const fetchFabric = async () => {
      try {
        const fabric = await getFabricById(fabricId);
        if (fabric) {
          setFormData({
            name: fabric.name,
            slug: fabric.slug,
            pricePerMeterMin: fabric.pricePerMeterMin,
            pricePerMeterMax: fabric.pricePerMeterMax,
            material: fabric.material,
            description: fabric.description,
            uses: fabric.uses,
            isActive: fabric.isActive,
          });
          setImageUrl(fabric.image);
        }
      } catch (error) {
        console.error(error);
        alert('Lỗi: Không tải được vải');
      } finally {
        setFetching(false);
      }
    };

    fetchFabric();
  }, [fabricId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert('Vui lòng upload ảnh vải');
      return;
    }

    setLoading(true);
    try {
      await updateFabric(fabricId, {
        ...formData,
        image: imageUrl,
      });
      
      alert('Cập nhật vải thành công!');
      router.push('/admin/fabrics');
    } catch (error) {
      console.error(error);
      alert('Lỗi: Không cập nhật được vải');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc muốn xóa vải này?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteFabric(fabricId);
      alert('Xóa vải thành công!');
      router.push('/admin/fabrics');
    } catch (error) {
      console.error(error);
      alert('Lỗi: Không xóa được vải');
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

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Chỉnh Sửa Vải</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-8 space-y-6">
        {/* Fabric Name */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Tên Vải *
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
            placeholder="Vải lụa tơ tằm"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Đường Dẫn (URL)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
            placeholder="vai-lua-to-tam"
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Giá Tối Thiểu (đ/m) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricePerMeterMin}
              onChange={(e) => setFormData({ ...formData, pricePerMeterMin: Number(e.target.value) })}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Giá Tối Đa (đ/m) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricePerMeterMax}
              onChange={(e) => setFormData({ ...formData, pricePerMeterMax: Number(e.target.value) })}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="150000"
            />
          </div>
        </div>

        {/* Material */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Chất Liệu *
          </label>
          <input
            type="text"
            required
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="100% tơ tằm tự nhiên"
          />
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
            placeholder="Mô tả chi tiết về loại vải..."
          />
        </div>

        {/* Uses */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Công Dụng *
          </label>
          <textarea
            required
            rows={3}
            value={formData.uses}
            onChange={(e) => setFormData({ ...formData, uses: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="Áo dài, váy dạ hội, quần áo cao cấp..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Ảnh Vải *
          </label>
          <CloudinaryUpload
            folder="fabrics"
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
            Kích Hoạt (hiển thị trên website)
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
            Xóa Vải
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
