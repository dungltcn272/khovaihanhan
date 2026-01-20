'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createFabric } from '@/lib/firebaseService';
import CloudinaryUpload from '@/components/CloudinaryUpload';

export default function CreateFabricPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert('Please upload a fabric image');
      return;
    }

    setLoading(true);
    try {
      await createFabric({
        ...formData,
        image: imageUrl,
      });
      
      alert('Fabric created successfully!');
      router.push('/admin/fabrics');
    } catch (error) {
      console.error(error);
      alert('Failed to create fabric');
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
      <h2 className="text-3xl font-bold mb-8">Create New Fabric</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
        {/* Fabric Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fabric Name *
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
            placeholder="Vải lụa tơ tằm"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="vai-lua-to-tam"
          />
        </div>

        {/* Price Range */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price per Meter (đ) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricePerMeterMin}
              onChange={(e) => setFormData({ ...formData, pricePerMeterMin: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="30000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price per Meter (đ) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.pricePerMeterMax}
              onChange={(e) => setFormData({ ...formData, pricePerMeterMax: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="80000"
            />
          </div>
        </div>

        {/* Material */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material *
          </label>
          <input
            type="text"
            required
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="100% tơ tằm tự nhiên"
          />
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
            placeholder="Mô tả chi tiết về loại vải..."
          />
        </div>

        {/* Uses */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Uses *
          </label>
          <textarea
            required
            rows={3}
            value={formData.uses}
            onChange={(e) => setFormData({ ...formData, uses: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Áo dài, váy dạ hội, quần áo cao cấp..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fabric Image *
          </label>
          <CloudinaryUpload
            folder="fabrics"
            multiple={false}
            currentImages={imageUrl ? [imageUrl] : []}
            onUpload={(url) => setImageUrl(url)}
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
            {loading ? 'Creating...' : 'Create Fabric'}
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
