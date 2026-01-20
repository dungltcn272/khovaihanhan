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
  const [uploading, setUploading] = useState(false);

  const handleDelete = (index: number) => {
    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUrls);
  };

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset="fabric-store-preset"
        options={{
          folder: folder,
          multiple: multiple,
          maxFiles: multiple ? 999 : 1, // Không giới hạn cho multi-upload
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
          maxFileSize: 10000000, // 10MB
          showAdvancedOptions: false,
          cropping: false,
          showPoweredBy: false,
          sources: ['local', 'url', 'camera', 'google_drive', 'dropbox'],
        }}
        onQueuesEnd={() => setUploading(false)}
        onUploadAdded={() => setUploading(true)}
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
          <div className="space-y-4">
            {/* Upload Button */}
            <button
              type="button"
              onClick={() => open()}
              disabled={uploading}
              className="w-full px-6 py-4 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {uploading ? '⏳ Đang upload...' : '📤 Chọn ảnh hoặc kéo thả'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {multiple ? 'Không giới hạn số lượng, mỗi ảnh tối đa 10MB' : 'Tối đa 10MB'}
                  </p>
                </div>
              </div>
            </button>

            {/* Upload Info */}
            {uploadedUrls.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                ✓ Đã tải lên {uploadedUrls.length} ảnh
              </div>
            )}

            {/* Preview Grid */}
            {uploadedUrls.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Ảnh đã upload:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedUrls.map((url, index) => (
                    <div 
                      key={index} 
                      className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      {/* Image */}
                      <img 
                        src={url} 
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2">
                        
                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                          title="Xóa ảnh"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>

                        {/* Index Badge */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-white/90 text-gray-800 rounded-full text-xs font-semibold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
}
