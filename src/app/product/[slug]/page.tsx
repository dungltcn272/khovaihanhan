import ProductDetailClient from '@/components/ProductDetailClient';
import { getProductBySlug, getProducts } from '@/lib/firebaseService';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ProductDetail({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-[#3d3226] mb-4">Không tìm thấy sản phẩm</h1>
        <p className="text-gray-600 mb-4">Slug: {slug}</p>
        <a href="/" className="px-6 py-3 bg-[#c9a961] text-white rounded-lg hover:bg-[#a88947] inline-block">Quay lại trang chủ</a>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
export const dynamicParams = false;
