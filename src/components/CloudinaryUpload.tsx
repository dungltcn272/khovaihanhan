'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState, useCallback, useRef } from 'react';

interface CloudinaryUploadProps {
  imageUrls: string[];
  onImageUrlsChange: (urls: string[]) => void;
  folder?: string;
  multiple?: boolean;
}

export default function CloudinaryUpload({ 
  imageUrls,
  onImageUrlsChange,
  folder = 'fabric-store',
  multiple = false,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const newUrlsRef = useRef<string[]>([]);

  const handleDelete = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    onImageUrlsChange(newUrls);
  };

  // Track new URLs during upload
  const handleUploadSuccess = useCallback((result: any) => {
    const url = result.info.secure_url;
    newUrlsRef.current.push(url);
  }, []);

  // When all uploads complete, add to imageUrls
  const handleQueuesEnd = useCallback(() => {
    if (newUrlsRef.current.length > 0) {
      if (multiple) {
        // Add all new URLs to existing ones
        onImageUrlsChange([...imageUrls, ...newUrlsRef.current]);
      } else {
        // For single upload, replace with the last one
        onImageUrlsChange([newUrlsRef.current[newUrlsRef.current.length - 1]]);
      }
      newUrlsRef.current = []; // Reset for next upload
    }
    setUploading(false);
  }, [imageUrls, onImageUrlsChange, multiple]);

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset="fabric-store-preset"
        options={{
          folder: folder,
          multiple: multiple,
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
          maxFileSize: 10000000, // 10MB
          showAdvancedOptions: false,
          cropping: false,
          showPoweredBy: false,
          sources: ['local', 'url', 'camera', 'google_drive', 'dropbox'],
        }}
        onQueuesEnd={handleQueuesEnd}
        onUploadAdded={() => {
          setUploading(true);
          newUrlsRef.current = []; // Reset on new upload session
        }}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <div className="space-y-4">
            {/* Upload Button */}
            <button
              type="button"
              onClick={() => open()}
              disabled={uploading}
              className="w-full px-4 md:px-6 py-4 md:py-4 border-2 border-dashed border-blue-300 rounded-lg md:rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-blue-100 rounded-full">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm md:text-base">
                    {uploading ? '⏳ Đang upload...' : '📤 Chọn ảnh hoặc kéo thả'}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {multiple ? '⚡ Upload VÔ HẠN ảnh cùng lúc (mỗi ảnh ≤ 10MB)' : 'Tối đa 10MB'}
                  </p>
                </div>
              </div>
            </button>

            {/* Upload Info */}
            {imageUrls.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs md:text-sm text-blue-700">
                ✓ Đã tải lên {imageUrls.length} ảnh
              </div>
            )}

            {/* Preview Grid */}
            {imageUrls.length > 0 && (
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-3">Ảnh đã upload:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {imageUrls.map((url, index) => (
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
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity px-2 md:px-3 py-1 bg-white/90 text-gray-800 rounded-full text-xs font-semibold">
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
