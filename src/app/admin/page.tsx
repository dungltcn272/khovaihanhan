import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/admin/banners" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-2">Banners</h3>
          <p className="text-gray-600">Manage homepage banners</p>
        </Link>

        <Link href="/admin/products" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <p className="text-gray-600">Manage product listings</p>
        </Link>

        <Link href="/admin/fabrics" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-4xl mb-4">🧵</div>
          <h3 className="text-xl font-semibold mb-2">Fabrics</h3>
          <p className="text-gray-600">Manage fabric types</p>
        </Link>

        <Link href="/admin/messages" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">Messages</h3>
          <p className="text-gray-600">View contact messages</p>
        </Link>
      </div>
    </div>
  );
}
