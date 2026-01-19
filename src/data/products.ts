export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  size: string;
  origin: string;
  pricePerMeter: number; // Giá theo mét (VNĐ)
  images: string[];
  category: 'featured' | 'new' | 'bestseller';
  discountPercent?: number; // Giảm giá (%) - tuỳ chọn, mặc định = 0
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Lụa Tơ Tằm Vàng',
    slug: 'lua-to-tam-vang',
    description: 'Lụa Tơ Tằm Vàng là màu trắc khánh, nhạ trình vải tầu thác cách mặt cần rống phác chầm với áo một hiện thảng thời nét như hình.',
    size: '50x8:cm',
    origin: 'Kho Vải Hân Hân - Việt Nam',
    pricePerMeter: 280000,
    discountPercent: 15,
    images: [
      'https://images.unsplash.com/photo-1518291344630-4857135fb581?w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea3c50ae?w=800&q=80',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
      'https://images.unsplash.com/photo-1591993232143-f741605db8c2?w=800&q=80',
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80',
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
      'https://images.unsplash.com/photo-1622519407650-3df9883f76e6?w=800&q=80',
      'https://images.unsplash.com/photo-1609778308579-c9c2378cc3c5?w=800&q=80',
      'https://images.unsplash.com/photo-1503342450613-68ba0812e35a?w=800&q=80',
      'https://images.unsplash.com/photo-1520975684449-23f4dc0f0058?w=800&q=80',
      'https://images.unsplash.com/photo-1540570302349-031777e71b35?w=800&q=80',
      'https://images.unsplash.com/photo-1520973372882-7a5f6d8b0faf?w=800&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80'
    ],
    category: 'featured'
  },
  {
    id: '2',
    name: 'Lụa Tơ Tằm Champagne',
    slug: 'lua-to-tam-vang-2',
    description: 'Lụa Tơ Tằm Champagne là màu trắc khánh, nhạ trình vải tầu thác cách mặt cần rống phác chầm với áo một hiện thảng thời nét như hình.',
    size: '50x8:cm',
    origin: 'Kho Vải Hân Hân - Việt Nam',
    pricePerMeter: 260000,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800'
    ],
    category: 'featured'
  },
  {
    id: '3',
    name: 'Lụa Tơ Tằm Hồng',
    slug: 'lua-to-tam-hong',
    description: 'Lụa Tơ Tằm Hồng là màu trắc khánh, nhạ trình vải tầu thác cách mặt cần rống phác chầm với áo một hiện thảng thời nét như hình.',
    size: '50x8:cm',
    origin: 'Kho Vải Hân Hân - Việt Nam',
    pricePerMeter: 270000,
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      'https://images.unsplash.com/photo-1591993232143-f741605db8c2?w=800',
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800'
    ],
    category: 'featured'
  },
  {
    id: '4',
    name: 'Lụa Tơ Tằm Đồng',
    slug: 'lua-to-tam-dong',
    description: 'Lụa Tơ Tằm Đồng là màu trắc khánh, nhạ trình vải tầu thác cách mặt cần rống phác chầm với áo một hiện thảng thời nét như hình.',
    size: '50x8:cm',
    origin: 'Kho Vải Hân Hân - Việt Nam',
    pricePerMeter: 290000,
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea3c50ae?w=800',
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800'
    ],
    category: 'featured'
  },
  {
    id: '5',
    name: 'Lụa Satin Đỏ Ngọc Ruby',
    slug: 'lua-satin-do-ngoc-ruby',
    description: 'Lụa Satin Đỏ Ngọc Ruby là màu trắc khánh, nhạ trình vải tầu thác cách mặt cần rống phác chầm với áo một hiện thảng thời nét như hình.',
    size: '50x8:cm',
    origin: 'Kho Vải Hân Hân - Việt Nam',
    pricePerMeter: 46000,
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800',
      'https://images.unsplash.com/photo-1622519407650-3df9883f76e6?w=800',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      'https://images.unsplash.com/photo-1609778308579-c9c2378cc3c5?w=800'
    ],
    category: 'new'
  },
];
