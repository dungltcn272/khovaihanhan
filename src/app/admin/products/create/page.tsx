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
      alert('Please upload at least one image');
      return;
    }

    setLoading(true);
    try {
      await createProduct({
        ...formData,
        imageUrls,
      });
      
      alert('Product created successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Failed to create product');
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
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-8">Create New Product</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Vải lụa tơ tằm cao cấp"
          />
        </div>

        {/* Slug (auto-generated) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="vai-lua-to-tam-cao-cap"
          />
          <p className="text-sm text-gray-500 mt-1">Auto-generated from product name</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Mô tả chi tiết sản phẩm..."
          />
        </div>

        {/* Size & Origin */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size *
            </label>
            <input
              type="text"
              required
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="150cm x 50m"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origin *
            </label>
            <input
              type="text"
              required
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Việt Nam"
            />
          </div>
        </div>

        {/* Price & Discount */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per Meter (đ) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricePerMeter}
              onChange={(e) => setFormData({ ...formData, pricePerMeter: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.discountPercent}
              onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="featured">Featured</option>
            <option value="new">New</option>
            <option value="bestseller">Bestseller</option>
          </select>
        </div>

        {/* Images Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ảnh sản phẩm * (Có thể upload nhiều ảnh cùng lúc)
          </label>
          <CloudinaryUpload
            folder="products"
            multiple={true}
            currentImages={imageUrls}
            onUpload={(url) => {
              // Function already handled in component
            }}
          />
          {imageUrls.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
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
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Active (show on website)
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
