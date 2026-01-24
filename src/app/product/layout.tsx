import HeaderWrapper from '@/components/HeaderWrapper';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <HeaderWrapper />
      {children}
    </div>
  );
}
