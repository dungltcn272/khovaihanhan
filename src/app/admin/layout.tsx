'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else if (pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    // Close sidebar when route changes
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
  };

  // Show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Show login page without layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show 404 if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              title="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">🏪 Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 md:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm md:text-base"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:relative top-16 md:top-0 left-0 bottom-0
          w-64 bg-white shadow-lg min-h-[calc(100vh-73px)]
          transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-4 space-y-2">
            <Link 
              href="/admin/banners"
              className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
              🎨 Banners
            </Link>
            <Link 
              href="/admin/products"
              className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
              📦 Products
            </Link>
            <Link 
              href="/admin/fabrics"
              className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
              🧵 Fabrics
            </Link>
            <Link 
              href="/admin/messages"
              className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
              💬 Messages
            </Link>
            <Link 
              href="/admin/contact-info"
              className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
              👤 Contact Info
            </Link>
            <hr className="my-4" />
            <Link 
              href="/"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-600 transition"
            >
              ← Back to Site
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
