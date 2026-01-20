'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
  multiple?: boolean;
  currentImages?: string[];
}

export default function CloudinaryUpload({ 
  onUpload, 
  folder = 'fabric-store',
  multiple = false,
  currentImages = []
}: CloudinaryUploadProps) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(currentImages);

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset="fabric-store-preset" // Cần tạo trong Cloudinary Console
        options={{
          folder: folder,
          multiple: multiple,
          maxFiles: multiple ? 10 : 1,
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
          maxFileSize: 5000000, // 5MB
        }}
        onSuccess={(result: any) => {
          const url = result.info.secure_url;
          if (multiple) {
            const newUrls = [...uploadedUrls, url];
            setUploadedUrls(newUrls);
            onUpload(url);
          } else {
            setUploadedUrls([url]);
            onUpload(url);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {multiple ? '📤 Upload Images' : '📤 Upload Image'}
          </button>
        )}
      </CldUploadWidget>

      {/* Preview uploaded images */}
      {uploadedUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uploadedUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url} 
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  const newUrls = uploadedUrls.filter((_, i) => i !== index);
                  setUploadedUrls(newUrls);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
