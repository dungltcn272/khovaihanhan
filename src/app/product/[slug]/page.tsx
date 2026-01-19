import Header from '@/components/Header';
import ProductDetailClient from '@/components/ProductDetailClient';
import { products } from '@/data/products';

interface PageProps {
  params: { slug: string };
}

export default function ProductDetail({ params }: PageProps) {
  const { slug } = params;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-[#3d3226] mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600 mb-4">Slug: {slug}</p>
          <a href="/" className="px-6 py-3 bg-[#c9a961] text-white rounded-lg hover:bg-[#a88947] inline-block">Quay lại trang chủ</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <Header />
      <ProductDetailClient product={product} />
    </div>
  );
}

// Pre-render all known product pages at build time
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// Do not generate pages for unknown slugs at runtime
export const dynamicParams = false;
