import dynamic from 'next/dynamic';

const HeaderClient = dynamic(() => import('@/components/Header'), {
  ssr: true,
});

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <HeaderClient />
      {children}
    </div>
  );
}
