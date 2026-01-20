'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getContactInfo, updateContactInfo, createContactInfo, ContactInfo } from '@/lib/firebaseService';
import CloudinaryUpload from '@/components/CloudinaryUpload';

export default function AdminContactInfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [contactId, setContactId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zaloLink: '',
    facebookLink: '',
    description: '',
  });

  useEffect(() => {
    async function fetchContactInfo() {
      setFetching(true);
      const data = await getContactInfo();
      if (data) {
        setContactId(data.id);
        setAvatarUrl(data.avatarUrl);
        setFormData({
          storeName: data.storeName,
          ownerName: data.ownerName,
          phone: data.phone,
          email: data.email,
          address: data.address,
          city: data.city,
          zaloLink: data.zaloLink,
          facebookLink: data.facebookLink,
          description: data.description,
        });
      }
      setFetching(false);
    }
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!avatarUrl) {
      alert('Please upload an avatar');
      return;
    }

    setLoading(true);
    try {
      if (contactId) {
        await updateContactInfo(contactId, {
          ...formData,
          avatarUrl,
        });
        alert('Contact info updated successfully!');
      } else {
        const newId = await createContactInfo({
          ...formData,
          avatarUrl,
        });
        setContactId(newId);
        alert('Contact info created successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save contact info');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading contact info...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avatar / Logo *
          </label>
          <CloudinaryUpload
            folder="contact"
            multiple={false}
            imageUrls={avatarUrl ? [avatarUrl] : []}
            onImageUrlsChange={(urlsOrUpdater) => {
              const nextUrls =
                typeof urlsOrUpdater === 'function'
                  ? urlsOrUpdater(avatarUrl ? [avatarUrl] : [])
                  : urlsOrUpdater;
              setAvatarUrl(nextUrls[0] ?? '');
            }}
          />
        </div>

        {/* Store Name & Owner Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name *
            </label>
            <input
              type="text"
              required
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kho Vải Hân Hân"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner Name *
            </label>
            <input
              type="text"
              required
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nguyễn Văn A"
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="contact@example.com"
            />
          </div>
        </div>

        {/* Address & City */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Nguyễn Huệ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Hồ Chí Minh"
            />
          </div>
        </div>

        {/* Zalo & Facebook */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zalo Link *
            </label>
            <input
              type="url"
              required
              value={formData.zaloLink}
              onChange={(e) => setFormData({ ...formData, zaloLink: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://zalo.me/0123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Link *
            </label>
            <input
              type="url"
              required
              value={formData.facebookLink}
              onChange={(e) => setFormData({ ...formData, facebookLink: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Giới thiệu ngắn về cửa hàng..."
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : contactId ? 'Update Contact Info' : 'Create Contact Info'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/contact')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Preview Contact Page
          </button>
        </div>
      </form>
    </div>
  );
}
