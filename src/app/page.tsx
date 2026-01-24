import HeaderWrapper from '@/components/HeaderWrapper';
import ClientHome from '@/components/ClientHome';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <HeaderWrapper />
      <ClientHome />
    </div>
  );
}

